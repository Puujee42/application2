# Deploy-д бэлтгэх цэвэрлэлт

## Хийгдсэн өөрчлөлтүүд

### 1. Console.log устгасан
- **lib/twilio.ts:** `console.log('OTP sent successfully'...)`, `console.log('Twilio not configured'...)`, `console.log('OTP verification'...)` устгасан. `console.error` алдаанд үлдээсэн.
- **prisma/seed.ts:** Seed-ийн `console.log`-уудыг устгасан (скрипт ажиллах үед гаргах лог).
- **app/checkout/page.tsx:** `console.error('Мэдэгдэл оруулахад алдаа'...)` үлдээсэн (чухал алдааны лог).

### 2. Unused imports / dead code
- **app/admin/page.tsx:** Ашиглагдаагүй `ShoppingBag` import устгасан.
- **supabase/profiles.sql:** Түр коммент болгосон trigger кодыг устгасан.

### 3. Environment variables
- Нууц түлхүүрүүд код дотор шууд бичигдээгүйг шалгасан. Бүгд `process.env.*` ашиглаж байна (lib/twilio.ts, lib/supabase*.ts, lib/auth.ts, middleware.ts).
- Production-д `.env`-ийг Vercel Environment Variables руу оруулна.

### 4. Performance / Next.js
- **next.config.js:** `images.domains` болон `remotePatterns` тохирсон (Supabase, Unsplash). Image компонент гаднах URL ашиглахад тохиромжтой.
- **useEffect dependencies:** Жишээ нь app/orders/page.tsx дээр `[status, supabaseLoading, isLoggedIn, supabaseUser?.id, router]` зөв өгсөн.

---

## Таны хийх алхмууд

### Build шалгах
```bash
npm run build
```
Хэрэв TypeScript эсвэл ESLint алдаа гарвал засна. Одоо `next.config.js` дотор `ignoreBuildErrors: true` болон `ignoreDuringBuilds: true` тохируулсан тул build дуусах боломжтой. Строг болгохыг хүсвэл эдгээрийг `false` болгож, алдаануудыг засна.

### Vercel Environment Variables
Дараах хувьсагчуудыг Vercel → Project → Settings → Environment Variables дээр тохируулна:
- `DATABASE_URL`, `DIRECT_URL`
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXTAUTH_URL`, `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` (Google нэвтрэх бол)
- `TWILIO_*` (утасны OTP ашиглавал)

### Дэлгэрэнгүй
- VERCEL_DEPLOY_ALHA.md – Vercel deploy алхмууд.
