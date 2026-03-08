'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ShoppingCart, Heart, Plus } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { useTranslation } from '@/hooks/useTranslation';
import toast from 'react-hot-toast';
import type { Product } from '@models/Product';

interface DiscoveryFeedProps {
  initialProducts: Product[];
}

interface ProductStory {
  product: Product;
  caption: string;
  tags: { x: number; y: number; productId: string }[];
}

export default function DiscoveryFeed({ initialProducts }: DiscoveryFeedProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedStory, setSelectedStory] = useState<ProductStory | null>(null);
  const { t } = useTranslation();
  const addItem = useCartStore((state) => state.addItem);

  // Create story captions (poetic descriptions)
  const createStory = (product: Product): ProductStory => {
    const captions = [
      'Таны амьдралыг өөрчлөх үе ирлээ...',
      'Чанар бол хэвшил биш, амьдралын хэв маяг',
      'Таны хайж байсан тэр зүйл',
      'Гоо сайхан энгийн байдалд оршино',
      'Технологи ба дэлхийлэг нэгдэнэ',
      'Эхлэл нь энд байна',
    ];

    return {
      product,
      caption: captions[Math.floor(Math.random() * captions.length)],
      tags: [{ x: 50, y: 50, productId: product.id }],
    };
  };

  const stories = products.map(createStory);

  const handleShopTheLook = (story: ProductStory) => {
    setSelectedStory(story);
  };

  const handleAddToCart = (product: Product) => {
    addItem(product);
    toast.success(t('toast', 'addedToCart'), {
      icon: '🛒',
      style: {
        background: '#FF7900',
        color: 'white',
        fontWeight: 'bold',
        borderRadius: '12px',
      },
    });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-soyol/10 rounded-full border border-soyol/20 mb-6">
            <Plus className="w-4 h-4 text-soyol" />
            <span className="text-sm font-bold text-soyol">Discovery Feed</span>
          </div>
          <h2 className="text-5xl font-black text-gray-900 mb-4">
            Таны хайж байгаа
            <span className="block bg-gradient-to-r from-soyol to-yellow-500 bg-clip-text text-transparent">
              Inspiration
            </span>
          </h2>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
            Зөвхөн бараа биш, түүх. Зөвхөн худалдаа биш, сэдэл.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {stories.map((story, index) => (
            <motion.div
              key={story.product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: index * 0.05 }}
              className="break-inside-avoid group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              onClick={() => handleShopTheLook(story)}
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={story.product.image || '/placeholder.png'}
                  alt={story.product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Tagged Products Indicator */}
                {story.tags.map((tag, tagIndex) => (
                  <motion.div
                    key={tagIndex}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + tagIndex * 0.1 }}
                    className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ left: `${tag.x}%`, top: `${tag.y}%` }}
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <Plus className="w-4 h-4 text-soyol" />
                      </div>
                      {/* Pulse animation */}
                      <div className="absolute inset-0 bg-soyol rounded-full animate-ping opacity-50" />
                    </div>
                  </motion.div>
                ))}

                {/* Shop The Look Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ scale: 1.05 }}
                  className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <button className="w-full py-3 bg-white/95 backdrop-blur-sm text-gray-900 font-bold rounded-xl hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    Shop The Look
                  </button>
                </motion.div>
              </div>

              {/* Caption */}
              <div className="p-6 space-y-3">
                <p className="text-sm italic text-gray-600 font-light">
                  "{story.caption}"
                </p>
                <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                  {story.product.name}
                </h3>
                <p className="text-2xl font-black text-soyol">
                  {formatPrice(story.product.price)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Side Panel Modal (Shop The Look) */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStory(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedStory(null)}
                className="absolute top-6 right-6 z-10 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>

              {/* Content */}
              <div className="p-8 space-y-8">
                {/* Featured Image */}
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
                  <Image
                    src={selectedStory.product.image || '/placeholder.png'}
                    alt={selectedStory.product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Story Details */}
                <div className="space-y-4">
                  <p className="text-lg italic text-gray-600 font-light">
                    "{selectedStory.caption}"
                  </p>
                  <h3 className="text-3xl font-black text-gray-900">
                    {selectedStory.product.name}
                  </h3>
                </div>

                {/* Tagged Products */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                    Tagged Products
                  </h4>

                  <div className="space-y-4">
                    {/* Main Product */}
                    <div className="p-4 bg-gradient-to-r from-soyol/10 to-transparent rounded-2xl border border-soyol/20">
                      <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                          <Image
                            src={selectedStory.product.image || '/placeholder.png'}
                            alt={selectedStory.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-bold text-gray-900 truncate">
                            {selectedStory.product.name}
                          </h5>
                          <p className="text-xl font-black text-soyol">
                            {formatPrice(selectedStory.product.price)}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAddToCart(selectedStory.product)}
                          className="flex-1 py-3 bg-soyol text-white font-bold rounded-xl hover:bg-soyol/90 transition-all shadow-lg flex items-center justify-center gap-2"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Сагсанд
                        </motion.button>

                        <motion.a
                          href={`/product/${selectedStory.product.id}`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-3 bg-gray-100 text-gray-900 font-bold rounded-xl hover:bg-gray-200 transition-all"
                        >
                          Үзэх
                        </motion.a>
                      </div>
                    </div>

                    {/* Related Products (можно расширить) */}
                    <div className="pt-6 border-t border-gray-200">
                      <p className="text-sm text-gray-600 text-center">
                        Энэ барааг хослуулах бусад сонголтууд удахгүй...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
