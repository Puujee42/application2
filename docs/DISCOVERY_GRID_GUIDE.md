# 🎨 Discovery Product Grid - High-End Experience

## Overview

A **world-class, minimalist product grid** inspired by Apple's aesthetic. Features image cross-fade, staggered reveal animations, floating shadows, and magnetic hover effects.

---

## ✨ Key Features

### 1. **Minimalist Card Design**

#### Visual Specs:
```css
Background:      bg-white
Border:          border border-gray-100 (thin, subtle)
Border Radius:   rounded-2xl (16px)
Initial Shadow:  0 1px 3px rgba(0, 0, 0, 0.02) (barely visible)
Hover Shadow:    0 20px 40px -12px rgba(0, 0, 0, 0.08) (soft floating)
```

#### Card Structure:
```
┌─────────────────────────┐
│ [Badge]        [Heart]  │ ← Top badges + wishlist
│                         │
│      Product Image      │ ← Image swap on hover
│                         │
│ [Quick Add] [Eye]       │ ← Actions (slide up)
├─────────────────────────┤
│ Product Name            │ ← Semibold, line-clamp-2
│ ★★★★☆ (4.5)            │ ← Star rating
│ 150,000₮                │ ← Price (Soyol orange)
└─────────────────────────┘
```

---

### 2. **Hover Interactions**

#### Image Cross-Fade:
```tsx
Primary Image (default):
- opacity: 1
- visible: true

Secondary Image (on hover):
- opacity: 0 → 1 (300ms fade)
- scale: 1.05 (slight zoom)

Animation:
- AnimatePresence with mode="wait"
- Smooth cross-dissolve effect
```

#### Quick Actions Slide Up:
```tsx
Initial State:
- y: '100%' (below viewport)
- opacity: 0

Hover State:
- y: '0%' (slides up)
- opacity: 1

Transition:
- type: 'spring'
- stiffness: 300
- damping: 25

Visual:
- Gradient backdrop: from-black/60 to-transparent
- Blur effect: backdrop-blur-sm
```

#### Shadow Transition:
```tsx
Default:
boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)'

Hover:
boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.08), 
            0 0 0 1px rgba(255, 121, 0, 0.1)'

// Soft floating shadow + Soyol border glow
```

#### Card Lift:
```tsx
whileHover={{ y: -4 }}
transition={{ type: 'spring', stiffness: 300, damping: 20 }}

// Card lifts up 4px with spring animation
```

---

### 3. **Typography & Info**

#### Product Name:
```tsx
className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-soyol"

Font: Inter Semibold
Size: 14px (text-sm)
Color: Gray 900 → Soyol (on hover)
Overflow: 2-line clamp
```

#### Price:
```tsx
className="text-xl font-black text-soyol"

Font: Inter Black
Size: 20px (text-xl)
Color: Soyol Orange (#FF7900)
Format: Mongolian Tugrik with comma separator
```

#### Rating:
```tsx
// 5 stars with fill
Stars: 3.5px each
Filled: soyol color
Empty: gray-200
Text: (rating) in gray-500
```

---

### 4. **Badges**

#### New Arrival Badge:
```tsx
className="px-2.5 py-1 bg-soyol/10 backdrop-blur-md rounded-lg border border-soyol/20"

Background: Soyol 10% opacity
Blur: backdrop-blur-md
Border: Soyol 20% opacity
Text: Soyol orange, bold, xs
Content: "New Arrival"
```

#### Limited Badge:
```tsx
className="px-2.5 py-1 bg-gray-900/80 backdrop-blur-md rounded-lg"

Background: Gray 900 with 80% opacity
Blur: backdrop-blur-md
Text: White, bold, xs
Content: "Limited"
```

---

### 5. **Staggered Reveal Animation**

#### On Load/Scroll:
```tsx
initial={{ opacity: 0, y: 40 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: '-100px' }}
transition={{
  duration: 0.5,
  delay: index * 0.1,  // Stagger by 100ms
  ease: [0.21, 0.47, 0.32, 0.98],  // Custom ease curve
}}
```

#### Animation Timeline:
```
Card 0: 0ms     → Starts animating
Card 1: 100ms   → Starts animating
Card 2: 200ms   → Starts animating
Card 3: 300ms   → Starts animating
...
Card 15: 1500ms → Starts animating

Each card: 500ms duration (slide up + fade in)
```

#### Viewport Trigger:
- Triggers when card is 100px from viewport
- `once: true` - only animates first time
- Smooth cascade effect

---

### 6. **Grid Layout**

#### Desktop (1024px+):
```css
grid-cols-4         /* 4 columns */
gap-8               /* 32px gap */
max-width: 1280px   /* Container */
padding: 0 32px     /* Side padding */
```

#### Tablet (640px - 1023px):
```css
grid-cols-2         /* 2 columns */
gap-6               /* 24px gap */
```

#### Mobile (< 640px):
```css
grid-cols-2         /* 2 columns (tight) */
gap-6               /* 24px gap */
padding: 0 16px     /* Reduced padding */
```

---

## 🎨 Component Structure

### DiscoveryProductCard.tsx

```tsx
Card Container (motion.a)
├── Card Wrapper (motion.div)
│   ├── Image Container
│   │   ├── Primary Image (AnimatePresence)
│   │   ├── Secondary Image (AnimatePresence)
│   │   ├── Badges (top-left)
│   │   ├── Wishlist Button (top-right)
│   │   └── Quick Actions (slide up)
│   │       ├── Quick Add Button
│   │       └── Eye Icon Button
│   ├── Card Content
│   │   ├── Product Name
│   │   ├── Star Rating
│   │   └── Price
│   └── Hover Border Accent
└── [End]
```

### DiscoveryProductGrid.tsx

```tsx
Section Container
├── Header
│   ├── Badge ("Онцлох бараанууд")
│   ├── Title ("Discover")
│   └── Subtitle
├── Grid Container (4 columns)
│   └── [Cards with stagger delay]
└── View All CTA
```

---

## 🎬 Interaction Flow

### Hover Sequence:
```
0ms    → Mouse enters card
0ms    → Card lifts up (-4px)
0ms    → Shadow intensifies
0ms    → Border accent appears
100ms  → Secondary image fades in
100ms  → Quick actions start sliding up
400ms  → Quick actions fully visible
```

### Click Sequence:
```
Quick Add:
0ms    → Button press (scale 0.98)
100ms  → Add to cart (Zustand)
150ms  → Toast notification appears
2000ms → Toast disappears

Wishlist:
0ms    → Heart button press
50ms   → State toggle
100ms  → Color change (white → soyol)
150ms  → Toast notification
```

---

## 🎨 Design Tokens

### Colors:
```css
Card BG:           #FFFFFF (white)
Border Default:    #F3F4F6 (gray-100)
Border Hover:      rgba(255, 121, 0, 0.2) (soyol/20)
Shadow Default:    rgba(0, 0, 0, 0.02)
Shadow Hover:      rgba(0, 0, 0, 0.08)
Price:             #FF7900 (soyol)
Badge BG:          rgba(255, 121, 0, 0.1) (soyol/10)
Badge Border:      rgba(255, 121, 0, 0.2) (soyol/20)
```

### Typography:
```css
Product Name:      14px (text-sm), Semibold (600)
Price:             20px (text-xl), Black (900)
Badge:             12px (text-xs), Bold (700)
Rating:            12px (text-xs), Medium (500)
```

### Spacing:
```css
Card Padding:      16px (p-4)
Image Aspect:      1:1 (aspect-square)
Grid Gap Desktop:  32px (gap-8)
Grid Gap Mobile:   24px (gap-6)
Section Padding:   80px (py-20)
```

### Border Radius:
```css
Card:              16px (rounded-2xl)
Badge:             8px (rounded-lg)
Button:            12px (rounded-xl)
Wishlist:          9999px (rounded-full)
```

---

## 🎯 Brand Integration

### Soyol Colors:
```tsx
Price:             text-soyol
Badge BG:          bg-soyol/10
Badge Border:      border-soyol/20
Badge Text:        text-soyol
Hover Border:      rgba(255, 121, 0, 0.2)
Wishlist Active:   bg-soyol
Toast BG:          #FF7900
Name Hover:        text-soyol
```

### Shadow Effects:
```tsx
Hover Glow:        0 0 0 1px rgba(255, 121, 0, 0.1)
Soft Shadow:       0 20px 40px -12px rgba(0, 0, 0, 0.08)
```

---

## 📱 Responsive Behavior

### Image Sizing:
```tsx
sizes="(max-width: 640px) 50vw, 
       (max-width: 1024px) 33vw, 
       25vw"

Mobile:  50% viewport width
Tablet:  33% viewport width
Desktop: 25% viewport width
```

### Grid Breakpoints:
```tsx
Mobile:   2 columns (tight layout)
Tablet:   2 columns (comfortable)
Desktop:  4 columns (spacious)
```

### Touch Interactions:
```tsx
whileTap={{ scale: 0.98 }}  // Tap feedback on mobile
Large touch targets (48px+)  // WCAG compliant
```

---

## 🚀 Performance Optimizations

### Image Optimization:
- Next.js Image component (automatic WebP)
- Lazy loading (loads as you scroll)
- Responsive sizes (correct resolution per device)

### Animation Performance:
- GPU-accelerated transforms only
- No layout-shifting properties
- RequestAnimationFrame by Framer Motion

### Render Optimization:
- React.memo on card component (prevents re-renders)
- Viewport-based animation trigger
- Once: true (animate only first time)

---

## 🎨 Customization Guide

### Change Grid Columns:
```tsx
// 5 columns on desktop:
className="grid-cols-2 lg:grid-cols-5"

// 3 columns on tablet:
className="grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
```

### Adjust Stagger Delay:
```tsx
// Faster (50ms between cards):
delay: index * 0.05

// Slower (200ms between cards):
delay: index * 0.2
```

### Change Hover Lift:
```tsx
// More dramatic (8px):
whileHover={{ y: -8 }}

// Subtle (2px):
whileHover={{ y: -2 }}
```

### Replace Secondary Image:
```tsx
// Add actual secondary image field to Product type
const secondaryImage = product.secondaryImage || product.image;
```

### Customize Badges:
```tsx
// Add custom badge logic:
{product.discount && (
  <div className="px-2.5 py-1 bg-red-500 text-white rounded-lg">
    <span className="text-xs font-bold">-{product.discount}%</span>
  </div>
)}
```

---

## 🎭 Animation Variants

### Card Reveal:
```tsx
// From bottom:
initial={{ opacity: 0, y: 40 }}

// From top:
initial={{ opacity: 0, y: -40 }}

// From side:
initial={{ opacity: 0, x: -40 }}

// Scale up:
initial={{ opacity: 0, scale: 0.9 }}
```

### Hover Effects:
```tsx
// Subtle:
whileHover={{ y: -2, scale: 1.01 }}

// Dramatic:
whileHover={{ y: -8, scale: 1.03 }}

// Rotate:
whileHover={{ y: -4, rotate: 1 }}
```

---

## 📊 Comparison: Before vs After

| Feature | Before (ModernProductCard) | After (DiscoveryProductCard) |
|---------|---------------------------|------------------------------|
| **Design** | Bold colors, gradient | Minimalist, white, subtle |
| **Shadow** | Always visible | Soft, hover-only |
| **Hover** | Scale image | Image swap + lift |
| **Actions** | Always visible | Slide up on hover |
| **Border** | Thick, colored | Thin, transparent |
| **Animation** | Simple fade-in | Staggered reveal |
| **Spacing** | Tight (gap-6) | Generous (gap-8) |
| **Typography** | Bold, large | Clean, refined |

---

## 🎉 Final Result

Your Discovery Grid now has:

✨ **Minimalist Design** - Apple-inspired aesthetic  
🎭 **Smooth Animations** - Staggered reveal, hover lift  
🖼️ **Image Cross-Fade** - Primary → Secondary on hover  
📱 **Fully Responsive** - 4 → 2 columns adaptive  
🚀 **High Performance** - GPU-accelerated, optimized  
🎨 **Brand Consistent** - Soyol orange accents  
💫 **Floating Shadows** - Soft, premium feel  
🔄 **Quick Actions** - Slide up with blur backdrop  
🏷️ **Elegant Badges** - Glassmorphism effect  
💎 **Premium UX** - Magnetic hover, smooth transitions  

---

**Status**: ✅ **Production Ready**

Your Discovery Product Grid is now live! Visit `http://localhost:3001` to experience the world-class design! 🎊
