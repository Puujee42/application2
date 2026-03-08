import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const orderId = searchParams.get('order_id');
        const body = await req.json();

        console.log('[QPay Callback] Received callback for order:', orderId, body);

        if (orderId) {
            const ordersCollection = await getCollection('orders');
            const order = await ordersCollection.findOne({ _id: new ObjectId(orderId) });

            if (order && order.status === 'pending') {
                await ordersCollection.updateOne(
                    { _id: new ObjectId(orderId) },
                    {
                        $set: {
                            status: 'confirmed',
                            paidAt: new Date(),
                            updatedAt: new Date()
                        }
                    }
                );

                // Notify Customer
                try {
                    const notificationsCollection = await getCollection('notifications');
                    await notificationsCollection.insertOne({
                        userId: order.userId,
                        title: '✅ Төлбөр хүлээн авлаа (Callback)',
                        message: `Таны #${orderId.slice(-6)} захиалга баталгаажлаа.`,
                        type: 'order',
                        isRead: false,
                        link: `/orders/${orderId}`,
                        createdAt: new Date()
                    });
                } catch (e) { }
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('[QPay Callback] Error:', error);
        return NextResponse.json({ error: 'Callback failed' }, { status: 500 });
    }
}
