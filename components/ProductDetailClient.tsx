'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import Image from 'next/image';
import { X, Heart, ShoppingBag, Minus, Plus, BadgeCheck, Truck, ShieldCheck, RotateCcw, ArrowRight, Star, ArrowLeft, Package, Lock, FileText, List, CheckCircle2, ChevronLeft, ChevronRight, Share2, Clock } from 'lucide-react';
import useSWR from 'swr';
import { useAuth } from '@/context/AuthContext';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/models/Product';
import { useCartStore } from '@/store/cartStore';
import toast from 'react-hot-toast';
import { useTranslation } from '@/hooks/useTranslation';
import RelatedProducts from './RelatedProducts';
import ProductReviews from './ProductReviews';

export type ProductDetailData = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  originalPrice?: number;
  discount?: number;
  discountPercent?: number;
  image: string | null;
  images?: string[];
  category: string;
  stockStatus: string;
  inventory?: number;
  shippingOrigin?: string;
  shippingDestination?: string;
  dispatchTime?: string;
  sizeGuideUrl?: string;
  brand?: string;
  model?: string;
  delivery?: string;
  paymentMethods?: string;
  createdAt?: string;
  updatedAt?: string;
  sections?: string[];
  featured?: boolean;
  relatedProducts?: Product[];
  attributes?: Record<string, any>;
  reviews?: any[]; // Add reviews to the product type
  options?: any[];
  variants?: any[];
  subcategory?: string;
};

// ─────────────────────────────────────────────────────────────────────────────
// ANTIGRAVITY PHYSICS HOOKS
// ─────────────────────────────────────────────────────────────────────────────

function useAntigravity<T extends HTMLElement = HTMLDivElement>(
  maxX = 12, maxY = 8, lerpAmt = 0.04, decay = 0.72
) {
  const ref = useRef<T>(null);
  const position = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const isHovered = useRef(false);
  const rafId = useRef<number>();
  const isEnabled = useRef(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isCoarse = window.matchMedia('(pointer: coarse)').matches;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (isCoarse || prefersReducedMotion) {
        isEnabled.current = false;
      }
    }
  }, []);

  const update = useCallback(() => {
    if (!isEnabled.current) return;
    if (!isHovered.current) {
      target.current.x *= decay;
      target.current.y *= decay;
    }
    position.current.x += (target.current.x - position.current.x) * lerpAmt;
    position.current.y += (target.current.y - position.current.y) * lerpAmt;
    if (ref.current) {
      ref.current.style.transform = `translate3d(${position.current.x}px,${position.current.y}px,0)`;
    }
    if (!isHovered.current && Math.abs(position.current.x) < 0.01 && Math.abs(position.current.y) < 0.01) {
      position.current.x = 0; position.current.y = 0;
      if (ref.current) ref.current.style.transform = 'translate3d(0,0,0)';
      return;
    }
    rafId.current = requestAnimationFrame(update);
  }, [decay, lerpAmt]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isEnabled.current || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = Math.max(-1, Math.min(1, (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)));
    const dy = Math.max(-1, Math.min(1, (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)));
    target.current.x = dx * maxX;
    target.current.y = dy * maxY;
  };

  const handleMouseEnter = () => {
    if (!isEnabled.current) return;
    isHovered.current = true;
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(update);
  };

  const handleMouseLeave = () => {
    if (!isEnabled.current) return;
    isHovered.current = false;
    target.current.x = 0; target.current.y = 0;
  };

  useEffect(() => () => { if (rafId.current) cancelAnimationFrame(rafId.current); }, []);
  return { ref, handleMouseMove, handleMouseEnter, handleMouseLeave };
}

function useMagnetic(radius = 80, lerpAmt = 0.12, decay = 0.72) {
  const ref = useRef<HTMLButtonElement>(null);
  const position = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const isHovered = useRef(false);
  const rafId = useRef<number>();
  const isEnabled = useRef(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isCoarse = window.matchMedia('(pointer: coarse)').matches;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (isCoarse || prefersReducedMotion) {
        isEnabled.current = false;
      }
    }
  }, []);

  const update = useCallback(() => {
    if (!isEnabled.current) return;
    if (!isHovered.current) { target.current.x *= decay; target.current.y *= decay; }
    position.current.x += (target.current.x - position.current.x) * lerpAmt;
    position.current.y += (target.current.y - position.current.y) * lerpAmt;
    if (ref.current) ref.current.style.transform = `translate3d(${position.current.x}px,${position.current.y}px,0)`;
    if (!isHovered.current && Math.abs(position.current.x) < 0.01 && Math.abs(position.current.y) < 0.01) {
      position.current.x = 0; position.current.y = 0;
      if (ref.current) ref.current.style.transform = 'translate3d(0,0,0)';
      return;
    }
    rafId.current = requestAnimationFrame(update);
  }, [decay, lerpAmt]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isEnabled.current || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
      const dist = Math.sqrt((e.clientX - cx) ** 2 + (e.clientY - cy) ** 2);
      if (dist < radius) {
        if (!isHovered.current) { isHovered.current = true; if (rafId.current) cancelAnimationFrame(rafId.current); rafId.current = requestAnimationFrame(update); }
        const s = 1 - dist / radius;
        target.current.x = (e.clientX - cx) * 0.4 * s;
        target.current.y = (e.clientY - cy) * 0.4 * s;
      } else if (isHovered.current) {
        isHovered.current = false; target.current.x = 0; target.current.y = 0;
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => { window.removeEventListener('mousemove', onMove); if (rafId.current) cancelAnimationFrame(rafId.current); };
  }, [radius, update]);

  return { ref };
}

function useParallaxTilt(maxRotate = 4, perspective = 800, lerpAmt = 0.1, decay = 0.8) {
  const ref = useRef<HTMLDivElement>(null);
  const position = useRef({ rx: 0, ry: 0 });
  const target = useRef({ rx: 0, ry: 0 });
  const isHovered = useRef(false);
  const rafId = useRef<number>();
  const isEnabled = useRef(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isCoarse = window.matchMedia('(pointer: coarse)').matches;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (isCoarse || prefersReducedMotion) {
        isEnabled.current = false;
      }
    }
  }, []);

  const update = useCallback(() => {
    if (!isEnabled.current) return;
    if (!isHovered.current) { target.current.rx *= decay; target.current.ry *= decay; }
    position.current.rx += (target.current.rx - position.current.rx) * lerpAmt;
    position.current.ry += (target.current.ry - position.current.ry) * lerpAmt;
    if (ref.current) ref.current.style.transform = `perspective(${perspective}px) rotateX(${position.current.rx}deg) rotateY(${position.current.ry}deg)`;
    if (!isHovered.current && Math.abs(position.current.rx) < 0.01 && Math.abs(position.current.ry) < 0.01) {
      position.current.rx = 0; position.current.ry = 0;
      if (ref.current) ref.current.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg)`;
      return;
    }
    rafId.current = requestAnimationFrame(update);
  }, [perspective, lerpAmt, decay]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isEnabled.current || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = Math.max(-1, Math.min(1, (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)));
    const dy = Math.max(-1, Math.min(1, (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)));
    target.current.rx = dy * -maxRotate;
    target.current.ry = dx * maxRotate;
  };

  const handleMouseEnter = () => {
    if (!isEnabled.current) return;
    isHovered.current = true;
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(update);
  };

  const handleMouseLeave = () => {
    if (!isEnabled.current) return;
    isHovered.current = false; target.current.rx = 0; target.current.ry = 0;
  };

  useEffect(() => () => { if (rafId.current) cancelAnimationFrame(rafId.current); }, []);
  return { ref, handleMouseMove, handleMouseEnter, handleMouseLeave };
}

function useFloatingOrb(lerpAmt = 0.035) {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const position = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>();
  const isEnabled = useRef(true);
  const isActive = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isCoarse = window.matchMedia('(pointer: coarse)').matches;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (isCoarse || prefersReducedMotion) {
        isEnabled.current = false;
      }
    }
  }, []);

  const update = useCallback(() => {
    if (!isEnabled.current) return;

    // Smoothly return to center when not active
    if (!isActive.current) {
      target.current.x *= 0.9;
      target.current.y *= 0.9;
    }

    position.current.x += (target.current.x - position.current.x) * lerpAmt;
    position.current.y += (target.current.y - position.current.y) * lerpAmt;

    if (ref.current) {
      ref.current.style.transform = `translate3d(${position.current.x}px,${position.current.y}px,0)`;
    }

    if (!isActive.current && Math.abs(position.current.x) < 0.5 && Math.abs(position.current.y) < 0.5) {
      if (ref.current) ref.current.style.transform = 'translate3d(0,0,0)';
      return;
    }

    rafId.current = requestAnimationFrame(update);
  }, [lerpAmt]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isEnabled.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      // Check if mouse is near or inside container
      if (e.clientX >= rect.left - 200 && e.clientX <= rect.right + 200 &&
        e.clientY >= rect.top - 200 && e.clientY <= rect.bottom + 200) {
        if (!isActive.current) {
          isActive.current = true;
          if (rafId.current) cancelAnimationFrame(rafId.current);
          rafId.current = requestAnimationFrame(update);
        }
        const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
        const maxX = rect.width / 2 - 90, maxY = rect.height / 2 - 90;
        target.current.x = Math.max(-maxX, Math.min(maxX, e.clientX - cx));
        target.current.y = Math.max(-maxY, Math.min(maxY, e.clientY - cy));
      } else if (isActive.current) {
        isActive.current = false;
        target.current.x = 0;
        target.current.y = 0;
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => { window.removeEventListener('mousemove', onMove); if (rafId.current) cancelAnimationFrame(rafId.current); };
  }, [update]);

  return { ref, containerRef };
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function ProductDetailClient({ product, initialReviews }: { product: ProductDetailData, initialReviews: any[] }) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const { data: categoriesData } = useSWR('/api/categories', (url) => fetch(url).then(r => r.json()));
  const categories = categoriesData?.categories || [];

  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  // Auto-select option if there is only 1 value
  useEffect(() => {
    if (product.options?.length) {
      const initial: Record<string, string> = {};
      product.options.forEach((opt: any) => {
        if (opt.values.length === 1) {
          initial[opt.name] = opt.values[0];
        }
      });
      if (Object.keys(initial).length > 0) {
        setSelectedOptions(prev => ({ ...prev, ...initial }));
      }
    }
  }, [product.options]);

  const selectedVariant = useMemo(() => {
    if (!product.variants?.length) return null;
    return product.variants.find((v: any) =>
      product.options?.every((opt: any) => v.options[opt.name] === selectedOptions[opt.name])
    ) || null;
  }, [selectedOptions, product.variants, product.options]);

  const displayPrice = selectedVariant?.price || product.price;
  const displayInventory = selectedVariant ? selectedVariant.inventory : (product.inventory ?? 0);
  const isOutOfStock = product.options?.length ? (!selectedVariant || displayInventory <= 0) : (displayInventory <= 0);

  const canAddToCart = !isOutOfStock && (!product.options?.length || (
    product.options.every((o: any) => selectedOptions[o.name]) &&
    selectedVariant && selectedVariant.inventory > 0
  ));

  const { addItem, toggleAllSelection } = useCartStore();
  const { t } = useTranslation();

  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const unsub = scrollY.on('change', (y) => setIsScrolled(y > 300));
    return () => unsub();
  }, [scrollY]);


  useEffect(() => {
    if (!isAuthenticated) return;
    fetch(`/api/user/wishlist?productId=${product.id}`)
      .then(r => r.json())
      .then(data => setIsWishlisted(!!data.isWishlisted))
      .catch(() => null);
  }, [product.id, isAuthenticated]);

  const images: string[] = (() => {
    const combined: string[] = [];
    if (product.image) combined.push(product.image);
    if (product.images?.length) {
      product.images.forEach(img => {
        if (!combined.includes(img)) combined.push(img);
      });
    }
    return combined.length > 0 ? combined : ['/placeholder-product.png'];
  })();

  const discount = product.originalPrice && product.originalPrice > displayPrice
    ? Math.round(((product.originalPrice - displayPrice) / product.originalPrice) * 100)
    : 0;

  const savings = product.originalPrice && product.originalPrice > displayPrice
    ? product.originalPrice - displayPrice
    : 0;

  const categoryObj = categories.find((c: any) => c.id === product.category);
  const categoryName = categoryObj ? categoryObj.name : product.category;

  let subcategoryName = null;
  if (product.subcategory && categoryObj?.subcategories) {
    const subObj = categoryObj.subcategories.find((s: any) => s.id === product.subcategory);
    if (subObj) subcategoryName = subObj.name;
  }

  // ── Handlers ───────────────────────────────────────────────
  const handleWishlist = async () => {
    if (!isAuthenticated) return toast.error('Нэвтрэх шаардлагатай', { style: { borderRadius: '16px' } });
    const next = !isWishlisted;
    setIsWishlisted(next); // optimistic
    try {
      await fetch('/api/user/wishlist', {
        method: next ? 'POST' : 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id }),
      });
      toast.success(next ? 'Хүсэлд нэмсэн' : 'Хүслээс хассан');
    } catch {
      setIsWishlisted(!next); // rollback
      toast.error('Алдаа гарлаа');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: product.name, url: window.location.href }); } catch { }
    } else {
      toast.success('Link copied to clipboard');
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleAddToCart = () => {
    if (product.options?.length && !product.options.every(o => selectedOptions[o.name])) {
      toast.error('Сонголтуудаа гүйцэд сонгоно үю', { style: { borderRadius: '16px' } });
      return;
    }
    if (isOutOfStock) {
      toast.error('Агуулахад үлдэгдэл хүрэлцэхгүй байна', { style: { borderRadius: '16px' } });
      return;
    }

    addItem({
      ...product,
      image: product.image || '',
      stockStatus: product.stockStatus as any,
      description: product.description || undefined,
      price: displayPrice,
      variantId: selectedVariant?.id,
      selectedOptions: product.options?.length ? selectedOptions : undefined,
    }, quantity, false);

    toast.custom((tInst) => (
      <div className={`${tInst.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-xl rounded-2xl pointer-events-auto flex ring-1 ring-black/5 p-4`}>
        <div className="flex items-start">
          <CheckCircle2 className="h-8 w-8 text-[#FF500]" />
          <div className="ml-3">
            <p className="font-bold text-slate-900" style={{ fontFamily: 'Sora, sans-serif' }}>Сагсанд орлоо</p>
            <p className="mt-1 text-sm text-slate-500">{product.name}</p>
          </div>
        </div>
      </div>
    ));
  };

  const handleBuyNow = async () => {
    if (product.options?.length && !product.options.every((o: any) => selectedOptions[o.name])) {
      toast.error('Сонголтуудаа гүйцэд сонгоно үю', { style: { borderRadius: '16px' } });
      return;
    }
    if (isOutOfStock) {
      toast.error('Агуулахад үлдэгдэл хүрэлцэхгүй байна', { style: { borderRadius: '16px' } });
      return;
    }

    toggleAllSelection(false);
    await addItem({
      ...product,
      image: product.image || '',
      stockStatus: product.stockStatus as any,
      description: product.description || undefined,
      price: displayPrice,
      variantId: selectedVariant?.id,
      selectedOptions: product.options?.length ? selectedOptions : undefined,
    }, quantity, true);
    router.push('/checkout');
  };

  // ── Physics hooks ──────────────────────────────────────────────────────────
  const mainImgPhysics = useAntigravity<HTMLDivElement>(12, 8, 0.04, 0.72);
  const minusPhysics = useAntigravity<HTMLButtonElement>(8, 8, 0.06, 0.7);
  const plusPhysics = useAntigravity<HTMLButtonElement>(8, 8, 0.06, 0.7);
  const magneticBuy = useMagnetic(80, 0.12, 0.72);
  const tilt = useParallaxTilt(4, 800);
  const orb = useFloatingOrb(0.035);

  return (
    <>
      {/* ── Font injection ── */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        .font-sora { font-family: 'Sora', sans-serif; }
        .font-dm  { font-family: 'DM Sans', sans-serif; }
        body { background-color: #FAFAF9; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .pb-safe { padding-bottom: env(safe-area-inset-bottom, 0px); }
      `}} />

      <div className="min-h-screen pb-[140px] md:pb-20 font-dm bg-[#FAFAF9] text-slate-600 overflow-hidden">

        {/* Mobile back button */}
        <div
          className="lg:hidden fixed top-0 left-0 z-[110] p-3"
          style={{ paddingTop: 'calc(env(safe-area-inset-top) + 8px)' }}
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => router.back()}
            className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-md border border-slate-100/80"
          >
            <ChevronLeft className="w-5 h-5 text-slate-700" strokeWidth={2.5} />
          </motion.button>
        </div>

        {/* ── Sticky header ─────────────────────────────────────────────── */}
        <AnimatePresence>
          {isScrolled && (
            <motion.div
              initial={{ y: -64, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -64, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="fixed top-0 left-0 right-0 z-[100] hidden md:block"
              style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}
            >
              <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl overflow-hidden border border-slate-100 bg-white shrink-0 relative">
                    <Image src={product.image || '/placeholder-product.png'} alt={product.name} fill className="object-contain p-1.5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm leading-tight line-clamp-1 max-w-xs">{product.name}</p>
                    <p className="font-sora font-bold text-[#FF500] text-sm leading-none mt-0.5">{formatPrice(displayPrice * quantity)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <motion.button whileTap={{ scale: 0.95 }} onClick={handleAddToCart}
                    className="px-5 py-2.5 rounded-2xl bg-slate-100 text-slate-900 font-bold text-sm hover:bg-slate-200 transition-colors">
                    Сагсанд нэмэх
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.95 }} onClick={handleBuyNow}
                    className="px-5 py-2.5 rounded-2xl bg-[#FF5000] text-white font-bold text-sm shadow-lg shadow-orange-500/25 hover:bg-[#E64500] transition-colors">
                    Шууд авах
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 pt-0 pb-6 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

            {/* ── LEFT: GALLERY ───────────────────────────────────────────── */}
            <div className="lg:col-span-6 xl:col-span-7 flex flex-col gap-4">

              {/* Main image */}
              <div
                className="group relative w-full bg-white overflow-hidden md:rounded-3xl md:border md:border-slate-100 md:shadow-sm md:aspect-square"
                style={{ aspectRatio: '1/1' }}
                onMouseMove={mainImgPhysics.handleMouseMove}
                onMouseEnter={mainImgPhysics.handleMouseEnter}
                onMouseLeave={mainImgPhysics.handleMouseLeave}
              >
                {/* Desktop fade image */}
                <div className="hidden md:block w-full h-full" onClick={() => setShowLightbox(true)}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImageIndex}
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.28 }}
                      className="w-full h-full cursor-zoom-in absolute inset-0 flex items-center justify-center p-8"
                    >
                      <div ref={mainImgPhysics.ref} className="w-full h-full relative origin-center">
                        <Image src={images[activeImageIndex]} alt={product.name} fill className="object-contain pointer-events-none" priority />
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Desktop arrow nav */}
                  {images.length > 1 && (<>
                    <button
                      onClick={(e) => { e.stopPropagation(); setActiveImageIndex(p => Math.max(0, p - 1)); }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity border border-slate-100 text-slate-600 hover:text-[#FF500] disabled:opacity-30"
                      disabled={activeImageIndex === 0}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setActiveImageIndex(p => Math.min(images.length - 1, p + 1)); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity border border-slate-100 text-slate-600 hover:text-[#FF500] disabled:opacity-30"
                      disabled={activeImageIndex === images.length - 1}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>)}
                </div>

                {/* Mobile swipe carousel */}
                <div className="md:hidden w-full h-full relative overflow-hidden" onClick={() => setShowLightbox(true)}>
                  <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -80 && activeImageIndex < images.length - 1) setActiveImageIndex(p => p + 1);
                      else if (info.offset.x > 80 && activeImageIndex > 0) setActiveImageIndex(p => p - 1);
                    }}
                    animate={{ x: `-${activeImageIndex * 100}%` }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="flex w-full h-full"
                  >
                    {images.map((img, i) => (
                      <div key={i} className="w-full h-full shrink-0 relative p-3 md:p-6">
                        <Image src={img} alt="" fill className="object-contain pointer-events-none" priority={i === 0} />
                      </div>
                    ))}
                  </motion.div>
                  {/* Dots */}
                  <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2 z-10">
                    {images.map((_, i) => (
                      <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${activeImageIndex === i ? 'w-6 bg-[#FF5000]' : 'w-2 bg-slate-300'}`} />
                    ))}
                  </div>
                  {/* Count badge */}
                  <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    {activeImageIndex + 1}/{images.length}
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-5 left-5 flex flex-col gap-2 z-10 select-none">
                  {product.stockStatus === 'in-stock' ? (
                    <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1.5 border border-emerald-100 rounded-2xl shadow-sm">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">БЭЛЭН</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1.5 border border-amber-100 rounded-2xl shadow-sm">
                      <Clock className="w-3 h-3 text-amber-500" />
                      <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">ЗАХИАЛГААР</span>
                    </div>
                  )}
                  {discount > 0 && (
                    <div className="px-3 py-1.5 bg-[#FF5000] text-white rounded-2xl shadow-lg shadow-orange-500/20 w-fit">
                      <span className="text-[10px] font-black uppercase tracking-widest">-{discount}% Off</span>
                    </div>
                  )}
                </div>

                {/* FABs */}
                <div className="absolute top-5 right-5 flex flex-col gap-2.5 z-10">
                  <motion.button whileTap={{ scale: 0.88 }} onClick={e => { e.stopPropagation(); handleWishlist(); }}
                    className="w-10 h-10 bg-white/95 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 text-slate-400 hover:text-red-500 transition-colors">
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} strokeWidth={2} />
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.88 }} onClick={e => { e.stopPropagation(); handleShare(); }}
                    className="w-10 h-10 bg-white/95 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 text-slate-400 hover:text-blue-500 transition-colors">
                    <Share2 className="w-5 h-5" strokeWidth={2} />
                  </motion.button>
                </div>
              </div>

              {/* Thumbnail strip */}
              {images.length > 1 && (
                <div className="hidden md:flex gap-3 overflow-x-auto hide-scrollbar py-2 px-1">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onMouseEnter={() => setActiveImageIndex(i)}
                      onClick={() => setActiveImageIndex(i)}
                      className="relative shrink-0"
                    >
                      <div className={`w-20 h-20 rounded-2xl overflow-hidden bg-white border-2 transition-all duration-200 ${activeImageIndex === i
                        ? 'border-[#FF5000] shadow-[0_0_0_4px_rgba(255,80,0,0.1)]'
                        : 'border-slate-100 opacity-60 hover:opacity-100 hover:border-slate-200'
                        }`}>
                        <div className="w-full h-full relative p-1.5">
                          <Image src={img} alt="" fill className="object-contain" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Trust grid */}
              <div className="hidden md:grid grid-cols-3 gap-3 mt-2">
                {[
                  { icon: ShieldCheck, color: 'emerald', bg: 'bg-emerald-50', text: 'text-emerald-500', label: 'Баталгаат хугацаа', sub: '100% Оригинал' },
                  { icon: RotateCcw, color: 'purple', bg: 'bg-purple-50', text: 'text-purple-500', label: 'Буцаалт хэвийн', sub: '7 хоногт буцаах' },
                ].map(({ icon: Icon, bg, text, label, sub }) => (
                  <div key={label} className="flex flex-col items-center justify-center bg-white p-5 rounded-3xl border border-slate-100 text-center gap-2">
                    <div className={`w-10 h-10 ${bg} ${text} rounded-full flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-900 text-[13px] leading-tight">{label}</span>
                    <span className="text-xs text-slate-400">{sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: INFO PANEL (TAOBAO LAYOUT) ────────────────────────────────────────── */}
            <div ref={orb.containerRef} className="lg:col-span-6 xl:col-span-5 relative md:mt-0 -mt-6">

              {/* Floating orb */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 rounded-[3rem] hidden md:block" style={{ margin: '-2rem' }}>
                <div
                  ref={orb.ref}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl rounded-full"
                  style={{ width: 180, height: 180, background: 'radial-gradient(circle, rgba(255,80,0,0.15) 0%, transparent 70%)' }}
                />
              </div>

              <div className="relative z-10 flex flex-col bg-white md:bg-transparent px-5 md:px-0 pt-6 md:pt-0">
                {/* 1. Product Title */}
                <h1 className="text-xl md:text-[22px] font-bold text-gray-900 leading-snug mb-3">
                  {product.name}
                </h1>

                {/* 2. Price Panel (Taobao Style) */}
                <div className="bg-[#FFF8F6] p-4 rounded-sm flex flex-col gap-2 mb-4 border border-[#FFE8E3]">
                  {/* Row 1: Original Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-500 text-sm min-w-[60px]">Үнэ</span>
                      {product.originalPrice && product.originalPrice > displayPrice ? (
                        <span className="text-gray-400 text-sm line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      ) : (
                        <span className="text-[28px] md:text-[34px] font-bold text-[#FF500] leading-none tracking-tight font-sora">
                          {formatPrice(displayPrice * quantity)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Promo Price */}
                  <div className="flex items-end gap-4 mt-1">
                    <span className="text-gray-500 text-sm min-w-[60px] pb-1.5">Хямдрал</span>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-[28px] md:text-[34px] font-bold text-[#FF500] leading-none tracking-tight font-sora">
                          {formatPrice(displayPrice * quantity)}
                        </span>
                        <span className="bg-[#FF500] text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold tracking-wider">
                          {product.stockStatus === 'pre-order' ? 'ЗАХИАЛГААР' : 'БЭЛЭН'}
                        </span>
                      </div>
                      {quantity > 1 && (
                        <span className="text-xs text-gray-400 font-medium mt-1">
                          Нэгж үнэ: {formatPrice(displayPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* 3. Details Matrix Grid */}
                <div className="flex flex-col gap-4 text-sm mb-6 border-b border-gray-100 pb-6">
                  {/* Delivery */}
                  <div className="flex items-start">
                    <span className="text-gray-500 min-w-[70px] mt-0.5">Хүргэлт</span>
                    <div className="flex flex-col gap-1 text-gray-900">
                      <span className="font-medium">
                        {product.stockStatus === 'in-stock' ? '1 хоногт хүргэнэ' : '7 хоногт хүргэнэ'}
                      </span>
                      <span className="text-xs text-gray-400">Монгол даяар хүргэнэ</span>
                    </div>
                  </div>

                  {/* Variations mapped dynamically if exist, else static fallback example */}
                  {product.options && product.options.length > 0 && (
                    product.options.map((option: any) => (
                      <div key={option.id} className="flex items-start mt-2">
                        <span className="text-gray-500 min-w-[70px] mt-2">{option.name}</span>
                        <div className="flex-1">
                          <div className="flex flex-wrap gap-2">
                            {option.values.map((val: any) => {
                              const isSelected = selectedOptions[option.name] === val;

                              // Find an image from variants that matches this specific option value
                              let valImage = '';
                              if (product.variants) {
                                const matchingVariant = product.variants.find((v: any) => v.options[option.name] === val && v.image);
                                if (matchingVariant) {
                                  valImage = matchingVariant.image;
                                }
                              }
                              const hasImage = !!valImage;

                              return (
                                <button
                                  key={val}
                                  onClick={() => setSelectedOptions(p => ({ ...p, [option.name]: val }))}
                                  className={`transition-all border ${isSelected
                                    ? 'border-[#FF5000] border-2 px-3 py-1 bg-white text-gray-900'
                                    : 'border-gray-300 bg-white text-gray-900 px-3 py-1 hover:border-[#FF5000]'
                                    } ${hasImage ? 'rounded-sm flex items-center gap-2 h-9' : 'rounded-sm h-8'}`}
                                >
                                  {hasImage && (
                                    <div className="w-5 h-5 bg-gray-100 rounded-sm overflow-hidden shrink-0">
                                      <Image src={valImage} width={20} height={20} alt="" className="object-cover w-full h-full" />
                                    </div>
                                  )}
                                  <span className={isSelected ? 'font-bold' : 'font-medium'}>{val}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                        {option.name.includes('Хэмжээ') && product.sizeGuideUrl && (
                          <a href={product.sizeGuideUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-xs hover:underline mt-2 ml-2 shrink-0">
                            Хэмжээний заавар
                          </a>
                        )}
                      </div>
                    ))
                  )}

                  <div className="flex items-center mt-4">
                    <span className="text-gray-500 min-w-[70px]">Тоо</span>
                    <div className="flex items-center">
                      <div className="flex border border-gray-300 rounded-sm overflow-hidden h-10">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-10 flex items-center justify-center bg-gray-50 text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" strokeWidth={2.5} />
                        </button>
                        <input
                          type="number"
                          value={quantity}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (!isNaN(val)) {
                              setQuantity(Math.max(1, Math.min(displayInventory, val)));
                            }
                          }}
                          className="w-14 text-center border-l border-r border-gray-300 text-sm font-bold text-gray-900 bg-white focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <button
                          onClick={() => setQuantity(Math.min(displayInventory, quantity + 1))}
                          className="w-10 flex items-center justify-center bg-gray-50 text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" strokeWidth={2.5} />
                        </button>
                      </div>
                      <span className="text-gray-400 ml-4 text-xs">
                        {displayInventory} Ширхэг бэлэн
                      </span>
                    </div>
                  </div>
                </div>

                {/* 4. Call to Action Buttons */}
                <div className="flex gap-3 mb-6">
                  <button
                    onClick={handleBuyNow}
                    disabled={!canAddToCart}
                    className="flex-1 bg-[#FFE4D0] text-[#FF500] py-3.5 rounded-sm font-bold text-[15px] hover:bg-[#FFD4B8] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    Шууд авах
                  </button>
                  <button
                    onClick={handleAddToCart}
                    disabled={!canAddToCart}
                    className="flex-1 bg-[#FF4400] text-white py-3.5 rounded-sm font-bold text-[15px] hover:bg-[#E63D00] transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_4px_12px_rgba(255,68,0,0.3)]"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Сагсанд нэмэх
                  </button>
                </div>

                {/* 5. Footer/Trust Row */}
                <div className="flex items-center">
                  <span className="text-gray-500 text-xs min-w-[70px]">Төлбөр</span>
                  <div className="flex items-center gap-4 text-xs font-medium text-gray-600">
                    <span className="flex items-center gap-1"><span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-sm flex items-center justify-center font-bold text-[9px]">Q</span> QPay</span>
                    <span className="flex items-center gap-1"><span className="w-4 h-4 bg-emerald-100 text-emerald-600 rounded-sm flex items-center justify-center font-bold text-[9px]">S</span> SocialPay</span>
                    <span className="flex items-center gap-1"><span className="w-4 h-4 bg-gray-100 text-gray-600 rounded-sm flex items-center justify-center font-bold text-[9px]">C</span> Банкны карт</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ── SECTIONS ──────────────────────────────────────────────────────── */}
          <div className="mt-16 md:mt-24">
            <ProductInfoSections product={product} />
          </div>

          {/* ── RELATED ───────────────────────────────────────────────────── */}
          <div className="mt-8 md:mt-24 px-4 md:px-0">
            <h2 className="font-sora font-bold text-xl md:text-3xl text-slate-900 mb-5 md:mb-8 border-l-4 border-[#FF5000] pl-4">
              Төстэй бараа
            </h2>
            <RelatedProducts products={product.relatedProducts || []} />
          </div>
        </div>
      </div>

      {/* ── Lightbox ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLightbox(false)}
            className="fixed inset-0 z-[200] bg-black/92 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out"
          >
            <button
              onClick={() => setShowLightbox(false)}
              className="absolute top-5 right-5 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 24, stiffness: 280 }}
              className="relative w-full max-w-5xl aspect-square md:aspect-video rounded-3xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <Image src={images[activeImageIndex]} alt="" fill className="object-contain" priority />
              {images.length > 1 && (
                <>
                  <button
                    onClick={e => { e.stopPropagation(); setActiveImageIndex(p => Math.max(0, p - 1)); }}
                    disabled={activeImageIndex === 0}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors disabled:opacity-20"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); setActiveImageIndex(p => Math.min(images.length - 1, p + 1)); }}
                    disabled={activeImageIndex === images.length - 1}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors disabled:opacity-20"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {images.map((_, i) => (
                      <button key={i} onClick={e => { e.stopPropagation(); setActiveImageIndex(i); }}
                        className={`h-1.5 rounded-full transition-all ${i === activeImageIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/40'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile bottom CTA ─────────────────────────────────────────────── */}
      <div
        className="fixed left-0 right-0 z-[60] md:hidden"
        style={{ bottom: '56px', background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderTop: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 -4px 20px rgba(0,0,0,0.06)' }}
      >
        <div className="flex items-center gap-3 px-4 pt-3 pb-4">
          {/* Price */}
          <div className="flex flex-col justify-center min-w-0 mr-auto">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
              Нийт үнэ
            </span>
            <span className="font-sora font-extrabold text-[18px] text-[#FF500] leading-none truncate">
              {formatPrice(displayPrice * quantity)}
            </span>
            {quantity > 1 && (
              <span className="text-[10px] text-slate-400 font-bold mt-0.5">
                {quantity}ш × {formatPrice(displayPrice)}
              </span>
            )}
          </div>

          {/* Сагslaх */}
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-2xl bg-slate-100 text-slate-900 font-bold text-sm active:bg-slate-200 transition-colors shrink-0"
          >
            <ShoppingBag className="w-4 h-4" strokeWidth={2} />
            Сагslaх
          </motion.button>

          {/* Худалдан авах */}
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={handleBuyNow}
            className="flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-2xl bg-[#FF5000] text-white font-bold text-sm shadow-lg shadow-orange-500/30 active:bg-[#E64500] transition-colors shrink-0"
          >
            Авах
            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTIONS COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function ProductInfoSections({ product }: { product: any }) {
  return (
    <div className="flex flex-col gap-8 md:gap-12">
      {/* Description Section */}
      <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-100 font-dm">
        <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
          <FileText className="w-6 h-6 text-[#FF5000]" />
          Тайлбар
        </h3>
        <div className="prose prose-sm md:prose-base text-slate-600 max-w-none">
          <p className="leading-relaxed font-medium">
            {product.description || 'Дэлгэрэнгүй мэдээлэл ороогүй байна.'}
          </p>
        </div>
      </div>

      {/* Specs Section */}
      <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-100 font-dm">
        <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
          <List className="w-6 h-6 text-[#FF5000]" />
          Үзүүлэлт
        </h3>
        <div className="divide-y divide-slate-50 border border-slate-100 rounded-2xl overflow-hidden">
          {product.attributes && Object.keys(product.attributes).length > 0 ? (
            Object.entries(product.attributes).map(([k, v], i) => (
              <div key={k} className={`flex py-4 px-6 ${i % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}`}>
                <span className="w-2/5 font-bold text-slate-400 text-sm md:text-base">{k}</span>
                <span className="w-3/5 font-bold text-slate-900 text-sm md:text-base">{String(v)}</span>
              </div>
            ))
          ) : (
            <p className="text-slate-400 font-medium italic py-6 px-6 text-center">Үзүүлэлтийн мэдээлэл байхгүй байна.</p>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-100 font-dm">
        <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
          <Star className="w-6 h-6 text-[#FF5000]" fill="currentColor" />
          Үнэлгээ {product.reviewCount ? `(${product.reviewCount})` : ''}
        </h3>
        <div className="py-2">
          <ProductReviews productId={product.id} />
        </div>
      </div>
    </div>
  );
}

// Minimal Icons
// ... existing code ...