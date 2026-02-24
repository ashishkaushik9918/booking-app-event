// ==========================================
// Video Service
// ==========================================

import { api, fetchPaginated } from './api';
import {
  Video,
  VideoDetails,
  VideoCategory,
  SearchFilters,
  SearchResults,
  Comment,
  PaginatedResponse,
} from '@/types';
import { VIDEOS_PER_PAGE, COMMENTS_PER_PAGE } from '@/constants';

export const videoService = {
  // Get trending videos
  getTrending: async (
    page: number = 1,
    limit: number = VIDEOS_PER_PAGE
  ): Promise<PaginatedResponse<Video>> => {
    return fetchPaginated<Video>('/videos/trending', page, limit);
  },

  // Get videos by category
  getByCategory: async (
    category: VideoCategory,
    page: number = 1,
    limit: number = VIDEOS_PER_PAGE
  ): Promise<PaginatedResponse<Video>> => {
    return fetchPaginated<Video>(`/videos/category/${category}`, page, limit);
  },

  // Get video details
  getVideoById: async (id: string): Promise<VideoDetails> => {
    const response = await api.get<VideoDetails>(`/videos/${id}`);
    return response.data;
  },

  // Get related videos
  getRelated: async (
    videoId: string,
    limit: number = 12
  ): Promise<Video[]> => {
    const response = await api.get<Video[]>(`/videos/${videoId}/related`, {
      params: { limit },
    });
    return response.data;
  },

  // Search videos
  search: async (filters: SearchFilters): Promise<SearchResults> => {
    const response = await api.get<SearchResults>('/videos/search', {
      params: {
        q: filters.query,
        category: filters.category,
        uploadDate: filters.uploadDate,
        duration: filters.duration,
        resolution: filters.resolution,
        sortBy: filters.sortBy,
        type: filters.type,
      },
    });
    return response.data;
  },

  // Get home feed (personalized)
  getHomeFeed: async (
    page: number = 1,
    limit: number = VIDEOS_PER_PAGE
  ): Promise<PaginatedResponse<Video>> => {
    return fetchPaginated<Video>('/videos/feed', page, limit, {
      requiresAuth: true,
    });
  },

  // Get continue watching
  getContinueWatching: async (limit: number = 10): Promise<Video[]> => {
    const response = await api.get<Video[]>('/videos/continue-watching', {
      params: { limit },
      requiresAuth: true,
    });
    return response.data;
  },

  // Like video
  likeVideo: async (videoId: string): Promise<void> => {
    await api.post(`/videos/${videoId}/like`, null, { requiresAuth: true });
  },

  // Dislike video
  dislikeVideo: async (videoId: string): Promise<void> => {
    await api.post(`/videos/${videoId}/dislike`, null, { requiresAuth: true });
  },

  // Remove reaction
  removeReaction: async (videoId: string): Promise<void> => {
    await api.delete(`/videos/${videoId}/reaction`, { requiresAuth: true });
  },

  // Add to watch later
  addToWatchLater: async (videoId: string): Promise<void> => {
    await api.post('/watch-later', { videoId }, { requiresAuth: true });
  },

  // Remove from watch later
  removeFromWatchLater: async (videoId: string): Promise<void> => {
    await api.delete(`/watch-later/${videoId}`, { requiresAuth: true });
  },

  // Update watch progress
  updateProgress: async (
    videoId: string,
    progress: number
  ): Promise<void> => {
    await api.post(
      `/videos/${videoId}/progress`,
      { progress },
      { requiresAuth: true }
    );
  },

  // Get comments
  getComments: async (
    videoId: string,
    page: number = 1,
    limit: number = COMMENTS_PER_PAGE
  ): Promise<PaginatedResponse<Comment>> => {
    return fetchPaginated<Comment>(
      `/videos/${videoId}/comments`,
      page,
      limit
    );
  },

  // Add comment
  addComment: async (
    videoId: string,
    content: string,
    parentId?: string
  ): Promise<Comment> => {
    const response = await api.post<Comment>(
      `/videos/${videoId}/comments`,
      { content, parentId },
      { requiresAuth: true }
    );
    return response.data;
  },

  // Delete comment
  deleteComment: async (videoId: string, commentId: string): Promise<void> => {
    await api.delete(`/videos/${videoId}/comments/${commentId}`, {
      requiresAuth: true,
    });
  },

  // Report video
  reportVideo: async (
    videoId: string,
    reason: string,
    details?: string
  ): Promise<void> => {
    await api.post(
      `/videos/${videoId}/report`,
      { reason, details },
      { requiresAuth: true }
    );
  },
};

export default videoService;
