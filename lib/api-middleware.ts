import { NextResponse } from 'next/server';
import { z } from 'zod';

type ApiHandler = (req: Request) => Promise<NextResponse>;

export function withErrorHandling(handler: ApiHandler): ApiHandler {
  return async (req: Request) => {
    try {
      return await handler(req);
    } catch (error: any) {
      console.error('[API Error]', error);

      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { error: 'Validation Error', details: error.format() },
          { status: 400 }
        );
      }

      const status = error.status || 500;
      const message = error.message || 'Internal Server Error';

      return NextResponse.json(
        { error: message },
        { status }
      );
    }
  };
}

// Simple in-memory rate limiter (Note: resets on serverless cold start)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

export function rateLimit(ip: string, limit: number = 100, windowMs: number = 60000) {
  const now = Date.now();
  const record = rateLimitMap.get(ip) || { count: 0, lastReset: now };

  if (now - record.lastReset > windowMs) {
    record.count = 0;
    record.lastReset = now;
  }

  record.count += 1;
  rateLimitMap.set(ip, record);

  return record.count <= limit;
}
