'use client';

// ==========================================
// Channel Page
// ==========================================

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { CheckCircle, Bell, BellOff, Share2, Flag, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VideoGrid } from '@/components/video/video-grid';
import { mockChannels, mockVideos, mockPlaylists } from '@/lib/mock-data';
import { notFound } from 'next/navigation';

function formatCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

export default function ChannelPage() {
  const params = useParams();
  const channelId = params.id as string;

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // Find channel
  const channel = mockChannels.find((c) => c.id === channelId);
  
  if (!channel) {
    notFound();
  }

  // Get channel's videos
  const channelVideos = mockVideos.filter(
    (v) => v.channel.id === channelId
  );

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
    if (!isSubscribed) {
      setNotificationsEnabled(true);
    }
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-primary/20 to-primary/5">
        {channel.banner && (
          <img
            src={channel.banner}
            alt={`${channel.name} banner`}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Channel Info */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6 py-6 border-b">
          {/* Avatar */}
          <div className="shrink-0">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-muted overflow-hidden border-4 border-background -mt-12 md:-mt-16">
              {channel.avatar ? (
                <img
                  src={channel.avatar}
                  alt={channel.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl font-bold">
                  {channel.name.charAt(0)}
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl md:text-3xl font-bold">{channel.name}</h1>
              {channel.isVerified && (
                <CheckCircle className="h-6 w-6 text-primary" />
              )}
            </div>
            <p className="text-muted-foreground">@{channel.handle}</p>
            <div className="flex items-center gap-3 text-sm text-muted-foreground mt-2">
              <span>{formatCount(channel.subscriberCount)} subscribers</span>
              <span>•</span>
              <span>{channel.videoCount} videos</span>
            </div>
            {channel.description && (
              <p className="mt-3 text-sm line-clamp-2">{channel.description}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-start gap-2">
            <Button
              variant={isSubscribed ? 'secondary' : 'default'}
              onClick={handleSubscribe}
              className="gap-2"
            >
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </Button>

            {isSubscribed && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleNotifications}
              >
                {notificationsEnabled ? (
                  <Bell className="h-5 w-5" />
                ) : (
                  <BellOff className="h-5 w-5" />
                )}
              </Button>
            )}

            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="videos" className="py-6">
          <TabsList>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="playlists">Playlists</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="videos" className="mt-6">
            {channelVideos.length > 0 ? (
              <VideoGrid videos={channelVideos} columns={4} showChannel={false} />
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No videos yet</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="playlists" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {mockPlaylists.map((playlist) => (
                <a
                  key={playlist.id}
                  href={`/playlist/${playlist.id}`}
                  className="group"
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
                    <img
                      src={playlist.thumbnail}
                      alt={playlist.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <span className="text-xs text-white/80">
                        {playlist.videoCount} videos
                      </span>
                    </div>
                  </div>
                  <h3 className="font-medium mt-2 group-hover:text-primary transition-colors">
                    {playlist.title}
                  </h3>
                </a>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="about" className="mt-6">
            <div className="max-w-2xl">
              <h3 className="font-semibold mb-4">Description</h3>
              <p className="text-muted-foreground mb-8">
                {channel.description || 'No description available.'}
              </p>

              <h3 className="font-semibold mb-4">Stats</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold">
                    {formatCount(channel.subscriberCount)}
                  </p>
                  <p className="text-sm text-muted-foreground">Subscribers</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold">{channel.videoCount}</p>
                  <p className="text-sm text-muted-foreground">Videos</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold">
                    {new Date(channel.createdAt).getFullYear()}
                  </p>
                  <p className="text-sm text-muted-foreground">Joined</p>
                </div>
              </div>

              <h3 className="font-semibold mb-4">Links</h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Link2 className="h-4 w-4" />
                  Website
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
