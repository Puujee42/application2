'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  image: string;
  size: 'small' | 'medium' | 'large' | 'tall' | 'wide';
  link: string;
}

const categories: Category[] = [
  {
    id: '1',
    name: 'Home Aesthetics',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=800&fit=crop&q=80',
    size: 'large',
    link: '/categories?filter=home',
  },
  {
    id: '2',
    name: 'Trend Lookbook',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=800&fit=crop&q=80',
    size: 'tall',
    link: '/categories?filter=fashion',
  },
  {
    id: '3',
    name: 'Smart Living',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=800&fit=crop&q=80',
    size: 'medium',
    link: '/categories?filter=tech',
  },
  {
    id: '4',
    name: 'Cozy Corner',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=800&fit=crop&q=80',
    size: 'medium',
    link: '/categories?filter=furniture',
  },
  {
    id: '5',
    name: 'Personal Care',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=800&fit=crop&q=80',
    size: 'wide',
    link: '/categories?filter=beauty',
  },
  {
    id: '6',
    name: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=800&h=800&fit=crop&q=80',
    size: 'small',
    link: '/categories?filter=lifestyle',
  },
  {
    id: '7',
    name: 'Furry Friends',
    image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&h=800&fit=crop&q=80',
    size: 'small',
    link: '/categories?filter=pets',
  },
  {
    id: '8',
    name: 'New In',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=800&fit=crop&q=80',
    size: 'small',
    link: '/new-arrivals',
  },
];

const sizeClasses = {
  small: 'col-span-6 sm:col-span-3 row-span-1',
  medium: 'col-span-6 sm:col-span-6 row-span-1',
  large: 'col-span-12 sm:col-span-6 row-span-2',
  tall: 'col-span-6 sm:col-span-6 row-span-2',
  wide: 'col-span-12 sm:col-span-12 row-span-1',
};

export default function BentoCategories() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-soyol/5 rounded-full border border-soyol/10 mb-6"
          >
            <span className="w-2 h-2 bg-soyol rounded-full animate-pulse" />
            <span className="text-sm font-bold text-soyol">Shop by Category</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl sm:text-5xl font-black text-gray-900 mb-4"
          >
            Explore Collections
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg text-gray-600 font-light max-w-2xl mx-auto"
          >
            Өөрийн загварыг олоорой - Гэрийн чимэглэлээс хувийн арчилгаа хүртэл
          </motion.p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-4 auto-rows-[200px]">
          {categories.map((category, index) => (
            <motion.a
              key={category.id}
              href={category.link}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className={`${sizeClasses[category.size]} group relative overflow-hidden rounded-3xl cursor-pointer border border-white/10`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw, 33vw"
                  />
                </motion.div>

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 group-hover:from-black/60 group-hover:via-black/30 group-hover:to-black/10 transition-all duration-500" />
              </div>

              {/* Content */}
              <div className="relative h-full p-6 flex flex-col justify-end">
                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    {category.name}
                  </h3>

                  {/* Hover Arrow */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="inline-flex items-center gap-2 text-white/90 font-bold text-sm group-hover:text-white transition-colors"
                  >
                    <span>Browse</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </motion.div>
                </div>

                {/* Bottom Accent Line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.4 }}
                  className="absolute bottom-0 left-0 h-1 bg-soyol"
                />
              </div>

              {/* Hover Border Glow */}
              <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 rounded-3xl border-2 border-white/20" />
                <div className="absolute inset-0 rounded-3xl border border-soyol/30 blur-sm" />
              </motion.div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
