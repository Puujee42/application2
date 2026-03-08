'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Search, RefreshCcw, Home } from 'lucide-react';

export default function SearchError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Search error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 pt-24">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Search className="w-8 h-8 text-orange-600" strokeWidth={1.5} />
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Хайлт амжилтгүй боллоо</h1>
        <p className="text-gray-600 text-sm mb-6">
          Хайлтын үр дүнг ачаалахад алдаа гарлаа. Дахин оролдоно уу.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition"
          >
            <RefreshCcw className="w-4 h-4" />
            Дахин оролдох
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-orange-500 hover:text-orange-500 transition"
          >
            <Home className="w-4 h-4" />
            Нүүр хуудас
          </Link>
        </div>
      </div>
    </div>
  );
}
