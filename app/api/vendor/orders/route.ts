import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { auth } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function GET(req: NextRequest) {
    try {
        const { userId, role } = await auth();
        if (!userId || role !== 'vendor') {
            return NextResponse.json({ error: 'Vendor access required' }, { status: 403 });
        }

        const ordersCollection = await getCollection('orders');

        // Find orders containing items from this vendor
        const orders = await ordersCollection.find({
            'items.vendorId': userId
        }).sort({ createdAt: -1 }).toArray();

        // Transform orders to only show relevant items for this vendor
        const vendorOrders = orders.map(order => {
            const vendorItems = order.items.filter((item: any) => item.vendorId === userId);
            const vendorTotal = vendorItems.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

            return {
                _id: order._id,
                items: vendorItems,
                total: vendorTotal,
                status: order.status,
                customerName: order.fullName,
                phone: order.phone,
                address: `${order.city}, ${order.district}, ${order.address}`,
                createdAt: order.createdAt
            };
        });

        return NextResponse.json(vendorOrders);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch vendor orders' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { userId, role } = await auth();
        if (!userId || role !== 'vendor') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const body = await req.json();
        const { orderId, status } = body;

        if (!orderId || !status) {
            return NextResponse.json({ error: 'Order ID and status required' }, { status: 400 });
        }

        const ordersCollection = await getCollection('orders');

        // Note: In a multi-vendor system, an order status might be complex. 
        // Here we update the main order status if the vendor is processing it.
        // In a more advanced system, we'd have sub-order statuses.

        await ordersCollection.updateOne(
            { _id: new ObjectId(orderId), 'items.vendorId': userId },
            { $set: { status, updatedAt: new Date() } }
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
}
