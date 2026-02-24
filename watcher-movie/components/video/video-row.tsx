'use client';

// ==========================================
// Video Row Component (Horizontal Scrolling)
// ==========================================

import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VideoCard } from './video-card';
import { VideoCardSkeleton } from './video-card-skeleton';
import { Video } from '@/types';
import { cn } from '@/lib/utils';

interface VideoRowProps {
  title: string;
  subtitle?: string;
  videos: Video[];
  isLoading?: boolean;
  skeletonCount?: number;
  showChannel?: boolean;
  seeAllHref?: string;
  onSeeAll?: () => void;
  className?: string;
}

export function VideoRow({
  title,
  subtitle,
  videos,
  isLoading = false,
  skeletonCount = 6,
  showChannel = true,
  seeAllHref,
  onSeeAll,
  className,
}: VideoRowProps) {
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
  }, [videos]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className={cn('relative', className)}>
      {/* Header - responsive */}
      <div className="flex items-center justify-between gap-4 mb-3 sm:mb-4">
        <div className="min-w-0">
          <h2 className="text-lg sm:text-xl font-bold truncate">{title}</h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 truncate">{subtitle}</p>
          )}
        </div>
        {(seeAllHref || onSeeAll) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onSeeAll}
            asChild={!!seeAllHref}
            className="shrink-0 text-primary font-medium"
          >
            {seeAllHref ? (
              <a href={seeAllHref}>See All</a>
            ) : (
              <span>See All</span>
            )}
          </Button>
        )}
      </div>

      {/* Scroll Container - touch friendly */}
      <div className="relative group/row">
        {/* Left Arrow - visible on hover/focus, hidden on touch */}
        {canScrollLeft && (
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover/row:opacity-100 transition-opacity shadow-lg h-9 w-9 sm:h-10 sm:w-10 rounded-full hidden sm:flex"
            onClick={() => scroll('left')}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}

        {/* Right Arrow */}
        {canScrollRight && (
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover/row:opacity-100 transition-opacity shadow-lg h-9 w-9 sm:h-10 sm:w-10 rounded-full hidden sm:flex"
            onClick={() => scroll('right')}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        )}

        {/* Scrollable Content - responsive card width */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {isLoading
            ? Array.from({ length: skeletonCount }).map((_, i) => (
                <div key={i} className="w-[85vw] min-w-[280px] max-w-[320px] sm:max-w-[360px] shrink-0 snap-start">
                  <VideoCardSkeleton />
                </div>
              ))
            : videos.map((video) => (
                <div key={video.id} className="w-[85vw] min-w-[280px] max-w-[320px] sm:max-w-[360px] shrink-0 snap-start">
                  <VideoCard video={video} showChannel={showChannel} />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}

export default VideoRow;
