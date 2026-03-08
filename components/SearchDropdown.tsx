'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

/** API-аас ирсэн хайлтын илэрц – Product-тай нийцэх шийдэлтэй */
export type SearchResultProduct = {
  id: string;
  name: string;
  price: number;
  image?: string | null;
  category?: string;
};

interface SearchDropdownProps {
  results: SearchResultProduct[];
  isVisible: boolean;
  onClose: () => void;
  onMouseDown?: () => void;
  isLoading?: boolean;
}

const SearchDropdown = ({
  results,
  isVisible,
  onClose,
  onMouseDown,
  isLoading = false,
}: SearchDropdownProps) => {
  if (!isVisible) return null;

  return (
    <div
      role="listbox"
      aria-label="Хайлтын илэрц"
      onMouseDown={(e) => {
        e.preventDefault();
        onMouseDown?.();
      }}
      className="absolute top-full left-0 w-full bg-white mt-2 rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[100] transition-all duration-200 ease-out search-dropdown-enter"
    >
      <div className="max-h-[400px] overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-10 text-gray-500">
            <span className="inline-block w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium">Хайж байна...</span>
          </div>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Search className="w-7 h-7 text-gray-400" strokeWidth={1.5} />
            </div>
            <p className="font-semibold text-gray-700 mb-1">Илэрц олдсонгүй</p>
            <p className="text-sm text-gray-500">Өөр нэрээр дахин хайна уу</p>
          </div>
        ) : (
          results.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              onClick={onClose}
              className="flex items-center gap-4 p-3 hover:bg-orange-50 transition-colors border-b border-gray-50 last:border-0"
            >
              <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 relative">
                <Image
                  src={product.image || '/soyol-logo.png'}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="font-medium text-gray-800 text-sm line-clamp-2">
                  {product.name}
                </span>
                <span className="text-orange-600 font-bold text-xs mt-0.5">
                  {formatPrice(product.price)}
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchDropdown;
