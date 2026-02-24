'use client';

// ==========================================
// Channel Card Component
// ==========================================

import Link from 'next/link';
import { CheckCircle, Bell, BellOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Channel } from '@/types';

interface ChannelCardProps {
  channel: Channel;
  isSubscribed?: boolean;
  variant?: 'default' | 'compact' | 'horizontal';
  onSubscribe?: (channelId: string) => void;
  onUnsubscribe?: (channelId: string) => void;
  className?: string;
}

function formatCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

export function ChannelCard({
  channel,
  isSubscribed = false,
  variant = 'default',
  onSubscribe,
  onUnsubscribe,
  className,
}: ChannelCardProps) {
  const handleSubscribeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isSubscribed) {
      onUnsubscribe?.(channel.id);
    } else {
      onSubscribe?.(channel.id);
    }
  };

  if (variant === 'compact') {
    return (
      <Link
        href={`/channel/${channel.id}`}
        className={cn('flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors', className)}
      >
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
            {channel.avatar ? (
              <img
                src={channel.avatar}
                alt={channel.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-lg font-medium">
                {channel.name.charAt(0)}
              </div>
            )}
          </div>
          {channel.isVerified && (
            <CheckCircle className="absolute -bottom-0.5 -right-0.5 h-4 w-4 text-primary bg-background rounded-full" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{channel.name}</p>
          <p className="text-xs text-muted-foreground">
            {formatCount(channel.subscriberCount)} subscribers
          </p>
        </div>
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className={cn('flex items-center gap-4 p-4 rounded-xl bg-card border', className)}>
        <Link href={`/channel/${channel.id}`} className="shrink-0">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-muted overflow-hidden">
              {channel.avatar ? (
                <img
                  src={channel.avatar}
                  alt={channel.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl font-medium">
                  {channel.name.charAt(0)}
                </div>
              )}
            </div>
            {channel.isVerified && (
              <CheckCircle className="absolute bottom-0 right-0 h-5 w-5 text-primary bg-background rounded-full" />
            )}
          </div>
        </Link>

        <div className="flex-1 min-w-0">
          <Link href={`/channel/${channel.id}`}>
            <h3 className="font-semibold text-lg hover:text-primary transition-colors">
              {channel.name}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground">@{channel.handle}</p>
          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
            <span>{formatCount(channel.subscriberCount)} subscribers</span>
            <span>•</span>
            <span>{channel.videoCount} videos</span>
          </div>
          {channel.description && (
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {channel.description}
            </p>
          )}
        </div>

        <Button
          variant={isSubscribed ? 'secondary' : 'default'}
          onClick={handleSubscribeClick}
          className="shrink-0"
        >
          {isSubscribed ? (
            <>
              <BellOff className="mr-2 h-4 w-4" />
              Subscribed
            </>
          ) : (
            'Subscribe'
          )}
        </Button>
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn('text-center p-6 rounded-xl bg-card border', className)}>
      <Link href={`/channel/${channel.id}`} className="block">
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-full bg-muted overflow-hidden mx-auto">
            {channel.avatar ? (
              <img
                src={channel.avatar}
                alt={channel.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl font-medium">
                {channel.name.charAt(0)}
              </div>
            )}
          </div>
          {channel.isVerified && (
            <CheckCircle className="absolute bottom-0 right-0 h-6 w-6 text-primary bg-background rounded-full" />
          )}
        </div>

        <h3 className="font-semibold text-lg mt-4 hover:text-primary transition-colors">
          {channel.name}
        </h3>
        <p className="text-sm text-muted-foreground">@{channel.handle}</p>
      </Link>

      <p className="text-sm text-muted-foreground mt-2">
        {formatCount(channel.subscriberCount)} subscribers
      </p>

      <Button
        variant={isSubscribed ? 'secondary' : 'default'}
        onClick={handleSubscribeClick}
        className="mt-4 w-full"
      >
        {isSubscribed ? 'Subscribed' : 'Subscribe'}
      </Button>
    </div>
  );
}

export default ChannelCard;
