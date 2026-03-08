# 🎮 User Interaction Guide

## How to Experience the New Design

---

## 1. 🧭 **Modern Navbar**

### Search Bar:
1. **Click** the search bar
2. **Watch**: 
   - Bar scales up (1.02x)
   - Blue border appears
   - Blue glow effect (backdrop blur)
3. **Type** your search query
4. **Click outside** to see it return to gray

### Cart Icon:
1. **Hover** over the cart icon
2. **Watch**:
   - Icon scales (1.1x)
   - Color changes to blue
   - Badge pulses
3. **Click** to view cart

### Wishlist Icon:
1. **Hover** over the heart icon
2. **Watch**:
   - Icon scales (1.1x)
   - Rotates 5 degrees
   - Color changes to red
3. **Click** to view wishlist

### Scroll Behavior:
1. **Scroll down** the page (20px+)
2. **Watch**:
   - Navbar becomes opaque white
   - Shadow appears
   - Border at bottom

---

## 2. 🎬 **Hero Slider**

### Auto-play:
1. **Wait 5 seconds**
2. **Watch**: 
   - Current slide fades out (scale: 0.95)
   - Next slide fades in (scale: 1.1 → 1)
   - Text animates with stagger effect

### Manual Navigation:
1. **Click** left/right arrows
2. **Watch**:
   - Arrow scales (1.1x)
   - Slide transitions smoothly

### Indicators:
1. **Click** any dot at bottom
2. **Watch**:
   - Active dot expands (w-2 → w-8)
   - Color changes (white/50 → blue 600)
   - Transition is smooth (duration: 300ms)

### Parallax Effect:
1. **Scroll down** slowly
2. **Watch**:
   - Background moves slower than content
   - Creates depth illusion

---

## 3. 🎨 **Bento Category Grid**

### Hover Effect:
1. **Hover** over any category card
2. **Watch**:
   - Card scales (1.02x)
   - Lifts up (y: -5px)
   - White border appears (30% opacity)
   - Gradient overlay fades (80% → 70%)
   - Image zooms (1 → 1.1x)

### Icon Animation:
1. **Hover** over the icon (top-left)
2. **Watch**:
   - Icon rotates 10 degrees
   - Scales (1.1x)
   - Backdrop blur increases

### Click Effect:
1. **Click** any category
2. **Watch**:
   - Card scales down (0.98x)
   - Navigates to category page

---

## 4. 🛍️ **Modern Product Card**

### Hover Sequence (0.6s total):
1. **Hover** over product card
2. **Watch** (in order):
   - **0ms**: Blur overlay fades in
   - **0ms**: Image scales to 1.08x
   - **100ms**: Quick Add button slides up (y: 100 → 0)
   - **200ms**: Blue shadow appears
   - **300ms**: Border highlight

### Quick Add Button:
1. **Click** "Сагсанд хийх" button
2. **Watch**:
   - Button scales down (0.98x)
   - Toast notification appears (blue theme)
   - Message: "Сагсанд нэмэгдлээ!"
   - Duration: 2 seconds
   - Position: Top-right

### Wishlist Toggle:
1. **Click** heart icon (top-right)
2. **Watch**:
   - Icon fills with red
   - Background changes (white → red 500)
   - Shadow color changes (gray → red)
   - Scale animation (0.9x → 1.1x → 1x)
   - Toast: "Нэмсэн" or "Хассан"

### Star Rating:
1. **Observe** the stars
2. **Watch**:
   - Each star appears with 50ms delay
   - Filled stars are yellow 400
   - Empty stars are gray 200

---

## 5. ⏳ **Loading States**

### Skeleton Animation:
1. **Navigate** to a slow-loading page
2. **Watch**:
   - Skeleton appears instantly
   - Shimmer effect sweeps left-to-right
   - Duration: 2 seconds
   - Infinite loop
   - Gray 200 background with white/50 overlay

### Staggered Entry:
1. **Wait** for content to load
2. **Watch**:
   - Item 1 appears at 0ms
   - Item 2 appears at 50ms
   - Item 3 appears at 100ms
   - Continue pattern...

---

## 6. 🎭 **Reveal Animations**

### Scroll Trigger:
1. **Scroll down** the page
2. **Watch** (when element is 50px from viewport):
   - Element fades in (opacity: 0 → 1)
   - Slides up (y: 20 → 0)
   - Duration: 0.5s
   - Easing: ease-out

### Section Headers:
1. **Scroll** to "Онцлох бараанууд" section
2. **Watch**:
   - Title fades in first
   - Subtitle fades in 100ms later
   - Products appear with stagger

---

## 7. 🎯 **Newsletter Section**

### Email Input Focus:
1. **Click** email input
2. **Watch**:
   - White ring appears (4px)
   - Ring has 30% opacity
   - Transition: 300ms

### Subscribe Button:
1. **Hover** over "Бүртгүүлэх" button
2. **Watch**:
   - Button scales (1.05x)
   - Background changes (white → gray 100)
   - Shadow expands

---

## 🎨 **Color Scheme in Action**

### Primary Actions:
- **Blue 600** (#2563eb): CTA buttons, links, active states
- **Purple 600** (#7c3aed): Secondary gradients, accents

### Feedback:
- **Red 500**: Wishlist filled, error states
- **Yellow 400**: Star ratings, success highlights
- **Green 500**: Success messages, checkmarks

### Neutrals:
- **White** (#FFFFFF): Backgrounds, text on dark
- **Charcoal** (#1a1a1a): Primary text
- **Gray 100-900**: Borders, shadows, overlays

---

## 📱 **Mobile Experience**

### Hamburger Menu:
1. **Click** hamburger icon (mobile only)
2. **Watch**:
   - Menu icon transforms to X
   - Menu slides down (height: 0 → auto)
   - Background blurs (backdrop-blur)
   - Links appear with fade-in

### Touch Interactions:
1. **Tap** any product card
2. **Watch**:
   - Tap scale (0.95x) instead of hover
   - Visual feedback before navigation

---

## 🎬 **Animation Timeline Reference**

```
Hero Slide Transition:
0ms    - Old slide fade out (opacity: 1 → 0)
0ms    - Old slide scale down (1 → 0.95)
200ms  - New slide fade in (opacity: 0 → 1)
200ms  - New slide scale (1.1 → 1)
400ms  - Subtitle fade in (y: 20 → 0)
600ms  - Title fade in (y: 20 → 0)
800ms  - CTA button fade in (y: 20 → 0)

Product Card Hover:
0ms    - Blur overlay fade in
0ms    - Image scale (1 → 1.08x)
100ms  - Quick Add slide up (y: 100 → 0)
200ms  - Blue shadow appear
300ms  - Border highlight

Category Card Hover:
0ms    - Card scale (1 → 1.02x)
0ms    - Card lift (y: 0 → -5px)
0ms    - Border appear (opacity: 0 → 30%)
100ms  - Gradient fade (80% → 70%)
700ms  - Image zoom (1 → 1.1x)
```

---

## 💡 **Pro Tips**

### Best Way to Explore:
1. Start at top of homepage
2. Scroll slowly to see parallax
3. Hover over each element
4. Try quick add to cart
5. Toggle wishlist
6. Click category cards
7. Use search bar
8. Scroll to bottom for newsletter

### Test Performance:
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Run performance audit
4. Check metrics:
   - FCP < 1.5s
   - LCP < 2.5s
   - CLS < 0.1

### Mobile Testing:
1. Open DevTools (F12)
2. Click device toolbar (Ctrl+Shift+M)
3. Select iPhone or Android
4. Test touch interactions
5. Verify responsive layout

---

**Enjoy the new design! 🎉**

Every interaction has been carefully crafted to provide a smooth, delightful user experience.
