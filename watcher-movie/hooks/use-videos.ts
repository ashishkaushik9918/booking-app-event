'use client';

// ==========================================
// Videos Hook
// ==========================================

import { useState, useEffect, useCallback } from 'react';
import { Video, VideoDetails, VideoCategory, PaginatedResponse } from '@/types';
import { videoService } from '@/services';

interface UseVideosOptions {
  category?: VideoCategory;
  initialPage?: number;
  pageSize?: number;
}

export function useVideos(options: UseVideosOptions = {}) {
  const { category, initialPage = 1, pageSize = 20 } = options;
  
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchVideos = useCallback(async (pageNum: number, append = false) => {
    setIsLoading(true);
    setError(null);

    try {
      let response: PaginatedResponse<Video>;
      
      if (category) {
        response = await videoService.getByCategory(category, pageNum, pageSize);
      } else {
        response = await videoService.getTrending(pageNum, pageSize);
      }

      setVideos((prev) => (append ? [...prev, ...response.data] : response.data));
      setHasMore(response.hasMore);
      setTotal(response.total);
      setPage(pageNum);
    } catch (err) {
      setError((err as Error).message || 'Failed to fetch videos');
    } finally {
      setIsLoading(false);
    }
  }, [category, pageSize]);

  useEffect(() => {
    fetchVideos(initialPage);
  }, [fetchVideos, initialPage]);

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      fetchVideos(page + 1, true);
    }
  }, [fetchVideos, hasMore, isLoading, page]);

  const refresh = useCallback(() => {
    setVideos([]);
    fetchVideos(1);
  }, [fetchVideos]);

  return {
    videos,
    isLoading,
    error,
    hasMore,
    total,
    page,
    loadMore,
    refresh,
  };
}

export function useVideoDetails(videoId: string) {
  const [video, setVideo] = useState<VideoDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      if (!videoId) return;
      
      setIsLoading(true);
      setError(null);

      try {
        const data = await videoService.getVideoById(videoId);
        setVideo(data);
      } catch (err) {
        setError((err as Error).message || 'Failed to fetch video');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideo();
  }, [videoId]);

  return { video, isLoading, error };
}

export function useRelatedVideos(videoId: string, limit = 12) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelated = async () => {
      if (!videoId) return;

      setIsLoading(true);
      setError(null);

      try {
        const data = await videoService.getRelated(videoId, limit);
        setVideos(data);
      } catch (err) {
        setError((err as Error).message || 'Failed to fetch related videos');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRelated();
  }, [videoId, limit]);

  return { videos, isLoading, error };
}

export default useVideos;
