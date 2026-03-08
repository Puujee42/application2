'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, User, Heart, ShoppingBag, MessageCircle, Package,
  ChevronDown, Menu, X
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function VibrantNavbar() {
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItemsCount = useCartStore((state) => state.items.length);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 relative h-12 w-24">
            <Image
              src="/soyol-logo.png"
              alt="Soyol"
              fill
              className="object-contain object-left"
              sizes="96px"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            
            {/* Бараа Dropdown - VIBRANT ORANGE */}
            <div 
              className="relative"
              onMouseEnter={() => setIsProductsDropdownOpen(true)}
              onMouseLeave={() => setIsProductsDropdownOpen(false)}
            >
              <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
                <span>Бараа</span>
                <ChevronDown className="w-4 h-4" strokeWidth={2.5} />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isProductsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
                  >
                    <Link 
                      href="/ready-to-ship"
                      className="flex items-center gap-3 px-5 py-4 hover:bg-emerald-50 transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="font-semibold text-gray-900">Бэлэн байгаа</span>
                    </Link>
                    <Link 
                      href="/pre-order"
                      className="flex items-center gap-3 px-5 py-4 hover:bg-orange-50 transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full bg-orange-500" />
                      <span className="font-semibold text-gray-900">Захиалгаар</span>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search Icon Button */}
            <button className="p-3 hover:bg-gray-100 rounded-xl transition-colors">
              <Search className="w-5 h-5 text-gray-700" strokeWidth={2} />
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="hidden lg:flex items-center gap-4">
            
            {/* Profile */}
            <Link href="/account">
              <motion.div
                whileHover={{ y: -2 }}
                className="flex flex-col items-center gap-1 cursor-pointer group"
              >
                <div className="p-3 bg-gray-100 rounded-xl group-hover:bg-orange-500 transition-colors">
                  <User className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors" strokeWidth={2} />
                </div>
                <span className="text-xs font-semibold text-gray-700 group-hover:text-orange-500 transition-colors">
                  Профайл
                </span>
              </motion.div>
            </Link>

            {/* Messages */}
            <Link href="/messages">
              <motion.div
                whileHover={{ y: -2 }}
                className="flex flex-col items-center gap-1 cursor-pointer group"
              >
                <div className="p-3 bg-gray-100 rounded-xl group-hover:bg-blue-500 transition-colors relative">
                  <MessageCircle className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors" strokeWidth={2} />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    3
                  </span>
                </div>
                <span className="text-xs font-semibold text-gray-700 group-hover:text-blue-500 transition-colors">
                  Зурвас
                </span>
              </motion.div>
            </Link>

            {/* Orders */}
            <Link href="/track">
              <motion.div
                whileHover={{ y: -2 }}
                className="flex flex-col items-center gap-1 cursor-pointer group"
              >
                <div className="p-3 bg-gray-100 rounded-xl group-hover:bg-purple-500 transition-colors">
                  <Package className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors" strokeWidth={2} />
                </div>
                <span className="text-xs font-semibold text-gray-700 group-hover:text-purple-500 transition-colors">
                  Захиалга
                </span>
              </motion.div>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <motion.div
                whileHover={{ y: -2 }}
                className="flex flex-col items-center gap-1 cursor-pointer group"
              >
                <div className="p-3 bg-gray-100 rounded-xl group-hover:bg-orange-500 transition-colors relative">
                  <ShoppingBag className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors" strokeWidth={2} />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-orange-500">
                      {cartItemsCount}
                    </span>
                  )}
                </div>
                <span className="text-xs font-semibold text-gray-700 group-hover:text-orange-500 transition-colors">
                  Сагс
                </span>
              </motion.div>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" strokeWidth={2} />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" strokeWidth={2} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-t border-gray-200 bg-white overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Хайх..."
                  className="w-full px-4 py-3 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>

              {/* Mobile Links */}
              <div className="space-y-2">
                <Link href="/ready-to-ship" className="block py-3 px-4 bg-emerald-50 text-emerald-700 font-bold rounded-xl">
                  🚚 Бэлэн байгаа
                </Link>
                <Link href="/pre-order" className="block py-3 px-4 bg-orange-50 text-orange-700 font-bold rounded-xl">
                  ✈️ Захиалгаар
                </Link>
                <Link href="/account" className="block py-3 px-4 hover:bg-gray-100 rounded-xl font-semibold">
                  👤 Профайл
                </Link>
                <Link href="/track" className="block py-3 px-4 hover:bg-gray-100 rounded-xl font-semibold">
                  📦 Захиалга хянах
                </Link>
                <Link href="/cart" className="block py-3 px-4 hover:bg-gray-100 rounded-xl font-semibold">
                  🛒 Сагс ({cartItemsCount})
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
