"use client";

import React, { useState } from "react";
import {
  Play,
  Trash2,
  MoreVertical,
  Clock,
  Share2,
  ListVideo,
  GripVertical,
  Shuffle,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Mock data (replace with real data source)
const INITIAL_VIDEOS = [
  {
    id: "v1",
    title: "The Rise of Agentic AI in 2026 – What Developers Need to Know",
    channel: "AI Frontier",
    views: "1.2M views",
    duration: "38:22",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    added: "3 days ago",
  },
  {
    id: "v2",
    title: "Building Production-Ready Apps with Next.js 15 + React 19",
    channel: "Code with Antonio",
    views: "845K views",
    duration: "1:04:50",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    added: "1 week ago",
  },
  {
    id: "v3",
    title: "Material 3 Expressive: Google's 2025–2026 Design Evolution Explained",
    channel: "Design & Code",
    views: "412K views",
    duration: "22:15",
    thumbnail: "https://images.unsplash.com/photo-1551650975-60cb5d043c3a?w=800&q=80",
    added: "2 weeks ago",
  },
];

export default function SolidWatchLater() {
  const [videos, setVideos] = useState(INITIAL_VIDEOS);

  const removeVideo = (id: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
  };

  const isEmpty = videos.length === 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:gap-10">
          {/* ─── Sticky / Elevated Playlist Header ─── */}
          <div className="lg:w-96 xl:w-[420px] lg:sticky lg:top-4 lg:self-start">
            <Card
              className={cn(
                "overflow-hidden border-none shadow-xl",
                "bg-gradient-to-br from-muted/30 via-background to-muted/10",
                "dark:from-slate-950/80 dark:to-slate-900/60 backdrop-blur-md"
              )}
            >
              <div className="relative aspect-video group cursor-pointer">
                {isEmpty ? (
                  <div className="absolute inset-0 bg-muted/80 flex items-center justify-center">
                    <Clock className="h-24 w-24 text-muted-foreground/40" strokeWidth={1} />
                  </div>
                ) : (
                  <>
                    <img
                      src={videos[0]?.thumbnail}
                      alt="First video thumbnail"
                      className="h-full w-full object-cover brightness-[0.85] transition-all duration-300 group-hover:brightness-100 group-hover:scale-[1.015]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent/0" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="lg"
                        className="h-14 rounded-full bg-primary px-8 text-lg font-semibold shadow-2xl hover:scale-105 active:scale-100 transition-transform"
                      >
                        <Play className="mr-3 h-6 w-6 fill-current" />
                        Play all
                      </Button>
                    </div>

                    <Badge className="absolute bottom-4 right-4 bg-black/75 text-white border-none px-2.5 py-1 text-sm">
                      {videos.length} videos
                    </Badge>
                  </>
                )}
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight">Watch later</h1>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {videos.length} videos • Updated recently • Private
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button
                    className="flex-1 rounded-full text-base font-medium shadow-md"
                    disabled={isEmpty}
                  >
                    <Play className="mr-2 h-5 w-5 fill-current" />
                    Play all
                  </Button>
                  <Button
                    variant="secondary"
                    className="flex-1 rounded-full"
                    disabled={isEmpty || videos.length < 2}
                  >
                    <Shuffle className="mr-2 h-5 w-5" />
                    Shuffle
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Share2 className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <ArrowUpDown className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* ─── Video List ─── */}
          <div className="flex-1 mt-6 lg:mt-0">
            {isEmpty ? (
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
                <Clock className="h-20 w-20 text-muted-foreground/50" strokeWidth={1.2} />
                <div className="space-y-3">
                  <h2 className="text-3xl font-bold">Your Watch later is empty</h2>
                  <p className="text-lg text-muted-foreground max-w-md">
                    Add videos you want to watch later — they'll show up here.
                  </p>
                </div>
                <Button size="lg" variant="outline" className="rounded-full px-8">
                  Find videos to watch
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {videos.map((video, idx) => (
                  <div
                    key={video.id}
                    className={cn(
                      "group flex gap-4 rounded-xl p-3 sm:p-4 transition-all duration-200",
                      "hover:bg-muted/70 dark:hover:bg-muted/30",
                      "border border-transparent hover:border-border/50",
                      "active:scale-[0.995]"
                    )}
                  >
                    {/* Reorder grip (desktop) */}
                    <div className="hidden md:flex items-center opacity-0 group-hover:opacity-70 transition-opacity cursor-grab active:cursor-grabbing">
                      <GripVertical className="h-6 w-6 text-muted-foreground" />
                    </div>

                    {/* Index */}
                    <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center text-base font-medium text-muted-foreground/70">
                      {idx + 1}
                    </div>

                    {/* Thumbnail */}
                    <div className="relative aspect-video w-36 sm:w-48 lg:w-56 rounded-lg overflow-hidden shrink-0 shadow-sm group/thumb">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover/thumb:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                        <Play className="h-12 w-12 text-white fill-white/90 drop-shadow-lg" />
                      </div>
                      <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-0.5 text-xs font-medium text-white">
                        {video.duration}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex min-w-0 flex-col gap-1.5 flex-1">
                      <h3 className="line-clamp-2 text-base sm:text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
                        {video.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                        <span className="font-medium hover:text-foreground cursor-pointer transition-colors">
                          {video.channel}
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span>{video.views}</span>
                        <span className="hidden sm:inline">•</span>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{video.added}</span>
                        </div>
                      </div>
                    </div>

                    {/* More menu */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="shrink-0 rounded-full opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100 -mr-1 transition-opacity"
                        >
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuItem className="gap-2.5">
                          <Play className="h-4 w-4" /> Play next in queue
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2.5">
                          <ListVideo className="h-4 w-4" /> Add to another playlist
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="gap-2.5 text-destructive focus:text-destructive"
                          onClick={() => removeVideo(video.id)}
                        >
                          <Trash2 className="h-4 w-4" /> Remove from Watch later
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}