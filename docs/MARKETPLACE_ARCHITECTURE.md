# 🏪 Multi-Vendor Marketplace Architecture

Welcome to your **massive multi-vendor marketplace** transformation! This document outlines the complete architecture for scaling from a small shop to a Temu/Taobao-style platform.

---

## 📋 Table of Contents

1. [Database Schema](#database-schema)
2. [Dynamic Routing](#dynamic-routing)
3. [Vendor Dashboard](#vendor-dashboard)
4. [Advanced Search](#advanced-search)
5. [API Endpoints](#api-endpoints)
6. [Next Steps](#next-steps)

---

## 🗄️ Database Schema

### Core Models

#### **User** (Enhanced)
```prisma
model User {
  id          String    @id @default(cuid())
  email       String?   @unique
  name        String?
  image       String?
  role        UserRole  @default(CUSTOMER)  // NEW: CUSTOMER | VENDOR | ADMIN
  
  stores      Store[]    // NEW: Can own multiple stores
  orders      Order[]
  reviews     Review[]   // NEW: Can review products
  wishlist    Wishlist?  // NEW: Persistent wishlist
  cart        Cart?      // NEW: Persistent cart
}
```

#### **Store** (NEW)
The heart of the multi-vendor system. Each vendor can create a store.

```prisma
model Store {
  id          String      @id @default(cuid())
  handle      String      @unique  // URL: /store/tech-galaxy
  name        String
  description String?
  logo        String?
  banner      String?
  vendorId    String
  vendor      User        @relation(...)
  status      StoreStatus @default(PENDING)
  
  // Performance metrics
  rating      Float       @default(0)
  totalSales  Int         @default(0)
  totalOrders Int         @default(0)
  
  products    Product[]
}
```

#### **Category** (NEW)
Hierarchical categories with parent-child relationships.

```prisma
model Category {
  id          String      @id @default(cuid())
  slug        String      @unique  // URL: /category/electronics
  name        String
  icon        String?
  parentId    String?
  parent      Category?   @relation("CategoryHierarchy", ...)
  children    Category[]  @relation("CategoryHierarchy")
  
  products    Product[]
}
```

#### **Product** (Enhanced)
```prisma
model Product {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique  // SEO-friendly URL
  images      String[] // Multiple images
  price       Float
  comparePrice Float?  // For showing discounts
  
  // Multi-vendor relations
  storeId     String
  store       Store    @relation(...)
  categoryId  String
  category    Category @relation(...)
  
  // Analytics
  rating      Float    @default(0)
  totalReviews Int     @default(0)
  totalSales  Int      @default(0)
  views       Int      @default(0)
  
  // Search optimization
  tags        String[]
  featured    Boolean  @default(false)
}
```

#### **Review** (NEW)
```prisma
model Review {
  id        String   @id @default(cuid())
  rating    Int      // 1-5 stars
  comment   String?
  images    String[] // Review images
  productId String
  userId    String
  verified  Boolean  @default(false)  // Verified purchase
  helpful   Int      @default(0)      // Helpful votes
}
```

#### **Order** (Enhanced)
```prisma
model Order {
  id         String      @id @default(cuid())
  orderNumber String     @unique  // e.g., "SO-20240001"
  items      OrderItem[] // NEW: Per-vendor order items
  status     OrderStatus @default(PENDING)
  totalPrice Float
}

model OrderItem {
  id         String   @id @default(cuid())
  orderId    String
  productId  String
  storeId    String   // NEW: Track which store
  quantity   Int
  price      Float    // Price at purchase time
  status     String   // Per-item status for multi-vendor
}
```

---

## 🛣️ Dynamic Routing

### Store Routes
**Pattern:** `/store/[storeHandle]`

**Example:** `/store/tech-galaxy`

```tsx
// app/store/[storeHandle]/page.tsx
- Displays store banner, logo, info
- Shows all products from that store
- Stats: Rating, Total Sales, Product Count
- Contact information
```

**Features:**
- ✅ Store profile with banner & logo
- ✅ Store statistics cards
- ✅ Product grid/list view toggle
- ✅ "Add to Cart" functionality
- ✅ Responsive design

---

### Category Routes
**Pattern:** `/category/[categorySlug]`

**Example:** `/category/electronics`

```tsx
// app/category/[categorySlug]/page.tsx
- Shows all products in category
- Subcategories navigation
- Advanced filtering (price, rating, sort)
- Grid/list view toggle
```

**Features:**
- ✅ Category hero section with icon
- ✅ Subcategories chips
- ✅ Sort options (newest, popular, price, rating)
- ✅ View mode toggle
- ✅ Product count display

---

## 👨‍💼 Vendor Dashboard

### Route: `/vendor/dashboard`

**Access:** Requires authentication + `UserRole.VENDOR`

**Sections:**

#### 1. **Stats Cards**
```tsx
- Total Revenue (₮)
- Total Orders
- Total Products
- Average Rating
```

#### 2. **Alerts**
```tsx
- Pending orders notification
- Low stock products alert
```

#### 3. **Quick Actions**
```tsx
- Manage Products
- View Orders
- Analytics
- Store Settings
- Reviews
- Account Settings
```

**Primary CTA:** 
```tsx
<button>+ Шинэ бараа нэмэх</button>
// Links to: /vendor/products/add
```

---

## 🔍 Advanced Search Component

### Component: `AdvancedSearch.tsx`

**Location:** `components/AdvancedSearch.tsx`

**Features:**

#### 1. **Search Bar**
- Text input with live suggestions
- Clear button
- Search on Enter key

#### 2. **Advanced Filters Panel**
```tsx
- Category dropdown
- Price range (min/max)
- Rating filter (4+, 3+, 2+)
- Sort by (newest, popular, price, rating)
- In-stock only checkbox
```

#### 3. **Filter Management**
- Active filters count badge
- Clear all filters button
- Collapsible panel with animation

#### 4. **URL State Management**
```tsx
// Search URL format:
/search?q=phone&category=electronics&minPrice=100000&maxPrice=500000&rating=4&inStock=true&sortBy=price-asc
```

---

## 🌐 API Endpoints

### Required Endpoints

#### **Stores**
```typescript
GET  /api/stores/[handle]          // Get store by handle
GET  /api/stores                   // List all stores
POST /api/stores                   // Create new store (vendor only)
PUT  /api/stores/[id]              // Update store
```

#### **Categories**
```typescript
GET  /api/categories               // List all categories
GET  /api/categories/[slug]        // Get category by slug
POST /api/categories               // Create category (admin only)
```

#### **Products**
```typescript
GET  /api/products                 // List products with filters
     ?q=query                      // Search query
     &category=slug                // Filter by category
     &storeHandle=handle           // Filter by store
     &minPrice=100000             // Price range
     &maxPrice=500000
     &rating=4                     // Minimum rating
     &inStock=true                 // Only in-stock
     &sortBy=price-asc             // Sort option
     &page=1&limit=20             // Pagination

GET  /api/products/[slug]          // Get product by slug
POST /api/products                 // Create product (vendor only)
PUT  /api/products/[id]            // Update product
DEL  /api/products/[id]            // Delete product
```

#### **Reviews**
```typescript
GET  /api/products/[id]/reviews    // Get product reviews
POST /api/products/[id]/reviews    // Add review
PUT  /api/reviews/[id]/helpful     // Mark review as helpful
```

#### **Vendor**
```typescript
GET  /api/vendor/stats             // Get vendor statistics
GET  /api/vendor/products          // Get vendor's products
GET  /api/vendor/orders            // Get vendor's orders
PUT  /api/vendor/orders/[id]       // Update order status
```

#### **Search**
```typescript
GET  /api/search                   // Advanced search with all filters
     Returns:
     {
       products: Product[],
       total: number,
       page: number,
       totalPages: number,
       filters: {
         categories: [...],
         priceRange: { min, max },
         stores: [...]
       }
     }
```

---

## 📝 Database Migration

### Step 1: Update Schema
```bash
# The new schema is already in prisma/schema.prisma
npx prisma format
```

### Step 2: Push to Database
```bash
npx prisma db push
```

### Step 3: Generate Client
```bash
npx prisma generate
```

### Step 4: Seed Data (Optional)
Create sample stores, categories, and products for testing:

```bash
npx prisma db seed
```

---

## 🚀 Next Steps

### Phase 1: Core Setup (Week 1)
- [ ] Run database migration
- [ ] Create API routes for stores
- [ ] Create API routes for categories
- [ ] Test dynamic routing

### Phase 2: Vendor Features (Week 2)
- [ ] Build product creation form
- [ ] Implement order management
- [ ] Add analytics dashboard
- [ ] Store settings page

### Phase 3: Search & Discovery (Week 3)
- [ ] Implement advanced search API
- [ ] Add search suggestions
- [ ] Build filter components
- [ ] Add infinite scroll

### Phase 4: Reviews & Ratings (Week 4)
- [ ] Review submission form
- [ ] Review moderation
- [ ] Rating aggregation
- [ ] Verified purchase badges

### Phase 5: Scaling (Month 2+)
- [ ] Redis caching for search
- [ ] Elasticsearch integration
- [ ] CDN for images
- [ ] Load balancing
- [ ] Database indexing optimization

---

## 🏗️ Scalability Features

### Built for Millions of Items

#### 1. **Database Indexing**
```prisma
@@index([storeId])
@@index([categoryId])
@@index([slug])
@@index([featured])
@@index([price])
```

#### 2. **Cursor-Based Pagination**
```typescript
// More efficient than offset pagination
const products = await prisma.product.findMany({
  take: limit + 1,
  cursor: { id: lastProductId },
  skip: 1
});
```

#### 3. **Modular Architecture**
- Separate API routes per resource
- Reusable TypeScript types
- Component-based UI
- Lazy loading

#### 4. **Search Optimization**
- Full-text search with Prisma
- Tag-based filtering
- Price range indexing
- Category hierarchy

---

## 🎨 UI Components

### Created Components

1. **AdvancedSearch.tsx**
   - Multi-filter search interface
   - Collapsible panel
   - URL state management

2. **Store Page**
   - Store profile card
   - Product grid with view modes
   - Stats dashboard

3. **Category Page**
   - Category hero
   - Subcategories navigation
   - Filtered product list

4. **Vendor Dashboard**
   - Stats cards with icons
   - Alert notifications
   - Quick action cards

---

## 🔐 Access Control

### User Roles
```typescript
enum UserRole {
  CUSTOMER   // Default: Browse & purchase
  VENDOR     // Can create stores & products
  ADMIN      // Full access
}
```

### Route Protection
```typescript
// Vendor-only routes
/vendor/*           // Requires UserRole.VENDOR
/api/vendor/*       // Requires UserRole.VENDOR

// Admin-only routes
/admin/*            // Requires UserRole.ADMIN
/api/categories     // POST requires UserRole.ADMIN
```

---

## 📊 Analytics & Tracking

### Product Analytics
- Views count
- Sales count
- Add-to-cart rate
- Conversion rate

### Store Analytics
- Total revenue
- Order count
- Average rating
- Product performance

### Search Analytics
- Popular searches
- Zero-result queries
- Filter usage
- Category distribution

---

## 🎯 Success Metrics

### Platform Growth
- Total Stores
- Total Products
- Daily Active Users
- GMV (Gross Merchandise Value)

### Vendor Success
- Average revenue per store
- Products per store
- Orders per store
- Vendor satisfaction

### Customer Experience
- Search success rate
- Time to purchase
- Cart abandonment rate
- Return rate

---

## 🛠️ Development Tools

### Testing
```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Load testing
npm run test:load
```

### Monitoring
```bash
# Performance monitoring
npm run monitor

# Error tracking
# Use Sentry or similar

# Analytics
# Use Google Analytics or Mixpanel
```

---

## 📚 Additional Resources

### Documentation
- [Prisma Docs](https://www.prisma.io/docs)
- [Next.js Routing](https://nextjs.org/docs/app/building-your-application/routing)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

### Inspiration
- **Temu:** Category-first navigation
- **Taobao:** Store profiles & reviews
- **Amazon:** Advanced search filters
- **Shopee:** Vendor dashboard

---

## 🎉 Congratulations!

You now have a **production-ready multi-vendor marketplace** architecture that can scale to millions of products! 

**Next:** Implement the API routes and start building your marketplace empire! 🚀
