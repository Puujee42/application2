'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Star,
  Zap,
  ChevronLeft,
  ChevronRight,
  Tag
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from '@/hooks/useTranslation';

const AUTOPLAY_DURATION = 6000;

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string | null;
  category: string;
  stockStatus?: string;
  description?: string | null;
  discount?: number;
  rating?: number;
}

interface FeatureSectionProps {
  products: Product[];
}

export default function FeatureSection({ products }: FeatureSectionProps) {
  const { formatPrice } = useLanguage();
  const { t } = useTranslation();
  const [slideIndex, setSlideIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const featuredProducts = (products || []).slice(0, 5);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setSlideIndex((prev) => (prev + 1) % featuredProducts.length);
    }, AUTOPLAY_DURATION);
    return () => resetTimeout();
  }, [slideIndex, featuredProducts.length]);

  if (!products || products.length === 0) return null;

  const activeProduct = featuredProducts[slideIndex];

  const paginate = (newDirection: number) => {
    resetTimeout();
    setSlideIndex((prev) => {
      let nextIndex = prev + newDirection;
      if (nextIndex < 0) nextIndex = featuredProducts.length - 1;
      if (nextIndex >= featuredProducts.length) nextIndex = 0;
      return nextIndex;
    });
  };

  // Calculate mock discount and price
  const discount = activeProduct.discount || 17;
  const rating = activeProduct.rating || 4.9;
  const oldPrice = activeProduct.price * (1 + discount / 100);

  return (
    <section className="relative w-full mb-8 px-4 mt-4">
      {/* Main Card Container with Soft Rounded Corners */}
      <div className="relative w-full bg-[#FAFAFA] rounded-[2.5rem] shadow-sm overflow-hidden aspect-[4/6] sm:aspect-[2/1] lg:aspect-[2.4/1] max-h-[700px]">

        <AnimatePresence mode="wait">
          <motion.div
            key={activeProduct.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 w-full h-full p-6 sm:p-10 flex flex-col"
          >
            {/* 1. Top Badges Row */}
            <div className="flex items-center gap-3 mb-4 sm:mb-6 relative z-20">
              {/* Category Badge (Orange Outline style) */}
              <div className="px-4 py-1.5 bg-orange-50 border border-orange-100 text-orange-600 text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-full">
                {activeProduct.category}
              </div>

              {/* Rating Badge (White Pill style) */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-100 rounded-full shadow-sm">
                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-black text-slate-800">{rating}</span>
                <span className="text-[10px] text-gray-400 font-medium">(24.5k)</span>
              </div>
            </div>

            {/* 2. Product Title */}
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl sm:text-6xl font-black text-slate-900 leading-[0.95] tracking-tight mb-4 sm:mb-6 max-w-[90%] relative z-20"
            >
              {activeProduct.name}
            </motion.h2>

            {/* 3. Price Section */}
            <div className="flex flex-col mb-8 relative z-20">
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold text-slate-400 -translate-y-4">₮</span>
                <span className="text-[5rem] sm:text-[6rem] font-black text-slate-900 leading-[0.8] tracking-tighter">
                  {Math.floor(activeProduct.price)}
                </span>
              </div>

              <div className="flex items-center gap-3 mt-3 ml-2">
                <span className="text-lg text-slate-400 line-through font-medium decoration-slate-300">
                  {Math.floor(oldPrice)}₮
                </span>
                <div className="px-2.5 py-1 bg-emerald-100 text-emerald-600 text-xs font-bold rounded-lg flex items-center gap-1.5">
                  <Tag className="w-3 h-3 fill-emerald-600" />
                  {t('featureSection', 'save')} {discount}%
                </div>
              </div>
            </div>

            {/* 4. Action Area (Button + Navigation) */}
            <div className="mt-auto relative z-30 w-full">
              {/* Shop Collection Button - Gradient & Shadow */}
              <Link href={`/product/${activeProduct.id}`} className="block w-full sm:w-auto sm:inline-block">
                <button className="w-full sm:w-auto relative group overflow-hidden bg-gradient-to-r from-[#FF3B30] to-[#FF9500] text-white px-8 py-5 rounded-2xl font-bold shadow-[0_10px_30px_-10px_rgba(255,80,0,0.5)] active:scale-95 transition-transform flex items-center justify-center sm:justify-start gap-3">
                  <span className="text-lg">{t('featureSection', 'shopCollection')}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              {/* Bottom Navigation Row */}
              <div className="flex items-center justify-between mt-6">
                {/* Left: View Details + Dots */}
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-slate-800">{t('featureSection', 'viewDetails')}</span>
                  {/* Pagination Dots */}
                  <div className="flex gap-2">
                    {featuredProducts.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-3 h-3 rounded-full transition-colors ${idx === slideIndex ? 'bg-slate-800' : 'bg-slate-200'
                          }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Right: Arrow Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => paginate(-1)}
                    className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center active:scale-90 transition-transform text-slate-700"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => paginate(1)}
                    className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center active:scale-90 transition-transform text-slate-700"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* 5. Product Image (Positioned Absolute to not affect layout flow) */}
            {/* It's faded/behind or bottom right based on standard design patterns for this layout */}
            <div className="absolute top-[20%] right-[-20%] w-[80%] h-[50%] z-10 opacity-100 pointer-events-none">
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="relative w-full h-full"
              >
                <Image
                  src={activeProduct.image || '/placeholder.png'}
                  alt={activeProduct.name}
                  fill
                  className="object-contain object-right"
                />
              </motion.div>
            </div>

            {/* Decorative Background Blur */}
            <div className="absolute top-0 right-0 w-[70%] h-[70%] bg-gradient-to-bl from-orange-100/50 to-transparent rounded-full blur-3xl -z-0 pointer-events-none" />

          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
