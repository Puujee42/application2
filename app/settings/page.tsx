'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, User, Lock, Phone, Globe, Moon, Bell } from 'lucide-react';

export default function SettingsPage() {
    const [darkMode, setDarkMode] = useState(false);
    const [pushNotif, setPushNotif] = useState(true);

    return (
        <div className="min-h-screen bg-[#F5F5F5] font-sans pb-10">
            {/* Header */}
            <div className="bg-white h-[56px] flex items-center px-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)] sticky top-0 z-50">
                <Link href="/profile" className="p-2 -ml-2 text-[#1A1A1A]">
                    <ChevronLeft className="w-6 h-6" strokeWidth={2} />
                </Link>
                <h1 className="flex-1 text-center text-[16px] font-bold text-[#1A1A1A] pr-8">
                    Тохиргоо
                </h1>
            </div>

            <div className="p-4 space-y-6 mt-2">

                {/* Дансны тохиргоо */}
                <div>
                    <h2 className="text-[11px] font-bold text-[#999999] uppercase tracking-wider ml-4 mb-2">Дансны тохиргоо</h2>
                    <div className="bg-white rounded-[14px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">

                        <Link href="/profile/edit" className="flex items-center justify-between px-4 h-[64px] active:bg-gray-50 transition-colors border-b border-[#F5F5F5]">
                            <div className="flex items-center gap-4">
                                <User className="w-[22px] h-[22px] text-[#444444]" strokeWidth={1.5} />
                                <span className="text-[15px] font-bold text-[#1A1A1A]">Профайл засах</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-[#CCCCCC]" strokeWidth={2} />
                        </Link>

                        <Link href="/settings/security" className="flex items-center justify-between px-4 h-[64px] active:bg-gray-50 transition-colors border-b border-[#F5F5F5]">
                            <div className="flex items-center gap-4">
                                <Lock className="w-[22px] h-[22px] text-[#444444]" strokeWidth={1.5} />
                                <span className="text-[15px] font-bold text-[#1A1A1A]">Нууц үг солих</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-[#CCCCCC]" strokeWidth={2} />
                        </Link>

                        <Link href="/profile/phone" className="flex items-center justify-between px-4 h-[64px] active:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <Phone className="w-[22px] h-[22px] text-[#444444]" strokeWidth={1.5} />
                                <span className="text-[15px] font-bold text-[#1A1A1A]">Утасны дугаар</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-[#CCCCCC]" strokeWidth={2} />
                        </Link>

                    </div>
                </div>

                {/* Апп тохиргоо */}
                <div>
                    <h2 className="text-[11px] font-bold text-[#999999] uppercase tracking-wider ml-4 mb-2">Апп тохиргоо</h2>
                    <div className="bg-white rounded-[14px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">

                        <button className="w-full flex items-center justify-between px-4 h-[64px] active:bg-gray-50 transition-colors border-b border-[#F5F5F5]">
                            <div className="flex items-center gap-4">
                                <Globe className="w-[22px] h-[22px] text-[#444444]" strokeWidth={1.5} />
                                <span className="text-[15px] font-bold text-[#1A1A1A]">Хэл</span>
                            </div>
                            <div className="flex items-center gap-2 text-[#999999]">
                                <span className="text-[14px] font-medium">Монгол</span>
                                <ChevronRight className="w-5 h-5" strokeWidth={2} />
                            </div>
                        </button>

                        <div className="flex items-center justify-between px-4 h-[64px] border-b border-[#F5F5F5]">
                            <div className="flex items-center gap-4">
                                <Moon className="w-[22px] h-[22px] text-[#444444]" strokeWidth={1.5} />
                                <span className="text-[15px] font-bold text-[#1A1A1A]">Харанхуй горим</span>
                            </div>
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${darkMode ? 'bg-[#FF6B00]' : 'bg-[#E5E5E5]'}`}
                            >
                                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-5' : 'translate-x-1'}`} />
                            </button>
                        </div>

                        <div className="flex items-center justify-between px-4 h-[64px]">
                            <div className="flex items-center gap-4">
                                <Bell className="w-[22px] h-[22px] text-[#444444]" strokeWidth={1.5} />
                                <span className="text-[15px] font-bold text-[#1A1A1A]">Push мэдэгдэл</span>
                            </div>
                            <button
                                onClick={() => setPushNotif(!pushNotif)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${pushNotif ? 'bg-[#FF6B00]' : 'bg-[#E5E5E5]'}`}
                            >
                                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${pushNotif ? 'translate-x-5' : 'translate-x-1'}`} />
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
