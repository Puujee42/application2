import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { auth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const { userId, role } = await auth();
    if (!userId || role !== 'vendor') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const ordersCollection = await getCollection('orders');
    const productsCollection = await getCollection('products');

    // 1. Fetch vendor's orders (delivered ones for revenue)
    const allVendorOrders = await ordersCollection.find({
      'items.vendorId': userId
    }).toArray();

    let totalRevenue = 0;
    let commissionPaid = 0;
    let totalOrders = allVendorOrders.length;
    let pendingOrders = 0;

    allVendorOrders.forEach(order => {
      const vendorItems = order.items.filter((item: any) => item.vendorId === userId);

      const orderSubtotal = vendorItems.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
      const orderCommission = vendorItems.reduce((sum: number, item: any) => sum + (item.commissionAmount || 0), 0);

      if (order.status === 'delivered') {
        totalRevenue += (orderSubtotal - orderCommission);
        commissionPaid += orderCommission;
      }

      if (order.status === 'pending') {
        pendingOrders++;
      }
    });

    // 2. Low stock products
    const lowStockCount = await productsCollection.countDocuments({
      vendorId: userId,
      inventory: { $lt: 5 }
    });

    return NextResponse.json({
      totalRevenue,
      totalOrders,
      pendingOrders,
      commissionPaid,
      lowStockProducts: lowStockCount
    });

  } catch (error) {
    console.error('Vendor stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
