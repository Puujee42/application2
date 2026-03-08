'use client';

import { Crown } from 'lucide-react';
import { motion } from 'framer-motion';

interface UserStatusProps {
    isAdmin?: boolean;
    isInCall?: boolean;
    isOnline?: boolean;
}

export default function UserStatus({ isAdmin, isInCall, isOnline }: UserStatusProps) {
    return (
        <div className="flex items-center gap-3">
            {/* Admin Badge */}
            {isAdmin && (
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-sm">
                    <Crown className="w-2.5 h-2.5 text-indigo-400" strokeWidth={1.2} />
                    <span className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.15em]">
                        Админ
                    </span>
                </div>
            )}

            {/* Availability Status */}
            <div className="flex items-center gap-1.5">
                <div className="relative flex h-1.5 w-1.5">
                    {isInCall ? (
                        <>
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"></span>
                        </>
                    ) : isOnline ? (
                        <>
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
                        </>
                    ) : (
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-slate-500/50"></span>
                    )}
                </div>
                
                <span className={`text-[9px] font-black uppercase tracking-[0.1em] ${
                    isInCall ? 'text-red-400' : isOnline ? 'text-emerald-400' : 'text-slate-500'
                }`}>
                    {isInCall ? 'Завгүй' : isOnline ? 'Онлайн' : 'Офлайн'}
                </span>
            </div>
        </div>
    );
}
