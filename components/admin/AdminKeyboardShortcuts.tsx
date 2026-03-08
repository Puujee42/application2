'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Command, X } from 'lucide-react';

export default function AdminKeyboardShortcuts() {
    const router = useRouter();
    const pathname = usePathname();
    const [showModal, setShowModal] = useState(false);

    // Track continuous keystrokes for combo bindings
    const [keyBuffer, setKeyBuffer] = useState<string>('');

    useEffect(() => {
        // Clear buffer after 1 second of inactivity
        const timer = setTimeout(() => {
            setKeyBuffer('');
        }, 1000);
        return () => clearTimeout(timer);
    }, [keyBuffer]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Don't trigger if user is typing in an input/textarea
            if (
                document.activeElement?.tagName === 'INPUT' ||
                document.activeElement?.tagName === 'TEXTAREA' ||
                document.activeElement?.tagName === 'SELECT'
            ) {
                // Allow escape to blur inputs
                if (e.key === 'Escape') {
                    (document.activeElement as HTMLElement).blur();
                }
                return;
            }

            const key = e.key.toLowerCase();
            const newBuffer = keyBuffer + key;
            setKeyBuffer(newBuffer);

            // Handle simple shortcuts
            if (key === '/') {
                e.preventDefault();
                const searchInput = document.getElementById('admin-search');
                if (searchInput) {
                    searchInput.focus();
                }
                return;
            }

            if (key === 'n' && pathname === '/admin/products') {
                e.preventDefault();
                router.push('/admin/products/new');
                return;
            }

            if (key === '?' || (e.shiftKey && key === '/')) {
                e.preventDefault();
                setShowModal(prev => !prev);
                return;
            }

            // Hide modal on escape
            if (key === 'escape' && showModal) {
                setShowModal(false);
                return;
            }

            // Handle combo shortcuts starting with 'g'
            if (newBuffer.endsWith('gp')) {
                e.preventDefault();
                router.push('/admin/products');
                setKeyBuffer('');
            } else if (newBuffer.endsWith('go')) {
                e.preventDefault();
                router.push('/admin/orders');
                setKeyBuffer('');
            } else if (newBuffer.endsWith('gm')) {
                e.preventDefault();
                router.push('/admin/messages');
                setKeyBuffer('');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [router, pathname, keyBuffer, showModal]);

    return (
        <AnimatePresence>
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowModal(false)}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
                    >
                        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-800/50">
                            <div className="flex items-center gap-2 text-white font-bold">
                                <Command className="w-5 h-5 text-amber-500" />
                                Гарын товчлолууд
                            </div>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="space-y-3">
                                <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest px-1">Ерөнхий</h3>
                                {renderShortcut('/', 'Хайлт хийх рүү үсрэх')}
                                {renderShortcut('?', 'Энэхүү цонхыг нээх/хаах')}
                                {renderShortcut('Esc', 'Цонх хаах / Идэвхтэй input-ээс гарах')}
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest px-1">Шилжилт хийх</h3>
                                {renderShortcut('G эсвэл дараад P', 'Бүтээгдэхүүн хуудас')}
                                {renderShortcut('G эсвэл дараад O', 'Захиалга хуудас')}
                                {renderShortcut('G эсвэл дараад M', 'Мессеж хуудас')}
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest px-1">Үйлдэл (хуудас хамаарна)</h3>
                                {renderShortcut('N', 'Шинэ бараа нэмэх (products дээр)')}
                            </div>
                        </div>

                        <div className="p-4 bg-slate-950/50 border-t border-slate-800 text-center text-xs text-slate-500">
                            Эдгээр товчлолуудыг ашиглан ажлаа хөнгөвчлөөрэй 🚀
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

function renderShortcut(keys: string, description: string) {
    return (
        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/50 transition-colors">
            <span className="text-sm font-medium text-slate-300">{description}</span>
            <div className="flex items-center gap-1">
                {keys.split(' эсвэл дараад ').map((k, i, arr) => (
                    <React.Fragment key={i}>
                        <kbd className="px-2 py-1 bg-slate-800 border border-slate-700 rounded-md text-xs font-mono text-amber-400 font-bold shadow-sm">
                            {k}
                        </kbd>
                        {i < arr.length - 1 && <span className="text-slate-600 font-medium">+</span>}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
