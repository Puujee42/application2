'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, SlidersHorizontal, X } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export interface Category {
  id: string;
  name: string;
  count?: number;
}

export interface SortOption {
  id: string;
  label: string;
}

interface CategoryFilterProps {
  onCategoryChange?: (categoryId: string) => void;
  onSortChange?: (sortId: string) => void;
  selectedCategory?: string;
  selectedSort?: string;
  className?: string;
}

export default function CategoryFilter({
  onCategoryChange,
  onSortChange,
  selectedCategory = 'all',
  selectedSort = 'featured',
  className = ''
}: CategoryFilterProps) {
  const { t } = useTranslation();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  const categories: Category[] = [
    { id: 'all', name: t('categoryFilter', 'allProducts'), count: 1247 },
    { id: 'electronics', name: t('categoryFilter', 'electronics'), count: 342 },
    { id: 'fashion', name: t('categoryFilter', 'fashion'), count: 189 },
    { id: 'home', name: t('categoryFilter', 'home'), count: 156 },
    { id: 'beauty', name: t('categoryFilter', 'beauty'), count: 98 },
    { id: 'sports', name: t('categoryFilter', 'sports'), count: 134 },
    { id: 'books', name: t('categoryFilter', 'books'), count: 87 },
    { id: 'toys', name: t('categoryFilter', 'toys'), count: 76 },
    { id: 'automotive', name: t('categoryFilter', 'automotive'), count: 65 },
  ];

  const sortOptions: SortOption[] = [
    { id: 'featured', label: t('categoryFilter', 'featured') },
    { id: 'newest', label: t('categoryFilter', 'newest') },
    { id: 'price-low', label: t('categoryFilter', 'priceLowHigh') },
    { id: 'price-high', label: t('categoryFilter', 'priceHighLow') },
    { id: 'popular', label: t('categoryFilter', 'popular') },
    { id: 'rating', label: t('categoryFilter', 'rating') },
  ];

  const selectedCategoryName = categories.find(c => c.id === selectedCategory)?.name || t('categoryFilter', 'allProducts');
  const selectedSortLabel = sortOptions.find(s => s.id === selectedSort)?.label || t('categoryFilter', 'featured');

  const handleCategorySelect = (categoryId: string) => {
    if (onCategoryChange) {
      onCategoryChange(categoryId);
    }
    setIsCategoryOpen(false);
  };

  const handleSortSelect = (sortId: string) => {
    if (onSortChange) {
      onSortChange(sortId);
    }
    setIsSortOpen(false);
  };

  return (
    <div className={`${className}`}>
      {/* Desktop Filter Bar */}
      <div className="hidden lg:flex items-center justify-between gap-4">
        {/* Category Dropdown */}
        <div className="relative flex-1 max-w-xs">
          <button
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="w-full px-6 py-4 bg-white border-2 border-slate-200 hover:border-slate-900 transition-all flex items-center justify-between group"
            style={{ borderRadius: '2px' }}
          >
            <div className="flex flex-col items-start">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-0.5">
                {t('categoryFilter', 'category')}
              </span>
              <span className="text-[15px] font-light text-slate-900 tracking-wide">
                {selectedCategoryName}
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-all duration-300 ${isCategoryOpen ? 'rotate-180' : ''
                }`}
              strokeWidth={1.5}
            />
          </button>

          {/* Category Dropdown Menu */}
          <AnimatePresence>
            {isCategoryOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsCategoryOpen(false)}
                />

                {/* Dropdown */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-full mt-2 w-full bg-white border-2 border-slate-900 shadow-2xl z-50 overflow-hidden"
                  style={{ borderRadius: '2px' }}
                >
                  <div className="py-2 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        className="w-full px-6 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 border-2 flex items-center justify-center transition-all ${selectedCategory === category.id
                            ? 'border-slate-900 bg-slate-900'
                            : 'border-slate-300 group-hover:border-slate-900'
                            }`}>
                            {selectedCategory === category.id && (
                              <Check className="w-3 h-3 text-white" strokeWidth={3} />
                            )}
                          </div>
                          <span className="text-[15px] font-light text-slate-900 tracking-wide">
                            {category.name}
                          </span>
                        </div>
                        {category.count && (
                          <span className="text-xs text-slate-400 font-light">
                            {category.count}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Sort Dropdown */}
        <div className="relative flex-1 max-w-xs">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="w-full px-6 py-4 bg-white border-2 border-slate-200 hover:border-slate-900 transition-all flex items-center justify-between group"
            style={{ borderRadius: '2px' }}
          >
            <div className="flex flex-col items-start">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-0.5">
                {t('categoryFilter', 'sortBy')}
              </span>
              <span className="text-[15px] font-light text-slate-900 tracking-wide">
                {selectedSortLabel}
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-all duration-300 ${isSortOpen ? 'rotate-180' : ''
                }`}
              strokeWidth={1.5}
            />
          </button>

          {/* Sort Dropdown Menu */}
          <AnimatePresence>
            {isSortOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsSortOpen(false)}
                />

                {/* Dropdown */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 w-full bg-white border-2 border-slate-900 shadow-2xl z-50 overflow-hidden"
                  style={{ borderRadius: '2px' }}
                >
                  <div className="py-2">
                    {sortOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleSortSelect(option.id)}
                        className="w-full px-6 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors group"
                      >
                        <span className={`text-[15px] font-light tracking-wide ${selectedSort === option.id
                          ? 'text-slate-900 font-normal'
                          : 'text-slate-600'
                          }`}>
                          {option.label}
                        </span>
                        {selectedSort === option.id && (
                          <Check className="w-4 h-4 text-slate-900" strokeWidth={2} />
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Results Count */}
        <div className="px-6 py-4 bg-slate-50 border-2 border-slate-200">
          <span className="text-[15px] font-light text-slate-600 tracking-wide">
            1,247 {t('categoryFilter', 'products')}
          </span>
        </div>
      </div>

      {/* Mobile Filter Button */}
      <div className="lg:hidden">
        <motion.button
          onClick={() => setIsFilterPanelOpen(true)}
          whileTap={{ scale: 0.98 }}
          className="w-full px-6 py-4 bg-white/20 backdrop-blur-xl border border-white/30 text-slate-900 shadow-xl flex items-center justify-center gap-3 hover:bg-white/30 transition-all rounded-2xl"
        >
          <SlidersHorizontal className="w-5 h-5" strokeWidth={1.5} />
          <span className="text-sm font-bold uppercase tracking-wider">
            {t('categoryFilter', 'filterSort')}
          </span>
        </motion.button>
      </div>

      {/* Mobile Filter Panel */}
      <AnimatePresence>
        {isFilterPanelOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setIsFilterPanelOpen(false)}
            />

            {/* Slide-out Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white/80 backdrop-blur-2xl shadow-2xl z-50 lg:hidden overflow-y-auto border-l border-white/20"
            >
              {/* Panel Header */}
              <div className="sticky top-0 bg-slate-900/90 backdrop-blur-md px-6 py-4 flex items-center justify-between z-10">
                <h3 className="text-lg font-medium text-white uppercase tracking-wider">
                  {t('categoryFilter', 'filterSort')}
                </h3>
                <button
                  onClick={() => setIsFilterPanelOpen(false)}
                  className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all"
                >
                  <X className="w-6 h-6" strokeWidth={2} />
                </button>
              </div>

              {/* Categories Section */}
              <div className="p-6 border-b border-slate-200">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
                  {t('categoryFilter', 'category')}
                </h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        handleCategorySelect(category.id);
                        setIsFilterPanelOpen(false);
                      }}
                      className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 border-2 flex items-center justify-center ${selectedCategory === category.id
                          ? 'border-slate-900 bg-slate-900'
                          : 'border-slate-300'
                          }`}>
                          {selectedCategory === category.id && (
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                          )}
                        </div>
                        <span className="text-[15px] font-light text-slate-900">
                          {category.name}
                        </span>
                      </div>
                      {category.count && (
                        <span className="text-xs text-slate-400">
                          {category.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Section */}
              <div className="p-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
                  {t('categoryFilter', 'sortBy')}
                </h4>
                <div className="space-y-2">
                  {sortOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        handleSortSelect(option.id);
                        setIsFilterPanelOpen(false);
                      }}
                      className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors"
                    >
                      <span className={`text-[15px] font-light ${selectedSort === option.id
                        ? 'text-slate-900 font-normal'
                        : 'text-slate-600'
                        }`}>
                        {option.label}
                      </span>
                      {selectedSort === option.id && (
                        <Check className="w-4 h-4 text-slate-900" strokeWidth={2} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
