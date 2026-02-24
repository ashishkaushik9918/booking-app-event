'use client';

// ==========================================
// Live Streaming Page
// ==========================================

import { Radio, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockLiveStreams, mockVideos } from '@/lib/mock-data';
import { CategoryFilter } from '@/components/common/category-filter';
import { useState } from 'react';

export default function LivePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();

  // Filter live streams by category
  const filteredStreams = selectedCategory
    ? mockLiveStreams.filter((s) => s.category === selectedCategory)
    : mockLiveStreams;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-full bg-red-500/10">
          <Radio className="h-8 w-8 text-red-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Live</h1>
          <p className="text-muted-foreground mt-1">
            Watch live streams and events
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="live" className="space-y-6">
        <TabsList>
          <TabsTrigger value="live" className="gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            Live Now
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="gap-2">
            <Calendar className="h-4 w-4" />
            Upcoming
          </TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-6">
          {/* Category Filter */}
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Live Streams Grid */}
          {filteredStreams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStreams.map((stream) => (
                <a
                  key={stream.id}
                  href={`/live/${stream.id}`}
                  className="group relative rounded-xl overflow-hidden bg-muted"
                >
                  <div className="aspect-video">
                    <img
                      src={stream.thumbnail}
                      alt={stream.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Live Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <Badge className="bg-red-500 text-white">
                      <span className="relative flex h-2 w-2 mr-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                      </span>
                      LIVE
                    </Badge>
                    <Badge variant="secondary" className="bg-black/50 text-white">
                      {stream.viewerCount.toLocaleString()} watching
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-semibold text-white line-clamp-2 mb-2">
                      {stream.title}
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted overflow-hidden">
                        {stream.channel.avatar ? (
                          <img
                            src={stream.channel.avatar}
                            alt={stream.channel.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-sm font-medium">
                            {stream.channel.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <span className="text-sm text-white/80">
                        {stream.channel.name}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Radio className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Live Streams</h3>
              <p className="text-muted-foreground">
                There are no live streams in this category right now
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="upcoming">
          <div className="text-center py-16">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Upcoming Events</h3>
            <p className="text-muted-foreground mb-4">
              Check back later for scheduled live events
            </p>
            <Button>Get Notified</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
