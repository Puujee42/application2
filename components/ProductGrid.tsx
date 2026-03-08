'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import DiscoveryProductCard from './DiscoveryProductCard';
import type { Product } from '@models/Product';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = memo(function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: index * 0.05, 
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          <DiscoveryProductCard product={product} index={index} />
        </motion.div>
      ))}
    </div>
  );
});

export default ProductGrid;
