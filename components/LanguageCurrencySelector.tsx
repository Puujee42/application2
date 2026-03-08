'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Check, ChevronDown } from 'lucide-react';

const MongoliaFlag = () => (
  <svg viewBox="0 0 640 480" className="w-5 h-5 rounded-full object-cover shadow-sm">
    <g fillRule="evenodd" strokeWidth="1pt">
      <path fill="#ce1126" d="M0 0h640v480H0z"/>
      <path fill="#0033a0" d="M213.3 0h213.4v480H213.3z"/>
      <g fill="#fcd116">
        <path d="M118.3 325.6h-34.4v29.6h34.4zM118.3 365.1h-34.4v29.6h34.4zM86.1 133.2l15.6 18.4 16.4-18.4H86.1z"/>
        <path d="M101.4 133.2c-5.5-16.1-9.6-26.6-9.6-40.4 0-19.4 10.1-33 10.1-33s10.1 13.6 10.1 33c0 13.8-4.1 24.3-9.6 40.4h-1zM101.9 161.9c-11.8 0-21.3 9.5-21.3 21.3s9.5 21.3 21.3 21.3 21.3-9.5 21.3-21.3-9.5-21.3-21.3-21.3zM83.9 214.7h34.9v99.8H83.9zM101.9 10.9c-8.3 0-15.1 6.8-15.1 15.1 0 8.3 6.8 15.1 15.1 15.1 8.3 0 15.1-6.8 15.1-15.1 0-8.3-6.8-15.1-15.1-15.1z"/>
      </g>
    </g>
  </svg>
);

const USAFlag = () => (
  <svg viewBox="0 0 640 480" className="w-5 h-5 rounded-full object-cover shadow-sm">
    <path fill="#bd3d44" d="M0 0h640v480H0"/>
    <path stroke="#fff" strokeWidth="37" d="M0 55.3h640M0 129h640M0 202.8h640M0 276.5h640M0 350.2h640M0 423.9h640"/>
    <path fill="#192f5d" d="M0 0h249.8v258.1H0"/>
    <marker id="a" markerHeight="30" markerWidth="30" orient="auto" refX="15" refY="15">
      <path fill="#fff" d="M15 9.6l2.3 6.9h7.3l-5.9 4.3 2.3 6.9-5.9-4.3-5.9 4.3 2.3-6.9-5.9-4.3h7.3z"/>
    </marker>
    <use href="#a" x="24" y="21"/>
    <use href="#a" x="48" y="21"/>
    <use href="#a" x="24" y="46"/>
    <use href="#a" x="48" y="46"/>
    <use href="#a" x="24" y="71"/>
    <use href="#a" x="48" y="71"/>
    <use href="#a" x="24" y="96"/>
    <use href="#a" x="48" y="96"/>
    <use href="#a" x="24" y="121"/>
    <use href="#a" x="48" y="121"/>
    <use href="#a" x="72" y="21"/>
    <use href="#a" x="96" y="21"/>
    <use href="#a" x="72" y="46"/>
    <use href="#a" x="96" y="46"/>
    <use href="#a" x="72" y="71"/>
    <use href="#a" x="96" y="71"/>
    <use href="#a" x="72" y="96"/>
    <use href="#a" x="96" y="96"/>
    <use href="#a" x="72" y="121"/>
    <use href="#a" x="96" y="121"/>
    <use href="#a" x="120" y="21"/>
    <use href="#a" x="144" y="21"/>
    <use href="#a" x="120" y="46"/>
    <use href="#a" x="144" y="46"/>
    <use href="#a" x="120" y="71"/>
    <use href="#a" x="144" y="71"/>
    <use href="#a" x="120" y="96"/>
    <use href="#a" x="144" y="96"/>
    <use href="#a" x="120" y="121"/>
    <use href="#a" x="144" y="121"/>
    <use href="#a" x="168" y="21"/>
    <use href="#a" x="192" y="21"/>
    <use href="#a" x="168" y="46"/>
    <use href="#a" x="192" y="46"/>
    <use href="#a" x="168" y="71"/>
    <use href="#a" x="192" y="71"/>
    <use href="#a" x="168" y="96"/>
    <use href="#a" x="192" y="96"/>
    <use href="#a" x="168" y="121"/>
    <use href="#a" x="192" y="121"/>
    <use href="#a" x="216" y="21"/>
    <use href="#a" x="216" y="46"/>
    <use href="#a" x="216" y="71"/>
    <use href="#a" x="216" y="96"/>
    <use href="#a" x="216" y="121"/>
  </svg>
);

export default function LanguageCurrencySelector() {
  const { language, currency, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages = [
    { code: 'MN', label: 'Монгол', currency: 'MNT', symbol: '₮', flag: <MongoliaFlag /> },
    { code: 'EN', label: 'English', currency: 'USD', symbol: '$', flag: <USAFlag /> },
  ];

  const currentLang = languages.find(l => l.code === language) || languages[0];

  return (
    <div className="relative z-50" ref={containerRef}>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
        whileTap={{ scale: 0.98 }}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-xl
          border border-gray-200/60 bg-white/50 backdrop-blur-sm
          hover:border-orange-200 hover:shadow-[0_0_15px_rgba(255,165,0,0.1)]
          transition-all duration-300 group
        `}
      >
        <div className="relative overflow-hidden rounded-full border border-gray-100 shadow-sm">
          {currentLang.flag}
        </div>
        <div className="flex flex-col items-start leading-none">
          <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">
            {currentLang.code}
          </span>
          <span className="text-xs font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
            {currency} {currentLang.symbol}
          </span>
        </div>
        <ChevronDown 
          className={`w-3 h-3 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          strokeWidth={2.5}
        />
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute right-0 top-full mt-2 w-56 p-2 bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_20px_40px_-10px_rgba(255,100,0,0.15)] ring-1 ring-black/5"
          >
            <div className="space-y-1">
              <div className="px-3 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Select Language
              </div>
              
              {languages.map((lang, index) => (
                <motion.button
                  key={lang.code}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => {
                    setLanguage(lang.code as 'MN' | 'EN');
                    setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center justify-between px-3 py-2.5 rounded-xl
                    transition-all duration-200 group
                    ${language === lang.code ? 'bg-orange-50 text-orange-700' : 'hover:bg-gray-50 text-gray-700'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`
                      relative overflow-hidden rounded-full border shadow-sm transition-transform duration-300
                      ${language === lang.code ? 'scale-110 border-orange-200' : 'border-gray-100 group-hover:scale-110'}
                    `}>
                      {lang.flag}
                    </div>
                    <div className="flex flex-col items-start">
                      <span className={`text-sm font-bold ${language === lang.code ? 'text-gray-900' : 'text-gray-700'}`}>
                        {lang.label}
                      </span>
                      <span className="text-[10px] font-medium text-gray-400">
                        {lang.currency} ({lang.symbol})
                      </span>
                    </div>
                  </div>
                  
                  {language === lang.code && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      <Check className="w-4 h-4 text-orange-500" strokeWidth={3} />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
