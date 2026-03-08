import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { auth } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const { role } = await auth();
        if (role !== 'admin') {
            return NextResponse.json({ error: 'Зөвхөн админ хандах боломжтой' }, { status: 403 });
        }

        const { searchParams } = new URL(req.url);
        const status = searchParams.get('status');

        const storesCollection = await getCollection('stores');

        let query = {};
        if (status) query = { status };

        const stores = await storesCollection.find(query).sort({ createdAt: -1 }).toArray();

        return NextResponse.json(stores);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch stores' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { role } = await auth();
        if (role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const body = await req.json();
        const { storeId, status, commissionRate } = body;

        if (!storeId) {
            return NextResponse.json({ error: 'Store ID is required' }, { status: 400 });
        }

        const storesCollection = await getCollection('stores');
        const updateData: any = { updatedAt: new Date() };

        if (status) updateData.status = status;
        if (commissionRate !== undefined) updateData.commissionRate = Number(commissionRate);

        const result = await storesCollection.findOneAndUpdate(
            { _id: new ObjectId(storeId) },
            { $set: updateData },
            { returnDocument: 'after' }
        );

        if (!result) {
            return NextResponse.json({ error: 'Store not found' }, { status: 404 });
        }

        // Notify Vendor about status change
        try {
            const notificationsCollection = await getCollection('notifications');
            const store = result as any;

            let title = '';
            let message = '';

            if (status === 'active') {
                title = '✅ Дэлгүүр баталгаажлаа';
                message = `Таны '${store.name}' дэлгүүр идэвхтэй боллоо. Та одоо бараагаа нэмэх боломжтой.`;
            } else if (status === 'suspended') {
                title = '🚫 Дэлгүүр түдгэлзлээ';
                message = `Таны дэлгүүрийн үйл ажиллагааг түр зогсоолоо.`;
            }

            if (title) {
                await notificationsCollection.insertOne({
                    userId: store.vendorId,
                    title,
                    message,
                    type: 'store',
                    isRead: false,
                    link: '/vendor/products',
                    createdAt: new Date()
                });
            }
        } catch (notifErr) {
            console.error('Failed to notify vendor:', notifErr);
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error('Store update error:', error);
        return NextResponse.json({ error: 'Failed to update store' }, { status: 500 });
    }
}
