'use client';

// ==========================================
// Home Page
// ==========================================

import { HeroBanner } from '@/components/common/hero-banner';
import { CategoryFilter } from '@/components/common/category-filter';
import { VideoRow } from '@/components/video/video-row';
import { VideoGrid } from '@/components/video/video-grid';
import { 
  mockHeroVideos, 
  mockVideos, 
  mockTrendingVideos,
  mockContinueWatching,
  mockLiveStreams,
} from '@/lib/mock-data';
import { useState } from 'react';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();

  // Filter videos by category
  const filteredVideos = selectedCategory
    ? mockVideos.filter((v) => v.category === selectedCategory)
    : mockVideos;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <HeroBanner videos={mockHeroVideos} />

      <div className="container mx-auto container-padding py-6 sm:py-8 lg:py-10 space-y-8 sm:space-y-10 lg:space-y-12">
        {/* Category Filter */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Continue Watching */}
        {mockContinueWatching.length > 0 && (
          <VideoRow
            title="Continue Watching"
            subtitle="Pick up where you left off"
            videos={mockContinueWatching}
            seeAllHref="/history"
          />
        )}

        {/* Trending Now */}
        <VideoRow
          title="Trending Now"
          subtitle="What everyone is watching"
          videos={mockTrendingVideos}
          seeAllHref="/trending"
        />

        {/* Live Now */}
        {mockLiveStreams.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  Live Now
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Watch live streams happening right now
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockLiveStreams.map((stream) => (
                <a
                  key={stream.id}
                  href={`/live/${stream.id}`}
                  className="group relative rounded-xl overflow-hidden bg-muted aspect-video"
                >
                  <img
                    src={stream.thumbnail}
                    alt={stream.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 text-xs font-medium bg-red-500 text-white rounded">
                        LIVE
                      </span>
                      <span className="text-xs text-white/80">
                        {stream.viewerCount.toLocaleString()} watching
                      </span>
                    </div>
                    <h3 className="font-medium text-white line-clamp-2">
                      {stream.title}
                    </h3>
                    <p className="text-sm text-white/70 mt-1">
                      {stream.channel.name}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Premium Content */}
        <VideoRow
          title="Premium Exclusives"
          subtitle="Available only for Premium members"
          videos={mockVideos.filter((v) => v.isPremium)}
          seeAllHref="/browse?filter=premium"
        />

        {/* Movies */}
        <VideoRow
          title="Popular Movies"
          subtitle="Top-rated films you'll love"
          videos={mockVideos.filter((v) => v.category === 'movies' || v.category === 'documentary')}
          seeAllHref="/browse/movies"
        />

        {/* All Videos Grid */}
        <section>
          <h2 className="text-xl font-bold mb-4">
            {selectedCategory
              ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Videos`
              : 'Recommended For You'}
          </h2>
          <VideoGrid videos={filteredVideos} columns={4} />
        </section>
      </div>
    </div>
  );
}
