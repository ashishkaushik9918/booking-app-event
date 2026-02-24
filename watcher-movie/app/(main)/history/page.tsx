'use client';

// ==========================================
// Watch History Page
// ==========================================

import { useState } from 'react';
import { History, Trash2, Search, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { VideoGrid } from '@/components/video/video-grid';
import { EmptyState } from '@/components/common/empty-state';
import { mockVideos } from '@/lib/mock-data';

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isHistoryPaused, setIsHistoryPaused] = useState(false);

  // Mock history data
  const historyVideos = mockVideos.slice(0, 8);

  // Filter by search
  const filteredVideos = historyVideos.filter(
    (v) =>
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.channel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClearHistory = () => {
    console.log('Clearing history');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-muted">
            <History className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Watch History</h1>
            <p className="text-muted-foreground">
              {historyVideos.length} videos in your history
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setIsHistoryPaused(!isHistoryPaused)}
            className="gap-2"
          >
            {isHistoryPaused ? (
              <>
                <Play className="h-4 w-4" />
                Resume History
              </>
            ) : (
              <>
                <Pause className="h-4 w-4" />
                Pause History
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={handleClearHistory}
            className="gap-2 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
            Clear All
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search watch history..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* History Status */}
      {isHistoryPaused && (
        <div className="p-4 rounded-lg bg-muted/50 border mb-8 flex items-center justify-between">
          <div>
            <p className="font-medium">Watch history is paused</p>
            <p className="text-sm text-muted-foreground">
              Videos you watch won&apos;t be saved to your history
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsHistoryPaused(false)}
          >
            Resume
          </Button>
        </div>
      )}

      {/* History Content */}
      {filteredVideos.length > 0 ? (
        <VideoGrid videos={filteredVideos} variant="horizontal" />
      ) : (
        <EmptyState
          variant="history"
          title="No videos in history"
          description={
            searchQuery
              ? `No videos matching "${searchQuery}"`
              : 'Videos you watch will appear here'
          }
          action={
            searchQuery
              ? {
                  label: 'Clear search',
                  onClick: () => setSearchQuery(''),
                }
              : undefined
          }
        />
      )}
    </div>
  );
}
