# 🚀 Commands to Connect Supabase

## Step-by-Step Commands

Run these commands in order after filling in your `.env.local` file:

### 1. Generate Prisma Client
```bash
npx prisma generate
```
This creates the Prisma client based on your schema.

### 2. Push Schema to Supabase
```bash
npx prisma db push
```
This creates the `Product` table in your Supabase database.

### 3. Seed Database with Sample Products
```bash
npm run db:seed
```
This populates your database with 16 sample products (8 in-stock, 8 pre-order).

### 4. Start Development Server
```bash
npm run dev
```
Your app will run at http://localhost:3000

## ✅ Success Checklist

After running these commands, verify:

- [ ] Prisma Client generated (no errors)
- [ ] Product table created in Supabase
- [ ] Sample products added (16 products)
- [ ] App loads without errors
- [ ] Products display on homepage

## 🔍 Verification Commands

### View Database in GUI
```bash
npx prisma studio
```
Opens at http://localhost:5555

### Check Database Connection
```bash
npx prisma db execute --stdin --schema prisma/schema.prisma
```
Then type: `SELECT COUNT(*) FROM "Product";` and press Ctrl+D

## 📊 Useful Development Commands

### View All Products
```bash
npx prisma studio
```

### Reset Database (⚠️ Deletes all data)
```bash
npx prisma db push --force-reset
npm run db:seed
```

### Update Schema
After changing `prisma/schema.prisma`:
```bash
npx prisma generate
npx prisma db push
```

## 🐛 Troubleshooting Commands

### Clear Prisma Cache
```bash
rmdir /s /q node_modules\.prisma
npx prisma generate
```

### Check Environment Variables
```bash
echo %NEXT_PUBLIC_SUPABASE_URL%
```

### Restart Everything
```bash
# Stop dev server (Ctrl+C)
# Then:
npx prisma generate
npm run dev
```

## 📝 Quick Reference

| Command | Purpose |
|---------|---------|
| `npx prisma generate` | Generate Prisma Client |
| `npx prisma db push` | Sync schema to database |
| `npx prisma studio` | Open database GUI |
| `npm run db:seed` | Populate with sample data |
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |

## 🎯 Complete Fresh Setup

If you need to start from scratch:

```bash
# 1. Clear everything
npx prisma db push --force-reset

# 2. Regenerate
npx prisma generate

# 3. Push schema
npx prisma db push

# 4. Seed data
npm run db:seed

# 5. Start dev
npm run dev
```

## 🔗 Your Setup

- **Database**: Supabase PostgreSQL
- **ORM**: Prisma
- **Framework**: Next.js 15
- **Table**: Product
- **Sample Data**: 16 products

## Next Steps After Setup

1. ✅ Verify products show on homepage
2. 📝 Add more products via Prisma Studio
3. 🎨 Customize product display
4. 🔍 Add search functionality
5. 🛒 Add cart functionality
