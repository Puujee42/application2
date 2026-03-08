'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'MN' | 'EN';
type Currency = 'MNT' | 'USD';

interface LanguageContextType {
  language: Language;
  currency: Currency;
  setLanguage: (lang: Language) => void;
  exchangeRate: number;
  formatPrice: (price: number) => string;
  convertPrice: (priceInMNT: number) => number;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/** 1 USD = 3450 MNT. Used for currency conversion in formatPrice / convertPrice. */
const EXCHANGE_RATE = 3450;

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('MN');
  const [currency, setCurrency] = useState<Currency>('MNT');

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language;
      const savedCurrency = localStorage.getItem('currency') as Currency;
      
      if (savedLanguage) {
        setLanguageState(savedLanguage);
        // Currency is tied to language
        setCurrency(savedLanguage === 'MN' ? 'MNT' : 'USD');
      } else if (savedCurrency) {
        setCurrency(savedCurrency);
      }
    }
  }, []);

  // Update language and auto-set currency
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    const newCurrency = lang === 'MN' ? 'MNT' : 'USD';
    setCurrency(newCurrency);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
      localStorage.setItem('currency', newCurrency);
    }
  };

  /** Converts price from MNT (DB storage) to current display currency (MNT or USD). */
  const convertPrice = (priceInMNT: number): number => {
    if (currency === 'USD') {
      return priceInMNT / EXCHANGE_RATE;
    }
    return priceInMNT;
  };

  /** Returns formatted string with symbol: e.g. "12,000₮" or "$3.48". */
  const formatPrice = (priceInMNT: number): string => {
    const converted = convertPrice(priceInMNT);
    
    if (currency === 'USD') {
      return `$${converted.toFixed(2)}`;
    }
    return `${Math.floor(converted).toLocaleString()}₮`;
  };

  const value: LanguageContextType = {
    language,
    currency,
    setLanguage,
    exchangeRate: EXCHANGE_RATE,
    formatPrice,
    convertPrice,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
