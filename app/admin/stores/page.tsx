'use client';

import { useState, useEffect } from 'react';
import {
    Building2, Search, Filter, CheckCircle, XCircle,
    MoreVertical, Store, Phone, Mail, Calendar,
    TrendingUp, Percent, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

interface Store {
    _id: string;
    vendorId: string;
    handle: string;
    name: string;
    description?: string;
    logo?: string;
    status: 'pending' | 'active' | 'suspended';
    commissionRate: number;
    phone?: string;
    email?: string;
    totalSales: number;
    totalOrders: number;
    createdAt: string;
}

export default function AdminStoresPage() {
    const [stores, setStores] = useState<Store[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'active' | 'suspended'>('all');
    const [selectedStore, setSelectedStore] = useState<Store | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        fetchStores();
    }, []);

    const fetchStores = async () => {
        try {
            const res = await fetch('/api/admin/stores');
            const data = await res.json();
            setStores(data);
        } catch (error) {
            toast.error('Дэлгүүрүүдийг ачаалахад алдаа гарлаа');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStore = async (storeId: string, updates: Partial<Store>) => {
        setUpdating(true);
        try {
            const res = await fetch('/api/admin/stores', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ storeId, ...updates })
            });

            if (!res.ok) throw new Error('Update failed');

            toast.success('Амжилттай шинэчлэгдлээ');
            fetchStores();
            if (selectedStore && selectedStore._id === storeId) {
                setSelectedStore({ ...selectedStore, ...updates } as Store);
            }
        } catch (error) {
            toast.error('Алдаа гарлаа');
        } finally {
            setUpdating(false);
        }
    };

    const filteredStores = stores.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.handle.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || s.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'text-emerald-400 bg-emerald-500/10 ring-emerald-500/20';
            case 'pending': return 'text-amber-400 bg-amber-500/10 ring-amber-500/20';
            case 'suspended': return 'text-red-400 bg-red-500/10 ring-red-500/20';
            default: return 'text-slate-400 bg-slate-500/10 ring-slate-500/20';
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Дэлгүүрүүд</h1>
                    <p className="text-sm text-slate-400">Борлуулагчдын дэлгүүрийг удирдах</p>
                </div>

                <div className="flex bg-slate-900 border border-white/10 rounded-xl p-1">
                    {(['all', 'pending', 'active', 'suspended'] as const).map(s => (
                        <button
                            key={s}
                            onClick={() => setFilterStatus(s)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${filterStatus === s ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'text-slate-500 hover:text-slate-300'
                                }`}
                        >
                            {s === 'all' ? 'Бүгд' : s === 'pending' ? 'Хүлээгдэж буй' : s === 'active' ? 'Идэвхтэй' : 'Түдгэлзүүлсэн'}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Дэлгүүрийн нэр, хаягаар хайх..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:border-amber-500/50 outline-none transition-all"
                    />
                </div>
            </div>

            <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">
                {loading ? (
                    <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 text-amber-500 animate-spin" /></div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-800/50 border-b border-white/10 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                    <th className="px-6 py-4">Дэлгүүр</th>
                                    <th className="px-6 py-4">Төлөв</th>
                                    <th className="px-6 py-4">Шимтгэл</th>
                                    <th className="px-6 py-4">Борлуулалт</th>
                                    <th className="px-6 py-4">Бүртгүүлсэн</th>
                                    <th className="px-6 py-4 text-right">Үйлдэл</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredStores.map(store => (
                                    <tr key={store._id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center border border-white/10 text-slate-400 overflow-hidden">
                                                    {store.logo ? <img src={store.logo} alt="" className="w-full h-full object-cover" /> : <Store className="w-5 h-5" />}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-white">{store.name}</p>
                                                    <p className="text-xs text-slate-500">@{store.handle}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ring-1 ${getStatusColor(store.status)}`}>
                                                {store.status === 'pending' ? 'ХҮЛЭЭГДЭЖ БУЙ' : store.status === 'active' ? 'ИДЭВХТЭЙ' : 'ТҮДГЭЛЗҮҮЛСЭН'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 text-sm font-bold text-blue-400">
                                                <Percent className="w-3.5 h-3.5" />
                                                {store.commissionRate}%
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-0.5">
                                                <p className="text-sm font-bold text-white">{store.totalSales.toLocaleString()}₮</p>
                                                <p className="text-xs text-slate-500">{store.totalOrders} захиалга</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-slate-400">
                                            {format(new Date(store.createdAt), 'yyyy/MM/dd')}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => { setSelectedStore(store); setIsModalOpen(true); }}
                                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                                            >
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            <AnimatePresence>
                {isModalOpen && selectedStore && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                            className="relative bg-slate-900 border border-white/10 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl"
                        >
                            <div className="p-6 border-b border-white/10 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                                        <Store className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold">{selectedStore.name}</h2>
                                        <p className="text-sm text-slate-500">@{selectedStore.handle}</p>
                                    </div>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-xl hover:bg-white/10 text-slate-400 transition-all"><XCircle className="w-6 h-6" /></button>
                            </div>

                            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-1">
                                        <p className="text-[10px] font-bold text-slate-500 uppercase">Борлуулалт</p>
                                        <div className="flex items-center justify-between">
                                            <p className="text-lg font-bold text-white">{selectedStore.totalSales.toLocaleString()}₮</p>
                                            <TrendingUp className="w-5 h-5 text-emerald-500" />
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-1">
                                        <p className="text-[10px] font-bold text-slate-500 uppercase">Шимтгэл (%)</p>
                                        <div className="flex items-center justify-between">
                                            <input
                                                type="number"
                                                defaultValue={selectedStore.commissionRate}
                                                onBlur={(e) => handleUpdateStore(selectedStore._id, { commissionRate: Number(e.target.value) })}
                                                className="text-lg font-bold text-white bg-transparent outline-none w-20"
                                            />
                                            <Percent className="w-5 h-5 text-blue-500" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-slate-300">
                                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400"><Phone className="w-4 h-4" /></div>
                                        <div>
                                            <p className="text-xs text-slate-500">Утас</p>
                                            <p className="text-sm font-bold">{selectedStore.phone || 'Мэдээлэлгүй'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-300">
                                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400"><Mail className="w-4 h-4" /></div>
                                        <div>
                                            <p className="text-xs text-slate-500">Мэйл</p>
                                            <p className="text-sm font-bold">{selectedStore.email || 'Мэдээлэлгүй'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-300">
                                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400"><Calendar className="w-4 h-4" /></div>
                                        <div>
                                            <p className="text-xs text-slate-500">Бүртгүүлсэн</p>
                                            <p className="text-sm font-bold">{format(new Date(selectedStore.createdAt), 'yyyy оны MM сарын dd')}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-xs font-bold text-slate-500 uppercase">Тайлбар</p>
                                    <p className="text-sm text-slate-400 leading-relaxed bg-slate-950 p-4 rounded-xl border border-white/5">
                                        {selectedStore.description || 'Тайлбар оруулаагүй байна.'}
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 bg-slate-800/50 border-t border-white/10 flex gap-3">
                                {selectedStore.status === 'pending' ? (
                                    <>
                                        <button
                                            onClick={() => handleUpdateStore(selectedStore._id, { status: 'active' })}
                                            disabled={updating}
                                            className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                                        >
                                            <CheckCircle className="w-5 h-5" /> Дэлгүүрийг батлах
                                        </button>
                                    </>
                                ) : selectedStore.status === 'active' ? (
                                    <button
                                        onClick={() => handleUpdateStore(selectedStore._id, { status: 'suspended' })}
                                        disabled={updating}
                                        className="flex-1 py-3 bg-red-500/10 text-red-500 hover:bg-red-500/20 font-bold border border-red-500/20 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                                    >
                                        <XCircle className="w-5 h-5" /> Түдгэлзүүлэх
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleUpdateStore(selectedStore._id, { status: 'active' })}
                                        disabled={updating}
                                        className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                                    >
                                        <CheckCircle className="w-5 h-5" /> Идэвхжүүлэх
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
