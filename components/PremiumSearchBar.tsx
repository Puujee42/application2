'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, TrendingUp } from 'lucide-react';

interface SearchSuggestion {
  id: string;
  text: string;
  category?: string;
  trending?: boolean;
}

const trendingSearches: SearchSuggestion[] = [
  { id: '1', text: 'iPhone 15 Pro', category: 'Electronics', trending: true },
  { id: '2', text: 'Samsung Galaxy S24', category: 'Electronics', trending: true },
  { id: '3', text: 'MacBook Pro', category: 'Electronics', trending: true },
  { id: '4', text: 'AirPods Pro', category: 'Electronics', trending: true },
];

interface PremiumSearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export default function PremiumSearchBar({
  onSearch,
  placeholder = "Search for products, brands, or categories...",
  className = ""
}: PremiumSearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update suggestions based on query using Gemini
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length > 3) {
        try {
          const response = await fetch('/api/search/suggestions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
          });

          if (response.ok) {
            const data = await response.json();
            setSuggestions(prev => [
              ...data.suggestions,
              ...trendingSearches.filter(s => s.text.toLowerCase().includes(query.toLowerCase()) && !data.suggestions.some((ds: any) => ds.text === s.text))
            ].slice(0, 5));
          }
        } catch (error) {
          console.error('Smart Search Error:', error);
          setSuggestions(trendingSearches.filter(s => s.text.toLowerCase().includes(query.toLowerCase())));
        }
      } else if (query.length > 0) {
        setSuggestions(trendingSearches.filter(s => s.text.toLowerCase().includes(query.toLowerCase())));
      } else {
        setSuggestions(trendingSearches);
      }
    };

    const timer = setTimeout(fetchSuggestions, 500);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = () => {
    if (query.trim() && onSearch) {
      onSearch(query.trim());
      setIsFocused(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.text);
    if (onSearch) {
      onSearch(suggestion.text);
    }
    setIsFocused(false);
  };

  const clearSearch = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Main Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`relative bg-white border-2 transition-all duration-300 ${isFocused
          ? 'border-slate-900 shadow-xl shadow-slate-200/50'
          : 'border-slate-200 hover:border-slate-300 shadow-sm'
          }`}
        style={{ borderRadius: '2px' }} // Sharp, premium edges
      >
        {/* Search Icon */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none">
          <Search
            className={`w-5 h-5 transition-colors duration-300 ${isFocused ? 'text-slate-900' : 'text-slate-400'
              }`}
            strokeWidth={1.5}
          />
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="w-full pl-16 pr-32 py-5 text-[15px] font-light text-slate-900 placeholder:text-slate-400 bg-transparent outline-none tracking-wide"
          style={{ letterSpacing: '0.02em' }}
        />

        {/* Clear Button */}
        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={clearSearch}
              className="absolute right-24 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <X className="w-4 h-4" strokeWidth={1.5} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Search Button */}
        <motion.button
          onClick={handleSearch}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-slate-900 text-white text-sm font-medium tracking-wide hover:bg-slate-800 transition-all"
          style={{ borderRadius: '1px' }}
        >
          SEARCH
        </motion.button>
      </motion.div>

      {/* Search Suggestions Dropdown */}
      <AnimatePresence>
        {isFocused && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full mt-2 bg-white border-2 border-slate-900 shadow-2xl z-50 overflow-hidden"
            style={{ borderRadius: '2px' }}
          >
            {/* Trending Header */}
            {query === '' && (
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-slate-600" strokeWidth={1.5} />
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Trending Searches
                  </span>
                </div>
              </div>
            )}

            {/* Suggestions List */}
            <div className="py-2">
              {suggestions.map((suggestion, index) => (
                <motion.button
                  key={suggestion.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-6 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <Search className="w-4 h-4 text-slate-300 group-hover:text-slate-900 transition-colors" strokeWidth={1.5} />
                    <div className="text-left">
                      <p className="text-[15px] font-light text-slate-900 tracking-wide">
                        {suggestion.text}
                      </p>
                      {suggestion.category && (
                        <p className="text-xs text-slate-400 mt-0.5 uppercase tracking-wider">
                          {suggestion.category}
                        </p>
                      )}
                    </div>
                  </div>
                  {suggestion.trending && (
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-900 text-white">
                      <TrendingUp className="w-3 h-3" strokeWidth={2} />
                      <span className="text-[10px] font-semibold uppercase tracking-wider">
                        HOT
                      </span>
                    </div>
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
