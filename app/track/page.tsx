'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Package, CheckCircle, ArrowLeft, Phone } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Sample Orders Data (Hardcoded for phone: 99112233)
const sampleOrders = {
  '99112233': [
    {
      id: 'ORD-2024-001',
      date: '2024-02-01',
      items: [
        {
          id: '1',
          name: 'Apple Watch Series 9 - Titanium',
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop',
          price: 1299000,
          quantity: 1,
          status: 'Баталгаажсан',
        },
        {
          id: '2',
          name: 'Sony WH-1000XM5 Wireless Headphones',
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
          price: 449000,
          quantity: 1,
          status: 'Баталгаажсан',
        },
      ],
      totalAmount: 1748000,
    },
    {
      id: 'ORD-2024-002',
      date: '2024-01-28',
      items: [
        {
          id: '3',
          name: 'Nike Air Max 270 - White/Black',
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
          price: 189000,
          quantity: 2,
          status: 'Баталгаажсан',
        },
      ],
      totalAmount: 378000,
    },
  ],
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('mn-MN', {
    style: 'currency',
    currency: 'MNT',
    minimumFractionDigits: 0,
  }).format(price);
};

export default function TrackOrderPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [searchedPhone, setSearchedPhone] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (!phoneNumber.trim()) return;

    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setSearchedPhone(phoneNumber);
      setIsSearching(false);
    }, 800);
  };

  const orders = searchedPhone ? (sampleOrders as any)[searchedPhone] || [] : [];

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-soyol/10 rounded-full mb-6">
            <Package className="w-10 h-10 text-soyol" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-3">
            Захиалга хянах
          </h1>
          <p className="text-lg text-gray-600">
            Утасны дугаараа оруулаад захиалгаа шалгаарай
          </p>
        </motion.div>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 mb-12"
        >
          <label className="block text-sm font-bold text-gray-700 mb-3">
            Утасны дугаар
          </label>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Жишээ: 99112233"
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-soyol focus:ring-4 focus:ring-soyol/10 outline-none transition-all text-lg font-medium"
              />
            </div>
            <motion.button
              onClick={handleSearch}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSearching || !phoneNumber.trim()}
              className="px-8 py-4 bg-soyol text-white font-bold rounded-2xl hover:bg-soyol-dark transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSearching ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  <span>Хайж байна...</span>
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>Хянах</span>
                </>
              )}
            </motion.button>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            💡 Демо: <span className="font-mono bg-gray-100 px-2 py-1 rounded">99112233</span> дугаараар туршиж үзнэ үү
          </p>
        </motion.div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {searchedPhone && (
            <>
              {orders.length > 0 ? (
                <motion.div
                  key="orders-found"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-black text-gray-900">
                      Таны захиалгууд ({orders.length})
                    </h2>
                    <motion.button
                      onClick={() => setSearchedPhone('')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-sm font-bold text-gray-600 hover:text-soyol transition-colors"
                    >
                      Шинэ хайлт хийх
                    </motion.button>
                  </div>

                  {orders.map((order: any, orderIndex: number) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: orderIndex * 0.1 }}
                      className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
                    >
                      {/* Order Header */}
                      <div className="bg-gradient-to-r from-soyol/10 to-transparent px-8 py-6 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Захиалгын дугаар</p>
                            <p className="text-xl font-black text-gray-900">{order.id}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600 mb-1">Огноо</p>
                            <p className="text-lg font-bold text-gray-900">{order.date}</p>
                          </div>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="p-8 space-y-6">
                        {order.items.map((item: any, itemIndex: number) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (orderIndex * 0.1) + (itemIndex * 0.05) }}
                            className="flex items-center gap-6 pb-6 border-b border-gray-100 last:border-0 last:pb-0"
                          >
                            {/* Product Image */}
                            <div className="relative w-24 h-24 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0">
                              <Image
                                src={item.image || '/placeholder.png'}
                                alt={item.name}
                                fill
                                className="object-cover"
                                sizes="96px"
                              />
                            </div>

                            {/* Product Info */}
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">
                                {item.name}
                              </h3>
                              <div className="flex items-center gap-4">
                                <p className="text-sm text-gray-600">
                                  Тоо ширхэг: <span className="font-bold text-gray-900">{item.quantity}</span>
                                </p>
                                <p className="text-2xl font-black text-soyol">
                                  {formatPrice(item.price)}
                                </p>
                              </div>
                            </div>

                            {/* Status Badge */}
                            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-xl border border-green-200">
                              <CheckCircle className="w-5 h-5" />
                              <span className="text-sm font-bold whitespace-nowrap">
                                {item.status}
                              </span>
                            </div>
                          </motion.div>
                        ))}

                        {/* Order Total */}
                        <div className="pt-6 border-t-2 border-gray-200">
                          <div className="flex items-center justify-between">
                            <p className="text-lg font-bold text-gray-700">
                              Нийт дүн:
                            </p>
                            <p className="text-3xl font-black text-soyol">
                              {formatPrice(order.totalAmount)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="no-orders"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-3xl shadow-lg border border-gray-100 p-12 text-center"
                >
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
                    <Package className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-3">
                    Захиалга олдсонгүй
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Танд одоогоор захиалга байхгүй байна.<br />
                    <span className="text-sm text-gray-500">Утасны дугаараа дахин шалгана уу.</span>
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <motion.button
                      onClick={() => setSearchedPhone('')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      Дахин хайх
                    </motion.button>
                    <Link href="/">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-soyol text-white font-bold rounded-xl hover:bg-soyol-dark transition-colors flex items-center gap-2"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        Дэлгүүр рүү буцах
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>

        {/* Help Text */}
        {!searchedPhone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <p className="text-sm text-gray-500">
              Асуудал гарвал{' '}
              <a href="tel:77181818" className="text-soyol font-bold hover:underline">
                77 18 18 18
              </a>{' '}
              дугаар руу залгана уу
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
