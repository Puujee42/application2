import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { auth } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: 'Нэвтрэх шаардлагатай' }, { status: 401 });
        }

        const body = await req.json();
        const { handle, name, phone, description, logo } = body;

        if (!handle || !name) {
            return NextResponse.json({ error: 'Дэлгүүрийн нэр болон хаяг (handle) заавал байх ёстой' }, { status: 400 });
        }

        // Sanitize handle: lowercase, alphanumeric and hyphens only, remove @ if prefix
        let sanitizedHandle = handle.toLowerCase().replace(/^@/, '').replace(/[^a-z0-9-]/g, '');

        const storesCollection = await getCollection('stores');
        const usersCollection = await getCollection('users');

        // Check if handle already exists
        const existingStore = await storesCollection.findOne({ handle: sanitizedHandle });
        if (existingStore) {
            return NextResponse.json({ error: 'Энэ хаяг (@handle) аль хэдийн ашиглагдсан байна' }, { status: 400 });
        }

        // Check if user already has a store
        const userStore = await storesCollection.findOne({ vendorId: userId });
        if (userStore) {
            return NextResponse.json({ error: 'Та аль хэдийн дэлгүүртэй байна' }, { status: 400 });
        }

        const newStore = {
            vendorId: userId,
            handle: sanitizedHandle,
            name,
            description: description || '',
            phone: phone || '',
            logo: logo || '',
            status: 'pending',
            commissionRate: 10, // Default 10%
            totalSales: 0,
            totalOrders: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await storesCollection.insertOne(newStore);

        // Update user role to vendor
        await usersCollection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: { role: 'vendor' } }
        );

        // Notify Admin
        try {
            const notificationsCollection = await getCollection('notifications');
            const admins = await usersCollection.find({ role: 'admin' }).toArray();

            if (admins.length > 0) {
                const notifications = admins.map(admin => ({
                    userId: admin._id.toString(),
                    title: '🏪 Шинэ дэлгүүр нээх хүсэлт',
                    message: `${name} (@${sanitizedHandle})`,
                    type: 'store',
                    isRead: false,
                    link: '/admin/stores',
                    createdAt: new Date()
                }));
                await notificationsCollection.insertMany(notifications);
            }
        } catch (notifErr) {
            console.error('Failed to send vendor registration notification:', notifErr);
        }

        return NextResponse.json({ success: true, storeId: result.insertedId.toString() }, { status: 201 });
    } catch (error) {
        console.error('Vendor registration error:', error);
        return NextResponse.json({ error: 'Бүртгэл амжилтгүй боллоо' }, { status: 500 });
    }
}
