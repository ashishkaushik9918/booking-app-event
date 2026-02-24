'use client';

// ==========================================
// Search Hook
// ==========================================

import { useState, useCallback, useMemo } from 'react';
import { SearchFilters, SearchResults, VideoCategory, VideoResolution } from '@/types';
import { videoService } from '@/services';
import { useDebounce } from './use-debounce';

const initialFilters: SearchFilters = {
  query: '',
  category: undefined,
  uploadDate: undefined,
  duration: undefined,
  resolution: undefined,
  sortBy: 'relevance',
  type: 'video',
};

const emptyResults: SearchResults = {
  videos: [],
  channels: [],
  playlists: [],
  totalResults: 0,
  page: 1,
  hasMore: false,
};

export function useSearch(initialQuery = '') {
  const [filters, setFilters] = useState<SearchFilters>({
    ...initialFilters,
    query: initialQuery,
  });
  const [results, setResults] = useState<SearchResults>(emptyResults);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebounce(filters.query, 300);

  const search = useCallback(async (searchFilters: SearchFilters) => {
    if (!searchFilters.query.trim()) {
      setResults(emptyResults);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await videoService.search(searchFilters);
      setResults(data);
    } catch (err) {
      setError((err as Error).message || 'Search failed');
      setResults(emptyResults);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateQuery = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, query }));
  }, []);

  const updateFilter = useCallback(
    <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => {
      setFilters((prev) => {
        const newFilters = { ...prev, [key]: value };
        search(newFilters);
        return newFilters;
      });
    },
    [search]
  );

  const resetFilters = useCallback(() => {
    const query = filters.query;
    setFilters({ ...initialFilters, query });
    if (query) {
      search({ ...initialFilters, query });
    }
  }, [filters.query, search]);

  const clearSearch = useCallback(() => {
    setFilters(initialFilters);
    setResults(emptyResults);
  }, []);

  // Trigger search when debounced query changes
  useMemo(() => {
    if (debouncedQuery) {
      search(filters);
    }
  }, [debouncedQuery, filters, search]);

  return {
    query: filters.query,
    filters,
    results,
    isLoading,
    error,
    updateQuery,
    updateFilter,
    resetFilters,
    clearSearch,
    search: () => search(filters),
  };
}

export default useSearch;
