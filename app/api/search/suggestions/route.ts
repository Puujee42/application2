import { Redis } from '@upstash/redis';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
    : null;

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get('q');

        if (!query || query.length < 2) {
            return NextResponse.json({ suggestions: [] });
        }

        // 1. Check Redis Cache
        const cacheKey = `search:suggestions:${query.toLowerCase()}`;
        if (redis) {
            try {
                const cached = await redis.get(cacheKey);
                if (cached) {
                    // If cached is a string, parse it. Upstash might auto-parse JSON if configured but let's be safe.
                    return NextResponse.json(typeof cached === 'string' ? JSON.parse(cached) : cached);
                }
            } catch (cacheError) {
                console.error('Redis cache error:', cacheError);
            }
        }

        // 2. Generate with AI
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `You are a shopping assistant for Soyol Video Shop (Mongolia). 
    Based on the user query "${query}", suggest 5 relevant search terms for an e-commerce shop.
    Return ONLY a JSON array of strings in Mongolian language.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        let suggestions = [];
        try {
            const cleanedText = text.replace(/```json|```/g, '').trim();
            suggestions = JSON.parse(cleanedText);
        } catch (e) {
            console.error('Failed to parse Gemini response:', text);
            suggestions = [query];
        }

        const finalResult = { suggestions };

        // 3. Cache the result for 1 hour
        if (redis) {
            try {
                await redis.setex(cacheKey, 3600, JSON.stringify(finalResult));
            } catch (cacheError) {
                console.error('Redis setex error:', cacheError);
            }
        }

        return NextResponse.json(finalResult);
    } catch (error) {
        console.error('Search suggestions error:', error);
        return NextResponse.json({ suggestions: [] });
    }
}
