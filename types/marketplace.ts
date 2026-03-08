// ==========================================
// MULTI-VENDOR MARKETPLACE TYPES
// ==========================================

export type UserRole = 'CUSTOMER' | 'VENDOR' | 'ADMIN';

export type OrderStatus = 
  | 'PENDING' 
  | 'CONFIRMED' 
  | 'PROCESSING' 
  | 'SHIPPED' 
  | 'DELIVERED' 
  | 'CANCELLED' 
  | 'REFUNDED';

export type StoreStatus = 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'CLOSED';

export interface Store {
  id: string;
  handle: string;
  name: string;
  description?: string;
  logo?: string;
  banner?: string;
  vendorId: string;
  status: StoreStatus;
  rating: number;
  totalSales: number;
  totalOrders: number;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  icon?: string;
  image?: string;
  parentId?: string;
  children?: Category[];
  productCount?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  images: string[];
  price: number;
  comparePrice?: number;
  cost?: number;
  sku?: string;
  quantity: number;
  stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock' | 'pre-order';
  storeId: string;
  store?: Store;
  categoryId: string;
  category?: Category;
  rating: number;
  totalReviews: number;
  totalSales: number;
  views: number;
  featured: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  rating: number;
  comment?: string;
  images: string[];
  productId: string;
  userId: string;
  user?: {
    id: string;
    name?: string;
    image?: string;
  };
  verified: boolean;
  helpful: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  fullName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  district?: string;
  postalCode?: string;
  country: string;
  notes?: string;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  totalPrice: number;
  status: OrderStatus;
  paymentMethod?: string;
  paymentStatus: string;
  trackingNumber?: string;
  items?: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product?: Product;
  storeId: string;
  store?: Store;
  quantity: number;
  price: number;
  subtotal: number;
  status: string;
}

export interface VendorStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  avgRating: number;
  pendingOrders: number;
  lowStockProducts: number;
}

export interface SearchFilters {
  query?: string;
  categorySlug?: string;
  storeHandle?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
  featured?: boolean;
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'popular';
  page?: number;
  limit?: number;
}

export interface SearchResult {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
  filters: {
    categories: { slug: string; name: string; count: number }[];
    priceRange: { min: number; max: number };
    stores: { handle: string; name: string; count: number }[];
  };
}
