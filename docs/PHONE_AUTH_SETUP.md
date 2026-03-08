# 📱 Утасны Дугаараар OTP Authentication Setup

**Огноо:** 2026-02-07  
**Technology:** Twilio Verify API + NextAuth  
**Статус:** ✅ Production Ready

---

## 🎯 Онцлогууд

### ✅ Хэрэгжсэн:
- 📱 **Утасны дугаараар бүртгэл & нэвтрэлт**
- 🔐 **Бодит SMS OTP** (Twilio Verify API)
- 🇲🇳 **Монголын дугаарын валидаци** (80-99 эхэлтэй, 8 оронтой)
- 🎨 **Premium UI/UX** (Tailwind CSS + Framer Motion)
- ⚡ **Twilio эсвэл Mock mode** (development-д хялбар)
- 🔄 **Дахин илгээх** функц
- ⏱️ **Real-time статус мэдэгдэл**

### Монголд ажиллах операторууд:
- ✅ Unitel (80, 85, 86, 88, 89)
- ✅ Mobicom (90, 91, 95, 96, 99)
- ✅ Skytel (94, 98)

---

## 🚀 SETUP ЗААВАР

### Алхам 1: Twilio Бүртгэл

1. **Twilio-д бүртгүүлэх:**
   ```
   https://www.twilio.com/try-twilio
   ```
   
2. **Үнэгүй кредит авах:** $15 (≈300 SMS)

3. **Account credentials авах:**
   - Console Dashboard руу орно
   - **Account SID** болон **Auth Token** хуулна

### Алхам 2: Verify Service Үүсгэх

1. **Twilio Console руу орно:**
   ```
   https://console.twilio.com/us1/develop/verify/services
   ```

2. **"Create new" дарна**

3. **Service нэр өгнө:** `Soyol Video Shop OTP`

4. **Settings тохируулна:**
   - ✅ **Code Length:** 6 digits
   - ✅ **Code Expiry:** 5 minutes
   - ✅ **Max Attempts:** 3

5. **Verify Service SID хуулна** (VA...)

### Алхам 3: Environment Variables Тохируулах

`.env` файлдаа дараах мөрүүдийг нэмнэ:

```bash
# Twilio SMS OTP
TWILIO_ACCOUNT_SID="AC...your-account-sid"
TWILIO_AUTH_TOKEN="your-auth-token-32-characters"
TWILIO_VERIFY_SERVICE_SID="VA...your-verify-service-sid"
```

### Алхам 4: Dependencies Шалгах

```bash
# Twilio SDK суусан эсэхийг шалгах
npm list twilio

# Хэрэв суугаагүй бол:
npm install twilio
```

### Алхам 5: Development Mode Тест

Twilio credentials **байхгүй** үед автоматаар **mock mode** ашиглагдана:

```typescript
// Mock OTP codes (development only):
- 123456 ✅ Амжилттай
- 000000 ✅ Амжилттай  
- Бусад ❌ Буруу
```

---

## 📱 ХЭРХЭН АШИГЛАХ

### Хэрэглэгчийн хувьд:

1. **Login хуудас руу орно:**
   ```
   http://localhost:3000/login/phone
   ```

2. **Утасны дугаар оруулна:**
   - 8 оронтой
   - 80-99 эхлэлтэй
   - Жишээ: `99887766`

3. **"Код илгээх" товч дарна**

4. **SMS хүлээх** (1-2 минут)

5. **6 оронтой кодыг оруулна**

6. **"Баталгаажуулах" дарна**

7. ✅ **Амжилттай нэвтэрнэ!**

---

## 🔧 ТЕХНИКИЙН ДЭЛГЭРЭНГҮЙ

### File Structure

```
lib/
  ├── twilio.ts              # Twilio helper functions
  └── auth.ts                # NextAuth configuration (updated)

app/
  ├── login/phone/
  │   └── page.tsx           # Phone OTP login UI
  └── api/auth/send-otp/
      └── route.ts           # OTP sending API
```

### Key Functions

#### 1. `sendPhoneOTP(phoneNumber)`
```typescript
// Илгээх
const result = await sendPhoneOTP('99887766');
// { success: true }
```

#### 2. `verifyPhoneOTP(phoneNumber, code)`
```typescript
// Баталгаажуулах
const result = await verifyPhoneOTP('99887766', '123456');
// { success: true }
```

#### 3. `isValidMongolianPhone(phoneNumber)`
```typescript
// Шалгах
const isValid = isValidMongolianPhone('99887766'); // true
const isValid = isValidMongolianPhone('12345678'); // false
```

### NextAuth Integration

`lib/auth.ts` файлд Credentials provider нэмэгдсэн:

```typescript
Credentials({
  id: 'phone-login',
  name: 'Phone Login',
  async authorize(credentials) {
    // 1. Verify OTP via Twilio
    const verification = await verifyPhoneOTP(
      credentials.phoneNumber,
      credentials.otp
    );
    
    // 2. Create or find user
    if (verification.success) {
      return user; // NextAuth session үүсгэнэ
    }
  }
})
```

---

## 💰 ЗАРДАЛ ТООЦОО

### Twilio Pricing:

| Service | Үнэ | Тайлбар |
|---------|-----|---------|
| SMS to Mongolia | **$0.05** | ~170₮ / 1 SMS |
| Verify API | Үнэгүй | Pricing нь SMS-д багтана |
| Free Trial | **$15** | ~300 SMS үнэгүй |

### Сарын зардал (жишээ):

```
1000 хэрэглэгч x 2 SMS (login + register) = 2000 SMS
2000 SMS x $0.05 = $100/сар (≈340,000₮)
```

### Зардлыг бууруулах:

1. **Login session-ийг урт хугацаагаар хадгалах** (30 хоног)
2. **Remember me** функц нэмэх
3. **SMS орлох:** Email OTP, Authenticator App

---

## 🛡️ АЮУЛГҮЙ БАЙДАЛ

### Хэрэгжсэн хамгаалалтууд:

1. ✅ **Rate Limiting** (Twilio автоматаар)
   - 1 дугаар руу 5 минутад зөвхөн 1 SMS

2. ✅ **Код хүчинтэй хугацаа**
   - 5 минутын дараа хүчингүй болно

3. ✅ **Max attempts**
   - 3 удаа буруу оруулбал блоклогдоно

4. ✅ **Mongolian validation**
   - Зөвхөн Монголын дугаар зөвшөөрөгдөнө

5. ✅ **Environment variables**
   - API keys код дотор hardcode-логдоогүй

---

## 🐛 TROUBLESHOOTING

### Асуудал 1: SMS ирэхгүй байна

**Шийдэл:**
```bash
1. Twilio Console > Phone Numbers шалгах
2. Geographic permissions - Mongolia зөвшөөрөгдсөн эсэх
3. Account status - Active эсэх
4. Logs > Messaging > Error шалгах
```

### Асуудал 2: "Code expired" алдаа

**Шийдэл:**
```bash
# Verify Service settings:
1. Code expiry: 5 minutes → 10 minutes болго
2. "Дахин илгээх" товч ашиглуул
```

### Асуудал 3: Development-д mock mode ажиллахгүй

**Шийдэл:**
```typescript
// lib/twilio.ts дээр шалгах:
if (!twilioClient || !verifyServiceSid) {
  console.log('Mock mode enabled');
  // 123456 эсвэл 000000 хүлээн авна
}
```

### Асуудал 4: "Invalid phone number" алдаа

**Шийдэл:**
```typescript
// Дугаар зөв формат эсэхийг шалга:
- ✅ 99887766 (8 оронтой)
- ❌ 976-9988-7766 (тэмдэгттэй)
- ❌ +97699887766 (prefix-тэй)
- ❌ 0999887766 (9 оронтой)
```

---

## 📊 LOGS & MONITORING

### Twilio Console-с logs харах:

1. **Monitor > Logs > Verify**
2. **Filters:**
   - Service SID: [таны service]
   - Status: All
   - Date range: Today

3. **Харах зүйлс:**
   - Sent: Амжилттай илгээгдсэн
   - Delivered: Хүлээн авсан
   - Failed: Алдаа гарсан
   - Verified: Амжилттай баталгаажсан

### Application logs:

```typescript
// lib/twilio.ts дээр console.log:
console.log('OTP sent successfully:', verification.status);
console.log('OTP verification:', verificationCheck.status);
```

---

## 🚀 PRODUCTION DEPLOY

### Vercel-д deploy хийхдээ:

1. **Environment Variables нэмнэ:**
   ```
   Vercel Dashboard > Settings > Environment Variables

   Name: TWILIO_ACCOUNT_SID
   Value: AC...
   Environment: Production, Preview

   Name: TWILIO_AUTH_TOKEN
   Value: ***
   Environment: Production, Preview

   Name: TWILIO_VERIFY_SERVICE_SID
   Value: VA...
   Environment: Production, Preview
   ```

2. **Redeploy хийнэ:**
   ```bash
   vercel --prod
   ```

3. **Тест хийнэ:**
   - Production URL дээр login хуудас нээх
   - Утасны дугаар оруулах
   - SMS ирэх эсэхийг шалгах

---

## 📈 FEATURE ROADMAP

### Одоо хэрэгжсэн:
- [x] Phone OTP Login
- [x] Phone OTP Register
- [x] Mongolian validation
- [x] Mock mode for development
- [x] Resend OTP
- [x] Premium UI

### Ирээдүйд нэмэх:
- [ ] Remember me (session extended)
- [ ] WhatsApp OTP (Twilio supports)
- [ ] Voice call OTP
- [ ] Email as backup
- [ ] 2FA with authenticator app
- [ ] Admin dashboard (OTP usage stats)

---

## 💡 SANAA ЗӨВЛӨМЖ

### Хэрэглэгчийн туршлагыг сайжруулах:

1. **Автоматаар код бөглөх** (SMS detection)
   ```typescript
   // Browser-ийн WebOTP API ашиглах
   if ('OTPCredential' in window) {
     // Auto-fill OTP from SMS
   }
   ```

2. **Countdown timer**
   ```typescript
   // "Дахин илгээх" товчийг 60 секундын дараа идэвхжүүлэх
   const [countdown, setCountdown] = useState(60);
   ```

3. **Social login нэмэх**
   ```typescript
   // Google, Facebook options
   // Утасны дугаартай холбох
   ```

---

## 📞 ТУСЛАМЖ

### Twilio Support:
- Documentation: https://www.twilio.com/docs/verify/api
- Support: https://support.twilio.com
- Community: https://www.twilio.com/community

### Video tutorials:
- Twilio Verify Quickstart: https://www.twilio.com/docs/verify/quickstarts
- SMS best practices: https://www.twilio.com/docs/sms/best-practices

---

## ✅ CHECKLIST

### Setup:
- [ ] Twilio account үүсгэсэн
- [ ] Verify service үүсгэсэн
- [ ] Environment variables тохируулсан
- [ ] Dependencies суулгасан
- [ ] Local дээр тест хийсэн

### Production:
- [ ] Vercel-д environment variables нэмсэн
- [ ] Production SMS тест хийсэн
- [ ] Logs ажиллаж байгааг шалгасан
- [ ] Error handling шалгасан
- [ ] Rate limiting тест хийсэн

---

**Амжилт хүсье!** 🚀📱

Хэрэв асуудал гарвал, энэ гарын авлагын Troubleshooting хэсгийг уншаарай эсвэл Twilio support-руу хандаарай.

---

**Бичсэн:** AI Assistant  
**Огноо:** 2026-02-07  
**Version:** 1.0
