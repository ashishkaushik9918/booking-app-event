'use client';

// ==========================================
// Video Card Skeleton - Responsive, YouTube-style
// ==========================================

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { videoThumb, channelAvatarSize } from '@/lib/design';

interface VideoCardSkeletonProps {
  variant?: 'default' | 'horizontal' | 'compact';
  className?: string;
}

export function VideoCardSkeleton({
  variant = 'default',
  className,
}: VideoCardSkeletonProps) {
  if (variant === 'horizontal') {
    return (
      <div className={cn('flex gap-3 sm:gap-4', className)}>
        <Skeleton className={cn(videoThumb, 'w-36 min-w-[9rem] sm:w-40 md:w-48 shrink-0')} />
        <div className="flex-1 min-w-0 space-y-2 py-1">
          <Skeleton className="h-4 w-full max-w-[90%]" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={cn('flex gap-2', className)}>
        <Skeleton className={cn(videoThumb, 'w-24 min-w-[6rem] shrink-0')} />
        <div className="flex-1 space-y-1.5 py-0.5">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-2/3" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn('w-full space-y-2 sm:space-y-2.5', className)}>
      <Skeleton className={videoThumb} />
      <div className={cn('flex gap-2 sm:gap-3', 'min-w-0')}>
        <Skeleton className={cn(channelAvatarSize, 'rounded-full shrink-0')} />
        <div className="flex-1 min-w-0 space-y-1.5">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[85%]" />
          <Skeleton className="h-3 w-2/3" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    </div>
  );
}

export default VideoCardSkeleton;
