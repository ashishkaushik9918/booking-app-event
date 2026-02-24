'use client';

// ==========================================
// Category Filter Component
// ==========================================

import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { VIDEO_CATEGORIES } from '@/constants';

interface CategoryFilterProps {
  selectedCategory?: string;
  onSelectCategory: (category: string | undefined) => void;
  showAll?: boolean;
  className?: string;
}

export function CategoryFilter({
  selectedCategory,
  onSelectCategory,
  showAll = true,
  className,
}: CategoryFilterProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={cn('relative', className)}>
      {/* Left Arrow */}
      {canScrollLeft && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 shadow-md h-8 w-8"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      {/* Right Arrow */}
      {canScrollRight && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 shadow-md h-8 w-8"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}

      {/* Categories - horizontal scroll, touch friendly */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-2 overflow-x-auto scrollbar-hide px-1 py-1 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {showAll && (
          <Button
            variant={!selectedCategory ? 'default' : 'secondary'}
            size="sm"
            onClick={() => onSelectCategory(undefined)}
            className="shrink-0 snap-start rounded-full"
          >
            All
          </Button>
        )}
        {VIDEO_CATEGORIES.map((category) => (
          <Button
            key={category.value}
            variant={selectedCategory === category.value ? 'default' : 'secondary'}
            size="sm"
            onClick={() => onSelectCategory(category.value)}
            className={cn(
              'shrink-0 snap-start rounded-full transition-colors',
              selectedCategory === category.value && 'bg-primary text-primary-foreground shadow-sm'
            )}
          >
            {category.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
