'use client';

import { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, User, Heart, ShoppingBag, Menu, X, ChevronDown,
  Package, Globe, Flame, Truck, MessageCircle, Send, LogIn, LogOut,
  Bell, Camera, Monitor, Smartphone, Laptop, Music, Star, Percent, Clock
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useUser } from '@/context/AuthContext';


const mainNav = [
  { name: 'Нүүр', href: '/', icon: Globe },
  { name: 'Шинэ ирсэн', href: '/new-arrivals', icon: Flame },
  { name: 'Бэлэн бараа', href: '/ready-to-ship', icon: Package },
  { name: 'Захиалга', href: '/pre-order', icon: Clock },
  { name: 'Онцлох', href: '/deals', icon: Star },
  { name: 'Хямдрал', href: '/sale', icon: Percent },
];

function FloatingNavbar() {
  const pathname = usePathname();
  const { user, isSignedIn } = useUser();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const cartItemsCount = useCartStore((state) => state.getTotalItems());
  const wishlistItemsCount = useWishlistStore((state) => state.getTotalItems());

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-[50] w-full transition-all duration-300 font-['Inter'] 
        ${scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm' : 'bg-white'}`}
      >
        {/* Row 1: Logo, Search, User Actions */}
        <div className="border-b border-slate-100/50">
          <div className="max-w-[1500px] mx-auto px-4 md:px-8 py-3 md:py-4 flex items-center justify-between gap-8">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/soyol-logo.png"
                alt="Soyol Video Shop"
                width={130}
                height={42}
                priority
                className="w-auto h-9 md:h-11 object-contain"
              />
            </Link>

            {/* Centered Search Bar */}
            <div className="hidden md:flex flex-1 max-w-2xl relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Search className="w-4 h-4 text-slate-400 group-focus-within:text-[#F57E20] transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Бүтээгдэхүүн хайх..."
                className="w-full pl-11 pr-4 py-2.5 bg-slate-100/50 border-none rounded-full text-sm 
                placeholder:text-slate-400 focus:ring-2 focus:ring-[#F57E20]/20 transition-all 
                shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]"
              />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1 md:gap-3">
              <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors relative">
                <Bell className="w-[22px] h-[22px] stroke-[1.5px]" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

              <Link href="/wishlist" className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors relative">
                <Heart className="w-[22px] h-[22px] stroke-[1.5px]" />
                {mounted && wishlistItemsCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#F57E20] text-white text-[10px] font-bold px-1.5 rounded-full ring-2 ring-white">
                    {wishlistItemsCount}
                  </span>
                )}
              </Link>

              <Link
                href="/cart"
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors relative"
              >
                <ShoppingBag className="w-[22px] h-[22px] stroke-[1.5px]" />
                {mounted && cartItemsCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#F57E20] text-white text-[10px] font-bold px-1.5 rounded-full ring-2 ring-white">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              <div className="h-6 w-px bg-slate-200 mx-1 hidden md:block"></div>

              {isSignedIn ? (
                <Link href="/dashboard" className="flex items-center gap-2 p-1 hover:bg-slate-50 rounded-full transition-all">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-[#F57E20]/20">
                    <Image src={user?.imageUrl || ''} alt="Profile" width={32} height={32} />
                  </div>
                </Link>
              ) : (
                <Link href="/login">
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-black transition-all">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">Нэвтрэх</span>
                  </button>
                </Link>
              )}

              {/* Mobile Search/Menu Toggles */}
              <button className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-full">
                <Search className="w-6 h-6" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-full"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Navigation Row */}
        <div className="hidden md:block bg-white/50 border-b border-slate-100/30">
          <div className="max-w-[1500px] mx-auto px-8 overflow-x-auto no-scrollbar">
            <nav className="flex items-center gap-10 py-2.5">
              {mainNav.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-2 py-1 text-[13px] font-semibold whitespace-nowrap transition-colors ${isActive ? 'text-[#F57E20]' : 'text-slate-500 hover:text-[#F57E20]'
                      }`}
                  >
                    <Icon className={`w-4 h-4 stroke-[1.2px] ${isActive ? 'text-[#F57E20]' : 'text-slate-400'}`} />
                    {link.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </header>



      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 bottom-0 w-[280px] bg-white shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b flex items-center justify-between bg-[#F57E20] text-white">
                <span className="font-bold text-lg tracking-tight">Цэс</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-black/10 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="p-4 flex flex-col gap-2">
                {mainNav.map(link => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-4 p-3.5 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold transition-colors"
                  >
                    <link.icon className="w-5 h-5 text-[#F57E20]" />
                    {link.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default memo(FloatingNavbar);
