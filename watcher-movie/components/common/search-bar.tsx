'use client';

// ==========================================
// Search Bar Component
// ==========================================

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Mic, History, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  placeholder?: string;
  defaultValue?: string;
  suggestions?: string[];
  recentSearches?: string[];
  trendingSearches?: string[];
  onSearch?: (query: string) => void;
  className?: string;
}

export function SearchBar({
  placeholder = 'Search movies, series, channels...',
  defaultValue = '',
  suggestions = [],
  recentSearches = [],
  trendingSearches = [],
  onSearch,
  className,
}: SearchBarProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [query, setQuery] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = (searchQuery: string = query) => {
    if (searchQuery.trim()) {
      onSearch?.(searchQuery);
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const showDropdown =
    showSuggestions &&
    (suggestions.length > 0 || recentSearches.length > 0 || trendingSearches.length > 0);

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="search"
            placeholder={placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => {
              setIsFocused(true);
              setShowSuggestions(true);
            }}
            onBlur={() => setIsFocused(false)}
            className={cn(
              'pl-10 pr-20',
              isFocused && 'ring-2 ring-primary'
            )}
          />
          
          {/* Clear Button */}
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-12 h-8 w-8"
              onClick={handleClear}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          
          {/* Voice Search */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 h-8 w-8"
          >
            <Mic className="h-4 w-4" />
          </Button>
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border rounded-lg shadow-lg z-50 overflow-hidden">
          {/* Suggestions from typing */}
          {suggestions.length > 0 && (
            <div className="py-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="w-full flex items-center gap-3 px-4 py-2 hover:bg-muted text-left"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <span>{suggestion}</span>
                </button>
              ))}
            </div>
          )}

          {/* Recent Searches */}
          {recentSearches.length > 0 && !query && (
            <div className="py-2 border-t first:border-t-0">
              <div className="px-4 py-1 text-xs font-medium text-muted-foreground uppercase">
                Recent Searches
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  className="w-full flex items-center gap-3 px-4 py-2 hover:bg-muted text-left"
                  onClick={() => handleSuggestionClick(search)}
                >
                  <History className="h-4 w-4 text-muted-foreground" />
                  <span>{search}</span>
                </button>
              ))}
            </div>
          )}

          {/* Trending Searches */}
          {trendingSearches.length > 0 && !query && (
            <div className="py-2 border-t">
              <div className="px-4 py-1 text-xs font-medium text-muted-foreground uppercase">
                Trending
              </div>
              {trendingSearches.map((search, index) => (
                <button
                  key={index}
                  className="w-full flex items-center gap-3 px-4 py-2 hover:bg-muted text-left"
                  onClick={() => handleSuggestionClick(search)}
                >
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span>{search}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
