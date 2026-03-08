'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, User, Heart, ShoppingBag, Menu, X, ChevronDown,
  Globe, HelpCircle, Package, LayoutGrid
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import MegaMenu from './MegaMenu';

// Mock data for mega menu categories
const megaMenuCategories = [
  {
    id: 'electronics',
    name: 'Electronics',
    icon: '💻',
    subcategories: [
      { name: 'Smartphones', href: '/category/smartphones' },
      { name: 'Laptops', href: '/category/laptops' },
      { name: 'Tablets', href: '/category/tablets' },
      { name: 'Smartwatches', href: '/category/smartwatches' },
      { name: 'Headphones', href: '/category/headphones' },
      { name: 'Cameras', href: '/category/cameras' },
      { name: 'Gaming', href: '/category/gaming' },
      { name: 'Accessories', href: '/category/accessories' },
      { name: 'Audio', href: '/category/audio' },
      { name: 'TV & Home Theater', href: '/category/tv' },
    ],
    featured: {
      title: 'iPhone 15 Pro Max',
      image: 'https://images.unsplash.com/photo-1592286927505-b87b1953cc09?w=400&h=300&fit=crop',
      href: '/product/iphone-15-pro',
    },
  },
  {
    id: 'fashion',
    name: 'Fashion',
    icon: '👗',
    subcategories: [
      { name: "Men's Clothing", href: '/category/mens-clothing' },
      { name: "Women's Clothing", href: '/category/womens-clothing' },
      { name: 'Shoes', href: '/category/shoes' },
      { name: 'Bags', href: '/category/bags' },
      { name: 'Jewelry', href: '/category/jewelry' },
      { name: 'Watches', href: '/category/watches' },
      { name: 'Sunglasses', href: '/category/sunglasses' },
      { name: 'Accessories', href: '/category/fashion-accessories' },
    ],
    featured: {
      title: 'Summer Collection 2026',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
      href: '/collection/summer-2026',
    },
  },
  {
    id: 'home',
    name: 'Home & Living',
    icon: '🏠',
    subcategories: [
      { name: 'Furniture', href: '/category/furniture' },
      { name: 'Decor', href: '/category/decor' },
      { name: 'Kitchen', href: '/category/kitchen' },
      { name: 'Bedding', href: '/category/bedding' },
      { name: 'Storage', href: '/category/storage' },
      { name: 'Lighting', href: '/category/lighting' },
      { name: 'Garden', href: '/category/garden' },
      { name: 'Tools', href: '/category/tools' },
    ],
    featured: {
      title: 'Modern Minimalist Furniture',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
      href: '/collection/minimalist',
    },
  },
  {
    id: 'beauty',
    name: 'Beauty & Health',
    icon: '💄',
    subcategories: [
      { name: 'Skincare', href: '/category/skincare' },
      { name: 'Makeup', href: '/category/makeup' },
      { name: 'Fragrance', href: '/category/fragrance' },
      { name: 'Hair Care', href: '/category/hair-care' },
      { name: 'Personal Care', href: '/category/personal-care' },
      { name: 'Vitamins', href: '/category/vitamins' },
      { name: 'Fitness', href: '/category/fitness' },
      { name: 'Wellness', href: '/category/wellness' },
    ],
    featured: {
      title: 'Premium Skincare',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop',
      href: '/collection/skincare',
    },
  },
];

const trendingCategories = [
  { name: 'Electronics', href: '/category/electronics' },
  { name: 'Fashion', href: '/category/fashion' },
  { name: 'Home', href: '/category/home' },
  { name: 'Beauty', href: '/category/beauty' },
  { name: 'Sports', href: '/category/sports' },
  { name: 'Toys', href: '/category/toys' },
];

const searchCategories = [
  'All Categories',
  'Electronics',
  'Fashion',
  'Home',
  'Beauty',
  'Sports',
];

export default function EnterpriseNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [selectedSearchCategory, setSelectedSearchCategory] = useState('All Categories');
  const [language, setLanguage] = useState<'MN' | 'EN'>('EN');
  
  const cartItemsCount = useCartStore((state) => state.items.length);
  const wishlistCount = 3; // Mock wishlist count

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
      scrolled ? 'shadow-md' : ''
    }`}>
      
      {/* TOP BAR */}
      <div className="hidden sm:block bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
          <div className="flex items-center justify-between text-xs">
            {/* Left */}
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={() => setLanguage(language === 'EN' ? 'MN' : 'EN')}
                className="flex items-center gap-1 text-slate-600 hover:text-slate-900 transition-colors"
              >
                <Globe className="w-3.5 h-3.5" strokeWidth={2} />
                <span className="font-medium">{language}</span>
                <ChevronDown className="w-3 h-3" strokeWidth={2} />
              </button>
              
              <Link href="/help" className="hidden md:flex items-center gap-1 text-slate-600 hover:text-slate-900 transition-colors">
                <HelpCircle className="w-3.5 h-3.5" strokeWidth={2} />
                <span>Help Center</span>
              </Link>
            </div>

            {/* Right */}
            <Link href="/track" className="flex items-center gap-1 text-slate-600 hover:text-[#FF4000] transition-colors">
              <Package className="w-3.5 h-3.5" strokeWidth={2} />
              <span className="font-medium">Track Order</span>
            </Link>
          </div>
        </div>
      </div>

      {/* MAIN NAVIGATION */}
      <div className="border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4">
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 relative h-8 sm:h-9 md:h-10 w-24 sm:w-28 md:w-32">
              <Image
                src="/soyol-logo.png"
                alt="Logo"
                fill
                className="object-contain object-left"
                sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
              />
            </Link>

            {/* Search Bar - Large & Prominent */}
            <div className="hidden md:flex flex-1 max-w-3xl">
              <div className="flex w-full border border-slate-300 rounded-lg overflow-hidden hover:border-[#FF4000] transition-colors">
                {/* Category Dropdown */}
                <div className="relative">
                  <button className="h-full px-4 bg-slate-50 border-r border-slate-300 hover:bg-slate-100 transition-colors flex items-center gap-2 text-sm font-medium text-slate-700 whitespace-nowrap">
                    <span className="hidden xl:inline">{selectedSearchCategory}</span>
                    <span className="xl:hidden">All</span>
                    <ChevronDown className="w-4 h-4" strokeWidth={2} />
                  </button>
                </div>

                {/* Search Input */}
                <input
                  type="text"
                  placeholder="Search for products, brands, and more..."
                  className="flex-1 px-4 py-3 outline-none text-sm"
                />

                {/* Search Button */}
                <button className="px-8 bg-[#FF4000] text-white hover:bg-[#E63600] transition-colors flex items-center justify-center">
                  <Search className="w-5 h-5" strokeWidth={2} />
                </button>
              </div>
            </div>

            {/* Action Icons */}
            <div className="hidden md:flex items-center gap-3 lg:gap-6">
              
              {/* Account Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsAccountDropdownOpen(true)}
                onMouseLeave={() => setIsAccountDropdownOpen(false)}
              >
                <button className="flex flex-col items-center gap-0.5 lg:gap-1 text-slate-700 hover:text-[#FF4000] transition-colors">
                  <User className="w-5 h-5 lg:w-6 lg:h-6" strokeWidth={1.5} />
                  <span className="text-[9px] lg:text-[10px] font-medium hidden lg:block">Account</span>
                </button>

                {/* Account Dropdown Menu */}
                <AnimatePresence>
                  {isAccountDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden"
                    >
                      <Link href="/login" className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                        Sign In
                      </Link>
                      <Link href="/register" className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                        Register
                      </Link>
                      <div className="border-t border-slate-200" />
                      <Link href="/account" className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                        My Account
                      </Link>
                      <Link href="/orders" className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                        Orders
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Wishlist */}
              <Link href="/wishlist" className="relative flex flex-col items-center gap-0.5 lg:gap-1 text-slate-700 hover:text-[#FF4000] transition-colors">
                <div className="relative">
                  <Heart className="w-5 h-5 lg:w-6 lg:h-6" strokeWidth={1.5} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 lg:w-5 lg:h-5 bg-[#FF4000] text-white text-[9px] lg:text-[10px] font-bold rounded-full flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </div>
                <span className="text-[9px] lg:text-[10px] font-medium hidden lg:block">Wishlist</span>
              </Link>

              {/* Cart */}
              <Link href="/cart" className="relative flex flex-col items-center gap-0.5 lg:gap-1 text-slate-700 hover:text-[#FF4000] transition-colors">
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 lg:w-6 lg:h-6" strokeWidth={1.5} />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 lg:w-5 lg:h-5 bg-[#FF4000] text-white text-[9px] lg:text-[10px] font-bold rounded-full flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </div>
                <span className="text-[9px] lg:text-[10px] font-medium hidden lg:block">Cart</span>
              </Link>
            </div>

            {/* Mobile Action Icons (Wishlist & Cart) */}
            <div className="flex md:hidden items-center gap-2">
              <Link href="/wishlist" className="relative p-2">
                <Heart className="w-5 h-5" strokeWidth={2} />
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-[#FF4000] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link href="/cart" className="relative p-2">
                <ShoppingBag className="w-5 h-5" strokeWidth={2} />
                {cartItemsCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-[#FF4000] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 -mr-2"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" strokeWidth={2} />
              ) : (
                <Menu className="w-6 h-6" strokeWidth={2} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* CATEGORY NAVIGATION */}
      <div className="hidden lg:block bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-1">
            
            {/* All Categories - Mega Menu Trigger */}
            <div className="relative">
              <button
                onMouseEnter={() => setIsMegaMenuOpen(true)}
                className="flex items-center gap-2 px-4 py-3 bg-[#FF4000] text-white hover:bg-[#E63600] transition-colors font-medium text-sm"
              >
                <LayoutGrid className="w-4 h-4" strokeWidth={2} />
                <span>All Categories</span>
                <ChevronDown className="w-4 h-4" strokeWidth={2} />
              </button>

              {/* Mega Menu Component */}
              <MegaMenu
                isOpen={isMegaMenuOpen}
                categories={megaMenuCategories}
                onClose={() => setIsMegaMenuOpen(false)}
              />
            </div>

            {/* Trending Categories */}
            {trendingCategories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="px-4 py-3 text-sm font-medium text-slate-700 hover:text-[#FF4000] hover:bg-white transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu - Slide-Out Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Slide-Out Drawer from Right */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ 
                type: 'spring', 
                stiffness: 300, 
                damping: 30,
                mass: 0.8
              }}
              className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-white shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="sticky top-0 bg-gradient-to-r from-[#FF4000] to-[#E63600] px-6 py-4 flex items-center justify-between shadow-lg z-10">
                <h2 className="text-lg font-bold text-white">Menu</h2>
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5 text-white" strokeWidth={2.5} />
                </motion.button>
              </div>

              {/* Mobile Search */}
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-4 py-3 pl-10 border border-slate-300 rounded-lg outline-none focus:border-[#FF4000] focus:ring-2 focus:ring-[#FF4000]/20 transition-all text-sm"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={2} />
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="px-6 py-4 space-y-1">
                {/* Account Actions */}
                <div className="mb-4">
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#FF4000] to-[#E63600] text-white rounded-xl shadow-md mb-2"
                    >
                      <User className="w-5 h-5" strokeWidth={2} />
                      <span className="font-semibold text-sm">Sign In / Register</span>
                    </motion.div>
                  </Link>
                </div>

                {/* Quick Actions */}
                <Link href="/wishlist">
                  <motion.div
                    onClick={() => setIsMobileMenuOpen(false)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-between px-4 py-3.5 rounded-xl text-slate-700 hover:bg-slate-50 font-medium transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Heart className="w-5 h-5 flex-shrink-0" strokeWidth={2} />
                      <span className="text-[15px]">Wishlist</span>
                    </div>
                    {wishlistCount > 0 && (
                      <span className="px-2 py-1 bg-[#FF4000] text-white text-xs font-bold rounded-full">
                        {wishlistCount}
                      </span>
                    )}
                  </motion.div>
                </Link>

                <Link href="/cart">
                  <motion.div
                    onClick={() => setIsMobileMenuOpen(false)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-between px-4 py-3.5 rounded-xl text-slate-700 hover:bg-slate-50 font-medium transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <ShoppingBag className="w-5 h-5 flex-shrink-0" strokeWidth={2} />
                      <span className="text-[15px]">Cart</span>
                    </div>
                    {cartItemsCount > 0 && (
                      <span className="px-2 py-1 bg-[#FF4000] text-white text-xs font-bold rounded-full">
                        {cartItemsCount}
                      </span>
                    )}
                  </motion.div>
                </Link>

                <Link href="/track">
                  <motion.div
                    onClick={() => setIsMobileMenuOpen(false)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-slate-700 hover:bg-slate-50 font-medium transition-all"
                  >
                    <Package className="w-5 h-5 flex-shrink-0" strokeWidth={2} />
                    <span className="text-[15px]">Track Order</span>
                  </motion.div>
                </Link>

                <Link href="/help">
                  <motion.div
                    onClick={() => setIsMobileMenuOpen(false)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-slate-700 hover:bg-slate-50 font-medium transition-all"
                  >
                    <HelpCircle className="w-5 h-5 flex-shrink-0" strokeWidth={2} />
                    <span className="text-[15px]">Help Center</span>
                  </motion.div>
                </Link>

                {/* Divider */}
                <div className="h-px bg-slate-200 my-4" />

                {/* Categories */}
                <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Categories
                </p>
                {trendingCategories.map((cat) => (
                  <Link key={cat.name} href={cat.href}>
                    <motion.div
                      onClick={() => setIsMobileMenuOpen(false)}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-50 font-medium transition-all"
                    >
                      <span className="text-[15px]">{cat.name}</span>
                    </motion.div>
                  </Link>
                ))}

                {/* Divider */}
                <div className="h-px bg-slate-200 my-4" />

                {/* Language Selector */}
                <button
                  onClick={() => setLanguage(language === 'EN' ? 'MN' : 'EN')}
                  className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-slate-700 hover:bg-slate-50 font-medium transition-all"
                >
                  <Globe className="w-5 h-5 flex-shrink-0" strokeWidth={2} />
                  <span className="text-[15px]">Language: {language}</span>
                </button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
