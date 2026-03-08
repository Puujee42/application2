import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';

export async function POST(request: Request) {
    try {
        const { phone } = await request.json();

        if (!phone) {
            return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
        }

        const users = await getCollection('users');
        const user = await users.findOne({ phone });

        return NextResponse.json({ exists: !!user });
    } catch (error) {
        console.error('Check user error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
