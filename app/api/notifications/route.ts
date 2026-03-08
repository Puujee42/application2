
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const queryUserId = searchParams.get('userId');

        if (userId !== queryUserId) {
            // Optional: Allow admins to view others, but for now strict check
            // return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const notificationsCollection = await getCollection('notifications');
        const notifications = await notificationsCollection
            .find({ userId })
            .sort({ createdAt: -1 })
            .limit(20)
            .toArray();

        return NextResponse.json({ notifications });
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        // In a real app, verify admin role here if only admins can send system notifications
        // For now, allowing any authenticated user to potentially trigger one (e.g. "Order Created")
        // or just restricting to open endpoints if needed.

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { recipientId, title, message, type, link } = body;

        if (!recipientId || !title || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const notificationsCollection = await getCollection('notifications');
        const newNotification = {
            userId: recipientId,
            title,
            message,
            type: type || 'system',
            isRead: false,
            link,
            createdAt: new Date(),
        };

        const result = await notificationsCollection.insertOne(newNotification);

        return NextResponse.json({ success: true, notificationId: result.insertedId });

    } catch (error) {
        console.error('Error creating notification:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { notificationId } = body;

        if (!notificationId) {
            return NextResponse.json({ error: 'Missing notificationId' }, { status: 400 });
        }

        const notificationsCollection = await getCollection('notifications');
        await notificationsCollection.updateOne(
            { _id: new ObjectId(notificationId), userId },
            { $set: { isRead: true } }
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating notification:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
