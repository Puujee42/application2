'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Trash2, Minus, Plus, Check } from 'lucide-react';
import { useCartStore, type CartItem } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';

interface AntiGravityCartItemProps {
    item: CartItem;
}

export default function AntiGravityCartItem({ item }: AntiGravityCartItemProps) {
    const removeItem = useCartStore((state) => state.removeItem);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const toggleItemSelection = useCartStore((state) => state.toggleItemSelection);

    const [deliveryEstimate, setDeliveryEstimate] = React.useState<string | null>(null);
    const [removing, setRemoving] = useState(false);
    const [imgError, setImgError] = useState(false);

    React.useEffect(() => {
        if (item.stockStatus === 'pre-order') {
            // Static estimate — API дуудахгүй
            const today = new Date();
            const arrival = new Date(today.setDate(today.getDate() + 14));
            const month = arrival.toLocaleString('mn-MN', { month: 'long' });
            const day = arrival.getDate();
            setDeliveryEstimate(`${month}ын ${day}-нд ирэх төлөвтэй`);
        }
    }, [item.id, item.stockStatus]);

    const handleRemove = async () => {
        setRemoving(true);
        await removeItem(item.id);
    };

    const handleQtyChange = async (newQty: number) => {
        if (newQty < 1) return;
        await updateQuantity(item.id, newQty);
    };

    const isPreOrder = item.stockStatus === 'pre-order';

    const dragX = useMotionValue(0);
    const background = useTransform(
        dragX,
        [-80, 0],
        ['rgba(239,68,68,0.15)', 'rgba(255,255,255,0)']
    );
    const trashOpacity = useTransform(dragX, [-80, -30], [1, 0]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={removing ? { opacity: 0, x: -100, scale: 0.8 } : { opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -50 }}
            whileHover={{ y: -4 }}
            className={`relative mb-4 overflow-hidden rounded-[28px] border transition-all duration-500 ${item.selected
                ? isPreOrder
                    ? 'bg-purple-50/10 border-purple-200 shadow-[0_12px_30px_rgba(168,85,247,0.08)]'
                    : 'bg-white border-blue-200 shadow-[0_12px_30px_rgba(0,106,255,0.08)]'
                : 'bg-white/40 backdrop-blur-md border-white/20 shadow-sm'
                }`}
        >
            {/* Баруун талд улаан trash icon (mobile only) */}
            <motion.div
                style={{ background }}
                className="absolute inset-0 z-0 md:hidden pointer-events-none"
            />
            <motion.div
                style={{ opacity: trashOpacity }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 z-0 md:hidden"
            >
                <Trash2 className="w-6 h-6" />
            </motion.div>

            <motion.div
                drag="x"
                dragConstraints={{ left: -80, right: 0 }}
                dragElastic={0.1}
                style={{ x: dragX }}
                onDragEnd={(_, info) => {
                    if (info.offset.x < -60) {
                        handleRemove();
                    } else {
                        dragX.set(0); // буцах
                    }
                }}
                className="relative z-10 flex items-center p-4 gap-4 bg-transparent border-transparent"
            >
                {/* Selection Checkbox - Anti-gravity style */}
                <button
                    onClick={() => toggleItemSelection(item.id)}
                    className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${item.selected
                        ? isPreOrder ? 'bg-purple-600 border-purple-600 shadow-lg shadow-purple-500/30' : 'bg-[#FF5000] border-[#FF5000] shadow-lg shadow-orange-500/30'
                        : 'border-slate-300 bg-white/50'
                        }`}
                >
                    {item.selected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={4} />}
                </button>

                {/* Product Image */}
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-slate-50 shrink-0">
                    <Image
                        src={imgError ? '/soyol-logo.png' : (item.image || '/soyol-logo.png')}
                        onError={() => setImgError(true)}
                        alt={item.name}
                        fill
                        className="object-contain p-2"
                    />
                    {/* Status Badge Over Image - Refined Style */}
                    <div className="absolute top-1 left-1 z-10 pointer-events-none">
                        {isPreOrder ? (
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="px-1.5 py-0.5 bg-white/60 backdrop-blur-md text-blue-600 rounded-md border border-white/20 flex items-center gap-1 shadow-sm pointer-events-auto cursor-help"
                            >
                                <span className="text-[8px] leading-none">✈</span>
                                <span className="text-[7px] font-black uppercase tracking-tight">ЗАХИАЛГААР</span>
                            </motion.div>
                        ) : (
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: [-1, 1, -1] }}
                                className="px-1.5 py-0.5 bg-white/60 backdrop-blur-md text-emerald-600 rounded-md border border-white/20 flex items-center gap-1 shadow-sm pointer-events-auto cursor-help"
                            >
                                <span className="text-[7px] leading-none">⚡</span>
                                <span className="text-[7px] font-black uppercase tracking-tight">БЭЛЭН</span>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0 pointer-events-none md:pointer-events-auto">
                    <h3 className="text-sm font-bold text-slate-800 truncate mb-1 pointer-events-auto">{item.name}</h3>

                    {/* Delivery Estimate (Gemini Powered) */}
                    {isPreOrder && deliveryEstimate && (
                        <p className="text-[10px] font-medium text-purple-600 bg-purple-50/50 rounded-lg p-2 mb-2 italic">
                            {deliveryEstimate}
                        </p>
                    )}

                    <div className="flex items-center gap-2 mb-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${isPreOrder ? 'text-purple-600 bg-purple-50 border-purple-100/50' : 'text-[#FF5000] bg-orange-50 border-orange-100/50'}`}>
                            {item.category}
                        </span>
                    </div>

                    <div className="flex items-end justify-between pointer-events-auto">
                        <div className="flex flex-col">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Үнэ</p>
                            <p className="text-xl font-bold text-[#FF5000]">{formatPrice(item.price)}</p>
                        </div>

                        {/* Quantity Controls - Premium Style */}
                        <div className="flex items-center bg-slate-50 rounded-2xl p-1 border border-slate-100 shadow-inner">
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleQtyChange(item.quantity - 1)}
                                className={`w-8 h-8 flex items-center justify-center rounded-xl transition-all ${item.quantity <= 1 ? 'text-slate-300' : 'text-slate-600 hover:bg-white hover:shadow-sm hover:text-[#FF5000]'}`}
                                disabled={item.quantity <= 1}
                            >
                                <Minus className="w-4 h-4" />
                            </motion.button>
                            <span className="w-10 text-center text-sm font-black text-slate-900">{item.quantity}</span>
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleQtyChange(item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-600 hover:bg-white hover:shadow-sm hover:text-[#FF5000] transition-all"
                            >
                                <Plus className="w-4 h-4" />
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Remove Button - Desktop only since it is handled by swipe on mobile */}
                <button
                    onClick={handleRemove}
                    className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors p-1 hidden md:block"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </motion.div>

            {/* Decorative Glow */}
            {item.selected && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-[40px] rounded-full -mr-16 -mt-16 pointer-events-none" />
            )}
        </motion.div>
    );
}
