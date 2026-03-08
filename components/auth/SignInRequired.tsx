'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { LogIn, UserPlus, ShoppingBag, Heart } from 'lucide-react';

interface SignInRequiredProps {
    title: string;
    description: string;
    iconType: 'cart' | 'wishlist';
}

export default function SignInRequired({ title, description, iconType }: SignInRequiredProps) {
    const Icon = iconType === 'cart' ? ShoppingBag : Heart;

    return (
        <div className="min-h-[60vh] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 text-center"
            >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-50 rounded-full mb-6">
                    <Icon className="w-10 h-10 text-orange-500" strokeWidth={1.5} />
                </div>
                
                <h2 className="text-2xl font-bold text-slate-900 mb-3">{title}</h2>
                <p className="text-slate-600 mb-8">{description}</p>
                
                <div className="grid grid-cols-1 gap-3">
                    <Link href="/sign-in" className="w-full">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 bg-orange-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/25"
                        >
                            <LogIn className="w-5 h-5" />
                            Нэвтрэх
                        </motion.button>
                    </Link>
                    
                    <Link href="/sign-up" className="w-full">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 bg-slate-50 text-slate-700 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors border border-slate-200"
                        >
                            <UserPlus className="w-5 h-5" />
                            Бүртгүүлэх
                        </motion.button>
                    </Link>
                </div>
                
                <p className="mt-8 text-sm text-slate-400">
                    Үргэлжлүүлэхийн тулд эхлээд нэвтэрнэ үү
                </p>
            </motion.div>
        </div>
    );
}
