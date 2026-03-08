'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import {
  Heart, Share2, Star, Zap, ShoppingBag, Truck, MapPin,
  Clock, Minus, Plus, ArrowRight, ShieldCheck, Lock, Package, BadgeCheck,
  CheckCircle2, RotateCcw
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import toast from 'react-hot-toast';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/context/AuthContext';
import RelatedProducts from './RelatedProducts';
import type { Product } from '@/models/Product';

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
  brand?: string;
  model?: string;
  delivery?: string;
  paymentMethods?: string;
  createdAt?: string;
  updatedAt?: string;
  rating?: number;
  wholesale?: boolean;
  sections?: string[];
  featured?: boolean;
  relatedProducts?: Product[];
  reviewCount?: number;
  attributes?: Record<string, any>;
};

// --- ANTIGRAVITY PHYSICS HOOKS ---

// 1. Core Antigravity Hook (for slight drift & elastic snap-back)
function useAntigravity<T extends HTMLElement = HTMLDivElement>(maxX = 12, maxY = 8, lerpAmt = 0.04, decay = 0.72) {
  const ref = useRef<T>(null);
  const position = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const isHovered = useRef(false);
  const animationFrameId = useRef<number>();

  const update = useCallback(() => {
    if (!isHovered.current) {
      // Snap-back decay
      target.current.x *= decay;
      target.current.y *= decay;
    }

    position.current.x += (target.current.x - position.current.x) * lerpAmt;
    position.current.y += (target.current.y - position.current.y) * lerpAmt;

    if (ref.current) {
      ref.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0)`;
    }

    // Stop loop if resting
    if (!isHovered.current && Math.abs(position.current.x) < 0.01 && Math.abs(position.current.y) < 0.01) {
      position.current.x = 0;
      position.current.y = 0;
      if (ref.current) ref.current.style.transform = `translate3d(0,0,0)`;
      return;
    }

    animationFrameId.current = requestAnimationFrame(update);
  }, [decay, lerpAmt]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    // Calculate relative distance (-1 to 1)
    const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2)));
    const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)));

    target.current.x = dx * maxX;
    target.current.y = dy * maxY;
  };

  const handleMouseEnter = () => {
    isHovered.current = true;
    if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    animationFrameId.current = requestAnimationFrame(update);
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
    target.current.x = 0;
    target.current.y = 0;
  };

  useEffect(() => {
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return { ref, handleMouseMove, handleMouseEnter, handleMouseLeave };
}

// 2. Magnetic Pull Hook (for "Шууд авах" CTA)
function useMagnetic(radius = 80, lerpAmt = 0.12, decay = 0.72) {
  const ref = useRef<HTMLButtonElement>(null);
  const position = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const isHovered = useRef(false);
  const animationFrameId = useRef<number>();

  const update = useCallback(() => {
    if (!isHovered.current) {
      target.current.x *= decay;
      target.current.y *= decay;
    }

    position.current.x += (target.current.x - position.current.x) * lerpAmt;
    position.current.y += (target.current.y - position.current.y) * lerpAmt;

    if (ref.current) {
      ref.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0)`;
    }

    if (!isHovered.current && Math.abs(position.current.x) < 0.01 && Math.abs(position.current.y) < 0.01) {
      position.current.x = 0;
      position.current.y = 0;
      if (ref.current) ref.current.style.transform = `translate3d(0,0,0)`;
      return;
    }

    animationFrameId.current = requestAnimationFrame(update);
  }, [decay, lerpAmt]);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const distance = Math.sqrt(Math.pow(e.clientX - cx, 2) + Math.pow(e.clientY - cy, 2));

      if (distance < radius) {
        if (!isHovered.current) {
          isHovered.current = true;
          if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
          animationFrameId.current = requestAnimationFrame(update);
        }
        // Pull strength based on distance
        const strength = 1 - distance / radius;
        target.current.x = (e.clientX - cx) * 0.4 * strength;
        target.current.y = (e.clientY - cy) * 0.4 * strength;
      } else if (isHovered.current) {
        isHovered.current = false;
        target.current.x = 0;
        target.current.y = 0;
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [radius, update]);

  return { ref };
}

// 3. Parallax Tilt Hook (for Price Card)
function useParallaxTilt(maxRotate = 4, perspective = 800) {
  const ref = useRef<HTMLDivElement>(null);
  const position = useRef({ rx: 0, ry: 0 });
  const target = useRef({ rx: 0, ry: 0 });
  const isHovered = useRef(false);
  const animationFrameId = useRef<number>();

  const update = useCallback(() => {
    if (!isHovered.current) {
      target.current.rx *= 0.8;
      target.current.ry *= 0.8;
    }

    position.current.rx += (target.current.rx - position.current.rx) * 0.1;
    position.current.ry += (target.current.ry - position.current.ry) * 0.1;

    if (ref.current) {
      ref.current.style.transform = `perspective(${perspective}px) rotateX(${position.current.rx}deg) rotateY(${position.current.ry}deg)`;
    }

    if (!isHovered.current && Math.abs(position.current.rx) < 0.01 && Math.abs(position.current.ry) < 0.01) {
      position.current.rx = 0;
      position.current.ry = 0;
      if (ref.current) ref.current.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg)`;
      return;
    }

    animationFrameId.current = requestAnimationFrame(update);
  }, [perspective]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2)));
    const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)));

    // Invert Y for accurate 3D tilt
    target.current.rx = dy * -maxRotate;
    target.current.ry = dx * maxRotate;
  };

  const handleMouseEnter = () => {
    isHovered.current = true;
    if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    animationFrameId.current = requestAnimationFrame(update);
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
    target.current.rx = 0;
    target.current.ry = 0;
  };

  return { ref, handleMouseMove, handleMouseEnter, handleMouseLeave };
}

// 4. Floating Orb Hook
function useFloatingOrb(lerpAmt = 0.035) {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const position = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number>();

  const update = useCallback(() => {
    position.current.x += (target.current.x - position.current.x) * lerpAmt;
    position.current.y += (target.current.y - position.current.y) * lerpAmt;

    if (ref.current) {
      ref.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0)`;
    }

    animationFrameId.current = requestAnimationFrame(update);
  }, [lerpAmt]);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      // Only track if mouse is over/near the container
      if (e.clientX < rect.left - 200 || e.clientX > rect.right + 200) return;

      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      // Keep orb bounded within container slightly
      const maxDistX = rect.width / 2 - 90; // 90 is half orb size
      const maxDistY = rect.height / 2 - 90;

      let dx = e.clientX - cx;
      let dy = e.clientY - cy;

      // Clamp
      dx = Math.max(-maxDistX, Math.min(maxDistX, dx));
      dy = Math.max(-maxDistY, Math.min(maxDistY, dy));

      target.current.x = dx;
      target.current.y = dy;
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    animationFrameId.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [update]);

  return { ref, containerRef };
}


// --- MAIN COMPONENT ---

export default function ProductDetailClient({ product }: { product: ProductDetailData }) {
  const { isAuthenticated } = useAuth();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  const rating = product.rating ?? 4.5;
  const router = useRouter();
  const { addItem } = useCartStore();
  const { t } = useTranslation();

  // Scroll detection for sticky header
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const unsubscribe = scrollY.on('change', (y) => setIsScrolled(y > 300));
    return () => unsubscribe();
  }, [scrollY]);


  // Image Data
  const images: string[] = product.images?.length
    ? product.images
    : product.image
      ? [product.image]
      : ['/placeholder-product.png'];

  // Handlers
  const handleWishlist = () => {
    if (!isAuthenticated) return toast.error('Нэвтрэх шаардлагатай', { style: { borderRadius: '16px' } });
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Хүслээс хассан' : 'Хүсэлд нэмсэн');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: product.name, url: window.location.href }); } catch (err) { }
    } else {
      toast.success('Link copied to clipboard');
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        ...product,
        image: product.image || '',
        rating: product.rating ?? 0,
        stockStatus: product.stockStatus as any,
        description: product.description || undefined
      });
    }
    toast.custom((tInst) => (
      <div className={`${tInst.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-xl rounded-2xl pointer-events-auto flex ring-1 ring-black/5 p-4`}>
        <div className="flex items-start">
          <CheckCircle2 className="h-8 w-8 text-[#FF5000]" />
          <div className="ml-3">
            <p className="font-bold text-slate-900 font-sora">Сагсанд орлоо</p>
            <p className="mt-1 text-sm text-slate-500">{product.name}</p>
          </div>
        </div>
      </div>
    ));
  };

  const handleBuyNow = () => {
    addItem({ ...product, image: product.image || '', rating: product.rating ?? 0, stockStatus: product.stockStatus as any, description: product.description || undefined });
    router.push('/checkout');
  };

  // Physics Hooks Setup
  const mainImgPhysics = useAntigravity<HTMLDivElement>(12, 8, 0.04, 0.72);
  const thumbPhysics = useAntigravity<HTMLDivElement>(6, 6, 0.05, 0.72);
  const minusPhysics = useAntigravity<HTMLButtonElement>(8, 8, 0.06, 0.7);
  const plusPhysics = useAntigravity<HTMLButtonElement>(8, 8, 0.06, 0.7);
  const magneticBuyTrigger = useMagnetic(80, 0.12, 0.72);
  const tiltPhysics = useParallaxTilt(4, 800);
  const orbPhysics = useFloatingOrb(0.035);

  const discount = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <>
      {/* 1. Global Font Injection & Reset */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        .font-sora { font-family: 'Sora', sans-serif; }
        .font-dm { font-family: 'DM Sans', sans-serif; }
        body { background-color: #FAFAF9; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <div className="min-h-screen pb-32 md:pb-24 font-dm text-slate-600 bg-[#FAFAF9] overflow-hidden">

        {/* 2. Desktop Sticky Header */}
        <AnimatePresence>
          {isScrolled && (
            <motion.div
              initial={{ y: -80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -80, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-2xl border-b border-slate-100 hidden md:block shadow-sm"
            >
              <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 relative rounded-xl overflow-hidden border border-slate-100 bg-white shrink-0">
                    <Image src={product.image || '/placeholder-product.png'} alt={product.name} fill className="object-contain p-1" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900 line-clamp-1">{product.name}</span>
                    <span className="text-[#FF5000] font-sora font-bold text-sm">{formatPrice(product.price)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <motion.button whileTap={{ scale: 0.95 }} onClick={handleAddToCart} className="px-5 py-2.5 rounded-2xl bg-slate-100 text-slate-900 font-bold hover:bg-slate-200 transition-colors">
                    Сагсанд нэмэх
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.95 }} onClick={handleBuyNow} className="px-5 py-2.5 rounded-2xl bg-[#FF5000] text-white font-bold shadow-lg shadow-orange-500/25 hover:bg-[#E64500] transition-colors">
                    Шууд авах
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

            {/* --- LEFT: GALLERY --- */}
            <div className="lg:col-span-6 xl:col-span-7 flex flex-col gap-4">

              {/* Main Image Container */}
              <div
                className="relative aspect-square w-full rounded-[2rem] bg-white border border-slate-100 shadow-sm overflow-hidden"
                onMouseMove={mainImgPhysics.handleMouseMove}
                onMouseEnter={mainImgPhysics.handleMouseEnter}
                onMouseLeave={mainImgPhysics.handleMouseLeave}
              >
                {/* Desktop AnimatePresence */}
                <div className="hidden md:block w-full h-full relative" onClick={() => setShowLightbox(true)}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImageIndex}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full cursor-zoom-in flex items-center justify-center p-8"
                    >
                      <div ref={mainImgPhysics.ref} className="w-full h-full relative origin-center">
                        <Image src={images[activeImageIndex]} alt={product.name} fill className="object-contain pointer-events-none" priority />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Mobile Drag Carousel */}
                <div className="md:hidden w-full h-full relative overflow-hidden" onClick={() => setShowLightbox(true)}>
                  <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -80 && activeImageIndex < images.length - 1) setActiveImageIndex(p => p + 1);
                      else if (info.offset.x > 80 && activeImageIndex > 0) setActiveImageIndex(p => p - 1);
                    }}
                    animate={{ x: `-${activeImageIndex * 100}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="flex w-full h-full"
                  >
                    {images.map((img, i) => (
                      <div key={i} className="w-full h-full shrink-0 relative p-6">
                        <Image src={img} alt="" fill className="object-contain pointer-events-none" priority={i === 0} />
                      </div>
                    ))}
                  </motion.div>
                  {/* Mobile Dots */}
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
                    {images.map((_, i) => (
                      <div key={i} className={`h-1.5 rounded-full transition-all ${activeImageIndex === i ? 'w-6 bg-[#FF5000]' : 'w-2 bg-slate-300'}`} />
                    ))}
                  </div>
                </div>

                {/* Badges Overlay */}
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
                <div className="absolute top-5 right-5 flex flex-col gap-3 z-10">
                  <motion.button whileTap={{ scale: 0.88 }} onClick={(e) => { e.stopPropagation(); handleWishlist(); }} className="w-10 h-10 bg-white/95 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 text-slate-400 hover:text-red-500 transition-colors">
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} strokeWidth={2} />
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.88 }} onClick={(e) => { e.stopPropagation(); handleShare(); }} className="w-10 h-10 bg-white/95 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 text-slate-400 hover:text-blue-500 transition-colors">
                    <Share2 className="w-5 h-5" strokeWidth={2} />
                  </motion.button>
                </div>
              </div>

              {/* Thumbnail Strip (Desktop) */}
              {images.length > 1 && (
                <div className="hidden md:flex gap-3 overflow-x-auto hide-scrollbar py-2 px-1">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onMouseEnter={() => setActiveImageIndex(i)}
                      onClick={() => setActiveImageIndex(i)}
                      className="group relative"
                    >
                      <div className={`w-20 h-20 rounded-2xl overflow-hidden bg-white border-2 transition-all ${activeImageIndex === i
                        ? 'border-[#FF5000] shadow-[0_0_0_4px_rgba(255,80,0,0.1)]'
                        : 'border-slate-100 opacity-60 hover:opacity-100'
                        }`}>
                        <div
                          className="w-full h-full relative"
                        // Extremely simplified physics for thumbs to prevent complex ref mapping in array
                        >
                          <Image src={img} alt="" fill className="object-contain p-2" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Grid */}
              <div className="hidden md:grid grid-cols-3 gap-4 mt-4">
                <div className="flex flex-col items-center justify-center bg-white p-4 rounded-3xl border border-slate-100 text-center">
                  <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-2"><Truck className="w-5 h-5" /></div>
                  <span className="font-bold text-slate-900 text-sm">Шуурхай хүргэлт</span>
                  <span className="text-xs text-slate-500">{product.delivery || 'Хот дотор үнэгүй'}</span>
                </div>
                <div className="flex flex-col items-center justify-center bg-white p-4 rounded-3xl border border-slate-100 text-center">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-2"><ShieldCheck className="w-5 h-5" /></div>
                  <span className="font-bold text-slate-900 text-sm">Баталгаат хугацаа</span>
                  <span className="text-xs text-slate-500">100% Оригинал</span>
                </div>
                <div className="flex flex-col items-center justify-center bg-white p-4 rounded-3xl border border-slate-100 text-center">
                  <div className="w-10 h-10 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center mb-2"><RotateCcw className="w-5 h-5" /></div>
                  <span className="font-bold text-slate-900 text-sm">Буцаалт хэвийн</span>
                  <span className="text-xs text-slate-500">7 хоногт буцаах</span>
                </div>
              </div>

            </div>


            {/* --- RIGHT: INFO PANEL --- */}
            <div ref={orbPhysics.containerRef} className="lg:col-span-6 xl:col-span-5 relative">

              {/* Floating Orb */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 rounded-[3rem] hidden md:block" style={{ margin: '-2rem' }}>
                <div
                  ref={orbPhysics.ref}
                  className="absolute top-1/2 left-1/2 w-[180px] h-[180px] rounded-full bg-[#FF5000]/20 blur-[60px] -translate-x-1/2 -translate-y-1/2"
                />
              </div>

              {/* Content sits above orb */}
              <div className="relative z-10 flex flex-col gap-6">

                {/* Brand & Rating */}
                <div className="flex justify-between items-center">
                  <Link href={`/store/${product.category}`} className="flex items-center gap-1.5 text-[#FF5000] font-bold text-sm tracking-wide bg-orange-50 px-3 py-1.5 rounded-full hover:bg-orange-100 transition-colors uppercase">
                    <BadgeCheck className="w-4 h-4" />
                    {product.brand || product.category}
                  </Link>
                  <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-full">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="font-bold text-slate-900 text-sm">{rating}</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="font-sora font-bold text-3xl md:text-4xl text-slate-900 leading-[1.15] tracking-tight">
                  {product.name}
                </h1>

                {/* Parallax Price Card */}
                <div
                  className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm relative overflow-hidden"
                  onMouseMove={tiltPhysics.handleMouseMove}
                  onMouseEnter={tiltPhysics.handleMouseEnter}
                  onMouseLeave={tiltPhysics.handleMouseLeave}
                >
                  <div ref={tiltPhysics.ref} className="relative z-10 origin-center bg-white">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Үнэ</p>
                    <div className="flex items-end gap-4">
                      <span className="font-sora font-extrabold text-4xl lg:text-5xl text-[#FF5000] tracking-tighter">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg lg:text-xl font-bold text-slate-300 line-through decoration-2 decoration-slate-200 uppercase mb-1">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Short Desc */}
                <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-3">
                  {product.description || 'Дээд зэргийн чанартай, албан ёсны эрхтэй борлуулагдаж буй бүтээгдэхүүн. Орчин үеийн загвар, онцгой шийдэл.'}
                </p>

                {/* Spec Pills */}
                <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-600">
                  <span className="bg-white px-3 py-2 rounded-xl border border-slate-100 shadow-sm">📍 Баталгаат дэлгүүр</span>
                  <span className="bg-white px-3 py-2 rounded-xl border border-slate-100 shadow-sm">💳 QPay & SocialPay</span>
                  <span className="bg-white px-3 py-2 rounded-xl border border-slate-100 shadow-sm">📦 Хүргэлт: {product.delivery || 'Хэвийн'}</span>
                </div>

                <hr className="border-slate-100 my-2" />

                {/* Quantity & CTA */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-slate-900 text-sm">Тоо:</span>
                    <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
                      <div
                        onMouseMove={minusPhysics.handleMouseMove}
                        onMouseEnter={minusPhysics.handleMouseEnter}
                        onMouseLeave={minusPhysics.handleMouseLeave}
                        className="cursor-pointer"
                      >
                        <motion.button
                          ref={minusPhysics.ref}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-xl text-slate-600 hover:text-[#FF5000] hover:bg-orange-50 transition-colors"
                        >
                          <Minus className="w-4 h-4" strokeWidth={3} />
                        </motion.button>
                      </div>
                      <span className="w-8 flex justify-center font-sora font-bold text-lg text-slate-900">{quantity}</span>
                      <div
                        onMouseMove={plusPhysics.handleMouseMove}
                        onMouseEnter={plusPhysics.handleMouseEnter}
                        onMouseLeave={plusPhysics.handleMouseLeave}
                        className="cursor-pointer"
                      >
                        <motion.button
                          ref={plusPhysics.ref}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setQuantity(Math.min(product.inventory ?? 10, quantity + 1))}
                          className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-xl text-slate-600 hover:text-[#FF5000] hover:bg-orange-50 transition-colors"
                        >
                          <Plus className="w-4 h-4" strokeWidth={3} />
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 hidden md:grid">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={handleAddToCart}
                      className="py-4 rounded-2xl bg-white border-2 border-slate-100 text-slate-900 font-bold hover:border-slate-300 transition-colors flex justify-center items-center gap-2"
                    >
                      <ShoppingBag className="w-5 h-5" strokeWidth={2} />
                      Сагсанд
                    </motion.button>

                    <button
                      ref={magneticBuyTrigger.ref}
                      onClick={handleBuyNow}
                      className="py-4 rounded-2xl bg-[#FF5000] text-white font-bold shadow-[0_12px_30px_rgba(255,80,0,0.25)] hover:bg-[#E64500] transition-colors flex justify-center items-center gap-2"
                    >
                      Шууд авах
                      <ArrowRight className="w-5 h-5" strokeWidth={2} />
                    </button>
                  </div>

                  <div className="flex justify-center gap-6 pt-2 hidden md:flex">
                    <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-slate-400"><Lock className="w-3 h-3" />Аюулгүй гүйлгээ</span>
                    <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-slate-400"><ShieldCheck className="w-3 h-3" />Баталгаат</span>
                  </div>

                </div>

              </div>
            </div>
          </div>

          {/* --- BOTTOM: TABS & RELATED --- */}
          <div className="mt-16 md:mt-24">
            <ProductInfoTabs product={product} />
          </div>

          <div className="mt-16 md:mt-24">
            <h2 className="font-sora items-center font-bold text-2xl md:text-3xl text-slate-900 mb-8 border-l-4 border-[#FF5000] pl-4">Төстэй бараа</h2>
            <RelatedProducts products={product.relatedProducts || []} />
          </div>

        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {showLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLightbox(false)}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="relative w-full max-w-5xl aspect-square md:aspect-video rounded-3xl overflow-hidden">
              <Image src={images[activeImageIndex]} alt="" fill className="object-contain" priority />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom CTA Layer */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-2xl border-t border-slate-100 p-4 pb-safe md:hidden shadow-[0_-20px_40px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3">
          <div className="flex-1 flex flex-col pl-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Нийт үнэ</span>
            <span className="font-sora font-bold text-xl text-[#FF5000] leading-none">{formatPrice(product.price * quantity)}</span>
          </div>
          <motion.button whileTap={{ scale: 0.95 }} onClick={handleAddToCart} className="px-5 py-3.5 rounded-2xl bg-slate-100 text-slate-900 font-bold active:bg-slate-200">
            Сагслах
          </motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={handleBuyNow} className="px-6 py-3.5 rounded-2xl bg-[#FF5000] text-white font-bold shadow-lg shadow-orange-500/25">
            Авах
          </motion.button>
        </div>
      </div>
    </>
  );
}

// --- TABS COMPONENT ---
function ProductInfoTabs({ product }: { product: any }) {
  const tabs = [
    { id: 'description', label: 'Тайлбар' },
    { id: 'specs', label: 'Үзүүлэлт' },
    { id: 'reviews', label: `Үнэлгээ (${product.reviewCount || 0})` },
  ];
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-slate-100 font-dm">
      <div className="flex border-b border-gray-100">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-4 text-sm font-bold relative transition-colors ${activeTab === tab.id ? 'text-[#FF5000]' : 'text-slate-400 hover:text-slate-700'
              }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="tabUnderline"
                className="absolute bottom-0 left-4 right-4 h-1 bg-[#FF5000] rounded-t-full"
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="mt-8"
        >
          {activeTab === 'description' && (
            <div className="prose prose-sm text-slate-600 max-w-none">
              <p className="leading-relaxed font-medium text-base">{product.description || 'Дэлгэрэнгүй мэдээлэл ороогүй байна.'}</p>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              {product.attributes && Object.keys(product.attributes).length > 0 ? (
                Object.entries(product.attributes).map(([k, v], i) => (
                  <div key={k} className={`flex py-3 border-b border-slate-50 ${i % 2 === 0 ? '' : ''}`}>
                    <span className="w-1/3 font-bold text-slate-400 text-sm">{k}</span>
                    <span className="w-2/3 font-bold text-slate-900 text-sm">{String(v)}</span>
                  </div>
                ))
              ) : (
                <p className="text-slate-400 font-medium italic">Үзүүлэлтийн мэдээлэл байхгүй байна.</p>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="flex flex-col lg:flex-row gap-12 py-4">
              <div className="flex-shrink-0 text-center lg:text-left">
                <div className="font-sora font-black text-6xl text-slate-900 tracking-tighter leading-none mb-3">
                  {product.rating ? Number(product.rating).toFixed(1) : '0.0'}
                </div>
                <div className="flex justify-center lg:justify-start gap-1 text-amber-500 mb-2">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-sm font-bold text-slate-400">Нийт {product.reviewCount || 0} үнэлгээ</p>
              </div>

              <div className="flex-1 space-y-3">
                {[5, 4, 3, 2, 1].map((star, idx) => {
                  const widthPct = product.reviewCount ? Math.floor(Math.random() * 80 + 10) : 0;
                  return (
                    <div key={star} className="flex items-center gap-4">
                      <span className="font-bold text-slate-600 w-3">{star}</span>
                      <Star className="w-4 h-4 fill-slate-200 text-slate-200" />
                      <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${widthPct}%` }}
                          transition={{ duration: 1, delay: idx * 0.08, ease: "easeOut" }}
                          className="h-full bg-amber-400 rounded-full"
                        />
                      </div>
                    </div>
                  )
                })}
                <div className="pt-6">
                  <button className="px-6 py-3 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors">
                    Үнэлгээ бичих
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
