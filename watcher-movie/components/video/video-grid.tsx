'use client';

// ==========================================
// Video Grid Component - Responsive, YouTube-style
// ==========================================

import { VideoCard } from './video-card';
import { VideoCardSkeleton } from './video-card-skeleton';
import { Video } from '@/types';
import { cn } from '@/lib/utils';
import { videoGridCols, videoGridGap } from '@/lib/design';

interface VideoGridProps {
  videos: Video[];
  isLoading?: boolean;
  skeletonCount?: number;
  variant?: 'default' | 'horizontal' | 'compact';
  columns?: 1 | 2 | 3 | 4 | 5 | 6 | 'default' | 'dense';
  showChannel?: boolean;
  onAddToWatchLater?: (videoId: string) => void;
  onAddToPlaylist?: (videoId: string) => void;
  className?: string;
}

const columnClasses: Record<number | 'default' | 'dense', string> = {
  default: videoGridCols.default,
  dense: videoGridCols.dense,
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
  6: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
};

export function VideoGrid({
  videos,
  isLoading = false,
  skeletonCount = 12,
  variant = 'default',
  columns = 'default',
  showChannel = true,
  onAddToWatchLater,
  onAddToPlaylist,
  className,
}: VideoGridProps) {
  const colsClass =
    typeof columns === 'string'
      ? columnClasses[columns]
      : columnClasses[columns as number];

  if (variant === 'horizontal') {
    return (
      <div
        className={cn(
          'space-y-3 sm:space-y-4',
          'container-padding',
          className
        )}
      >
        {isLoading
          ? Array.from({ length: skeletonCount }).map((_, i) => (
              <VideoCardSkeleton key={i} variant="horizontal" />
            ))
          : videos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                variant="horizontal"
                showChannel={showChannel}
                onAddToWatchLater={onAddToWatchLater}
                onAddToPlaylist={onAddToPlaylist}
              />
            ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid w-full',
        colsClass,
        videoGridGap,
        className
      )}
    >
      {isLoading
        ? Array.from({ length: skeletonCount }).map((_, i) => (
            <VideoCardSkeleton key={i} variant={variant} />
          ))
        : videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              variant={variant}
              showChannel={showChannel}
              onAddToWatchLater={onAddToWatchLater}
              onAddToPlaylist={onAddToPlaylist}
            />
          ))}
    </div>
  );
}

export default VideoGrid;
