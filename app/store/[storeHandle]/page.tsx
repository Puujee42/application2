'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Store as StoreIcon,
  MapPin,
  Star,
  Package,
  ShoppingBag,
  Phone,
  Mail,
  Award,
  TrendingUp,
  Grid,
  List
} from 'lucide-react';
import type { Store, Product } from '@/types/marketplace';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@store/cartStore';
import toast from 'react-hot-toast';

export default function StorePage() {
  const params = useParams();
  const storeHandle = params.storeHandle as string;
  const [store, setStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        // Fetch store details
        const storeRes = await fetch(`/api/stores/${storeHandle}`);
        const storeData = await storeRes.json();
        setStore(storeData);

        // Fetch store products
        const productsRes = await fetch(`/api/products?storeHandle=${storeHandle}`);
        const productsData = await productsRes.json();
        setProducts(productsData.products || []);
      } catch (error) {
        // Handle error
      } finally {
        setIsLoading(false);
      }
    };

    fetchStoreData();
  }, [storeHandle]);

  const handleAddToCart = (product: Product) => {
    addItem(product as any);
    toast.success(`${product.name} сагсанд нэмэгдлээ!`, {
      duration: 2000,
      position: 'top-right',
      style: {
        background: '#FF7900',
        color: 'white',
        fontWeight: 'bold',
        borderRadius: '12px',
      },
      icon: '🛒',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-[#FF8C00] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!store) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <StoreIcon className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Дэлгүүр олдсонгүй</h2>
          <Link href="/" className="text-[#FF8C00] hover:underline">
            Нүүр хуудас руу буцах
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Store Header Banner */}
      <div className="relative h-64 bg-gradient-to-r from-orange-500 to-orange-600">
        {store.banner && (
          <Image
            src={store.banner}
            alt={store.name}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Store Info Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Store Logo */}
            <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-lg flex-shrink-0 bg-gray-100">
              {store.logo ? (
                <Image
                  src={store.logo}
                  alt={store.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600 text-white text-4xl font-bold">
                  {store.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Store Details */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-black text-gray-900 mb-2">{store.name}</h1>
                  {store.description && (
                    <p className="text-gray-600 mb-4">{store.description}</p>
                  )}
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-bold ${store.status === 'ACTIVE'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                  }`}>
                  {store.status === 'ACTIVE' ? 'Идэвхтэй' : store.status}
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Star className="w-5 h-5 text-orange-600 fill-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Үнэлгээ</p>
                    <p className="text-xl font-bold text-gray-900">{store.rating.toFixed(1)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Бараа</p>
                    <p className="text-xl font-bold text-gray-900">{products.length}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <ShoppingBag className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Захиалга</p>
                    <p className="text-xl font-bold text-gray-900">{store.totalOrders}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Борлуулалт</p>
                    <p className="text-xl font-bold text-gray-900">{store.totalSales}</p>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                {store.city && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-orange-600" />
                    <span>{store.city}</span>
                  </div>
                )}
                {store.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-orange-600" />
                    <span>{store.phone}</span>
                  </div>
                )}
                {store.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-orange-600" />
                    <span>{store.email}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Products Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-gray-900">
              Бүтээгдэхүүнүүд ({products.length})
            </h2>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition ${viewMode === 'grid'
                    ? 'bg-orange-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition ${viewMode === 'list'
                    ? 'bg-orange-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl">
              <Package className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Энэ дэлгүүрт бараа байхгүй байна</p>
            </div>
          ) : (
            <div className={viewMode === 'grid'
              ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
              : 'space-y-4'
            }>
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
                >
                  <Link href={`/product/${product.id}`}>
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      <Image
                        src={product.images[0] || '/placeholder.png'}
                        alt={product.name}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      {product.featured && (
                        <div className="absolute top-3 left-3 px-2 py-1 bg-orange-600 text-white text-xs font-bold rounded-full">
                          ⭐ Онцлох
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="p-4">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="text-sm font-bold text-gray-900 line-clamp-2 mb-2 hover:text-orange-600 transition">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                      </div>
                      <span className="text-xs text-gray-400">({product.totalReviews})</span>
                    </div>

                    <p className="text-2xl font-black text-orange-600 mb-3">
                      {formatPrice(product.price)}
                    </p>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full py-2 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition"
                    >
                      Сагсанд хийх
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
