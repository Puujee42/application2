'use client';

import { memo } from 'react';
import { motion, Variants } from 'framer-motion';
import PremiumProductCard from './PremiumProductCard';

interface Product {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  sections?: string[];
  image?: string | null;
  category: string;
  stockStatus?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  discount?: number;
  inventory?: number;
  rating?: number;
  featured?: boolean;
}

interface PremiumProductGridProps {
  products: Product[];
  featuredProducts?: Product[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

function PremiumProductGrid({ products, featuredProducts }: PremiumProductGridProps) {
  // Separate featured and regular products
  const featured = featuredProducts || products.filter(p => p.featured);
  const regular = products.filter(p => !p.featured);

  return (
    <>
      {/* Featured Products Section */}
      {featured.length > 0 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 p-2 sm:p-4 mb-8"
        >
          {featured.map((product) => (
            <PremiumProductCard
              key={product.id}
              product={product}
              isFeatured={true}
            />
          ))}
        </motion.div>
      )}

      {/* Section Heading Separator */}
      {featured.length > 0 && regular.length > 0 && (
        <div className="px-2 sm:px-4 mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Бүх бүтээгдэхүүн
          </h2>
          <div className="h-0.5 w-16 bg-gradient-to-r from-orange-500 to-orange-300 mt-2 rounded-full"></div>
        </div>
      )}

      {/* Regular Products Section */}
      {regular.length > 0 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 p-2 sm:p-4"
        >
          {regular.map((product) => (
            <PremiumProductCard
              key={product.id}
              product={product}
              isFeatured={false}
            />
          ))}
        </motion.div>
      )}
    </>
  );
}

export default memo(PremiumProductGrid);
