# 🎯 Нүүр Хуудасны Filter Tabs

## 📋 Тойм

Нүүр хуудсанд "Бүгд" / "Бэлэн" / "Захиалгаар" гэсэн filter tabs нэмсэн. Эхэндээ бүх бараа харагдана, filter tabs-ыг дараад холбогдох бараануудыг харна.

---

## ✨ Шинэ боломжууд

### 🔘 Filter Tabs
- **Бүгд** - Бүх бараа харагдана (default)
- **Бэлэн** - Агуулахад бэлэн бараанууд (`stockStatus: 'in-stock'`)
- **Захиалгаар** - Захиалгаар ирэх бараанууд (`stockStatus: 'pre-order'`)

### 🎨 UI Design
- Active tab: Orange gradient + shadow
- Inactive tab: Gray background
- Hover animation: Scale 1.05
- Tap animation: Scale 0.95
- Badge: Тоо ширхэг харуулна

### 📊 Бараа тоо ширхэг
```typescript
const readyCount = allProducts.filter(p => p.stockStatus === 'in-stock').length;
const preOrderCount = allProducts.filter(p => p.stockStatus === 'pre-order').length;
```

### 💡 Delivery Note
"Захиалгаар" tab сонгоход:
```
"Хүргэгдэх хугацаа: 7-14 хоног"
```

---

## 🔧 Техникийн дэлгэрэнгүй

### State Management
```typescript
type FilterType = 'all' | 'ready' | 'preorder';
const [activeFilter, setActiveFilter] = useState<FilterType>('all');
```

### Product Filtering
```typescript
const filteredProducts = activeFilter === 'all' 
  ? allProducts 
  : activeFilter === 'ready'
  ? allProducts.filter(p => p.stockStatus === 'in-stock')
  : allProducts.filter(p => p.stockStatus === 'pre-order');
```

### Tab Component
```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => setActiveFilter('all')}
  className={`px-6 py-3 rounded-xl font-bold ${
    activeFilter === 'all'
      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
  }`}
>
  <div className="flex items-center gap-2">
    <Sparkles className="w-4 h-4" />
    <span>Бүгд</span>
    <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
      {allProducts.length}
    </span>
  </div>
</motion.button>
```

### Grid Animation
```tsx
<motion.div
  key={activeFilter}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  <PremiumProductGrid products={filteredProducts} />
</motion.div>
```

---

## 🎯 User Experience

### 1️⃣ Default View
- Хуудас нээгдэхэд "Бүгд" tab active байна
- Бүх бараа харагдана

### 2️⃣ Filter Selection
- Tab дарахад холбогдох бараа шүүгдэнэ
- Smooth fade-in animation
- Тоо ширхэг шинэчлэгдэнэ

### 3️⃣ Empty State
- Бараа байхгүй үед icon + мэдээлэл гарна
- Filter-д тохирсон icon харагдана (Sparkles / Package / Clock)

### 4️⃣ Pre-order Note
- "Захиалгаар" tab сонгоход автоматаар delivery note гарна
- Fade-in animation-тай

---

## 📱 Responsive Design

### Desktop
```
[Бүгд (50)]  [Бэлэн (30)]  [Захиалгаар (20)]
```

### Mobile
```
[Бүгд]
[Бэлэн]
[Захиалгаар]
```
- `flex-wrap` ашиглан tabs wrap хийнэ

---

## 🎨 Styling Details

### Active Tab Colors
- **Бүгд & Бэлэн**: `from-orange-500 to-orange-600`
- **Захиалгаар**: `from-gray-600 to-gray-700`

### Badge Styling
```css
background: white/20
border-radius: full
font-size: xs
padding: 0.5 2
```

### Animations
- Tab hover: Scale 1.05
- Tab tap: Scale 0.95
- Grid transition: Opacity + Y movement
- Delivery note: Fade-in from top

---

## 🚀 Quick Test

1. Open: `http://localhost:3000`
2. Default: "Бүгд" tab active, бүх бараа
3. Click "Бэлэн": Зөвхөн бэлэн бараа
4. Click "Захиалгаар": Зөвхөн pre-order + delivery note
5. Verify: Smooth animations, correct counts

---

## 📝 Files Modified

- `app/page.tsx` - Filter tabs + state management
- Added Framer Motion animations
- Dynamic product filtering

---

## ✅ Benefits

1. **Better UX**: Хэрэглэгч хүссэн бараагаа хялбар шүүнэ
2. **Clear Info**: Тоо ширхэг харагдана
3. **Smooth**: Animation-ууд premium харагдана
4. **Flexible**: Эхэндээ бүгд харагдана, дараа нь filter хийнэ

---

## 🎉 Summary

Нүүр хуудас одоо:
- ✅ Filter tabs (Бүгд / Бэлэн / Захиалгаар)
- ✅ Default: Бүх бараа
- ✅ Тоо ширхэг badge
- ✅ Delivery note (pre-order)
- ✅ Premium animations
- ✅ Responsive design

**Эхэндээ бүх бараа харагдана, filter tabs-ыг ашиглан шүүнэ!** 🎯
