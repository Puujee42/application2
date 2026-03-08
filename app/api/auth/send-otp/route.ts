import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { rateLimit } from '@/lib/api-middleware';
import { sendOtp } from '@/lib/twilio';

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();

    // 1. Rate Limiting (3 per hour)
    // Note: IP-based limiting might be tricky in some envs, ideally use phone number + IP
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    // Using a stricter key: IP + Phone
    const limitKey = `${ip}-${phone}`;
    if (!rateLimit(limitKey, 3, 3600000)) {
      return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429 });
    }

    if (!phone || phone.length < 8) {
      return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 });
    }

    // 2. Clear old OTPs
    const otpCollection = await getCollection('otps');
    await otpCollection.deleteMany({ phone });

    // 3. Send OTP (Twilio or Mock)
    const twilioRes = await sendOtp(phone);

    if (twilioRes.success) {
      // Mock Mode: If code is returned, we need to save it manually
      if (twilioRes.code) {
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

        await otpCollection.insertOne({
          phone,
          code: twilioRes.code,
          expiresAt,
          verified: false,
          createdAt: new Date(),
        });

        // In dev mode, return the code for easier testing
        if (process.env.NODE_ENV !== 'production') {
          return NextResponse.json({ success: true, message: 'Code sent (Mock)', code: twilioRes.code });
        }
      }

      // Real Mode: Twilio handles everything
      return NextResponse.json({ success: true, message: 'Code sent' });
    } else {
      return NextResponse.json({ error: twilioRes.error || 'Failed to send OTP' }, { status: 500 });
    }
  } catch (error) {
    console.error('Send OTP Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
