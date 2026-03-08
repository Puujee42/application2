'use client';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Star, Flame, Grid } from 'lucide-react';

const filters = [
  { id: 'all', label: 'Бүгд', icon: Grid },
  { id: 'today', label: 'Өнөөдөр', icon: Sparkles },
  { id: 'new', label: 'Шинэ', icon: TrendingUp },
  { id: 'featured', label: 'Онцлох', icon: Star },
  { id: 'sale', label: 'Хямдрал', icon: Flame },
];

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filterId: string) => void;
}

export default function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  return (
    <section className="bg-white/90 backdrop-blur-xl py-8 sticky top-20 z-40 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {filters.map((filter) => {
            const Icon = filter.icon;
            const isActive = activeFilter === filter.id;

            return (
              <motion.button
                key={filter.id}
                onClick={() => onFilterChange(filter.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm whitespace-nowrap transition-all ${isActive
                    ? 'bg-soyol text-white shadow-sm glow-orange'
                    : 'bg-white text-gray-700 hover:bg-soyol/10 border-2 border-soyol'
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span>{filter.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
