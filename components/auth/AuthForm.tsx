'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Loader2, Phone, Lock, User, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export default function AuthForm() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ phone: '', password: '', name: '', age: '' });
    const [isCheckingUser, setIsCheckingUser] = useState(false);

    const checkUserExistence = async (phone: string) => {
        if (!phone || phone.length < 8) return;

        // Only check if we are in registration mode
        if (isLogin) return;

        setIsCheckingUser(true);
        try {
            const res = await fetch('/api/auth/check-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone }),
            });

            const data = await res.json();

            if (data.exists) {
                toast.error('Энэ дугаар бүртгэлтэй байна. Нэвтэрнэ үү.', {
                    duration: 4000,
                    icon: '⚠️'
                });
                setIsLogin(true);
            }
        } catch (error) {
            console.error('Failed to check user:', error);
        } finally {
            setIsCheckingUser(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || 'Something went wrong');
            } else {
                if (isLogin) {
                    toast.success('Тавтай морилно уу!');
                    router.push('/');
                    router.refresh();
                } else {
                    toast.success('Амжилттай бүртгэгдлээ! Нэвтэрнэ үү.');
                    setIsLogin(true);
                }
            }
        } catch (error) {
            toast.error('Алкдаа гарлаа');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full"
        >
            <div className="relative bg-black/40 border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl backdrop-blur-xl overflow-hidden">
                {/* Decorative Top Gradient */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50"></div>

                <div className="text-center mb-10">
                    <motion.div
                        initial={{ rotate: -180, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 mb-6 shadow-lg shadow-orange-500/30"
                    >
                        <Sparkles className="w-7 h-7 text-white" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
                        {isLogin ? 'Нэвтрэх' : 'Бүртгүүлэх'}
                    </h2>
                    <p className="text-slate-300/80 text-sm">
                        {isLogin ? 'Тавтай морилно уу! Эргэн ирсэнд баярлалаа.' : 'Шинэ ертөнцөд хөл тавихад бэлэн үү?'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="group">
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 ml-1">Утасны дугаар</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-amber-400 transition-colors duration-300" />
                                <input
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    onBlur={(e) => checkUserExistence(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:bg-white/10 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 outline-none transition-all duration-300"
                                    placeholder="9911..."
                                />
                            </div>
                        </div>

                        {!isLogin && (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="group">
                                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 ml-1">Таны нэр</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-amber-400 transition-colors duration-300" />
                                        <input
                                            type="text"
                                            required={!isLogin}
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:bg-white/10 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 outline-none transition-all duration-300"
                                            placeholder="Бат"
                                        />
                                    </div>
                                </div>
                                <div className="group">
                                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 ml-1">Нас</label>
                                    <div className="relative">
                                        <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-amber-400 transition-colors duration-300" />
                                        <input
                                            type="number"
                                            required={!isLogin}
                                            min="1"
                                            max="120"
                                            value={formData.age}
                                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:bg-white/10 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 outline-none transition-all duration-300"
                                            placeholder="25"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="group">
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 ml-1">Нууц үг</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-amber-400 transition-colors duration-300" />
                                <input
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:bg-white/10 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 outline-none transition-all duration-300"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.01, boxShadow: "0 10px 30px -10px rgba(245, 158, 11, 0.5)" }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-lg"
                    >
                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                            <>
                                {isLogin ? 'Нэвтрэх' : 'Бүртгүүлэх'}
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </motion.button>
                </form>

                <div className="mt-8">
                    <div className="text-center">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-slate-400 hover:text-white text-sm font-medium transition-colors hover:underline underline-offset-4"
                        >
                            {isLogin ? "Бүртгэлгүй юу? " : "Бүртгэлтэй юу? "}
                            <span className="text-amber-400 hover:text-amber-300">
                                {isLogin ? "Шинээр бүртгүүлэх" : "Нэвтрэх"}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
