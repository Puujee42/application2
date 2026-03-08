'use client';

import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ShoppingBag, ChevronRight, Check } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice, formatCurrency } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function TaobaoStickyFooter() {
    const router = useRouter();
    const items = useCartStore((state) => state.items);
    const toggleAllSelection = useCartStore((state) => state.toggleAllSelection);
    const selectedTotalItems = useCartStore((state) => state.getSelectedTotalItems());
    const selectedTotalPrice = useCartStore((state) => state.getSelectedTotalPrice());
    const selectedInStockPrice = useCartStore((state) => state.getSelectedTotalPriceByStatus('in-stock'));
    const selectedPreOrderPrice = useCartStore((state) => state.getSelectedTotalPriceByStatus('pre-order'));

    const allSelected = items.length > 0 && items.every((item) => item.selected);

    // Price animation hook
    const motionPrice = useMotionValue(selectedTotalPrice);
    const springPrice = useSpring(motionPrice, { stiffness: 100, damping: 20 });
    const displayPrice = useTransform(springPrice, (v) =>
        Math.round(v).toLocaleString('mn-MN')
    );

    useEffect(() => {
        motionPrice.set(selectedTotalPrice);
    }, [selectedTotalPrice, motionPrice]);

    return (
        <div className="fixed bottom-0 inset-x-0 z-[60] pb-safe">
            <div className="max-w-md mx-auto px-4 pb-6">
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200, delay: 0.2 }}
                    className="bg-white/90 backdrop-blur-3xl border border-white/40 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-2 pl-6 flex items-center justify-between"
                >
                    {/* Select All */}
                    <button
                        onClick={() => toggleAllSelection(!allSelected)}
                        className="flex items-center gap-2 group"
                    >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${allSelected
                            ? 'bg-slate-900 border-slate-900 shadow-lg shadow-slate-900/20'
                            : 'border-slate-300 bg-white/50'
                            }`}>
                            {allSelected && <Check className="w-3 h-3 text-white" strokeWidth={4} />}
                        </div>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-900 transition-colors">Бүгдийг сонгох</span>
                    </button>

                    {/* Pricing Info */}
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block border-r border-slate-100 pr-4">
                            <div className="flex flex-col gap-0.5">
                                {selectedInStockPrice > 0 && (
                                    <p className="text-[10px] font-bold text-cyan-500 tracking-tight">
                                        Бэлэн: {formatCurrency(selectedInStockPrice)}₮
                                    </p>
                                )}
                                {selectedPreOrderPrice > 0 && (
                                    <p className="text-[10px] font-bold text-purple-500 tracking-tight">
                                        Захиалга: {formatCurrency(selectedPreOrderPrice)}₮
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="text-right">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Нийт ({selectedTotalItems})</p>
                            <p className="text-xl font-bold text-[#FF5000] tracking-tighter inline-flex items-center">
                                <motion.span>{displayPrice}</motion.span>
                                <span className="text-xs ml-0.5 tracking-normal">₮</span>
                            </p>
                        </div>

                        {/* Checkout Button */}
                        <motion.button
                            onClick={() => {
                                if (selectedTotalItems === 0) return;
                                router.push('/checkout');
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={selectedTotalItems === 0}
                            className={`h-12 px-8 sm:px-10 rounded-full flex items-center justify-center gap-2 font-black text-sm uppercase tracking-wider transition-all shadow-xl ${selectedTotalItems > 0
                                ? 'bg-[#1D1D1F] text-white shadow-slate-900/30 active:scale-95'
                                : 'bg-slate-100 text-slate-400 shadow-none grayscale cursor-not-allowed'
                                }`}
                        >
                            Захиалах
                            <ChevronRight className="w-4 h-4 ml-[-4px]" strokeWidth={3} />
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
