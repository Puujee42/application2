import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { createInvoice } from '@/lib/qpay';
import { ObjectId } from 'mongodb';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { orderId, amount, description } = body;

        if (!orderId || !amount) {
            return NextResponse.json({ error: 'Missing orderId or amount' }, { status: 400 });
        }

        // 1. Create QPay Invoice
        const qpayData = await createInvoice({
            orderId,
            amount,
            description: description || `Order #${orderId}`
        });

        // 2. Store invoiceId in order
        const ordersCollection = await getCollection('orders');
        await ordersCollection.updateOne(
            { _id: new ObjectId(orderId) },
            { $set: { qpayInvoiceId: qpayData.invoiceId, updatedAt: new Date() } }
        );

        return NextResponse.json(qpayData);
    } catch (error: any) {
        console.error('[QPay Create API] Error:', error);
        return NextResponse.json({ error: error.message || 'Invoice creation failed' }, { status: 500 });
    }
}
