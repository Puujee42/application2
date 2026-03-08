'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function PremiumHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  // Track mouse for magnetic effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Character reveal animation variants
  const heading = "Таны дуртай бараа";
  const subheading = "хүссэн газраасаа авах";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.3,
      },
    },
  };

  const characterVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base gradient */}
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(255, 121, 0, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 70%, rgba(255, 121, 0, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 60%, rgba(255, 121, 0, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 30%, rgba(255, 121, 0, 0.15) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute inset-0"
        />

        {/* Floating orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-soyol/10 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 100, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-soyol-light/10 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -60, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4,
          }}
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-soyol/8 rounded-full blur-3xl"
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 121, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 121, 0, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side: Typography & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-soyol/10 rounded-full border border-soyol/20"
            >
              <Sparkles className="w-4 h-4 text-soyol" />
              <span className="text-sm font-bold text-soyol">Шинэ цуглуулга</span>
            </motion.div>

            {/* Main Heading with Character Reveal */}
            <div className="space-y-4">
              <motion.h1
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-tight"
              >
                {heading.split('').map((char, index) => (
                  <motion.span key={index} variants={characterVariants}>
                    {char}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.h2
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight"
              >
                {subheading.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    variants={characterVariants}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-soyol via-soyol-light to-soyol"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h2>
            </div>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="text-xl text-gray-600 font-light max-w-xl"
            >
              Монголын хамгийн том онлайн дэлгүүрээс өндөр чанартай бүтээгдэхүүнүүдийг
              хямд үнээр аваарай. Үнэгүй хүргэлт, найдвартай үйлчилгээ.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {/* Primary CTA with Shine Effect */}
              <motion.a
                href="/categories"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-soyol text-white font-bold rounded-2xl overflow-hidden shadow-xl shadow-soyol/30 hover:shadow-2xl hover:shadow-soyol/50 transition-all"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Одоо үзэх
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>

                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['-200%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 5,
                    ease: 'easeInOut',
                  }}
                  style={{
                    transform: 'skewX(-20deg)',
                  }}
                />

                {/* Hover glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-soyol-light to-soyol opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </motion.a>

              {/* Secondary CTA */}
              <motion.a
                href="#products"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-gray-900 font-bold rounded-2xl border-2 border-gray-200 hover:border-soyol hover:text-soyol transition-all shadow-lg hover:shadow-xl"
              >
                Бараа үзэх
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9 }}
              className="flex items-center gap-8 pt-8"
            >
              <div>
                <p className="text-3xl font-black text-gray-900">500+</p>
                <p className="text-sm text-gray-600">Бараа</p>
              </div>
              <div className="h-12 w-px bg-gray-200" />
              <div>
                <p className="text-3xl font-black text-gray-900">1000+</p>
                <p className="text-sm text-gray-600">Хэрэглэгч</p>
              </div>
              <div className="h-12 w-px bg-gray-200" />
              <div>
                <p className="text-3xl font-black text-gray-900">24/7</p>
                <p className="text-sm text-gray-600">Дэмжлэг</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side: Floating Product Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Glow background */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 bg-gradient-to-br from-soyol/30 to-soyol-light/30 rounded-full blur-3xl"
            />

            {/* Floating product container */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 2, 0, -2, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative z-10"
            >
              {/* Product image placeholder (replace with actual product) */}
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-soyol to-soyol-light rounded-3xl flex items-center justify-center shadow-xl">
                      <Sparkles className="w-16 h-16 text-white" />
                    </div>
                    <p className="text-2xl font-black text-gray-900">
                      Таны сонголт
                    </p>
                    <p className="text-gray-600">
                      Өндөр чанартай бүтээгдэхүүн
                    </p>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-16 h-16 bg-soyol/20 rounded-full blur-xl" />
                <div className="absolute bottom-4 left-4 w-20 h-20 bg-soyol-light/20 rounded-full blur-xl" />
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -top-4 -left-4 px-4 py-2 bg-white rounded-2xl shadow-xl border border-gray-100"
              >
                <p className="text-sm font-bold text-soyol">🔥 Онцлох</p>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
                className="absolute -bottom-4 -right-4 px-4 py-2 bg-soyol text-white rounded-2xl shadow-xl shadow-soyol/50"
              >
                <p className="text-sm font-bold">50% хөнгөлөлт</p>
              </motion.div>
            </motion.div>

            {/* Decorative circles */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute -top-20 -right-20 w-40 h-40 border-2 border-soyol/20 rounded-full"
            />

            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, -180, -360],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute -bottom-10 -left-10 w-32 h-32 border-2 border-soyol-light/20 rounded-full"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <p className="text-sm text-gray-600 font-medium">Доош гүйл</p>
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-soyol rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
