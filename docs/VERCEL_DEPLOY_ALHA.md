# Vercel дээр Deploy хийх алхмууд

## 1. GitHub-д код push хийх

```bash
git add .
git commit -m "Prepare for Vercel deploy"
git push origin main
```

(Хэрэв repo байхгүй бол GitHub дээр шинэ repo үүсгээд холбоно.)

---

## 2. Vercel-д нэвтрэх

- https://vercel.com руу ороод **Sign Up** / **Log In** (GitHub-аар нэвтрэх нь тохиромжтой).

---

## 3. Төсөл импортлох

- **Add New…** → **Project**
- **Import Git Repository**-аас өөрийн `amazon` (эсвэл soyol-video-shop) repo-г сонгоно
- **Import** дарна

---

## 4. Environment Variables тохируулах

**Settings** → **Environment Variables** дээр дараах хувьсагчуудыг нэмнэ (Production, Preview, Development гэж тохируулж болно):

| Нэр | Утга | Тэмдэглэл |
|-----|------|-----------|
| `DATABASE_URL` | Supabase-ийн Transaction pool URL | Project Settings → Database |
| `DIRECT_URL` | Supabase-ийн Session pool URL | Project Settings → Database |
| `NEXT_PUBLIC_SUPABASE_URL` | https://xxx.supabase.co | Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon key | Project Settings → API |
| `NEXTAUTH_URL` | **https://таны-домэйн.vercel.app** | Deploy хийсний дараа засна |
| `NEXTAUTH_SECRET` | `openssl rand -base64 32`-аар үүсгэсэн | Заавал |
| `GOOGLE_CLIENT_ID` | Google OAuth | Google-ээр нэвтрэх бол |
| `GOOGLE_CLIENT_SECRET` | Google OAuth | Google-ээр нэвтрэх бол |

Эхний deploy-д `NEXTAUTH_URL`-ийг Vercel-ийн өгсөн домэйн (жишээ нь `https://soyol-video-shop.vercel.app`) гэж тохируулна.

---

## 5. Deploy эхлүүлэх

- **Deploy** товч дарна
- Build дуусах хүртэл хүлээнэ (Prisma generate + Next build)
- Амжилттай бол **Visit**-аар сайт руу орно

---

## 6. Deploy дараа шалгах

1. **NEXTAUTH_URL** – Vercel-ийн бодит URL болсон эсэхийг шалгаад, шаардлагатай бол Environment Variables дээр засаж **Redeploy** хийнэ.
2. **Supabase** – Authentication → URL Configuration → Redirect URLs-д production URL нэмнэ, жишээ нь:  
   `https://таны-проект.vercel.app/login`
3. **Google OAuth** – Google Cloud Console дээр Authorized redirect URIs-д  
   `https://таны-проект.vercel.app/api/auth/callback/google` (NextAuth) болон Supabase-ийн callback URL нэмнэ.

---

## Товч (Vercel CLI)

```bash
npm i -g vercel
vercel login
vercel
```

Environment variables-ийг `vercel env add` эсвэл Vercel Dashboard-аас тохируулна.
