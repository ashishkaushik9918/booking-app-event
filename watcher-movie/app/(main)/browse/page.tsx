'use client';

// ==========================================
// Browse Page
// ==========================================

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CategoryFilter } from '@/components/common/category-filter';
import { VideoGrid } from '@/components/video/video-grid';
import { mockVideos } from '@/lib/mock-data';
import { SORT_OPTIONS, UPLOAD_DATE_FILTERS, DURATION_FILTERS } from '@/constants';

export default function BrowsePage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || undefined;

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    initialCategory
  );
  const [sortBy, setSortBy] = useState('relevance');
  const [uploadDate, setUploadDate] = useState<string | undefined>();
  const [duration, setDuration] = useState<string | undefined>();

  // Filter videos
  const filteredVideos = mockVideos.filter((video) => {
    if (selectedCategory && video.category !== selectedCategory) return false;
    // Additional filters would be applied here in production
    return true;
  });

  // Sort videos
  const sortedVideos = [...filteredVideos].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
      case 'views':
        return b.views - a.views;
      case 'rating':
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  const clearFilters = () => {
    setSelectedCategory(undefined);
    setSortBy('relevance');
    setUploadDate(undefined);
    setDuration(undefined);
  };

  const hasActiveFilters = selectedCategory || sortBy !== 'relevance' || uploadDate || duration;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Browse</h1>
          <p className="text-muted-foreground mt-1">
            Discover movies, series, and more
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Sort By */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Sort: {SORT_OPTIONS.find((s) => s.value === sortBy)?.label}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {SORT_OPTIONS.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Upload Date Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                {uploadDate
                  ? UPLOAD_DATE_FILTERS.find((f) => f.value === uploadDate)?.label
                  : 'Upload Date'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setUploadDate(undefined)}>
                Any time
              </DropdownMenuItem>
              {UPLOAD_DATE_FILTERS.map((filter) => (
                <DropdownMenuItem
                  key={filter.value}
                  onClick={() => setUploadDate(filter.value)}
                >
                  {filter.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Duration Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                {duration
                  ? DURATION_FILTERS.find((f) => f.value === duration)?.label
                  : 'Duration'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setDuration(undefined)}>
                Any duration
              </DropdownMenuItem>
              {DURATION_FILTERS.map((filter) => (
                <DropdownMenuItem
                  key={filter.value}
                  onClick={() => setDuration(filter.value)}
                >
                  {filter.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button variant="ghost" onClick={clearFilters}>
              Clear all
            </Button>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        className="mb-8"
      />

      {/* Results */}
      <div className="mb-4">
        <p className="text-muted-foreground">
          {sortedVideos.length} results found
        </p>
      </div>

      {/* Video Grid */}
      <VideoGrid videos={sortedVideos} columns={4} />

      {/* Load More */}
      {sortedVideos.length > 0 && (
        <div className="flex justify-center mt-8">
          <Button variant="outline" size="lg">
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
