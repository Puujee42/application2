import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(req: NextRequest) {
    try {
        const { reviewId } = await req.json();

        if (!reviewId) {
            return NextResponse.json({ error: 'Review ID required' }, { status: 400 });
        }

        const reviewsCollection = await getCollection('reviews');

        await reviewsCollection.updateOne(
            { _id: new ObjectId(reviewId) },
            { $inc: { helpful: 1 } }
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update helpful count' }, { status: 500 });
    }
}
