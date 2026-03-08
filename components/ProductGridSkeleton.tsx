'use client';

import { motion } from 'framer-motion';

interface ProductGridSkeletonProps {
  count?: number;
}

export default function ProductGridSkeleton({ count = 8 }: ProductGridSkeletonProps) {
  return (
    <div className="relative py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {[...Array(count)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100"
            >
              <div className="relative aspect-square bg-gray-200 animate-pulse">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent shimmer" />
              </div>

              <div className="p-4 space-y-3">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-full">
                    <div className="h-full bg-gradient-to-r from-transparent via-white/50 to-transparent shimmer" />
                  </div>
                  <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-2/3">
                    <div className="h-full bg-gradient-to-r from-transparent via-white/50 to-transparent shimmer" />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-24">
                    <div className="h-full bg-gradient-to-r from-transparent via-white/50 to-transparent shimmer" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="h-6 bg-gray-200 rounded-lg animate-pulse w-20">
                    <div className="h-full bg-gradient-to-r from-transparent via-white/50 to-transparent shimmer" />
                  </div>
                  <div className="h-10 w-10 bg-gray-200 rounded-xl animate-pulse">
                    <div className="h-full bg-gradient-to-r from-transparent via-white/50 to-transparent shimmer" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}
