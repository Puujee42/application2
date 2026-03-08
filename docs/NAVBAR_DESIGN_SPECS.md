# 🎨 Luxury Navbar - Visual Design Specifications

## Quick Visual Reference

---

## 📐 Layout Dimensions

```
┌─────────────────────────────────────────────────────────┐
│  MN | USD | Help                         [Desktop Only] │  40px
├─────────────────────────────────────────────────────────┤
│                                                          │
│  [LOGO]    [Advanced Search Bar]      👤  ♡  🛒  ☰     │  80px → 64px
│                                                          │
├─────────────────────────────────────────────────────────┤
│  📦 New In  •  🚚 Ready  •  ⏰ Pre-order  •  🏷️ Sale    │  48px
└─────────────────────────────────────────────────────────┘

Total: 168px (default) → 152px (scrolled)
```

---

## 🎨 Color Palette

### **Primary Colors**
```
Background (Default):  rgba(255, 255, 255, 0.8)
Background (Scrolled): rgba(255, 255, 255, 0.95)
Backdrop Blur:         12px → 20px
Border:                rgba(0, 0, 0, 0.06)
```

### **Text Colors**
```
Primary:    #111827 (gray-900)  - Main text
Secondary:  #6B7280 (gray-500)  - Labels
Tertiary:   #9CA3AF (gray-400)  - Placeholders
Hover:      #000000 (black)     - Interactive hover
```

### **Accent Colors**
```
Badge Background: #000000 (black)
Badge Text:       #FFFFFF (white)
Focus Ring:       rgba(0, 0, 0, 0.1)
```

---

## 📝 Typography Scale

### **Top Bar**
```
Font Family:     Inter
Font Size:       12px
Font Weight:     300 (light)
Letter Spacing:  0.01em
Line Height:     1.5
Color:           #6B7280 → #000000 (hover)
```

### **Main Navigation**
```
Search Input:
- Font Size:     14px
- Font Weight:   300 (light)
- Letter Spacing: 0.01em
- Placeholder:   #9CA3AF

Logo:
- Width:  120px → 100px (scrolled)
- Height: 38px → 32px (scrolled)
- Filter: brightness(0.1) [dark]
```

### **Categories**
```
Font Family:     Inter
Font Size:       14px
Font Weight:     300 (light) / 400 (active)
Letter Spacing:  0.03em
Line Height:     1.4
Color:           #6B7280 → #000000 (hover)
```

---

## 🔲 Component Sizes

### **Icons**
```
Size:           20px × 20px
Stroke Width:   1.5 (thin)
Color:          #374151 (gray-700)
Hover:          #000000 (black)
Padding:        8px (touch target: 36px)
Border Radius:  9999px (full)
```

### **Badge (Cart/Wishlist Counter)**
```
Size:           16px × 16px
Border Radius:  50% (circle)
Background:     #000000
Text Color:     #FFFFFF
Font Size:      10px
Font Weight:    500 (medium)
Position:       absolute top-right
```

### **Search Bar**
```
Width:          100% (max 800px)
Height:         48px
Padding:        12px 16px 12px 48px
Border Radius:  6px (rounded-md)
Border:         1px solid #E5E7EB
Focus Border:   2px solid rgba(0, 0, 0, 0.1)
Icon Position:  left 16px, center
```

### **User Dropdown**
```
Width:          256px
Padding:        0
Border Radius:  6px (rounded-md)
Border:         1px solid #E5E7EB
Shadow:         0 20px 25px -5px rgba(0,0,0,0.1)
Background:     #FFFFFF

Item Padding:   16px
Item Hover:     #F9FAFB (gray-50)
```

---

## 💫 Animation Specifications

### **Entry Animation (Initial Load)**
```typescript
Type:      Slide from top
Initial:   translateY(-100px)
Final:     translateY(0)
Duration:  600ms
Easing:    cubic-bezier(0.25, 0.1, 0.25, 1)
```

### **Scroll Transition**
```typescript
Trigger:   window.scrollY > 10px
Duration:  500ms
Easing:    ease-in-out

Changes:
- Height:     80px → 64px
- Logo:       120px → 100px
- Background: rgba(255,255,255,0.8) → rgba(255,255,255,0.95)
- Blur:       12px → 20px
- Shadow:     none → sm
```

### **Link Hover (Underline)**
```typescript
Property:  scaleX
Initial:   0 (from left)
Hover:     1 (full width)
Duration:  300ms
Easing:    cubic-bezier(0.25, 0.1, 0.25, 1)
Height:    1px
Color:     currentColor
```

### **Icon Hover**
```typescript
Background: transparent → #F9FAFB (gray-50)
Color:      #374151 → #000000
Duration:   200ms
Easing:     ease-in-out
Scale:      1 → 1.05 (subtle)
```

### **Dropdown Animations**
```typescript
Type:      Fade + Slide
Initial:   { opacity: 0, y: 10px }
Animate:   { opacity: 1, y: 0 }
Exit:      { opacity: 0, y: 10px }
Duration:  200ms
Easing:    ease-out
```

### **Mobile Menu**
```typescript
Backdrop:
- opacity: 0 → 1 (300ms)
- background: rgba(0,0,0,0.4)
- blur: 8px

Panel:
- x: 100% → 0
- Spring: { stiffness: 300, damping: 30 }
- Width: 85vw (max 384px)
- Side: right
```

---

## 📏 Spacing System

### **Container**
```
Max Width:  1600px
Padding X:  24px (mobile) → 48px (desktop)
Margin:     auto (centered)
```

### **Gaps**
```
Top Bar Items:        24px
Main Nav Icons:       8px → 16px
Category Links:       48px
Dropdown Items:       0 (no gap)
Mobile Menu Items:    4px
```

### **Padding**
```
Top Bar:              0 24px
Main Nav:             0 24px → 0 48px
Categories:           0 24px → 0 48px
Search Input:         12px 16px 12px 48px
Icon Buttons:         8px
Dropdown Items:       16px
Mobile Menu Header:   20px 24px
Mobile Menu Items:    12px 16px
```

---

## 🎭 States

### **Search Bar States**

**Default:**
```
Border: 1px solid #E5E7EB
Background: rgba(249, 250, 251, 0.5)
Icon: #9CA3AF
Text: #111827
```

**Focus:**
```
Border: 2px solid rgba(0, 0, 0, 0.1)
Background: #FFFFFF
Icon: #6B7280
Ring: 2px rgba(0, 0, 0, 0.1)
```

**Typing:**
```
Border: 2px solid rgba(0, 0, 0, 0.1)
Show Clear Button (X)
```

### **Category Link States**

**Default:**
```
Color: #6B7280
Font Weight: 300
Underline: hidden
```

**Hover:**
```
Color: #000000
Font Weight: 300
Underline: animate in (scaleX 0 → 1)
```

**Active:**
```
Color: #000000
Font Weight: 400
Underline: visible
```

### **Icon Button States**

**Default:**
```
Background: transparent
Color: #374151 (gray-700)
Border Radius: full
```

**Hover:**
```
Background: #F9FAFB (gray-50)
Color: #000000
Scale: 1.05
```

**Active:**
```
Background: #F3F4F6 (gray-100)
Color: #000000
Scale: 0.95
```

---

## 📱 Responsive Breakpoints

### **Desktop (≥ 1024px)**
```
Layout:
- Show top bar (40px)
- Show main nav (80px)
- Show categories (48px)
- Hide mobile menu icon

Search:
- Full width (max 800px)
- Centered in main nav

Icons:
- All visible
- Hover dropdowns
```

### **Tablet (768px - 1023px)**
```
Layout:
- Show top bar (40px)
- Show main nav (80px)
- Hide categories
- Show mobile menu icon

Search:
- Full width (max 600px)
- Centered in main nav

Icons:
- All visible
- Touch-optimized
```

### **Mobile (< 768px)**
```
Layout:
- Hide top bar
- Show main nav (64px)
- Hide categories
- Show mobile menu icon

Search:
- Icon only
- Full search in mobile menu

Icons:
- Compact spacing (8px)
- Touch-optimized (44px target)
```

---

## 🎨 Shadow Depths

### **Navbar**
```
Default:  none
Scrolled: 0 1px 3px 0 rgba(0, 0, 0, 0.1)
```

### **User Dropdown**
```
Shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
        0 10px 10px -5px rgba(0, 0, 0, 0.04)
```

### **Mobile Menu**
```
Shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15),
        0 10px 10px -5px rgba(0, 0, 0, 0.08)
```

---

## 🔤 Font Weights

```
Extra Light:  200 (not used yet)
Light:        300 (primary)
Regular:      400 (active states)
Medium:       500 (badges, emphasis)
Semibold:     600 (not used yet)
Bold:         700 (not used yet)
```

---

## 🎯 Z-Index Layers

```
Base Content:       z-0
Sticky Navbar:      z-50
Dropdowns:          z-50 (within navbar)
Mobile Menu Back:   z-40
Mobile Menu Panel:  z-50
```

---

## 📊 Visual Hierarchy

### **Priority Order:**
```
1. Logo (largest, darkest)
   ↓
2. Search Bar (centered, prominent)
   ↓
3. Icons (right, consistent size)
   ↓
4. Category Links (thin, elegant)
   ↓
5. Top Bar (smallest, lightest)
```

---

## 🌟 Luxury Design Elements

### **Glassmorphism**
```
✓ Transparent backgrounds (80-95% white)
✓ Backdrop blur (12-20px)
✓ Subtle borders (1px, very light)
✓ Layered depth
✓ Modern, premium feel
```

### **Typography**
```
✓ Light font weights (200-400)
✓ Increased letter spacing (0.01-0.03em)
✓ Inter font family
✓ Clean, readable
✓ Sophisticated appearance
```

### **Icons**
```
✓ Thin strokes (1.5px)
✓ Consistent sizing (20px)
✓ Lucide React library
✓ Minimal, elegant
✓ Color transitions on hover
```

### **Animations**
```
✓ Smooth easing (cubic-bezier)
✓ Medium duration (300-600ms)
✓ Natural motion
✓ No jarring movements
✓ Hardware accelerated
```

### **Spacing**
```
✓ Generous padding
✓ Balanced gaps
✓ Breathing room
✓ Not cramped
✓ Professional layout
```

---

## 📐 Grid System

### **Main Container**
```
Max Width:  1600px
Margins:    auto (centered)
Padding:    0 24px (mobile)
            0 48px (desktop)
```

### **Flexbox Layout**
```
Main Nav:
- display: flex
- justify: space-between
- align: center

Categories:
- display: flex
- justify: center
- gap: 48px
```

---

## 🎨 CSS Variables (Can Add)

```css
:root {
  --navbar-height-default: 168px;
  --navbar-height-scrolled: 152px;
  
  --navbar-bg-default: rgba(255, 255, 255, 0.8);
  --navbar-bg-scrolled: rgba(255, 255, 255, 0.95);
  
  --navbar-blur-default: 12px;
  --navbar-blur-scrolled: 20px;
  
  --navbar-border: rgba(0, 0, 0, 0.06);
  
  --text-primary: #111827;
  --text-secondary: #6B7280;
  --text-hover: #000000;
  
  --transition-fast: 200ms;
  --transition-normal: 300ms;
  --transition-slow: 500ms;
  
  --easing: cubic-bezier(0.25, 0.1, 0.25, 1);
}
```

---

## ✅ Design Checklist

### **Visual Quality:**
- [x] Glassmorphism effect visible
- [x] Thin, elegant borders
- [x] Light typography (300-400)
- [x] Increased letter spacing
- [x] Thin icons (strokeWidth 1.5)
- [x] Monochrome color scheme
- [x] Generous spacing
- [x] Clean, minimal design

### **Interactions:**
- [x] Smooth hover effects
- [x] Underline animations
- [x] Dropdown transitions
- [x] Mobile menu slide
- [x] Search focus ring
- [x] Icon color shifts
- [x] Badge visibility

### **Responsive:**
- [x] Desktop (3 tiers)
- [x] Tablet (2 tiers + menu)
- [x] Mobile (1 tier + menu)
- [x] All breakpoints tested
- [x] Touch targets (44px+)
- [x] Mobile menu smooth

---

**Status: ✅ Production Ready!**

All visual specifications are implemented and tested. The navbar meets luxury e-commerce standards and matches the aesthetic of Farfetch, SSENSE, and Apple Store. 🎨✨

