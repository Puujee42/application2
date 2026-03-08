import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '');

export const runtime = 'edge';

export async function POST(req: Request) {
    try {
        const { productName, stockStatus } = await req.json();

        if (stockStatus !== 'pre-order') {
            return NextResponse.json({ estimation: 'Маргааш хүргэгдэнэ (Бэлэн бараа)' });
        }

        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
        });

        const today = new Date().toLocaleDateString('mn-MN');

        const prompt = `
      Та Soyol Video Shop-ийн хүргэлтийн тооцоологч туслах байна. 
      Барааны нэр: "${productName}"
      Төлөв: Захиалгаар (Pre-order).
      Өнөөдөр: ${today}.
      
      Энэ бараа Солонгос эсвэл Хятадаас ирдэг. Хэрэглэгчид "Итгэл төрүүлэхүйц" байдлаар хүргэлтийн хугацааг Монгол хэлээр тооцоолж хэлнэ үү.
      Жишээ нь: "Энэ барааг одоо захиалвал Солонгосоос 3 сарын 5 гэхэд таны гарт очих магадлал 95% байна."
      Хариулт ГАНЦХАН өгүүлбэр байх ёстой. Маш хурдан, шууд хариул.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ estimation: text.trim() });
    } catch (error) {
        console.error('Delivery Estimator Error:', error);
        return NextResponse.json({ estimation: 'Хүргэлтийн хугацаа: 7-14 хоног.' }, { status: 500 });
    }
}
