'use client';

// ==========================================
// Category Browse Page
// ==========================================

import { useParams } from 'next/navigation';
import { VideoGrid } from '@/components/video/video-grid';
import { mockVideos } from '@/lib/mock-data';
import { VIDEO_CATEGORIES } from '@/constants';
import { notFound } from 'next/navigation';

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;

  // Validate category
  const categoryInfo = VIDEO_CATEGORIES.find((c) => c.value === category);
  if (!categoryInfo) {
    notFound();
  }

  // Filter videos by category
  const categoryVideos = mockVideos.filter((v) => v.category === category);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{categoryInfo.label}</h1>
        <p className="text-muted-foreground mt-1">
          Browse all {categoryInfo.label.toLowerCase()} content
        </p>
      </div>

      {/* Video Grid */}
      {categoryVideos.length > 0 ? (
        <VideoGrid videos={categoryVideos} columns={4} />
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No videos found in this category</p>
        </div>
      )}
    </div>
  );
}
