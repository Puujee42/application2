'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Trash2, Minus, Plus, Check } from 'lucide-react';
import { useCartStore, type CartItem } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

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

    // Animation controls
    const [isRemoving, setIsRemoving] = useState(false);

    const handleRemove = async () => {
        setIsRemoving(true);
        setTimeout(async () => {
            await removeItem(item.cartItemId);
        }, 300); // Wait for the exit animation
    };

    const handleUpdateQuantity = async (newQty: number) => {
        if (newQty < 1) return;
        await updateQuantity(item.cartItemId, newQty);
    };

    const discount = item.originalPrice && item.originalPrice > item.price;

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
            className={`relative mb-3 overflow-hidden rounded-[24px] border transition-all duration-500 ${item.selected
                ? 'bg-white border-orange-200 shadow-[0_12px_30px_rgba(255,80,0,0.06)]'
                : 'bg-white border-gray-100 shadow-sm'
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
                {/* Selection Checkbox */}
                <motion.div
                    className="shrink-0 pt-0.5 relative z-10"
                    whileTap={{ scale: 0.9 }}
                >
                    <button
                        onClick={() => toggleItemSelection(item.cartItemId)}
                        className={`w-5 h-5 rounded flex items-center justify-center transition-all ${item.selected
                            ? 'bg-[#FF5000] border-[#FF5000] text-white shadow-sm'
                            : 'border-gray-200 bg-white'
                            }`}
                    >
                        {item.selected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={4} />}
                    </button>
                </motion.div>

                {/* Product Image */}
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-50 shrink-0 border border-gray-50 px-1">
                    <Image
                        src={imgError ? '/soyol-logo.png' : (item.image || '/soyol-logo.png')}
                        onError={() => setImgError(true)}
                        alt={item.name}
                        fill
                        className="object-contain p-1.5"
                    />
                </div>

                {/* Product Info - Linear Layout */}
                <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-0.5">
                    <div className="flex justify-between items-start gap-2">
                        <div className="min-w-0 flex-1">
                            <Link href={`/product/${item.id}`} className="hover:text-[#FF5000] transition-colors">
                                <h3 className="font-bold text-slate-900 text-[15px] leading-tight truncate">{item.name}</h3>
                            </Link>

                            {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                                <p className="text-xs font-medium text-slate-500 mt-1 flex items-center gap-1.5 opacity-90">
                                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                    {Object.values(item.selectedOptions).join(' / ')}
                                </p>
                            )}

                            <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-gray-50 text-gray-400 border border-gray-100/50 uppercase tracking-tighter">
                                {item.category}
                            </span>
                        </div>
                        <div className="text-right shrink-0 flex flex-col items-end">
                            <p className="text-[16px] font-bold text-gray-900 tracking-tight leading-none">
                                {formatPrice(item.price * item.quantity)}
                            </p>
                            {item.quantity > 1 && (
                                <p className="text-[10px] text-gray-400 mt-1 font-medium">
                                    {formatPrice(item.price)} / ш
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2">
                            {isPreOrder ? (
                                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100/50 uppercase">Захиалга</span>
                            ) : (
                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100/50 uppercase">Бэлэн</span>
                            )}
                        </div>

                        {/* Quantity Controls - Premium 12px Rounded */}
                        <div className="flex items-center bg-[#F4F4F5] rounded-[12px] p-0.5 border border-gray-100 shadow-sm">
                            <button
                                onClick={() => handleUpdateQuantity(item.quantity - 1)}
                                className={`w-8 h-8 flex items-center justify-center rounded-[10px] transition-all ${item.quantity <= 1 ? 'text-gray-300' : 'text-gray-600 active:bg-white active:shadow-sm'}`}
                                disabled={item.quantity <= 1}
                            >
                                <Minus className="w-3.5 h-3.5" strokeWidth={3} />
                            </button>
                            <span className="w-8 text-center text-sm font-medium text-gray-900">{item.quantity}</span>
                            <button
                                onClick={() => handleUpdateQuantity(item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center rounded-[10px] text-gray-600 active:bg-white active:shadow-sm transition-all"
                            >
                                <Plus className="w-3.5 h-3.5" strokeWidth={3} />
                            </button>
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
