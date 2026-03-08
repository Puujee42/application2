# Quick Start Guide - Direct Shopping Experience

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Database configured (see DATABASE_SETUP_GUIDE.md)

### Installation & Setup

1. **Install Dependencies**
```bash
npm install
```

2. **Setup Database**
```bash
npm run db:push
npm run db:seed
```

3. **Run Development Server**
```bash
npm run dev
```

4. **Open Browser**
Navigate to: `http://localhost:3000`

---

## 🎯 What to Expect

### Homepage Experience (New!)

When you load the homepage, you'll see:

1. **Floating Navbar** (at top)
   - Glassmorphism design
   - Logo, navigation links, search, cart

2. **Quick Category Strip** (immediately below navbar)
   - Horizontal scrollable icons
   - 8 categories: Home, Tech, Fashion, Beauty, Furniture, Lifestyle, New In, Pets
   - Sticky positioning (follows you as you scroll)

3. **Deal Banner** (slim, 200px height)
   - 3 promotional cards:
     - New Arrivals (blue gradient)
     - Best Sellers (purple gradient)
     - Flash Sale (orange gradient)
   - Animated shine effects on hover

4. **Product Grid** (immediate product discovery!)
   - Desktop: 4 columns
   - Mobile: 2 columns
   - Minimal gaps (12-16px)
   - Staggered reveal animation (products "pop up")
   - Hover effects: lift, image swap, quick actions

5. **Load More Button**
   - Orange (brand color: #FF7900)
   - Loading spinner when clicked
   - Simulates pagination

6. **About Section** (bottom of page)
   - Company information
   - 4 feature cards
   - Statistics grid

7. **Newsletter Section** (very bottom)
   - Email signup form
   - Orange CTA button

---

## 🎨 Visual Features to Test

### Animations

1. **Product Card Hover**
   - Card lifts up slightly
   - Border accent appears
   - Quick action buttons slide up from bottom
   - Shadow intensifies

2. **Category Icons**
   - Rotate 360° on hover
   - Background color changes
   - Text color changes to orange

3. **Deal Banner Cards**
   - Scale up slightly on hover
   - Shine effect animates across
   - Bottom accent line expands

4. **Load More Button**
   - Scales up on hover
   - Lifts slightly (y: -2px)
   - Shows loading spinner when clicked

### Interactions

1. **Quick Add to Cart**
   - Hover over product card
   - Click orange "Сагслах" button
   - See toast notification
   - Cart badge updates

2. **Wishlist**
   - Click heart icon (top-right of product card)
   - Icon fills with color
   - Toast notification appears

3. **Category Navigation**
   - Click any category icon in the strip
   - Navigates to filtered view
   - Maintains URL query parameters

4. **Load More Products**
   - Scroll to bottom of product grid
   - Click "Цааш үзэх" button
   - Watch loading animation
   - New products appear with staggered animation

---

## 🔍 Key Pages to Test

### 1. Homepage (/)
- Product-first experience
- Immediate product grid
- Infinite scroll functionality

### 2. Categories Page (/categories)
- Bento grid layout
- Category filtering
- Product listings

### 3. Product Detail Page (/product/[id])
- Individual product view
- Add to cart
- Image gallery

### 4. Cart Page (/cart)
- View cart items
- Update quantities
- Proceed to checkout

### 5. Admin Panel (/admin)
- Add new products
- Manage inventory
- Delete products

---

## 📱 Mobile Testing

### Viewport Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Mobile-Specific Features

1. **Product Grid**
   - Switches to 2 columns
   - Touch-optimized card size
   - Swipe-friendly spacing

2. **Category Strip**
   - Horizontal scroll (no scrollbar)
   - Touch-momentum scrolling
   - Snap to category items

3. **Deal Banner**
   - Stacks vertically (1 column)
   - Full-width cards
   - Touch-friendly height

4. **Floating Navbar**
   - Collapses to hamburger menu
   - Full-screen mobile menu overlay
   - Large touch targets

### How to Test Mobile
```bash
# Open Chrome DevTools
1. F12 or Ctrl+Shift+I
2. Click "Toggle Device Toolbar" (Ctrl+Shift+M)
3. Select device: iPhone 14, Pixel 5, etc.
4. Test interactions with touch simulation
```

---

## 🎯 Features Checklist

Test these features to ensure everything works:

### Navigation
- [ ] Floating navbar is visible and functional
- [ ] Category strip scrolls horizontally
- [ ] Category strip is sticky on scroll
- [ ] Mobile hamburger menu works
- [ ] Search bar expands and functions

### Products
- [ ] Products load on homepage immediately
- [ ] Product grid is 4 columns on desktop
- [ ] Product grid is 2 columns on mobile
- [ ] Product cards animate on scroll (staggered reveal)
- [ ] Hover effects work on product cards
- [ ] Quick add button adds to cart
- [ ] Wishlist button toggles state
- [ ] Product prices are orange (#FF7900)

### Deal Banner
- [ ] 3 promotional cards display
- [ ] Gradients render correctly
- [ ] Shine animation plays on repeat
- [ ] Hover effects work (scale, accent line)
- [ ] Links navigate correctly

### Load More
- [ ] Button displays at bottom of grid
- [ ] Loading spinner shows when clicked
- [ ] New products load after delay
- [ ] Products animate in (staggered)
- [ ] End message shows after several loads

### About Section
- [ ] Feature cards display correctly
- [ ] Icons rotate on hover
- [ ] Statistics grid is visible
- [ ] Gradients and shadows render

### Newsletter
- [ ] Email input field works
- [ ] Submit button is orange
- [ ] Hover effects work

---

## 🐛 Troubleshooting

### Products Not Loading
```bash
# Check database connection
npm run db:push

# Reseed database
npm run db:seed

# Restart dev server
npm run dev
```

### Styles Not Applying
```bash
# Clear Next.js cache
rm -rf .next

# Restart dev server
npm run dev
```

### Images Not Loading
- Check `public/` folder for images
- Verify image URLs in database
- Check Next.js image configuration in `next.config.js`

### Animations Laggy
- Disable Chrome extensions
- Check browser hardware acceleration
- Test in Incognito mode
- Reduce motion in OS settings (if enabled)

---

## 🎨 Customization

### Change Brand Color

Edit `tailwind.config.ts`:
```typescript
colors: {
  soyol: {
    DEFAULT: "#FF7900",  // Change this!
    light: "#ffb366",
    dark: "#e66d00",
  },
}
```

### Adjust Product Grid Spacing

Edit `components/InfiniteProductGrid.tsx`:
```tsx
// Line 62
<div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
//                                              ^^^^^ ^^^^^^
//                                              Change these numbers
```

### Change Products Per Load

Edit `app/page.tsx`:
```tsx
// Line 16
take: 16,  // Change this number
```

Edit `components/InfiniteProductGrid.tsx`:
```tsx
// Line 23-27
const moreProducts = initialProducts.map(/* ... */);
// Adjust duplication logic here
```

### Modify Deal Banner Content

Edit `components/DealBanner.tsx`:
```tsx
// Lines 5-23
const deals = [
  {
    id: 1,
    title: 'Your Title',       // Change this
    subtitle: 'Your Subtitle', // Change this
    icon: Sparkles,            // Change icon
    gradient: 'from-blue-500 to-cyan-500', // Change colors
    link: '/your-link',        // Change link
  },
  // Add more deals...
];
```

---

## 📊 Performance Metrics

Expected performance metrics:

### Desktop (Chrome)
- **FCP** (First Contentful Paint): < 1.5s
- **LCP** (Largest Contentful Paint): < 2.5s
- **CLS** (Cumulative Layout Shift): < 0.1
- **Time to Interactive**: < 3s

### Mobile (Chrome)
- **FCP**: < 2.5s
- **LCP**: < 4s
- **CLS**: < 0.1
- **Time to Interactive**: < 5s

### How to Measure
```bash
# Run Lighthouse audit
1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Select "Mobile" or "Desktop"
4. Click "Generate report"
```

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Test Production Build Locally
```bash
npm run start
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

---

## 📚 Additional Resources

- **Design System**: See `AESTHETIC_IMPLEMENTATION.md`
- **Database Setup**: See `DATABASE_SETUP_GUIDE.md`
- **Floating Navbar**: See `FLOATING_NAVBAR_GUIDE.md`
- **Complete Redesign**: See `DIRECT_SHOPPING_REDESIGN.md`

---

## 🎉 Success Indicators

You'll know everything is working when:

1. ✅ Homepage loads with products immediately visible
2. ✅ Category strip is sticky and scrollable
3. ✅ Deal banner shows 3 promotional cards
4. ✅ Product grid is 4 columns (desktop) or 2 columns (mobile)
5. ✅ Products animate in with staggered timing
6. ✅ Load more button loads additional products
7. ✅ All CTAs are orange (#FF7900)
8. ✅ Hover effects are smooth and performant
9. ✅ Add to cart works with toast notifications
10. ✅ Mobile hamburger menu opens smoothly

---

**Happy Shopping! 🛍️**

For issues or questions, refer to the main documentation files in the root directory.
