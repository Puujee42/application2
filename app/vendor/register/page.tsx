'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Store, AtSign, Phone, FileText, CheckCircle, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function VendorRegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [handle, setHandle] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        description: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!handle || !formData.name) return toast.error('Шаардлагатай талбаруудыг бөглөнө үү');

        setLoading(true);
        try {
            const res = await fetch('/api/vendor/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, handle })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Бүртгэл амжилтгүй');

            toast.success('Хүсэлт амжилттай илгээгдлээ');
            router.push('/vendor/dashboard');
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white py-20 px-4">
            <div className="max-w-xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-orange-500/20 ring-1 ring-white/10">
                        <Store className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl font-black mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Дэлгүүр нээх</h1>
                    <p className="text-slate-500 text-lg">Soyol платформын албан ёсны борлуулагч болох хүсэлт илгээх</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <Store className="w-3.5 h-3.5" /> Дэлгүүрийн нэр *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Жишээ: My Tech Shop"
                                className="w-full px-5 py-4 bg-slate-950 border border-white/10 rounded-2xl text-white placeholder-slate-700 focus:border-amber-500/50 outline-none transition-all shadow-inner"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <AtSign className="w-3.5 h-3.5" /> Дэлгүүрийн хаяг (Handle) *
                            </label>
                            <div className="relative">
                                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 font-bold">@</span>
                                <input
                                    type="text"
                                    required
                                    value={handle}
                                    onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                                    placeholder="my-shop"
                                    className="w-full pl-10 pr-5 py-4 bg-slate-950 border border-white/10 rounded-2xl text-white placeholder-slate-700 focus:border-amber-500/50 outline-none transition-all shadow-inner font-mono text-sm"
                                />
                            </div>
                            <p className="text-[10px] text-slate-600 ml-2 italic">Зөвхөн англи үсэг, тоо болон зураас ашиглана уу</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <Phone className="w-3.5 h-3.5" /> Холбоо барих утас
                            </label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="99119911"
                                className="w-full px-5 py-4 bg-slate-950 border border-white/10 rounded-2xl text-white placeholder-slate-700 focus:border-amber-500/50 outline-none transition-all shadow-inner"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <FileText className="w-3.5 h-3.5" /> Товч тайлбар
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={3}
                                placeholder="Танай дэлгүүр ямар чиглэлээр үйл ажиллагаа явуулдаг вэ?"
                                className="w-full px-5 py-4 bg-slate-950 border border-white/10 rounded-2xl text-white placeholder-slate-700 focus:border-amber-500/50 outline-none transition-all shadow-inner resize-none"
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-black rounded-2xl shadow-xl shadow-orange-500/20 flex items-center justify-center gap-3 transition-all disabled:opacity-50 group border border-white/10"
                            >
                                {loading ? (
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                ) : (
                                    <>
                                        <span>Хүсэлт илгээх</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-10 pt-10 border-t border-white/5 space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                            </div>
                            <p className="text-sm text-slate-400">Таны хүсэлтийг админ 24-48 цагийн дотор хянаж баталгаажуулна.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            </div>
                            <p className="text-sm text-slate-400">Баталгаажсаны дараа та өөрийн барааг байршуулж, борлуулалт хийх боломжтой.</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
