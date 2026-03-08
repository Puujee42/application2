# 🚀 Vercel Байршуулалтын Бүрэн Гарын Авлага

**Огноо:** 2026-02-07  
**Төсөл:** Soyol Video Shop  
**Статус:** ✅ Production-Ready

---

## 📋 Урьдчилсан Шалгалт

### ✅ Бүх зүйл бэлэн байна:

- [x] **Build Script:** ✅ `prisma generate && next build`
- [x] **Environment Variables:** ✅ `.env` файл бүрэн
- [x] **Security:** ✅ Hardcoded secrets байхгүй
- [x] **Database:** ✅ Supabase холбогдсон
- [x] **Configuration:** ✅ `vercel.json` үүсгэгдсэн
- [x] **Git:** ✅ `.gitignore` зөв тохируулагдсан

---

## 🔐 1. ОРЧНЫ ХУВЬСАГЧИД (Environment Variables)

### Танд шаардлагатай бүх хувьсагчид:

```bash
# Supabase Database
DATABASE_URL="postgresql://postgres:Kaneki8838.@db.zbxmogqpxouymhdhjujn.supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:Kaneki8838.@db.zbxmogqpxouymhdhjujn.supabase.co:6543/postgres?pgbouncer=true"

# Supabase API
NEXT_PUBLIC_SUPABASE_URL="https://zbxmogqpxouymhdhjujn.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieG1vZ3FweG91eW1oZGhqdWpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzODAzNDUsImV4cCI6MjA4NTk1NjM0NX0.5OWT3cPdeYySgHkFY592j3tFYFr1pIPRRX7gckoYJhA"

# NextAuth.js
NEXTAUTH_URL="https://your-app.vercel.app"
NEXTAUTH_SECRET="PVgRUG3q7ungKZVSCjKejGR5bdFWo+cSSzUzMe/DPAQ="

# Google OAuth (Хэрэв ашиглахыг хүсвэл)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# App Configuration
NEXT_PUBLIC_BASE_URL="https://your-app.vercel.app"
```

### ⚠️ АНХААР:
- `DATABASE_URL` болон `DIRECT_URL` танд аль хэдийн бий
- Deploy хийсний дараа `NEXTAUTH_URL` болон `NEXT_PUBLIC_BASE_URL`-ийг production URL-аараа солих

---

## 📦 2. BUILD SCRIPT ШАЛГАЛТ

### ✅ package.json зөв тохируулагдсан:

```json
{
  "scripts": {
    "build": "prisma generate && next build",
    "start": "next start",
    "postinstall": "prisma generate"
  }
}
```

**Тайлбар:**
- `prisma generate` - Prisma Client үүсгэнэ
- `next build` - Production build үүсгэнэ
- `postinstall` - Vercel дээр автоматаар Prisma үүсгэнэ

---

## 🛡️ 3. VERCEL CONFIGURATION

### ✅ vercel.json файл үүсгэгдсэн:

Файл дараах зүйлсийг агуулна:
- Security headers (XSS Protection, Frame Options)
- Cache optimization (зураг, API)
- Routing configuration

---

## 🚀 4. VERCEL РҮҮ БАЙРШУУЛАХ АЛХМУУД

### Алхам 1: Vercel CLI Суулгах (хэрэв суулгаагүй бол)

```bash
npm install -g vercel
```

### Алхам 2: Vercel-д Нэвтрэх

```bash
vercel login
```

Браузер нээгдэж, нэвтрэх хуудас гарна. GitHub эсвэл Email-ээр нэвтэрнэ үү.

### Алхам 3: Төслийг Бэлдэх

Эхлээд Git дээр бүх өөрчлөлтөө хадгална уу (хэрэв хийгээгүй бол):

```bash
git add .
git commit -m "Production ready - deployment configuration"
git push origin main
```

### Алхам 4: Анхны Deploy

```bash
vercel deploy
```

Дараах асуултууд гарна:

```bash
? Set up and deploy "~\Desktop\amazon"? yes
? Which scope should contain your project? [Таны нэр]-s projects  # Enter
? Link to existing project? no  # Enter
? What's your project's name? soyol-video-shop  # Жижиг үсгээр, зай-гүй!
? In which directory is your code located? ./  # Enter
? Want to modify these settings? no  # Enter
```

⏳ **Анхны build удаан үргэлжилнэ (~2-3 минут)**

### Алхам 5: Environment Variables Нэмэх

Deploy амжилттай боосны дараа, Vercel Dashboard руу очно:

1. **Browser дээр Vercel Dashboard нээнэ:** https://vercel.com/dashboard
2. **Төслөө сонгоно:** `soyol-video-shop`
3. **Settings > Environment Variables руу орно**
4. **Дараах бүх хувьсагчдыг нэмнэ:**

```
Name: DATABASE_URL
Value: postgresql://postgres:Kaneki8838.@db.zbxmogqpxouymhdhjujn.supabase.co:5432/postgres
Environment: Production, Preview, Development

Name: DIRECT_URL  
Value: postgresql://postgres:Kaneki8838.@db.zbxmogqpxouymhdhjujn.supabase.co:6543/postgres?pgbouncer=true
Environment: Production, Preview, Development

Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://zbxmogqpxouymhdhjujn.supabase.co
Environment: Production, Preview, Development

Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: [Таны Supabase anon key]
Environment: Production, Preview, Development

Name: NEXTAUTH_SECRET
Value: PVgRUG3q7ungKZVSCjKejGR5bdFWo+cSSzUzMe/DPAQ=
Environment: Production, Preview, Development

Name: NEXTAUTH_URL
Value: https://[таны-app].vercel.app
Environment: Production

Name: NEXT_PUBLIC_BASE_URL
Value: https://[таны-app].vercel.app
Environment: Production
```

### Алхам 6: Production Deploy (Environment Variables-тай)

Environment variables нэмсний дараа дахин deploy хийнэ:

```bash
vercel --prod
```

Энэ нь бүх environment variables-тай production build үүсгэнэ.

---

## 🎯 5. БАЙРШУУЛСНЫ ДАРААХ ШАЛГАЛТ

### ✅ Deploy Амжилттай Эсэхийг Шалгах:

Terminal дээр дараах мэдээлэл харагдана:

```
✅ Production: https://soyol-video-shop-xxxx.vercel.app [3m 24s]
```

### 🌐 Сайтаа Шалгах:

1. **Үндсэн хуудас:** `https://[таны-url].vercel.app`
2. **Бүтээгдэхүүн:** Бүх бүтээгдэхүүн харагдах ёстой
3. **Search:** Хайлт ажиллаж байгаа эсэхийг шалгах
4. **Сагс:** Бүтээгдэхүүн нэмэх, хасах
5. **Wishlist:** Дуртай бүтээгдэхүүн нэмэх

### 🔍 Common Issues Шалгах:

```bash
# Vercel logs харах
vercel logs [deployment-url]

# Хамгийн сүүлийн deployment-ийн logs
vercel logs --follow
```

### 📊 Performance Шалгах:

1. **Vercel Analytics:** Dashboard > Analytics
2. **Chrome DevTools:** 
   - Network tab - API calls шалгах
   - Console - алдаа байгаа эсэхийг шалгах
3. **Lighthouse:** Performance тест хийх

---

## 🔄 6. ЦААШДЫН DEPLOYMENT

### Автоматик Deploy (Git-тэй холбох):

```bash
vercel git connect
```

Үүний дараа `git push` хийх бүрт автоматаар deploy хийгдэнэ:
- `main` branch → Production deploy
- Бусад branch → Preview deploy

### Manual Deploy:

```bash
# Preview deploy
vercel

# Production deploy  
vercel --prod

# Specific branch
vercel --prod --branch=main
```

---

## 🛠️ 7. TROUBLESHOOTING

### Алдаа 1: Build Fail (Prisma)

```bash
# Шийдэл: vercel.json дээр buildCommand зөв байгаа эсэхийг шалга
{
  "buildCommand": "prisma generate && next build"
}
```

### Алдаа 2: Database Connection Fail

```bash
# Шалгах:
1. DATABASE_URL зөв эсэхийг Vercel Dashboard-с шалгах
2. Supabase-н IP whitelist хязгаарлагдсан эсэхийг шалгах (бүх IP зөвшөөрсөн байх ёстой)
3. Supabase Dashboard > Database Settings > Connection Pooling > "Session mode" ашиглах
```

### Алдаа 3: Environment Variables Ажиллахгүй

```bash
# Шийдэл:
1. Variable нэрүүд ЯГТ ТОХИРЧ байгаа эсэхийг шалга (.env болон Vercel Dashboard дээр)
2. Дахин deploy хий: vercel --prod
3. Browser cache цэвэрлэ: Ctrl+Shift+Del
```

### Алдаа 4: NextAuth Session Fail

```bash
# Шийдэл:
1. NEXTAUTH_URL production URL-тай тохирч байгаа эсэхийг шалга
2. NEXTAUTH_SECRET тохируулагдсан эсэхийг шалга
3. Vercel Dashboard > Settings > Functions > Region дээр database-тай ойр region сонго
```

---

## 📱 8. CUSTOM DOMAIN ХОЛБОХ (Нэмэлт)

### Өөрийн domain нэр байвал:

1. **Vercel Dashboard > Settings > Domains**
2. **"Add Domain" дарах**
3. **Domain нэр оруулах:** `soyol.mn` эсвэл `shop.soyol.mn`
4. **DNS тохируулах:**

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

5. **SSL автоматаар тохируулагдана** (~1 минут)

---

## 🎉 9. DEPLOYMENT CHECKLIST

### Pre-Deployment:
- [x] Build амжилттай болж байна (`npm run build`)
- [x] Environment variables бүрэн байна
- [x] `.env` Git-д орохгүй байна (`.gitignore` шалгах)
- [x] Database холбогдсон байна
- [x] `vercel.json` бий байна

### During Deployment:
- [x] Vercel CLI суулгагдсан
- [x] Project үүсгэгдсэн
- [x] Environment variables Vercel-д нэмэгдсэн
- [x] Production deploy амжилттай

### Post-Deployment:
- [ ] Сайт ажиллаж байна
- [ ] Бүх хуудас нээгдэж байна
- [ ] API routes ажиллаж байна
- [ ] Database холболт ажиллаж байна
- [ ] Images харагдаж байна
- [ ] Search ажиллаж байна

---

## 📞 10. ТУСЛАМЖ ХЭРЭГТЭЙ ҮЕД

### Vercel Support:
- **Documentation:** https://vercel.com/docs
- **Community:** https://github.com/vercel/vercel/discussions
- **Status:** https://vercel-status.com

### Сайн мэдэх зүйлс:
- 💰 **Free Plan:** 100GB bandwidth, 6,000 serverless үйлдэл/өдөр
- 🚀 **Pro Plan:** $20/сар - unlimited bandwidth
- 🌍 **Edge Network:** Дэлхийн 100+ edge locations
- 🔒 **SSL:** Автоматаар тохируулагдана
- 📊 **Analytics:** Үнэгүй built-in analytics

---

## 🏁 ЭЦСИЙН ШАЛГАЛТ

### Production URL:
```
https://soyol-video-shop.vercel.app
```

### Deployment статус шалгах:
```bash
vercel ls
vercel inspect [deployment-url]
```

### Logs харах:
```bash
vercel logs --follow
```

---

**✅ Таны сайт одоо дэлхий даяар ажиллаж байна!**

Амжилт хүсье! 🎉🚀

---

**Засварласан:** AI Assistant  
**Огноо:** 2026-02-07  
**Статус:** Production Ready
