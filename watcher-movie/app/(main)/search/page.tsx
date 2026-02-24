'use client';

// ==========================================
// Search Results Page
// ==========================================

import { useSearchParams } from 'next/navigation';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VideoGrid } from '@/components/video/video-grid';
import { ChannelCard } from '@/components/user/channel-card';
import { EmptyState } from '@/components/common/empty-state';
import { mockVideos, mockChannels } from '@/lib/mock-data';
import { SORT_OPTIONS, UPLOAD_DATE_FILTERS, DURATION_FILTERS } from '@/constants';
import { useState } from 'react';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const [sortBy, setSortBy] = useState('relevance');
  const [uploadDate, setUploadDate] = useState<string | undefined>();

  // Filter results based on query (simple mock implementation)
  const videoResults = mockVideos.filter(
    (v) =>
      v.title.toLowerCase().includes(query.toLowerCase()) ||
      v.description.toLowerCase().includes(query.toLowerCase()) ||
      v.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  const channelResults = mockChannels.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.handle.toLowerCase().includes(query.toLowerCase())
  );

  // Sort videos
  const sortedVideos = [...videoResults].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
      case 'views':
        return b.views - a.views;
      case 'rating':
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  if (!query) {
    return (
      <div className="container mx-auto px-4 py-8">
        <EmptyState
          variant="search"
          title="Start searching"
          description="Enter a search term to find videos, channels, and more"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">Search results</h1>
          <p className="text-muted-foreground">
            {videoResults.length + channelResults.length} results for &quot;{query}&quot;
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Sort: {SORT_OPTIONS.find((s) => s.value === sortBy)?.label}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {SORT_OPTIONS.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {UPLOAD_DATE_FILTERS.map((filter) => (
                <DropdownMenuItem
                  key={filter.value}
                  onClick={() => setUploadDate(filter.value)}
                >
                  {filter.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Results Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="videos">Videos ({videoResults.length})</TabsTrigger>
          <TabsTrigger value="channels">Channels ({channelResults.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-8">
          {/* Channels */}
          {channelResults.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold mb-4">Channels</h2>
              <div className="space-y-4">
                {channelResults.slice(0, 3).map((channel) => (
                  <ChannelCard
                    key={channel.id}
                    channel={channel}
                    variant="horizontal"
                  />
                ))}
              </div>
            </section>
          )}

          {/* Videos */}
          {sortedVideos.length > 0 ? (
            <section>
              <h2 className="text-lg font-semibold mb-4">Videos</h2>
              <VideoGrid videos={sortedVideos} variant="horizontal" />
            </section>
          ) : (
            <EmptyState
              variant="search"
              title="No videos found"
              description={`We couldn't find any videos matching "${query}"`}
            />
          )}
        </TabsContent>

        <TabsContent value="videos">
          {sortedVideos.length > 0 ? (
            <VideoGrid videos={sortedVideos} variant="horizontal" />
          ) : (
            <EmptyState
              variant="search"
              title="No videos found"
              description={`We couldn't find any videos matching "${query}"`}
            />
          )}
        </TabsContent>

        <TabsContent value="channels">
          {channelResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {channelResults.map((channel) => (
                <ChannelCard key={channel.id} channel={channel} />
              ))}
            </div>
          ) : (
            <EmptyState
              variant="search"
              title="No channels found"
              description={`We couldn't find any channels matching "${query}"`}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
