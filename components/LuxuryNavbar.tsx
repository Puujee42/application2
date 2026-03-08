'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Search, User, Heart, ShoppingBag, Menu, X,
  Globe, ArrowRight, Sparkles, Tag, TrendingUp, Truck, Zap,
  Package, LogOut, LayoutDashboard, Video, MessageCircle, LayoutGrid
} from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { useDebounce } from '@/lib/hooks/useDebounce';
import LanguageCurrencySelector from './LanguageCurrencySelector';
import SearchDropdown from './SearchDropdown';
import NotificationBell from './NotificationBell';
import { Suspense } from 'react';

function SearchParamsHandler({ setSearchQuery, pathname }: { setSearchQuery: (q: string) => void, pathname: string }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname === '/search') {
      const q = searchParams.get('q');
      setSearchQuery(q ?? '');
    }
  }, [pathname, searchParams, setSearchQuery]);

  return null;
}

export default function LuxuryNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated: isLoggedIn, isAdmin, logout } = useAuth();

  const userEmail = user?.email || user?.phone || '';
  const { language, currency, setLanguage } = useLanguage();
  const { t } = useTranslation();

  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<{ id: string; name: string; price: number; image?: string | null; category?: string }[]>([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [wishlistBump, setWishlistBump] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const cartItemsCount = useCartStore((state) => state.getTotalItems());
  const wishlistItemsCount = useWishlistStore((state) => state.getTotalItems());

  useEffect(() => {
    if (wishlistItemsCount > 0) {
      setWishlistBump(true);
      const timer = setTimeout(() => setWishlistBump(false), 300);
      return () => clearTimeout(timer);
    }
  }, [wishlistItemsCount]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setUserMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setUserMenuOpen(false);
    await logout();
  };

  useEffect(() => {
    const q = debouncedSearchQuery.trim();
    if (!q) {
      setSearchResults([]);
      return;
    }
    let cancelled = false;
    setIsLoadingSearch(true);
    fetch(`/api/products?q=${encodeURIComponent(q)}&limit=8`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setSearchResults(data.products || []);
      })
      .catch(() => {
        if (!cancelled) setSearchResults([]);
      })
      .finally(() => {
        if (!cancelled) setIsLoadingSearch(false);
      });
    return () => { cancelled = true; };
  }, [debouncedSearchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed) {
      setMobileMenuOpen(false);
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  const categories = [
    { name: t('nav', 'home'), href: '/', icon: Sparkles },
    { name: t('nav', 'newArrivals'), href: '/new-arrivals', icon: TrendingUp },
    { name: t('nav', 'readyToShip'), href: '/ready-to-ship', icon: Truck },
    { name: t('nav', 'preOrder'), href: '/pre-order', icon: Globe },
    { name: t('nav', 'deals'), href: '/deals', icon: Tag },
    { name: t('nav', 'sale'), href: '/sale', icon: Zap },
  ];

  // Mobile navigation bottom bar items
  const mobileNavItems = [
    { name: t('nav', 'home'), href: '/', icon: Sparkles },
    { name: t('nav', 'categories') || 'Категори', href: '/categories', icon: LayoutGrid },
    { name: t('nav', 'search'), href: '/search', icon: Search },
    { name: t('nav', 'cart'), href: '/cart', icon: ShoppingBag, count: cartItemsCount, badgeColor: 'bg-red-500' },
    { name: t('nav', 'profile'), href: isLoggedIn ? '/profile' : '/sign-in', icon: User },
  ];

  return (
    <>
      <Suspense fallback={null}>
        <SearchParamsHandler setSearchQuery={setSearchQuery} pathname={pathname} />
      </Suspense>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 pb-safe ${scrolled
          ? 'bg-white border-b border-orange-100/50 shadow-lg shadow-orange-50/50'
          : 'bg-white border-b border-gray-100/30'
          }`}
        style={{
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className={`relative z-50 flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-16 lg:h-18' : 'h-16 lg:h-24'
              }`}>

              <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
                <motion.div
                  initial={{ opacity: 1, x: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="relative flex flex-col items-start"
                >
                  <motion.h1
                    className="text-2xl font-black tracking-tighter leading-none text-[#FF5000]"
                    whileHover={{
                      scale: 1.05,
                      textShadow: "0 0 12px rgba(255,80,0,0.4)"
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    Soyol
                  </motion.h1>
                  <motion.span
                    className="text-[9px] font-bold tracking-[0.2em] text-slate-400 uppercase leading-none ml-0.5 mt-0.5"
                    whileHover={{ color: "#FF5000" }}
                  >
                    Video Shop
                  </motion.span>
                </motion.div>
              </Link>

              <div className="hidden md:flex flex-1 items-center justify-center max-w-[500px] lg:max-w-[600px] mx-4 lg:mx-8 z-20">
                <form onSubmit={handleSearch} className="relative w-full">
                  <motion.div
                    className={`relative w-full group rounded-2xl transition-all duration-300 ${searchFocused
                      ? 'bg-white border-2 border-[#FF5000] shadow-md'
                      : 'bg-white border border-gray-100 hover:border-gray-200 shadow-sm'
                      }`}
                    animate={{
                      scale: searchFocused ? 1.02 : 1,
                      y: searchFocused ? -2 : 0
                    }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="relative flex items-center rounded-2xl h-full w-full overflow-hidden">
                      <motion.div
                        animate={{
                          scale: searchFocused ? 1.2 : 1,
                          rotate: searchFocused ? 15 : 0,
                          y: searchFocused ? [0, -3, 0] : 0
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                          y: { duration: 0.4, repeat: searchFocused ? 0 : 0 }
                        }}
                        className="pl-4"
                      >
                        <Search className={`w-5 h-5 transition-colors duration-300 ${searchFocused ? 'text-[#FF5000]' : 'text-gray-400 group-hover:text-[#FF5000]'
                          }`} strokeWidth={1.5} />
                      </motion.div>

                      <input
                        type="text"
                        placeholder={t('nav', 'search')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setTimeout(() => setSearchFocused(false), 180)}
                        className="flex-1 px-4 py-3 bg-transparent text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none transition-all"
                        autoComplete="off"
                      />

                      <AnimatePresence>
                        {searchQuery && (
                          <motion.button
                            type="button"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            onClick={() => setSearchQuery('')}
                            className="p-1.5 mr-1 hover:bg-gray-100 rounded-full transition-colors"
                          >
                            <X className="w-4 h-4 text-gray-400 hover:text-gray-600" strokeWidth={1.5} />
                          </motion.button>
                        )}
                      </AnimatePresence>

                      <motion.button
                        type="submit"
                        aria-label={t('nav', 'search')}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          const trimmed = searchQuery.trim();
                          if (trimmed) {
                            e.preventDefault();
                            setMobileMenuOpen(false);
                            router.push(`/search?q=${encodeURIComponent(trimmed)}`);
                          }
                        }}
                        className={`mr-1.5 p-2 rounded-full transition-all duration-300 ${searchFocused || searchQuery
                          ? 'bg-[#FF5000] text-white shadow-lg shadow-orange-500/30'
                          : 'bg-gray-100 text-gray-400 group-hover:bg-[#FF5000] group-hover:text-white group-hover:shadow-md'
                          }`}
                      >
                        <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                      </motion.button>
                    </div>
                  </motion.div>
                </form>
                <SearchDropdown
                  results={searchResults}
                  isVisible={searchFocused && searchQuery.trim().length > 0}
                  onClose={() => setSearchFocused(false)}
                  onMouseDown={() => { }}
                  isLoading={isLoadingSearch}
                />
              </div>

              <motion.div
                animate={{ scale: scrolled ? 0.9 : 1 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex items-center gap-4 lg:gap-4 flex-shrink-0"
              >
                <div className="hidden lg:block">
                  <LanguageCurrencySelector />
                </div>

                <div className="relative" ref={userMenuRef}>
                  {isLoggedIn ? (
                    <>
                      <motion.button
                        type="button"
                        onClick={() => setUserMenuOpen((o) => !o)}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 p-1.5 hover:bg-gray-50 rounded-2xl transition-colors group cursor-pointer border border-transparent hover:border-gray-200"
                      >
                        {user?.imageUrl ? (
                          <img
                            src={user.imageUrl}
                            alt=""
                            className="w-8 h-8 rounded-xl object-cover border border-gray-100"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center">
                            <span className="text-orange-500 font-bold text-xs">{
                              (user?.name?.[0] || user?.phone?.[0] || 'U').toUpperCase()
                            }</span>
                          </div>
                        )}
                        <span className="hidden sm:inline text-sm font-semibold text-gray-700 group-hover:text-[#FF5000] max-w-[120px] truncate">
                          {user?.name || user?.phone || t('nav', 'profile')}
                        </span>
                      </motion.button>
                      <AnimatePresence>
                        {userMenuOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -8, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.96 }}
                            transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="absolute right-0 top-full mt-2 w-64 rounded-2xl bg-white shadow-xl border border-gray-200 overflow-hidden z-[100]"
                          >
                            <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white">
                              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">{t('nav', 'email')}</p>
                              <p className="text-sm text-gray-900 truncate mt-0.5">
                                {userEmail || '—'}
                              </p>
                              {isAdmin && (
                                <span className="inline-block mt-1.5 px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-xs font-medium">{t('nav', 'admin')}</span>
                              )}
                            </div>
                            <div className="py-1">
                              <Link
                                href="/orders"
                                onClick={() => setUserMenuOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                              >
                                <Package className="w-4 h-4 text-gray-500" strokeWidth={1.2} />
                                {t('nav', 'myOrders')}
                              </Link>
                              {isAdmin && (
                                <Link
                                  href="/admin"
                                  onClick={() => setUserMenuOpen(false)}
                                  className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                                >
                                  <LayoutDashboard className="w-4 h-4 text-gray-500" strokeWidth={1.2} />
                                  {t('nav', 'adminPanel')}
                                </Link>
                              )}
                              <button
                                type="button"
                                onClick={handleSignOut}
                                className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                              >
                                <LogOut className="w-4 h-4 text-gray-500" strokeWidth={1.2} />
                                {t('nav', 'signOut')}
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link href="/sign-in" className="hidden md:flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg transition-colors group">
                      <User className="w-5 h-5 text-gray-600 group-hover:text-orange-500" strokeWidth={1.2} />
                      <span className="text-sm font-medium text-gray-600 group-hover:text-orange-500">{t('nav', 'signIn')}</span>
                    </Link>
                  )}
                </div>

                <NotificationBell />

                <Link href="/wishlist">
                  <motion.div
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    animate={wishlistBump ? { x: [0, -4, 4, -4, 4, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    className="relative p-2 hover:bg-gray-50 rounded-2xl transition-colors group cursor-pointer border border-transparent hover:border-gray-100"
                  >
                    <Heart className={`w-5 h-5 transition-colors ${mounted && wishlistItemsCount > 0 ? 'text-[#FF5000] fill-orange-50' : 'text-gray-600 group-hover:text-[#FF5000]'}`} strokeWidth={1.2} />
                    {mounted && wishlistItemsCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF5000] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm"
                      >
                        {wishlistItemsCount}
                      </motion.span>
                    )}
                  </motion.div>
                </Link>


                <motion.button
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden md:flex items-center gap-2 p-2 rounded-2xl hover:bg-gray-50 relative group transition-all border border-transparent hover:border-gray-100"
                  onClick={() => router.push('/cart')}
                >
                  <ShoppingBag className="w-5 h-5 text-gray-600 group-hover:text-[#FF5000] transition-colors" strokeWidth={1.2} />
                  {mounted && cartItemsCount > 0 && (
                    <>
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF5000] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm"
                      >
                        {cartItemsCount}
                      </motion.span>
                      <motion.span
                        animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF5000] rounded-full pointer-events-none"
                      />
                    </>
                  )}
                </motion.button>

                {/* Mobile Menu Button */}
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  className="md:hidden p-2 hover:bg-gray-50 rounded-xl transition-colors text-gray-600 border border-transparent active:border-gray-200"
                >
                  <Menu className="w-6 h-6" strokeWidth={1.2} />
                </button>
              </motion.div>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className={`lg:hidden relative z-10 transition-all duration-500 overflow-hidden ${scrolled ? 'h-0 opacity-0 py-0 mt-0' : 'h-auto py-2 opacity-100 mt-2 bg-white border-b border-gray-100 shadow-sm'}`}>
            <form onSubmit={handleSearch} className="relative w-full px-4 mb-2">
              <motion.div
                layout
                className={`relative flex items-center transition-all duration-300 rounded-2xl shadow-sm bg-gray-50 ${searchQuery ? 'bg-white shadow-md' : ''} h-12`}
              >
                <div className="pl-4 flex items-center">
                  <Search className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
                </div>
                <input
                  type="text"
                  placeholder={t('nav', 'search')}
                  className="flex-1 bg-transparent border-none outline-none px-3 font-medium text-gray-900 placeholder:text-gray-400 text-base h-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => {
                    if (pathname !== '/search') {
                      router.push('/search');
                    }
                  }}
                />
                <div className="flex items-center pr-3">
                  <AnimatePresence>
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200/50 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </form>
          </div>
        </div>

        <div className="hidden lg:block border-t border-gray-100/50">
          <div className="px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center justify-center gap-1">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = pathname === category.href;

                return (
                  <Link key={category.href} href={category.href}>
                    <motion.div
                      className="relative px-4 py-4 group cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <div className={`flex items-center gap-2 transition-all duration-300 ${isActive
                        ? 'text-orange-600 drop-shadow-[0_0_8px_rgba(249,115,22,0.3)]'
                        : 'text-gray-600 hover:text-orange-500 hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.2)]'
                        }`}>
                        <Icon className={`w-4 h-4 transition-colors duration-300 ${isActive ? 'text-orange-600' : 'group-hover:text-orange-500'
                          }`} strokeWidth={1.2} />
                        <span className="text-sm font-semibold tracking-tight">
                          {category.name}
                        </span>
                      </div>

                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mx-4"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </motion.header >

      <div className={scrolled ? 'h-[80px] lg:h-[96px]' : 'h-[180px] lg:h-[112px]'} />

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[100] w-full max-w-sm bg-white shadow-2xl lg:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-white to-orange-50/20">
                <h2 className="text-lg font-bold text-gray-900">{t('nav', 'menu')}</h2>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" strokeWidth={1.2} />
                </button>
              </div>

              <div className="px-6 py-4 border-b border-gray-50">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder={t('nav', 'search')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 pl-11 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={1.5} />
                </form>
              </div>

              <div className="px-6 py-4 border-b border-gray-100 space-y-1">
                {isLoggedIn ? (
                  <>
                    <Link href="/orders" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-50 text-gray-700">
                      <Package className="w-5 h-5 text-gray-500" strokeWidth={1.2} />
                      <span className="font-semibold">{t('nav', 'myOrders')}</span>
                    </Link>
                    {isAdmin && (
                      <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-amber-50 text-gray-700">
                        <LayoutDashboard className="w-5 h-5 text-gray-500" strokeWidth={1.2} />
                        <span className="font-semibold">{t('nav', 'adminPanel')}</span>
                      </Link>
                    )}
                    <button type="button" onClick={() => { handleSignOut(); setMobileMenuOpen(false); }} className="flex w-full items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600">
                      <LogOut className="w-5 h-5" strokeWidth={1.2} />
                      <span className="font-semibold">{t('nav', 'signOut')}</span>
                    </button>
                  </>
                ) : (
                  <div className="py-2">
                    <p className="text-xs font-medium text-gray-400 px-4 mb-2 uppercase tracking-widest">{t('nav', 'account')}</p>
                    <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 font-semibold">
                      <User className="w-5 h-5 text-gray-400" strokeWidth={1.2} />
                      {t('nav', 'signIn')}
                    </Link>
                  </div>
                )}
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6">
                <div className="space-y-2">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    const isActive = pathname === category.href;

                    return (
                      <Link key={category.href} href={category.href}>
                        <motion.div
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${isActive
                            ? 'bg-gradient-to-r from-orange-50 to-orange-100 text-orange-600'
                            : 'hover:bg-gray-50 text-gray-600'
                            }`}
                        >
                          <Icon className="w-5 h-5" strokeWidth={1.2} />
                          <span className="font-semibold">{category.name}</span>
                        </motion.div>
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-orange-500" strokeWidth={1.5} />
                      <span className="font-semibold text-gray-900">{t('nav', 'language')}</span>
                    </div>
                    <div className="flex items-center bg-gray-200 rounded-lg p-1 gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setLanguage('MN');
                        }}
                        className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all duration-200 ${language === 'MN'
                          ? 'bg-white text-orange-600 shadow-sm'
                          : 'text-gray-500 hover:text-gray-700'
                          }`}
                      >
                        MN
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setLanguage('EN');
                        }}
                        className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all duration-200 ${language === 'EN'
                          ? 'bg-white text-orange-600 shadow-sm'
                          : 'text-gray-500 hover:text-gray-700'
                          }`}
                      >
                        EN
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation - Redesigned */}
      {!pathname.includes('/product/') && (
        <div className="lg:hidden fixed bottom-6 left-4 right-4 z-[100] bg-white/80 backdrop-blur-xl rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/20">
          <div className="flex justify-around items-center px-6 py-3">
            {mobileNavItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative flex flex-col items-center justify-center w-full"
                  onClick={() => {
                    if (item.name === t('nav', 'cart')) {
                      router.push('/cart');
                    }
                  }}
                >
                  <div className="relative">
                    <motion.div
                      animate={isActive ? { y: -2 } : { y: 0 }}
                      className={`relative p-2 rounded-full transition-all duration-300 ${isActive ? 'text-gray-900' : 'text-gray-400'}`}
                    >
                      <Icon className="w-6 h-6" strokeWidth={isActive ? 2 : 1.5} />

                      {/* Active Dot Indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeDot"
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-gray-900 rounded-full"
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </motion.div>

                    {mounted && item.count !== undefined && item.count > 0 && (
                      <span className={`absolute -top-1 -right-1 w-4 h-4 ${item.badgeColor || 'bg-[#FF5000]'} text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm`}>
                        {item.count}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
