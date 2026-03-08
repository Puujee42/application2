'use client';

import { useEffect, useRef } from 'react';
import { useProducts } from '@/lib/hooks/useProducts';
import PremiumProductCard from './PremiumProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';

interface InfiniteProductGridProps {
  filters?: Record<string, any>;
}

export default function InfiniteProductGrid({ filters = {} }: InfiniteProductGridProps) {
  const {
    products,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    setSize,
  } = useProducts(filters);

  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !isLoadingMore && !isReachingEnd) {
          setSize((prevSize) => prevSize + 1);
        }
      },
      { threshold: 0.1 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [isLoadingMore, isReachingEnd, setSize]);

  if (isLoading && products.length === 0) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {[...Array(10)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <PremiumProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Loading state at the bottom */}
      <div
        ref={loaderRef}
        className="w-full h-20 flex items-center justify-center pt-4"
      >
        {isLoadingMore && !isReachingEnd && (
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
            {[...Array(5)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        )}

        {isReachingEnd && products.length > 0 && (
          <p className="text-slate-400 text-sm italic">Бараа дууслаа</p>
        )}
      </div>
    </div>
  );
}
