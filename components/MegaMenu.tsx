'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface SubCategory {
  name: string;
  href: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: SubCategory[];
  featured?: {
    title: string;
    image: string;
    href: string;
  };
}

interface MegaMenuProps {
  isOpen: boolean;
  categories: Category[];
  onClose: () => void;
}

export default function MegaMenu({ isOpen, categories, onClose }: MegaMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-40"
            onClick={onClose}
          />

          {/* Mega Menu Content */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full mt-0 bg-white shadow-2xl border-t border-slate-200 z-50"
            onMouseLeave={onClose}
          >
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="grid grid-cols-4 gap-8">
                {categories.map((category) => (
                  <div key={category.id} className="space-y-4">
                    {/* Category Header */}
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                      <span className="text-2xl">{category.icon}</span>
                      <h3 className="font-semibold text-slate-900 text-sm">
                        {category.name}
                      </h3>
                    </div>

                    {/* Subcategories */}
                    <ul className="space-y-2">
                      {category.subcategories.slice(0, 8).map((sub) => (
                        <li key={sub.name}>
                          <Link
                            href={sub.href}
                            className="flex items-center justify-between group text-sm text-slate-600 hover:text-[#FF4000] transition-colors py-1"
                          >
                            <span>{sub.name}</span>
                            <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={2} />
                          </Link>
                        </li>
                      ))}
                      {category.subcategories.length > 8 && (
                        <li>
                          <Link
                            href={`/category/${category.id}`}
                            className="text-sm text-[#FF4000] font-medium hover:underline"
                          >
                            + {category.subcategories.length - 8} more
                          </Link>
                        </li>
                      )}
                    </ul>

                    {/* Featured Product */}
                    {category.featured && (
                      <Link
                        href={category.featured.href}
                        className="block mt-4 group"
                      >
                        <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-100">
                          <Image
                            src={category.featured.image}
                            alt={category.featured.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <p className="text-xs text-slate-600 mt-2 group-hover:text-[#FF4000] transition-colors">
                          {category.featured.title}
                        </p>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
