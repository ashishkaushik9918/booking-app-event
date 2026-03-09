"use client";

import React, { useState } from "react";
import {
  Play,
  Trash2,
  MoreVertical,
  Download,
  Clock,
  CheckCircle2,
  AlertCircle,
  PauseCircle,
  ArrowDownUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// Mock downloaded videos data
const INITIAL_DOWNLOADS = [
  {
    id: "d1",
    title: "The Rise of Agentic AI in 2026 – Full Breakdown",
    channel: "AI Frontier",
    duration: "38:22",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    downloadedAt: "Today",
    status: "downloaded", // downloaded | downloading | paused | error | expired
    progress: 100,
    size: "248 MB",
  },
  {
    id: "d2",
    title: "Next.js 15 Deep Dive – New Features & Best Practices",
    channel: "Code with Antonio",
    duration: "1:04:50",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    downloadedAt: "Yesterday",
    status: "downloaded",
    progress: 100,
    size: "512 MB",
  },
  {
    id: "d3",
    title: "Material You 3 Expressive Design – 2026 Update",
    channel: "Design & Code",
    duration: "22:15",
    thumbnail: "https://images.unsplash.com/photo-1551650975-60cb5d043c3a?w=800&q=80",
    downloadedAt: "3 days ago",
    status: "downloading",
    progress: 68,
    size: "~180 MB",
  },
];

export default function DownloadsPage() {
  const [downloads, setDownloads] = useState(INITIAL_DOWNLOADS);

  const removeDownload = (id: string) => {
    setDownloads((prev) => prev.filter((d) => d.id !== id));
  };

  const isEmpty = downloads.length === 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header / Controls */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Downloads</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Watch offline • {downloads.filter(d => d.status === "downloaded").length} videos ready
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="rounded-full" disabled={isEmpty}>
              <ArrowDownUp className="mr-2 h-4 w-4" />
              Sort by date
            </Button>
            <Button variant="outline" size="sm" className="rounded-full" disabled={isEmpty}>
              Clear all
            </Button>
          </div>
        </div>

        <Separator className="mb-6" />

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 py-12">
            <div className="rounded-full bg-muted p-10">
              <Download className="h-16 w-16 text-muted-foreground/60" strokeWidth={1.5} />
            </div>
            <div className="space-y-3 max-w-md">
              <h2 className="text-3xl font-bold">No downloads yet</h2>
              <p className="text-lg text-muted-foreground">
                Download videos to watch offline — tap the download icon below any video player.
              </p>
            </div>
            <Button size="lg" className="rounded-full px-8">
              Browse recommended videos
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {downloads.map((video) => (
              <div
                key={video.id}
                className={cn(
                  "group flex flex-col sm:flex-row gap-4 rounded-xl p-4 transition-all",
                  "hover:bg-muted/60 dark:hover:bg-muted/30 border border-transparent hover:border-border/50",
                  "active:scale-[0.995]"
                )}
              >
                {/* Thumbnail + overlay */}
                <div className="relative aspect-video w-full sm:w-60 lg:w-72 rounded-lg overflow-hidden shrink-0 shadow-sm group/thumb">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover/thumb:scale-105"
                  />

                  {/* Status overlay */}
                  {video.status === "downloaded" && (
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="h-14 w-14 text-white fill-white/90 drop-shadow-lg" />
                    </div>
                  )}

                  {/* Progress bar / badge */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
                    <div
                      className={cn(
                        "h-full transition-all duration-300",
                        video.status === "downloading" ? "bg-primary" : "bg-green-500"
                      )}
                      style={{ width: `${video.progress}%` }}
                    />
                  </div>

                  <Badge
                    variant="secondary"
                    className={cn(
                      "absolute bottom-3 right-3 text-xs",
                      video.status === "downloaded" && "bg-green-600/90 text-white",
                      video.status === "downloading" && "bg-amber-600/90 text-white",
                      video.status === "error" && "bg-red-600/90 text-white",
                      video.status === "expired" && "bg-slate-700/90 text-white"
                    )}
                  >
                    {video.status === "downloaded" && <CheckCircle2 className="mr-1 h-3 w-3" />}
                    {video.status === "downloading" && <Download className="mr-1 h-3 w-3 animate-pulse" />}
                    {video.status === "paused" && <PauseCircle className="mr-1 h-3 w-3" />}
                    {video.status === "error" && <AlertCircle className="mr-1 h-3 w-3" />}
                    {video.status === "expired" && "Expired"}
                    {video.status === "downloaded" ? "Downloaded" : video.status === "downloading" ? `${video.progress}%` : ""}
                  </Badge>

                  <div className="absolute bottom-3 left-3 rounded bg-black/70 px-2 py-0.5 text-xs font-medium text-white">
                    {video.duration}
                  </div>
                </div>

                {/* Info */}
                <div className="flex min-w-0 flex-1 flex-col gap-2 py-1">
                  <h3 className="line-clamp-2 text-base sm:text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                    <span className="font-medium hover:text-foreground cursor-pointer">
                      {video.channel}
                    </span>
                    <span>•</span>
                    <span>{video.size}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{video.downloadedAt}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-start sm:items-center gap-2 sm:gap-1 shrink-0">
                  {video.status === "downloading" && (
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <PauseCircle className="h-5 w-5" />
                    </Button>
                  )}

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full opacity-70 sm:opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      {video.status === "downloaded" && (
                        <>
                          <DropdownMenuItem className="gap-2.5">
                            <Play className="h-4 w-4" /> Play now
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2.5">
                            <Download className="h-4 w-4" /> Re-download
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuItem
                        className="gap-2.5 text-destructive focus:text-destructive"
                        onClick={() => removeDownload(video.id)}
                      >
                        <Trash2 className="h-4 w-4" /> Delete download
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}