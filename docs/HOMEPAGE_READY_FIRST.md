# 🎯 "Бүгд" хэсэгт бэлэн бараа түрүүлэх

## 📋 Тойм

"Бүгд" filter дээр бараануудыг дараах дарааллаар харуулна:
1. **Бэлэн бараанууд** (эхэнд)
2. **Захиалгаар ирэх бараанууд** (дараа нь)

---

## ✨ Логик

### Product Sorting
```typescript
// Separate products by stock status
const readyProducts = allProducts.filter(p => p.stockStatus === 'in-stock');
const preOrderProducts = allProducts.filter(p => p.stockStatus === 'pre-order');

// Filter products based on active filter
// For "all", show ready products first, then pre-order
const filteredProducts = activeFilter === 'all' 
  ? [...readyProducts, ...preOrderProducts]  // ✅ Бэлэн эхэнд!
  : activeFilter === 'ready'
  ? readyProducts
  : preOrderProducts;
```

---

## 🎯 User Experience

### 1️⃣ "Бүгд" Tab
- Эхлээд: **БЭЛЭН** badge-тэй бараанууд
- Дараа нь: **ЗАХИАЛГААР** badge-тэй бараанууд
- Хэрэглэгч шууд авах боломжтой бараагаа эхэнд харна

### 2️⃣ "Бэлэн" Tab
- Зөвхөн бэлэн бараанууд харагдана

### 3️⃣ "Захиалгаар" Tab
- Зөвхөн захиалгаар ирэх бараанууд харагдана
- Delivery note: "(7-14 хоног)"

---

## 📊 Давуу тал

1. **Better UX**: Хэрэглэгч шууд худалдан авах боломжтой бараагаа эхэнд харна
2. **Clear Priority**: Бэлэн бараа илүү анхаарал татна
3. **Logical Order**: Бараа шууд авах → захиалгаар авах гэсэн дарааллаар
4. **Maintains Filters**: Бусад filter-үүд ердийнхөөрөө ажиллана

---

## 🎨 Visual Flow

```
[Бүгд Tab Сонгох]
    ↓
┌──────────────────────┐
│ 🟠 БЭЛЭН бараа 1     │
│ 🟠 БЭЛЭН бараа 2     │
│ 🟠 БЭЛЭН бараа 3     │
├──────────────────────┤
│ ⚫ ЗАХИАЛГААР бараа 1 │
│ ⚫ ЗАХИАЛГААР бараа 2 │
└──────────────────────┘
```

---

## 🔧 Technical Details

### Array Spread Operator
```typescript
[...readyProducts, ...preOrderProducts]
```
- Бэлэн бараа array-г эхэнд
- Захиалгаар бараа array-г дараа нь
- Нэг array болгон нийлүүлнэ

### No Re-rendering Issues
- Filter өөрчлөгдөх бүрт шинэчлэгдэнэ
- Smooth animation хадгалагдана
- Performance issue байхгүй

---

## ✅ Testing

1. Нээх: `http://localhost:3000`
2. Default: "Бүгд" tab active
3. Шалгах: Бэлэн бараа эхэнд байгаа эсэх
4. "Бэлэн" tab: Зөвхөн бэлэн
5. "Захиалгаар" tab: Зөвхөн захиалгаар
6. "Бүгд" tab: Бэлэн → Захиалгаар дараалал

---

## 🎉 Summary

"Бүгд" хэсэгт одоо:
- ✅ Бэлэн бараа эхэнд
- ✅ Захиалгаар бараа дараа нь
- ✅ Логик дараалал
- ✅ Better UX
- ✅ All animations work

**Хэрэглэгч шууд авах боломжтой бараагаа эхэнд харна!** 🎯
