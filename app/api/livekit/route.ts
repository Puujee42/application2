import { NextRequest, NextResponse } from 'next/server';
import { AccessToken } from 'livekit-server-sdk';
import { auth, currentUser } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const user = await currentUser();
    const { room } = await req.json();

    if (!room) {
      return NextResponse.json(
        { error: 'Room name is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;

    if (!apiKey || !apiSecret) {
      return NextResponse.json(
        { error: 'LiveKit not configured' },
        { status: 500 }
      );
    }

    const participantName = user?.fullName || user?.firstName || user?.primaryEmailAddress?.emailAddress || 'User';

    const at = new AccessToken(apiKey, apiSecret, {
      identity: userId,
      name: participantName,
    });

    at.addGrant({
      roomJoin: true,
      room,
      canPublish: true,
      canSubscribe: true,
    });

    const token = await at.toJwt();

    // Log the call start
    const { getCollection } = await import('@/lib/mongodb');
    const messages = await getCollection('messages');

    // We need to identify the other participant. 
    // In admin panel, we know who we are calling (receiverId passed in body or room name convention).
    // For now, let's try to parse meaningful info or just log it generic if we can't find receiver.
    // Actually, the previous step (handleStartCall in frontend) sends a 'call_invite'.
    // Here we can just log that a call was *started* (joined) by this user.
    // Better yet, the frontend is already sending a 'call_invite'. Let's trust that for "intent".
    // But to show "History" of actual calls, we might want a 'call_started' event here.

    await messages.insertOne({
      senderId: userId,
      receiverId: 'system', // Or extract from room name if possible
      content: `Video call started in room: ${room}`,
      type: 'call_started',
      roomName: room,
      createdAt: new Date(),
      read: true
    });

    return NextResponse.json({ token });
  } catch (error) {
    console.error('[LiveKit] Token generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate token' },
      { status: 500 }
    );
  }
}
