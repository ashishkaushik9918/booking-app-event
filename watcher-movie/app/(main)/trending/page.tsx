'use client';

// ==========================================
// Trending Page
// ==========================================

import { Flame } from 'lucide-react';
import { VideoGrid } from '@/components/video/video-grid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockTrendingVideos, mockVideos } from '@/lib/mock-data';

export default function TrendingPage() {
  // Sort by views for trending
  const trendingVideos = [...mockVideos].sort((a, b) => b.views - a.views);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-full bg-destructive/10">
          <Flame className="h-8 w-8 text-destructive" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Trending</h1>
          <p className="text-muted-foreground mt-1">
            See what&apos;s popular on Watcher Movie
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="now" className="space-y-6">
        <TabsList>
          <TabsTrigger value="now">Now</TabsTrigger>
          <TabsTrigger value="music">Music</TabsTrigger>
          <TabsTrigger value="gaming">Gaming</TabsTrigger>
          <TabsTrigger value="movies">Movies</TabsTrigger>
        </TabsList>

        <TabsContent value="now">
          <VideoGrid videos={trendingVideos} variant="horizontal" />
        </TabsContent>

        <TabsContent value="music">
          <VideoGrid
            videos={trendingVideos.filter((v) => v.category === 'music')}
            variant="horizontal"
          />
        </TabsContent>

        <TabsContent value="gaming">
          <VideoGrid
            videos={trendingVideos.filter((v) => v.category === 'gaming')}
            variant="horizontal"
          />
        </TabsContent>

        <TabsContent value="movies">
          <VideoGrid
            videos={trendingVideos.filter(
              (v) => v.category === 'movies' || v.category === 'series'
            )}
            variant="horizontal"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
