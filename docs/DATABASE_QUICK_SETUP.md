# 🗄️ Database Хурдан Тохиргоо

## ⚡ Хурдан Шийдэл: Neon.tech (5 минут)

### 1️⃣ Neon.tech бүртгүүлэх

```
🌐 Очих: https://neon.tech
📧 GitHub эсвэл Google-ээр нэвтрэх
```

---

### 2️⃣ Шинэ Project үүсгэх

1. **"Create Project"** товч дарах
2. **Project нэр:** `soyol-marketplace`
3. **Database нэр:** `soyol_db` (эсвэл ямар ч нэр)
4. **Region:** Хамгийн ойр сонгох (Europe/Asia)
5. **Create Project** дарах

---

### 3️⃣ Connection String авах

**Neon Dashboard дээр:**

```
📊 Dashboard → Your Project → Connection Details
```

**2 зүйл хуулах:**

1. **Connection String** (жишээ):
   ```
   postgresql://user:password@ep-cool-name-123456.us-east-2.aws.neon.tech/soyol_db?sslmode=require
   ```

2. **Direct URL** (ижил байх):
   ```
   postgresql://user:password@ep-cool-name-123456.us-east-2.aws.neon.tech/soyol_db?sslmode=require
   ```

---

### 4️⃣ `.env` файл засах

**Өөрийн connection string-ээ энд тавь:**

```env
# Database (Neon.tech-ээс авсан)
DATABASE_URL="postgresql://user:password@ep-cool-name.region.aws.neon.tech/soyol_db?sslmode=require"
DIRECT_URL="postgresql://user:password@ep-cool-name.region.aws.neon.tech/soyol_db?sslmode=require"
```

**⚠️ Анхаар:**
- Хоёулаа **ижил байна**
- `?sslmode=require` төгсгөлд байх ёстой
- Username, password, endpoint өөрчлөгдөнө

---

### 5️⃣ Database Schema үүсгэх

```bash
# Schema-г database руу push хийх
npx prisma db push

# Prisma Client generate хийх
npx prisma generate
```

**Амжилттай бол:**
```
✔ Your database is now in sync with your Prisma schema.
✔ Generated Prisma Client
```

---

### 6️⃣ Шалгах

```bash
# Development server эхлүүлэх
npm run dev
```

**Одоо бүх хуудсууд ажиллана:**
- ✅ `/store/[handle]` - Дэлгүүрийн хуудас
- ✅ `/category/[slug]` - Ангилал
- ✅ `/vendor/dashboard` - Vendor dashboard
- ✅ Бүх API endpoints

---

## 🎯 Seed Data нэмэх (Сонголттой)

Тест хийхийн тулд жишээ мэдээлэл нэмье:

### Vendor хэрэглэгч үүсгэх

**1. Бүртгүүлэх:**
```
http://localhost:3000/register
```

**2. Database дээр role өөрчлөх:**

**Option A: Prisma Studio (Visual):**
```bash
npx prisma studio
```
- `User` table руу ор
- Өөрийн user олох (email-ээр)
- `role` → `VENDOR` болго
- Save

**Option B: SQL (Command):**
```sql
-- Өөрийн email-ээ оруул
UPDATE "User" 
SET role = 'VENDOR' 
WHERE email = 'taniiemail@example.com';
```

### Store үүсгэх

**1. Vendor-ээр нэвтэр:**
```
http://localhost:3000/login
```

**2. Store үүсгэх API дуудах:**

**Option A: Prisma Studio:**
```bash
npx prisma studio
```

Шинэ Store үүсгэх:
```
handle: "tech-galaxy"
name: "Tech Galaxy Store"
description: "Best electronics store"
vendorId: [тэр vendor user-ийн ID]
status: "ACTIVE"
```

**Option B: Manual SQL:**
```sql
INSERT INTO "Store" (id, handle, name, description, "vendorId", status)
VALUES (
  'store-1',
  'tech-galaxy',
  'Tech Galaxy Store',
  'Best electronics and gadgets',
  'your-vendor-user-id-here',
  'ACTIVE'
);
```

### Category үүсгэх

```sql
INSERT INTO "Category" (id, slug, name, icon, description)
VALUES 
  ('cat-1', 'electronics', 'Электроникс', '📱', 'Гар утас, компьютер'),
  ('cat-2', 'fashion', 'Хувцас', '👔', 'Эрэгтэй, эмэгтэй хувцас'),
  ('cat-3', 'home', 'Гэр ахуй', '🏠', 'Гэрийн тавилга, хэрэгсэл');
```

### Product үүсгэх

```sql
INSERT INTO "Product" (
  id, name, slug, description, images, price, quantity,
  "storeId", "categoryId", "stockStatus", featured
)
VALUES (
  'prod-1',
  'iPhone 15 Pro Max',
  'iphone-15-pro-max',
  'Latest iPhone with titanium design',
  ARRAY['https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&q=75'],
  1499000,
  10,
  'store-1',
  'cat-1',
  'in-stock',
  true
);
```

---

## 🔍 Шалгах Командууд

### Database холбогдсон эсэхийг шалгах:
```bash
npx prisma db pull
```

### Tables-үүд үүссэн эсэхийг шалгах:
```bash
npx prisma studio
```

### Database мэдээлэл харах:
```bash
npx prisma db seed
```

---

## 🚨 Алдаа гарвал

### "Can't reach database server"
```bash
# .env файл дахин шалга
# Connection string зөв эсэхийг баталгаажуул
# Neon.tech дээр project идэвхтэй эсэхийг шалга
```

### "Environment variable not found"
```bash
# .env файл project-ийн root folder дээр байгаа эсэхийг шалга
# Dev server дахин эхлүүлэх
npm run dev
```

### "Table does not exist"
```bash
# Schema push хийгээгүй байна
npx prisma db push
npx prisma generate
```

---

## ✅ Амжилттай!

Одоо та:
- ✅ Database холбосон
- ✅ Tables үүсгэсэн
- ✅ Vendor хэрэглэгч бэлэн
- ✅ Store үүсгэж болно
- ✅ Бүх features ажиллана

---

## 📚 Дараагийн Алхам

1. **Store үүсгэх:** Prisma Studio ашиглан
2. **Products нэмэх:** `/vendor/dashboard` дээр
3. **Test хийх:** Барааны жагсаалт, хайлт, захиалга

**Амжилт хүсье! 🚀**
