import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { auth } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const productId = searchParams.get('productId');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');

        if (!productId) {
            return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
        }

        const reviewsCollection = await getCollection('reviews');
        const skip = (page - 1) * limit;

        const [reviews, total, stats] = await Promise.all([
            reviewsCollection.find({ productId }).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray(),
            reviewsCollection.countDocuments({ productId }),
            reviewsCollection.aggregate([
                { $match: { productId } },
                {
                    $group: {
                        _id: null,
                        averageRating: { $avg: '$rating' },
                        ratingDistribution: {
                            $push: '$rating'
                        }
                    }
                }
            ]).toArray()
        ]);

        // Calculate distribution manually for simplicity or use complex aggregation
        const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        if (stats[0]?.ratingDistribution) {
            stats[0].ratingDistribution.forEach((r: number) => {
                if (distribution[r as keyof typeof distribution] !== undefined) {
                    distribution[r as keyof typeof distribution]++;
                }
            });
        }

        return NextResponse.json({
            reviews,
            total,
            averageRating: stats[0]?.averageRating || 0,
            distribution
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { userId, role } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Login required' }, { status: 401 });
        }

        const body = await req.json();
        const { productId, orderId, rating, comment, images } = body;

        if (!productId || !orderId || !rating) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const ordersCollection = await getCollection('orders');
        const reviewsCollection = await getCollection('reviews');
        const productsCollection = await getCollection('products');

        // 1. Verify existence and purchase
        const order = await ordersCollection.findOne({
            _id: new ObjectId(orderId),
            userId,
            'items.productId': productId, // Check if this product was in the order
            status: 'delivered' // Only allow reviews for delivered orders
        });

        if (!order) {
            return NextResponse.json({ error: 'You can only review products from delivered orders.' }, { status: 403 });
        }

        // 2. Fetch User info (for display)
        const usersCollection = await getCollection('users');
        const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

        const reviewData = {
            productId,
            userId,
            userName: user?.name || 'Anonymous',
            userImage: user?.image || null,
            orderId,
            rating: Number(rating),
            comment: comment || '',
            images: images || [],
            verified: true,
            helpful: 0,
            updatedAt: new Date()
        };

        // 3. Upsert Review (One review per product per order)
        const result = await reviewsCollection.updateOne(
            { userId, productId, orderId },
            { $set: reviewData, $setOnInsert: { createdAt: new Date() } },
            { upsert: true }
        );

        // 4. Update Product Average Rating
        const allReviews = await reviewsCollection.find({ productId }).toArray();
        const newAverage = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

        await productsCollection.updateOne(
            { _id: new ObjectId(productId) },
            {
                $set: {
                    rating: newAverage,
                    reviewCount: allReviews.length
                }
            }
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Review error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
