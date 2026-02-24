'use client';

// ==========================================
// Live Badge Component
// ==========================================

import { cn } from '@/lib/utils';

interface LiveBadgeProps {
  viewerCount?: number;
  className?: string;
}

export function LiveBadge({ viewerCount, className }: LiveBadgeProps) {
  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
      </span>
      <span className="text-xs font-semibold uppercase text-red-500">Live</span>
      {viewerCount !== undefined && (
        <span className="text-xs text-muted-foreground">
          {viewerCount.toLocaleString()} watching
        </span>
      )}
    </div>
  );
}

export default LiveBadge;
