import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json(
      { ok: false, error: 'MONGODB_URI is not set in environment' },
      { status: 503 }
    );
  }

  try {
    const db = await getDb();
    await db.command({ ping: 1 });
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[Health DB] Connection failed:', message);
    return NextResponse.json(
      { ok: false, error: message },
      { status: 503 }
    );
  }
}
