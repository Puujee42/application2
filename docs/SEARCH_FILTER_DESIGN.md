# 🎨 Premium Search & Filter - Design Reference

## Visual Design Specifications

---

## 🔍 Search Bar Design

### Desktop Layout
```
┌─────────────────────────────────────────────────────────────┐
│  🔍  Search for products, brands, or categories...  [×] [SEARCH] │
└─────────────────────────────────────────────────────────────┘
    64px height | 2px border | Sharp edges (2px radius)
```

### States

#### 1. **Default State**
```
Border: 2px solid #e2e8f0 (slate-200)
Background: #ffffff (white)
Text: #0f172a (slate-900)
Placeholder: #94a3b8 (slate-400)
Shadow: Small (4px blur)
```

#### 2. **Focus State**
```
Border: 2px solid #0f172a (slate-900) ⬅️ Bold black
Background: #ffffff (white)
Shadow: Large (24px blur, slate-200/50)
Icon Color: #0f172a (slate-900)
```

#### 3. **Hover State**
```
Border: 2px solid #475569 (slate-600)
Cursor: text
Transition: 300ms ease
```

### Search Button
```
┌──────────┐
│  SEARCH  │  ⬅️ All caps, bold
└──────────┘
Background: #0f172a (slate-900)
Text: #ffffff (white)
Size: 14px, font-medium
Padding: 10px 24px
Hover: #1e293b (slate-800)
```

---

## 📋 Suggestions Dropdown

### Layout
```
┌─────────────────────────────────────────────────┐
│  📈 TRENDING SEARCHES                            │
├─────────────────────────────────────────────────┤
│  🔍  iPhone 15 Pro                    [🔥 HOT]  │
│      ELECTRONICS                                 │
├─────────────────────────────────────────────────┤
│  🔍  Samsung Galaxy S24               [🔥 HOT]  │
│      ELECTRONICS                                 │
├─────────────────────────────────────────────────┤
│  🔍  MacBook Pro                      [🔥 HOT]  │
│      ELECTRONICS                                 │
└─────────────────────────────────────────────────┘
```

### Specifications
- **Border**: 2px solid #0f172a (slate-900)
- **Background**: #ffffff (white)
- **Item Hover**: #f8fafc (slate-50)
- **Category Label**: 10px uppercase, #94a3b8 (slate-400)
- **Product Name**: 15px font-light, #0f172a (slate-900)
- **Badge**: Black background, white text
- **Icon**: #cbd5e1 → #0f172a on hover

---

## 🎯 Category Filter

### Desktop Layout
```
┌──────────────────┐  ┌──────────────────┐  ┌────────────┐
│  CATEGORY        │  │  SORT BY         │  │ 1,247      │
│  All Products  ▼ │  │  Featured      ▼ │  │ Products   │
└──────────────────┘  └──────────────────┘  └────────────┘
    2px borders    |      2px borders    |    Info box
```

### Dropdown Menu
```
┌──────────────────────────────┐
│ ☑ All Products        1,247  │  ⬅️ Selected (checked)
├──────────────────────────────┤
│ ☐ Electronics          342   │
│ ☐ Fashion              189   │
│ ☐ Home & Living        156   │
│ ☐ Beauty                98   │
│ ☐ Sports & Outdoors    134   │
│ ☐ Books                 87   │
│ ☐ Toys & Games          76   │
│ ☐ Automotive            65   │
└──────────────────────────────┘
```

### Checkbox Design
```
Default:       Selected:
┌─┐            ┌─┐
│ │            │✓│  ⬅️ Check mark
└─┘            └─┘
2px border     Filled black
slate-300      White check
```

---

## 📱 Mobile Filter Panel

### Slide-Out Drawer
```
┌──────────────────────────────┐
│ FILTER & SORT           [×]  │ ⬅️ Black header
├──────────────────────────────┤
│                              │
│  CATEGORY                    │
│  ☑ All Products       1,247  │
│  ☐ Electronics          342  │
│  ☐ Fashion              189  │
│  ...                         │
│                              │
├──────────────────────────────┤
│                              │
│  SORT BY                     │
│  ☑ Featured                  │
│  ☐ Newest Arrivals           │
│  ☐ Price: Low to High        │
│  ...                         │
│                              │
└──────────────────────────────┘
85vw width | Slides from right
```

### Mobile Button
```
┌────────────────────────────┐
│  ⚙️  FILTER & SORT          │
└────────────────────────────┘
Full width | Black background
White text | 48px height
```

---

## 🎨 Color Palette

### Primary Colors
```
Black:         #0f172a  (slate-900)
White:         #ffffff  (pure white)
Light Gray:    #f8fafc  (slate-50)
Border Gray:   #e2e8f0  (slate-200)
```

### Text Colors
```
Primary:       #0f172a  (slate-900)
Secondary:     #475569  (slate-600)
Tertiary:      #94a3b8  (slate-400)
Disabled:      #cbd5e1  (slate-300)
```

### Interactive States
```
Hover BG:      #f8fafc  (slate-50)
Active Border: #0f172a  (slate-900)
Focus Shadow:  rgba(0,0,0,0.1)
```

---

## 📏 Spacing System

### Padding
```
Search Input:     24px horizontal
Dropdown Items:   24px horizontal, 12px vertical
Filter Boxes:     24px all sides
Mobile Panel:     24px horizontal
```

### Margins
```
Between Sections: 32-48px
Between Elements: 16px
Internal Spacing: 8-12px
```

### Heights
```
Search Bar:       64px (desktop), 56px (mobile)
Filter Boxes:     56px
Dropdown Items:   48px
Mobile Button:    48px
```

---

## 🔤 Typography Scale

### Search Bar
```
Input Text:       15px, font-light, tracking-wide
Placeholder:      15px, font-light, slate-400
Button:           14px, font-medium, uppercase
```

### Labels
```
Section Labels:   10px, font-semibold, uppercase, tracking-wider
Category Names:   15px, font-light, tracking-wide
Product Counts:   12px, font-light, slate-400
```

### Dropdowns
```
Menu Items:       15px, font-light, tracking-wide
Selected Items:   15px, font-normal (slightly bolder)
Categories:       10px, font-semibold, uppercase
```

---

## 🎭 Animation Specifications

### Timing Functions
```
Default:      cubic-bezier(0.4, 0, 0.2, 1)  // Tailwind ease-out
Spring:       { stiffness: 300, damping: 30 }
Duration:     200-400ms (fast & refined)
```

### Entrance Animations
```
Search Bar:
  opacity: 0 → 1
  y: -10px → 0
  duration: 400ms

Dropdowns:
  opacity: 0 → 1
  y: -10px → 0
  duration: 200ms

Mobile Panel:
  x: 100% → 0
  spring physics
```

### Hover Animations
```
Buttons:
  scale: 1.02
  duration: 150ms

Borders:
  color transition: 300ms
```

### Stagger Effect
```
Suggestion Items:
  delay: index * 30ms
  Creates wave effect
```

---

## 🖼️ Visual Hierarchy

### Z-Index Layers
```
Base Content:         z-0
Search Bar:           z-10
Dropdowns:            z-50
Mobile Panel:         z-50
Backdrop:             z-40
Scroll to Top:        z-50
```

### Shadow Depths
```
Resting:      0 1px 2px rgba(0,0,0,0.05)
Hover:        0 4px 12px rgba(0,0,0,0.08)
Focus:        0 8px 24px rgba(0,0,0,0.12)
Dropdown:     0 20px 40px rgba(0,0,0,0.15)
```

---

## 🎯 Touch Targets (Mobile)

### Minimum Sizes
```
Buttons:              44px × 44px
Input Fields:         48px height
Dropdown Items:       48px height
Filter Chips:         36px height
Close Buttons:        44px × 44px
```

---

## ✨ Premium Details

### Sharp Edges
- Border radius: **2px** (not rounded!)
- Creates crisp, professional look
- Consistent across all elements

### Letter Spacing
- Wide tracking (0.02em-0.05em)
- Adds luxury feel
- Improves readability

### Font Weights
- Light (300) for body text
- Medium (500) for emphasis
- Semibold (600) for labels
- Bold (700) for headings

### Borders
- Always 2px thick
- Creates strong definition
- High contrast on focus

---

## 🎨 Component States

### Search Bar States
```
1. Empty, Unfocused:
   - Light border
   - Placeholder visible
   - Small shadow

2. Empty, Focused:
   - Black border
   - Trending dropdown
   - Large shadow

3. Typing:
   - Black border
   - Clear button visible
   - Filtered suggestions

4. Has Results:
   - Suggestions dropdown
   - Hover effects active
```

### Dropdown States
```
1. Closed:
   - Light border
   - Arrow pointing down

2. Open:
   - Black border
   - Arrow rotated 180°
   - Menu visible below

3. Item Hovered:
   - Background: slate-50
   - Border: unchanged

4. Item Selected:
   - Check mark visible
   - Font weight increased
```

---

## 📐 Responsive Breakpoints

### Desktop (≥ 1024px)
```
Search Bar:      Full width, max 100%
Filters:         Side by side
Dropdowns:       250px width
Gap:             16px
```

### Tablet (768px - 1023px)
```
Search Bar:      Full width
Filters:         Stacked or compact
Dropdowns:       Adjust to screen
```

### Mobile (< 768px)
```
Search Bar:      Full width, 56px height
Filters:         Single button
Panel:           85vw width, full height
Touch Targets:   Minimum 44px
```

---

## 🎭 Interaction Patterns

### Search Interaction
```
1. Click → Focus (border turns black)
2. Type → Suggestions filter live
3. Hover suggestion → Highlight
4. Click suggestion → Search + Close
5. Press Enter → Search + Close
6. Click outside → Close dropdown
```

### Filter Interaction
```
1. Click dropdown → Open
2. Hover item → Highlight
3. Click item → Select + Close + Apply
4. Click outside → Close without change
5. Keyboard: Tab → Arrow Keys → Enter
```

### Mobile Interaction
```
1. Tap button → Panel slides in
2. Tap backdrop → Panel slides out
3. Select option → Panel closes
4. Swipe (future) → Panel closes
```

---

## 🌟 Luxury Marketplace Inspiration

### Farfetch Style Elements
```
✓ Sharp corners (2px)
✓ Thin borders (2px)
✓ Monochrome palette
✓ Uppercase labels
✓ Wide letter spacing
✓ Light font weights
✓ Generous white space
```

### SSENSE Style Elements
```
✓ Minimal design
✓ High contrast
✓ Clean dropdowns
✓ No gradients
✓ Precise alignment
✓ Subtle animations
✓ Professional typography
```

### Net-a-Porter Style Elements
```
✓ Sophisticated spacing
✓ Premium interactions
✓ Refined hover states
✓ Elegant transitions
✓ Clear hierarchy
```

---

## 📊 Design Metrics

### Visual Weight Distribution
```
Search Bar:          40% (most prominent)
Category Filter:     30% (secondary)
Active Filters:      20% (supporting)
Results Count:       10% (informational)
```

### Contrast Ratios (WCAG AA)
```
Text on White:       4.5:1 ✓
Borders:             3:1 ✓
Interactive Elements: 3:1 ✓
Focus States:        3:1 ✓
```

---

## 🎯 Key Takeaways

### What Makes it Premium:
1. **Sharp Edges** - No rounded corners
2. **High Contrast** - Black/white, not gray
3. **Precise Borders** - Always 2px, never 1px
4. **Light Typography** - Elegant, not bold
5. **Wide Spacing** - Generous padding
6. **Subtle Motion** - Refined, not bouncy
7. **Clean Dropdowns** - No clutter
8. **Professional** - Every detail considered

---

**Result: A search and filter system that looks like it belongs on Farfetch, SSENSE, or Net-a-Porter!** 🎉

