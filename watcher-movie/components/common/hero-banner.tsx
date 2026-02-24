'use client';

// ==========================================
// Hero Banner Component
// ==========================================

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, Info, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Video } from '@/types';

interface HeroBannerProps {
  videos: Video[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

export function HeroBanner({
  videos,
  autoPlay = true,
  interval = 8000,
  className,
}: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const currentVideo = videos[currentIndex];

  useEffect(() => {
    if (!autoPlay || videos.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, videos.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  if (!currentVideo) return null;

  return (
    <div className={cn('relative w-full h-[60vh] min-h-[320px] sm:min-h-[400px] md:h-[65vh] md:min-h-[450px] lg:h-[70vh] lg:min-h-[500px] overflow-hidden', className)}>
      {/* Background Image/Video */}
      <div className="absolute inset-0">
        <img
          src={currentVideo.thumbnail || '/placeholder-hero.jpg'}
          alt={currentVideo.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto container-padding">
          <div className="max-w-2xl space-y-4 sm:space-y-5 lg:space-y-6">
            {/* Badges */}
            <div className="flex items-center gap-2">
              {currentVideo.isPremium && (
                <Badge variant="default" className="bg-primary">
                  PREMIUM
                </Badge>
              )}
              {currentVideo.isLive && (
                <Badge variant="destructive">LIVE NOW</Badge>
              )}
              <Badge variant="secondary">
                {currentVideo.category.charAt(0).toUpperCase() +
                  currentVideo.category.slice(1)}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight line-clamp-2 sm:line-clamp-3">
              {currentVideo.title}
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground line-clamp-2 sm:line-clamp-3">
              {currentVideo.description}
            </p>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{currentVideo.resolution}</span>
              <span>•</span>
              <span>
                {Math.floor(currentVideo.duration / 60)} min
              </span>
              <span>•</span>
              <span>{currentVideo.category}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <Button size="default" className="gap-2 sm:size-lg rounded-full" asChild>
                <Link href={`/watch/${currentVideo.id}`}>
                  <Play className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
                  Play Now
                </Link>
              </Button>
              <Button size="default" variant="secondary" className="gap-2 sm:size-lg rounded-full" asChild>
                <Link href={`/watch/${currentVideo.id}`}>
                  <Info className="h-5 w-5" />
                  More Info
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      {videos.length > 1 && (
        <>
          {/* Arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/80"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/80"
            onClick={goToNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {videos.map((_, index) => (
              <button
                key={index}
                className={cn(
                  'w-2 h-2 rounded-full transition-all',
                  index === currentIndex
                    ? 'w-8 bg-primary'
                    : 'bg-white/50 hover:bg-white/80'
                )}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </>
      )}

      {/* Mute Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute bottom-8 right-8 bg-background/50 hover:bg-background/80"
        onClick={() => setIsMuted(!isMuted)}
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5" />
        ) : (
          <Volume2 className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
}

export default HeroBanner;
