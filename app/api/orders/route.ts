import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { auth } from '@/lib/auth';
import { ObjectId } from 'mongodb';

import { User } from '@/models/User';
import { sendOrderConfirmation } from '@/lib/email';

export async function GET(req: NextRequest) {
  try {
    const { userId, phone } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const orders = await getCollection('orders');

    // Find orders by userId OR by matching phone number (catches pre-registration guest orders)
    const query = phone
      ? { $or: [{ userId }, { phone, userId: 'guest' }] }
      : { userId };

    const results = await orders
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ orders: results });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId: authUserId } = await auth();
    const userId = authUserId || 'guest';

    const body = await req.json();
    const orders = await getCollection('orders');
    const products = await getCollection('products');

    // Extract phone from shipping info for guest order tracking
    const phone = body.shipping?.phone || body.phone || null;

    // Check for pre-order items
    const hasPreOrder = body.items?.some((item: any) => item.stockStatus === 'pre-order') || false;
    const deliveryEstimate = hasPreOrder ? '7-14 хоног' : 'Өнөөдөр - Маргааш';

    const result = await orders.insertOne({
      userId,
      phone, // Store phone at top level for easy querying
      items: body.items || [],
      total: body.total || 0,
      status: body.status || 'pending',
      deliveryMethod: body.deliveryMethod || 'delivery',
      paymentMethod: body.paymentMethod || 'cash',
      shipping: body.shipping || {},
      shippingCost: body.shippingCost || 0,
      hasPreOrder,
      deliveryEstimate,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Admin Notification (Non-blocking)
    try {
      const usersCollection = await getCollection('users');
      const notificationsCollection = await getCollection('notifications');

      const admins = await usersCollection.find({ role: 'admin' }).toArray();

      if (admins.length > 0) {
        const notifications = admins.map(admin => ({
          userId: admin._id.toString(),
          title: '🛒 Шинэ захиалга ирлээ!',
          message: `${body.shipping?.fullName || 'Хэрэглэгч'} - ${body.total}₮`,
          type: 'order',
          isRead: false,
          link: '/admin/orders',
          createdAt: new Date()
        }));

        await notificationsCollection.insertMany(notifications);
      }
    } catch (notifError) {
      console.error('Failed to send admin notifications:', notifError);
      // Continue execution - notification failure shouldn't block order creation
    }

    // Decrement inventory for each purchased item
    for (const item of (body.items || [])) {
      const productId = item.productId || item.id;
      if (!productId) continue;

      let objectId: ObjectId;
      try {
        objectId = new ObjectId(productId);
      } catch {
        continue; // Skip invalid IDs
      }

      // Decrement the inventory
      await products.updateOne(
        { _id: objectId },
        { $inc: { inventory: -(item.quantity || 1) } }
      );

      // Check if inventory hit 0 or below — if so, delete the product
      const updatedProduct = await products.findOne({ _id: objectId });
      if (updatedProduct && (updatedProduct.inventory ?? 0) <= 0) {
        await products.deleteOne({ _id: objectId });
        console.log(`[Orders API] Product ${productId} deleted — inventory reached 0`);
      }
    }

    // Silent Registration: Save address if requested
    if (userId !== 'guest' && body.saveAddress && body.shipping) {
      try {
        const users = await getCollection<User>('users');
        const userObjectId = new ObjectId(userId);

        // Construct new address object
        const newAddress = {
          id: new ObjectId().toString(),
          city: body.shipping.city || '',
          district: body.shipping.district || '',
          label: body.shipping.label || 'Home', // Default label if not provided
          khoroo: '1', // Default, as form doesn't have it explicitly yet
          street: body.shipping.address || '',
          note: body.shipping.notes || '',
          isDefault: true, // User requested "Save as primary"
        };

        // Unset previous default if exists
        await users.updateOne(
          { _id: userObjectId, 'addresses.isDefault': true },
          { $set: { 'addresses.$.isDefault': false } }
        );

        // Add new address
        await users.updateOne(
          { _id: userObjectId },
          {
            $push: { addresses: newAddress } as any,
            $set: { phone: phone || undefined } // Update phone if provided
          }
        );
      } catch (err) {
        console.error('Failed to save address silently:', err);
        // Don't fail the order if address save fails
      }
    }

    // Send Email Confirmation (Non-blocking)
    const currentOrderId = result.insertedId.toString();
    (async () => {
      try {
        let recipientEmail = body.shipping?.email || body.email;
        if (!recipientEmail && userId !== 'guest') {
          const usersCollection = await getCollection('users');
          const owner = await usersCollection.findOne({ _id: new ObjectId(userId) });
          recipientEmail = owner?.email;
        }

        if (recipientEmail) {
          await sendOrderConfirmation({
            id: currentOrderId,
            items: body.items || [],
            totalPrice: body.total || 0,
            fullName: body.shipping?.fullName || 'Хэрэглэгч',
            address: body.shipping?.address || '',
            city: body.shipping?.city || ''
          }, recipientEmail);
        }
      } catch (e) { console.error('Email confirmation error:', e); }
    })();

    return NextResponse.json({ orderId: currentOrderId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { orderId, status } = body;

    if (!orderId || !status) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Only allow cancellation for now via this specific endpoint logic
    // Admin status updates might go through a different flow or check role here
    if (status !== 'cancelled') {
      return NextResponse.json({ error: 'Invalid status update via this endpoint' }, { status: 400 });
    }

    const orders = await getCollection('orders');
    const order = await orders.findOne({ _id: new ObjectId(orderId) });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    if (order.userId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    if (order.status !== 'pending') {
      return NextResponse.json(
        { error: 'Баталгаажсан захиалгыг цуцлах боломжгүй' },
        { status: 400 }
      );
    }

    await orders.updateOne(
      { _id: new ObjectId(orderId) },
      {
        $set: {
          status: 'cancelled',
          updatedAt: new Date()
        }
      }
    );

    // Send notification to customer
    try {
      const notificationsCollection = await getCollection('notifications');
      await notificationsCollection.insertOne({
        userId: order.userId,
        title: '❌ Захиалга цуцлагдлаа',
        message: 'Таны захиалга амжилттай цуцлагдлаа.',
        type: 'order',
        isRead: false,
        link: '/orders',
        createdAt: new Date()
      });
    } catch (error) {
      console.error('Failed to send cancellation notification:', error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Order patch error:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
