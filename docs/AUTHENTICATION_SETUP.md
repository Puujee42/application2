# 🔐 Authentication & Database Setup Guide

## 📦 Step 1: Dependencies Суулгах

### Terminal дээр дараах командуудыг дараалан ажиллуулна уу:

```bash
# 1. NextAuth.js суулгах
npm install next-auth@beta

# 2. Prisma суулгах
npm install prisma @prisma/client

# 3. Prisma Dev dependency
npm install -D prisma

# 4. Prisma Client генератор
npx prisma init

# 5. PostgreSQL client (Option 1 - Local PostgreSQL)
npm install pg

# OR

# 5. Supabase client (Option 2 - Recommended for beginners)
npm install @supabase/supabase-js

# 6. Additional auth dependencies
npm install bcryptjs
npm install -D @types/bcryptjs

# 7. Environment variables helper
npm install dotenv
```

## 🗄️ Step 2: Database Options

### Option A: Supabase (Recommended - FREE tier available)

1. **Supabase бүртгэл үүсгэх:**
   - https://supabase.com руу очих
   - "Start your project" дарах
   - GitHub-аар нэвтрэх

2. **Шинэ project үүсгэх:**
   - Project name: `soyol-video-shop`
   - Database Password: `your-secure-password`
   - Region: Singapore (Asia хамгийн ойр)

3. **Connection String авах:**
   - Settings → Database → Connection string
   - "URI" хэсгийг copy хийх

4. **`.env` файлд нэмэх:**
   ```
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
   ```

### Option B: Local PostgreSQL

1. **PostgreSQL татах:**
   - Windows: https://www.postgresql.org/download/windows/
   - Mac: `brew install postgresql`

2. **PostgreSQL эхлүүлэх:**
   ```bash
   # Mac
   brew services start postgresql
   
   # Windows
   # Services → PostgreSQL → Start
   ```

3. **Database үүсгэх:**
   ```bash
   psql postgres
   CREATE DATABASE soyol_shop;
   \q
   ```

4. **`.env` файлд нэмэх:**
   ```
   DATABASE_URL="postgresql://postgres:password@localhost:5432/soyol_shop"
   ```

## 🔑 Step 3: Environment Variables

`.env` файл үүсгэж дараах мэдээллийг оруулна:

```env
# Database
DATABASE_URL="your-database-url-here"

# NextAuth
NEXTAUTH_URL="http://localhost:3002"
NEXTAUTH_SECRET="your-super-secret-key-here"  # Generate: openssl rand -base64 32

# Google OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# For production
NEXT_PUBLIC_APP_URL="http://localhost:3002"
```

### NEXTAUTH_SECRET генератор:

**Terminal дээр:**
```bash
# Mac/Linux
openssl rand -base64 32

# Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

## 🔐 Step 4: Google OAuth Setup (Optional)

Хэрэв Google-ээр нэвтрэх хэрэгтэй бол:

1. **Google Cloud Console:**
   - https://console.cloud.google.com
   - New Project үүсгэх: "Soyol Video Shop"

2. **APIs & Services → Credentials:**
   - Create Credentials → OAuth 2.0 Client ID
   - Application type: Web application
   - Authorized redirect URIs:
     ```
     http://localhost:3002/api/auth/callback/google
     ```

3. **Client ID болон Secret авах:**
   - Copy хийж `.env` файлд оруулах

## 📝 Step 5: Prisma Schema Setup

`prisma/schema.prisma` файл автоматаар үүссэн байх ёстой. Хэрэв байхгүй бол:

```bash
npx prisma init
```

## ✅ Verification Checklist

Суулгалт амжилттай болсон эсэхийг шалгах:

```bash
# 1. Dependencies шалгах
npm list next-auth prisma @prisma/client

# 2. Prisma шалгах
npx prisma --version

# 3. Database холболт шалгах
npx prisma db push
```

## 🚀 Next Steps

Суулгалт дууссаны дараа:

1. ✅ Prisma Schema тодорхойлох
2. ✅ NextAuth API route үүсгэх
3. ✅ Login/Register pages үүсгэх
4. ✅ Profile page үүсгэх
5. ✅ Protected routes middleware

---

**Анхаар:** Би танд `.env` файлын жишээ болон бүх шаардлагатай кодуудыг дараагийн алхамд өгөх болно!

**⚠️ ЧУХАЛ:** `.env` файлыг `.gitignore`-д нэмээрэй (Git repository-д оруулахгүй байх)!
