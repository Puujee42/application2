# 🗄️ Supabase Database Холболтын Заавар

## ⚠️ Одоогийн байдал

Дата баазын бүх код бэлэн боллоо, гэхдээ Supabase database руу холбогдох боломжгүй байна.

Алдаа: `Can't reach database server at db.xmsujinbygcvreuawhsy.supabase.co:5432`

---

## 🔧 Шийдэх арга

### 1️⃣ Supabase Dashboard дээр очих

1. [Supabase Dashboard](https://supabase.com/dashboard) руу нэвтэрнэ үү
2. Өөрийн project **xmsujinbygcvreuawhsy** сонгоно уу

### 2️⃣ Database асаалттай эсэхийг шалгах

1. **Settings** → **Database** хэсэгт очно уу
2. Хэрэв database **"Paused"** байвал:
   - **"Resume"** товч дарна уу
   - 2-3 минут хүлээнэ үү
   - Database асах хүртэл хүлээнэ үү

### 3️⃣ Зөв Connection String авах

Database Settings дээр **Connection Pooling** хэсгийг хайна уу:

#### Option A: Session Mode (Recommended for Prisma)
```
postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres
```

#### Option B: Transaction Mode  
```
postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:6543/postgres
```

**⚠️ Анхаар:**
- `[PROJECT_REF]` = xmsujinbygcvreuawhsy
- `[PASSWORD]` = Kaneki8838.
- `[REGION]` = таны database-ийн region (жишээ: ap-southeast-1)

### 4️⃣ .env файл засах

Dashboard-аас авсан зөв connection string-ээ `.env` файл дотор:

```env
DATABASE_URL="postgresql://postgres.xmsujinbygcvreuawhsy:Kaneki8838.@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"
```

**Эсвэл** хэрэв Dashboard дээр өөр format харагдвал яг тэр format-ийг copy-paste хийнэ үү!

### 5️⃣ Database setup ажиллуулах

`.env` файлаа засаад дараах командыг ажиллуулна уу:

#### Windows:
```bash
setup-database.bat
```

#### Эсвэл дараалалтай:
```bash
npx prisma db push
npx prisma generate  
npm run db:seed
```

### 6️⃣ Development server асаах

```bash
npm run dev
```

Сайт http://localhost:3000 дээр асна, бараанууд database-аас унших болно! 🎉

---

## 📋 Юу хийгдсэн байгаа вэ?

### ✅ Бэлэн болсон зүйлс:

1. **Prisma Schema** (`prisma/schema.prisma`)
   - Product, Category, Order хүснэгтүүд
   
2. **API Routes** (`app/api/`)
   - `/api/products` - Бараа унших
   - `/api/categories` - Ангилал унших
   
3. **Seed Script** (`prisma/seed.ts`)
   - 16 бараа
   - 4 ангилал + subcategories
   - Автоматаар оруулдаг

4. **Frontend Update**
   - ProductGrid одоо API-аас уншдаг
   - useProducts hook шинэчлэгдсэн

### 🔄 Database холбогдсон даруй ажиллах болно!

---

## 🆘 Асуудал гарвал

### Connection string хаанаас олох вэ?

1. Supabase Dashboard → Project Settings
2. Database хэсэг
3. "Connection string" дээр дарна
4. **"Session mode"** эсвэл **"Transaction mode"** сонгоно
5. Copy хийх

### Password шинэчлэх

Хэрэв password мартсан бол:
1. Settings → Database → Database Settings
2. "Reset Database Password" дарна
3. Шинэ password авна
4. `.env` файлд шинэчилнэ үү

### Region яаж олох вэ?

Dashboard → Settings → General → Region харна уу
Жишээ: Southeast Asia (Singapore) = ap-southeast-1

---

## 📞 Тусламж

Хэрэв алдаа гарсаар байвал, дараах мэдээллийг надад өгнө үү:

1. `.env` дотор DATABASE_URL (password-ийг битгий өгнөөрэй!)
2. `npx prisma db push` ажиллуулахад гарсан алдааны текст
3. Supabase Dashboard дээр database status (Active/Paused)

Амжилт хүсье! 🚀
