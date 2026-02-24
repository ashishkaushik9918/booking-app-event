'use client';

// ==========================================
// Video Card Component - YouTube-style, responsive
// ==========================================

import Link from 'next/link';
import {
  Play,
  MoreVertical,
  ListPlus,
  Share2,
  Flag,
  Download,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  videoThumb,
  videoCardMeta,
  channelAvatarSize,
  videoTitle,
  videoMetaText,
  durationBadge,
  liveBadge,
  premiumBadge,
} from '@/lib/design';
import { cn } from '@/lib/utils';
import { Video } from '@/types';

interface VideoCardProps {
  video: Video;
  variant?: 'default' | 'horizontal' | 'compact';
  showChannel?: boolean;
  showProgress?: boolean;
  progress?: number;
  onAddToWatchLater?: (videoId: string) => void;
  onAddToPlaylist?: (videoId: string) => void;
  className?: string;
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

function formatViews(views: number): string {
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M views`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K views`;
  return `${views} views`;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hours ago`;
  if (days < 7) return `${days} days ago`;
  if (weeks < 4) return `${weeks} weeks ago`;
  if (months < 12) return `${months} months ago`;
  return `${years} years ago`;
}

/** Thumbnail block - reusable for all variants */
function ThumbnailBlock({
  video,
  showProgress,
  progress,
  className,
}: {
  video: Video;
  showProgress?: boolean;
  progress?: number;
  className?: string;
}) {
  return (
    <Link href={`/watch/${video.id}`} className={cn('block relative w-full', className)}>
      <div className={cn(videoThumb, 'group/thumb')}>
        <img
          src={video.thumbnail || '/placeholder-video.jpg'}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-200 ease-out group-hover/thumb:scale-[1.02]"
        />
        <span className={durationBadge}>{formatDuration(video.duration)}</span>
        {video.isLive && <span className={liveBadge}>LIVE</span>}
        {video.isPremium && <span className={premiumBadge}>Premium</span>}
        {showProgress && progress && progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/40">
            <div
              className="h-full bg-primary rounded-b-[2px]"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-200">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 flex items-center justify-center">
            <Play className="w-5 h-5 sm:w-6 sm:h-6 text-primary fill-primary ml-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export function VideoCard({
  video,
  variant = 'default',
  showChannel = true,
  showProgress = false,
  progress = 0,
  onAddToWatchLater,
  onAddToPlaylist,
  className,
}: VideoCardProps) {
  if (variant === 'horizontal') {
    return (
      <article className={cn('flex gap-3 sm:gap-4 group w-full', className)}>
        <ThumbnailBlock
          video={video}
          showProgress={showProgress}
          progress={progress}
          className="w-36 min-w-[9rem] sm:w-40 md:w-48 shrink-0 aspect-video"
        />
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <Link href={`/watch/${video.id}`}>
            <h3 className={cn(videoTitle, 'text-base sm:text-[15px]')}>
              {video.title}
            </h3>
          </Link>
          {showChannel && (
            <Link
              href={`/channel/${video.channel.id}`}
              className={cn(videoMetaText, 'mt-1 flex items-center gap-1 hover:text-foreground')}
            >
              {video.channel.name}
              {video.channel.isVerified && (
                <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" />
              )}
            </Link>
          )}
          <p className={cn(videoMetaText, 'mt-0.5')}>
            {formatViews(video.views)} · {formatDate(video.uploadedAt)}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 h-8 w-8 opacity-0 group-hover:opacity-100 sm:opacity-70 sm:group-hover:opacity-100"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onAddToWatchLater?.(video.id)}>
              <Clock className="mr-2 h-4 w-4" /> Save to Watch Later
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAddToPlaylist?.(video.id)}>
              <ListPlus className="mr-2 h-4 w-4" /> Add to Playlist
            </DropdownMenuItem>
            <DropdownMenuItem><Download className="mr-2 h-4 w-4" /> Download</DropdownMenuItem>
            <DropdownMenuItem><Share2 className="mr-2 h-4 w-4" /> Share</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Flag className="mr-2 h-4 w-4" /> Report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <Link href={`/watch/${video.id}`} className={cn('flex gap-2 group', className)}>
        <div className={cn(videoThumb, 'w-24 min-w-[6rem] shrink-0')}>
          <img
            src={video.thumbnail || '/placeholder-video.jpg'}
            alt={video.title}
            className="w-full h-full object-cover"
          />
          <span className={durationBadge}>{formatDuration(video.duration)}</span>
        </div>
        <div className="flex-1 min-w-0 py-0.5">
          <h4 className={cn(videoTitle, 'text-sm line-clamp-2')}>{video.title}</h4>
          <p className={cn(videoMetaText, 'mt-0.5')}>{video.channel.name}</p>
          <p className={cn(videoMetaText)}>{formatViews(video.views)}</p>
        </div>
      </Link>
    );
  }

  // Default - YouTube-style grid card
  return (
    <article className={cn('group w-full', className)}>
      <ThumbnailBlock
        video={video}
        showProgress={showProgress}
        progress={progress}
      />
      <div className={cn(videoCardMeta)}>
        {showChannel && (
          <Link href={`/channel/${video.channel.id}`} className={cn('shrink-0', channelAvatarSize)}>
            <div className={cn('w-full h-full rounded-full bg-muted overflow-hidden ring-1 ring-border/50')}>
              {video.channel.avatar ? (
                <img
                  src={video.channel.avatar}
                  alt={video.channel.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="w-full h-full flex items-center justify-center text-xs font-semibold text-muted-foreground">
                  {video.channel.name.charAt(0)}
                </span>
              )}
            </div>
          </Link>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-1">
            <Link href={`/watch/${video.id}`} className="flex-1 min-w-0">
              <h3 className={videoTitle}>{video.title}</h3>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    'shrink-0 h-8 w-8 opacity-0 group-hover:opacity-100',
                    'focus-visible:opacity-100 sm:opacity-0 sm:group-hover:opacity-100'
                  )}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onAddToWatchLater?.(video.id)}>
                  <Clock className="mr-2 h-4 w-4" /> Save to Watch Later
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAddToPlaylist?.(video.id)}>
                  <ListPlus className="mr-2 h-4 w-4" /> Add to Playlist
                </DropdownMenuItem>
                <DropdownMenuItem><Download className="mr-2 h-4 w-4" /> Download</DropdownMenuItem>
                <DropdownMenuItem><Share2 className="mr-2 h-4 w-4" /> Share</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem><Flag className="mr-2 h-4 w-4" /> Report</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {showChannel && (
            <Link
              href={`/channel/${video.channel.id}`}
              className={cn(videoMetaText, 'mt-0.5 inline-flex items-center gap-1 hover:text-foreground')}
            >
              {video.channel.name}
              {video.channel.isVerified && (
                <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" />
              )}
            </Link>
          )}
          <p className={cn(videoMetaText, 'mt-0.5')}>
            {formatViews(video.views)} · {formatDate(video.uploadedAt)}
          </p>
        </div>
      </div>
    </article>
  );
}

export default VideoCard;
