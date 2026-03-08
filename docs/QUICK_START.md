# Quick Start: Connect Supabase to Next.js

## ✅ What's Already Done

1. ✅ Dependencies installed (`@supabase/supabase-js`, `prisma`)
2. ✅ `.env.local` file created with placeholders
3. ✅ `prisma/schema.prisma` created with Product model
4. ✅ `lib/supabase.ts` Supabase client configured
5. ✅ `app/page.tsx` updated to fetch from database

## 📝 What You Need to Do

### 1. Get Your Supabase Credentials

Go to your Supabase project dashboard:

**For API Keys:**
- Go to **Project Settings** (gear icon) > **API**
- Copy **Project URL** → Use for `NEXT_PUBLIC_SUPABASE_URL`
- Copy **anon public key** → Use for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**For Database URL:**
- Go to **Project Settings** > **Database** > **Connection String**
- Select **URI** tab
- Change mode to **Session**
- Copy the connection string
- Replace `[YOUR-PASSWORD]` with your database password
- This is your `DATABASE_URL`

Example:
```
postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres
```

### 2. Update .env.local File

Open `.env.local` and fill in your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
DATABASE_URL=postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres
```

### 3. Push Schema to Supabase (Create the Products Table)

Run these commands in your terminal:

```bash
# Generate Prisma Client
npx prisma generate

# Push the schema to Supabase (creates the Product table)
npx prisma db push
```

When prompted "Are you sure you want to continue?", type `yes` and press Enter.

### 4. Verify in Supabase

1. Go to your Supabase dashboard
2. Click **Table Editor** in the sidebar
3. You should see a new **Product** table with these columns:
   - id (Text, Primary Key)
   - name (Text)
   - description (Text)
   - price (Float)
   - image (Text)
   - category (Text)
   - stockStatus (Text)
   - createdAt (Timestamp)
   - updatedAt (Timestamp)

### 5. Add Sample Products (Optional)

You can add products directly in Supabase:

1. Go to **Table Editor** > **Product**
2. Click **Insert row**
3. Add a product:
   ```
   name: iPhone 15 Pro
   description: Latest iPhone model
   price: 1299.99
   image: https://images.unsplash.com/photo-1546054454-aa26e2b734c7
   category: tech
   stockStatus: in-stock
   ```

Or use Prisma Studio:
```bash
npx prisma studio
```

### 6. Run Your App

```bash
npm run dev
```

Visit `http://localhost:3000` - Your products from Supabase will now appear!

## 🎯 Your Product Schema

```prisma
model Product {
  id          String   @id @default(cuid())
  name        String
  description String?
  price       Float
  image       String?
  category    String
  stockStatus String   @default("in-stock")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## 🔧 Useful Commands

```bash
# View your database in a GUI
npx prisma studio

# Reset your database (⚠️ deletes all data)
npx prisma db push --force-reset

# Generate Prisma Client after schema changes
npx prisma generate
```

## 📚 Next Steps

- Add more products via Supabase Table Editor or Prisma Studio
- Create an admin page to manage products
- Add product filtering by category
- Implement search functionality

## 🆘 Troubleshooting

**Error: "Invalid `prisma.product.findMany()`"**
- Make sure you ran `npx prisma generate`
- Make sure you ran `npx prisma db push`
- Restart your dev server

**Error: "Can't reach database server"**
- Check your `DATABASE_URL` in `.env.local`
- Make sure you replaced `[YOUR-PASSWORD]`
- Verify your internet connection

**Products not showing:**
- Make sure you have products in your database
- Check the console for errors
- Verify `stockStatus` values match ('in-stock', 'pre-order')

## 📞 Need Help?

- [Prisma Docs](https://www.prisma.io/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
