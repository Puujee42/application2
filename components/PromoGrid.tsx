'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Zap, Star, TrendingUp } from 'lucide-react';

const promos = [
  {
    id: 1,
    title: 'Шинэ ирсэн',
    subtitle: 'Сүүлийн үеийн бараанууд',
    icon: Star,
    gradient: 'from-soyol/90 to-soyol-dark',
    link: '/categories?filter=new',
  },
  {
    id: 2,
    title: 'Хамгийн их борлуулалттай',
    subtitle: 'Алдартай бүтээгдэхүүн',
    icon: TrendingUp,
    gradient: 'from-gray-900 to-gray-800',
    link: '/categories?filter=bestseller',
  },
  {
    id: 3,
    title: 'Flash Sale',
    subtitle: '70% хүртэл хөнгөлөлт',
    icon: Zap,
    gradient: 'from-red-600 to-red-700',
    link: '/deals',
  },
];

export default function PromoGrid() {
  return (
    <section className="relative py-6 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {promos.map((promo, index) => {
            const Icon = promo.icon;
            return (
              <motion.a
                key={promo.id}
                href={promo.link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${promo.gradient} p-6 shadow-lg hover:shadow-xl transition-all`}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute -right-8 -top-8 w-32 h-32 bg-white rounded-full blur-2xl" />
                  <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-white rounded-full blur-2xl" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-5 h-5 text-white" />
                      <h3 className="text-lg font-black text-white">
                        {promo.title}
                      </h3>
                    </div>
                    <p className="text-sm text-white/80 font-medium">
                      {promo.subtitle}
                    </p>
                  </div>

                  <motion.div
                    className="ml-4 p-2 bg-white/20 backdrop-blur-sm rounded-full"
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <ArrowRight className="w-5 h-5 text-white" />
                  </motion.div>
                </div>

                {/* Shine Effect on Hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
