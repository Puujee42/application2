'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore, type CartItem } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';


interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useCartStore();
  const { t } = useTranslation();

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleQuantity = (item: CartItem, delta: number) => {
    const next = item.quantity + delta;
    if (next < 1) removeItem(item.cartItemId);
    else updateQuantity(item.cartItemId, next);
  };

  const selectedItems = items.filter(i => i.selected);
  const selectedCount = selectedItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Step 1: Light Dimming + 8px Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-md"
            aria-hidden
          />

          {/* Step 2: Sidebar Panel with Sharp Edge and Soft Depth */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
            className="fixed right-0 top-0 bottom-0 z-[101] w-full max-w-[420px] 
            bg-white border-l border-gray-200 shadow-[-10px_0_30px_rgba(0,0,0,0.05)] flex flex-col font-['Inter']"
            role="dialog"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  Таны сагс
                </h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                  {totalItems} бараа нэмэгдсэн
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-all"
              >
                <X className="w-5 h-5" strokeWidth={2.5} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar py-2">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-6">
                    <ShoppingBag className="w-8 h-8 text-slate-200" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Сагс хоосон байна</h3>
                  <p className="text-sm text-slate-500 mb-8 max-w-[200px]">Та сонирхсон бараагаа сагсандаа нэмээрэй.</p>
                  <button
                    onClick={onClose}
                    className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-all"
                  >
                    Дэлгүүр хэсэх
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-slate-50 px-6">
                  {items.map((item) => (
                    <div key={item.id} className="py-6 flex gap-4 group">
                      <div className="relative w-20 h-24 flex-shrink-0 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
                        <Image
                          src={item.image || '/soyol-logo.png'}
                          alt={item.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm truncate">{item.name}</h4>
                          
                          {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                            <p className="text-xs text-slate-500 mt-0.5 font-medium flex items-center gap-1">
                              <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                              {Object.values(item.selectedOptions).join(' / ')}
                            </p>
                          )}

                          <div className="flex flex-col mt-1">
                            <span className="font-sora font-bold text-[#FF5000] text-sm">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                            {item.quantity > 1 && (
                              <span className="text-[10px] text-slate-400 font-medium">
                                {formatPrice(item.price)} / ш
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center bg-slate-50 rounded-lg p-1 border border-slate-100">
                            <button
                              onClick={() => handleQuantity(item, -1)}
                              className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm transition-all text-slate-500"
                            >
                              <Minus className="w-3.5 h-3.5" strokeWidth={3} />
                            </button>
                            <span className="w-8 text-center text-xs font-black text-slate-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantity(item, 1)}
                              className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm transition-all text-slate-500"
                            >
                              <Plus className="w-3.5 h-3.5" strokeWidth={3} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.cartItemId)}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors self-start ml-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 bg-slate-50 border-t border-slate-100 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-bold text-sm uppercase tracking-wider">Нийт дүн</span>
                  <span className="text-2xl font-bold text-orange-500">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3 pt-2">
                  <Link href="/cart" onClick={onClose}>
                    {/* Step 3: View Cart Button refined with light background */}
                    <button className="w-full py-4 border border-gray-200 bg-[#f9fafb] text-slate-900 rounded-xl font-bold text-sm hover:border-gray-300 hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                      Сагс үзэх
                    </button>
                  </Link>
                  <Link href="/checkout" onClick={onClose}>
                    <motion.button
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-[#FF5722] text-white rounded-xl font-black text-sm shadow-lg shadow-orange-500/20 
                      flex items-center justify-center gap-2 tracking-widest uppercase transition-all"
                    >
                      Төлбөр төлөх
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </Link>
                </div>
                <p className="text-[10px] text-center text-slate-400 font-medium">
                  Татвар болон хүргэлтийн хураамж дараагийн шатанд тооцогдоно.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
