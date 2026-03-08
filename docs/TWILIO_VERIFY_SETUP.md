# Twilio Verify Service – 1 алхам үлдсэн

Таны **Account SID** болон **Auth Token** аль хэдийн `.env` дээр тохируулагдсан.

Одоо зөвхөн **Verify Service** үүсгээд түүний SID-ийг нэмэх хэрэгтэй.

---

## 1. Verify Service үүсгэх

1. **Энд нээнэ:** https://console.twilio.com/us1/develop/verify/services  
2. **"Create new"** (эсвэл "+") товч дарна.  
3. **Friendly name** оруулна, жишээ нь: `Soyol OTP`  
4. **Create** дарна.  
5. Шинээр үүссэн service-ийн **SID**-ийг хуулна — эхлэл нь **`VA`** (жишээ: `VAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`).

---

## 2. .env файлд нэмэх

`.env` файл дээрээс энэ мөрийг олно:

```env
TWILIO_VERIFY_SERVICE_SID=""
```

Хуулсан SID-ийг энд тавина:

```env
TWILIO_VERIFY_SERVICE_SID="VAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

Файлыг хадгална.

---

## 3. Dev server дахин эхлүүлэх

```bash
# Ctrl+C дарж зогсооно, дараа нь:
npm run dev
```

Дараа нь **http://localhost:3000/login/phone** руу ороод утасны дугаараа оруулбал **бодит SMS** ирнэ.
