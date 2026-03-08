'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface Category {
    id: string;
    name: string;
    image?: string;
    subcategories?: { id: string; name: string; image?: string }[];
}

interface MinimalistCategoryProps {
    onCategorySelect?: (categoryId: string) => void;
    className?: string;
    categories?: Category[];
}

export default function MinimalistCategory({ onCategorySelect, className = '', categories: propCategories }: MinimalistCategoryProps) {
    const { t } = useTranslation();
    const [activeCategory, setActiveCategory] = useState<string>('all');

    // Placeholder data - replace with actual API data or passed props if needed
    const defaultCategories: Category[] = [
        {
            id: 'all',
            name: t('categoryFilter', 'allProducts'),
            image: '/categories/all.png'
        },
        {
            id: 'electronics',
            name: t('categoryFilter', 'electronics'),
            image: '/categories/electronics.png',
            subcategories: [
                { id: 'phones', name: 'Phones', image: '/categories/phones.png' },
                { id: 'laptops', name: 'Laptops', image: '/categories/laptops.png' },
                { id: 'cameras', name: 'Cameras', image: '/categories/cameras.png' }
            ]
        },
        {
            id: 'fashion',
            name: t('categoryFilter', 'fashion'),
            image: '/categories/fashion.png'
        },
        {
            id: 'home',
            name: t('categoryFilter', 'home'),
            image: '/categories/home.png'
        },
        {
            id: 'beauty',
            name: t('categoryFilter', 'beauty'),
            image: '/categories/beauty.png'
        },
    ];

    const categories = propCategories || defaultCategories;
    const activeCategoryData = categories.find(c => c.id === activeCategory);

    return (
        <div className={`bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col md:flex-row h-[500px] md:h-[600px] ${className}`}>
            {/* Sidebar */}
            <div className="w-full md:w-1/4 lg:w-1/5 bg-slate-50/50 overflow-y-auto scrollbar-hide border-r border-slate-100">
                <div className="p-4 space-y-1">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => {
                                setActiveCategory(category.id);
                                onCategorySelect?.(category.id);
                            }}
                            className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 group ${activeCategory === category.id
                                    ? 'bg-white shadow-md text-orange-600 scale-100'
                                    : 'hover:bg-white/50 text-slate-500 hover:text-slate-900'
                                }`}
                        >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${activeCategory === category.id ? 'bg-orange-50' : 'bg-white'
                                }`}>
                                <div className="relative w-6 h-6 flex items-center justify-center">
                                    <div className={`w-full h-full rounded-full ${activeCategory === category.id ? 'bg-orange-500' : 'bg-slate-200'} opacity-20`} />
                                    <span className="absolute text-xs font-bold text-slate-500">{category.name.substring(0, 1)}</span>
                                </div>
                            </div>
                            <span className={`text-sm font-bold tracking-tight text-left ${activeCategory === category.id ? 'font-black' : ''}`}>
                                {category.name}
                            </span>
                            {activeCategory === category.id && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className="w-1 h-6 bg-orange-500 rounded-full ml-auto"
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Grid */}
            <div className="flex-1 p-6 md:p-8 overflow-y-auto bg-white relative">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tighter">
                            {activeCategoryData?.name}
                        </h2>
                        <Link href={`/category/${activeCategory}`} className="flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700 uppercase tracking-widest group">
                            View All
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {activeCategoryData?.subcategories ? (
                            activeCategoryData.subcategories.map((sub) => (
                                <Link
                                    key={sub.id}
                                    href={`/category/${activeCategory}/${sub.id}`}
                                    className="group block"
                                >
                                    <div className="aspect-[4/3] rounded-2xl bg-slate-50 mb-3 overflow-hidden relative border border-slate-100 group-hover:border-orange-200 transition-colors">
                                        {/* Image Placeholder - object-contain as requested */}
                                        <div className="absolute inset-2">
                                            <div className="w-full h-full bg-slate-200/50 rounded-xl" />
                                            {/* <Image src={sub.image} alt={sub.name} fill className="object-contain p-2" /> */}
                                        </div>
                                    </div>
                                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors text-center">
                                        {sub.name}
                                    </h3>
                                </Link>
                            ))
                        ) : (
                            // Generic grid if no subcategories, just to show Minimalist Grid structure
                            Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="group cursor-pointer">
                                    <div className="aspect-square rounded-3xl bg-slate-50 mb-4 relative overflow-hidden group-hover:shadow-xl group-hover:shadow-orange-500/10 transition-all duration-300">
                                        <div className="absolute inset-4 bg-white rounded-2xl flex items-center justify-center p-2">
                                            {/* Mock Image using object-contain */}
                                            <div className="w-full h-full relative">
                                                <div className="w-full h-full bg-slate-100 rounded-xl" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors">Item {i + 1}</h3>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
