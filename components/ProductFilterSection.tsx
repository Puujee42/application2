'use client';

import { motion } from 'framer-motion';
import PremiumSearchBar from './PremiumSearchBar';
import CategoryFilter from './CategoryFilter';

interface ProductFilterSectionProps {
  onSearch?: (query: string) => void;
  onCategoryChange?: (categoryId: string) => void;
  onSortChange?: (sortId: string) => void;
  selectedCategory?: string;
  selectedSort?: string;
  totalProducts?: number;
}

export default function ProductFilterSection({
  onSearch,
  onCategoryChange,
  onSortChange,
  selectedCategory = 'all',
  selectedSort = 'featured',
  totalProducts = 0
}: ProductFilterSectionProps) {
  return (
    <section className="bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Search Bar Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-8 sm:py-10 md:py-12"
        >
          <PremiumSearchBar 
            onSearch={onSearch}
            placeholder="Search for products, brands, or categories..."
          />
        </motion.div>

        {/* Category & Sort Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="pb-6 sm:pb-8"
        >
          <CategoryFilter
            onCategoryChange={onCategoryChange}
            onSortChange={onSortChange}
            selectedCategory={selectedCategory}
            selectedSort={selectedSort}
          />
        </motion.div>

        {/* Active Filters & Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="pb-6 sm:pb-8 flex items-center justify-between flex-wrap gap-4"
        >
          {/* Active Filters */}
          {selectedCategory !== 'all' && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Active Filters:
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onCategoryChange?.('all')}
                className="px-3 py-1.5 bg-slate-900 text-white text-xs font-medium uppercase tracking-wider hover:bg-slate-700 transition-colors flex items-center gap-2"
                style={{ borderRadius: '1px' }}
              >
                <span>{selectedCategory}</span>
                <span className="text-slate-400">×</span>
              </motion.button>
            </div>
          )}

          {/* Result Count for Mobile */}
          <div className="lg:hidden text-sm font-light text-slate-600 tracking-wide">
            {totalProducts > 0 ? `${totalProducts.toLocaleString()} Products` : ''}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
