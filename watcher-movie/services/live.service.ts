// ==========================================
// Live Streaming Service
// ==========================================

import { api, fetchPaginated } from './api';
import { LiveStream, LiveChat, VideoCategory, PaginatedResponse } from '@/types';

export const liveService = {
  // Get all live streams
  getLiveStreams: async (
    page: number = 1,
    limit: number = 20
  ): Promise<PaginatedResponse<LiveStream>> => {
    return fetchPaginated<LiveStream>('/live', page, limit);
  },

  // Get live streams by category
  getLiveByCategory: async (
    category: VideoCategory,
    page: number = 1,
    limit: number = 20
  ): Promise<PaginatedResponse<LiveStream>> => {
    return fetchPaginated<LiveStream>(`/live/category/${category}`, page, limit);
  },

  // Get featured live streams
  getFeaturedLive: async (limit: number = 5): Promise<LiveStream[]> => {
    const response = await api.get<LiveStream[]>('/live/featured', {
      params: { limit },
    });
    return response.data;
  },

  // Get live stream details
  getLiveStream: async (streamId: string): Promise<LiveStream> => {
    const response = await api.get<LiveStream>(`/live/${streamId}`);
    return response.data;
  },

  // Get upcoming live events
  getUpcoming: async (
    page: number = 1,
    limit: number = 20
  ): Promise<PaginatedResponse<LiveStream>> => {
    return fetchPaginated<LiveStream>('/live/upcoming', page, limit);
  },

  // Get scheduled live events
  getScheduled: async (
    channelId?: string,
    page: number = 1,
    limit: number = 20
  ): Promise<PaginatedResponse<LiveStream>> => {
    return fetchPaginated<LiveStream>('/live/scheduled', page, limit, {
      params: { channelId },
    });
  },

  // Set reminder for live event
  setReminder: async (streamId: string): Promise<void> => {
    await api.post(`/live/${streamId}/reminder`, null, { requiresAuth: true });
  },

  // Remove reminder
  removeReminder: async (streamId: string): Promise<void> => {
    await api.delete(`/live/${streamId}/reminder`, { requiresAuth: true });
  },

  // Get chat messages
  getChatMessages: async (
    streamId: string,
    lastId?: string,
    limit: number = 50
  ): Promise<LiveChat[]> => {
    const response = await api.get<LiveChat[]>(`/live/${streamId}/chat`, {
      params: { lastId, limit },
    });
    return response.data;
  },

  // Send chat message
  sendChatMessage: async (
    streamId: string,
    message: string
  ): Promise<LiveChat> => {
    const response = await api.post<LiveChat>(
      `/live/${streamId}/chat`,
      { message },
      { requiresAuth: true }
    );
    return response.data;
  },

  // Send super chat
  sendSuperChat: async (
    streamId: string,
    message: string,
    amount: number
  ): Promise<LiveChat> => {
    const response = await api.post<LiveChat>(
      `/live/${streamId}/superchat`,
      { message, amount },
      { requiresAuth: true }
    );
    return response.data;
  },

  // Report chat message
  reportChatMessage: async (
    streamId: string,
    messageId: string,
    reason: string
  ): Promise<void> => {
    await api.post(
      `/live/${streamId}/chat/${messageId}/report`,
      { reason },
      { requiresAuth: true }
    );
  },

  // Get viewer count (for real-time updates)
  getViewerCount: async (streamId: string): Promise<number> => {
    const response = await api.get<{ count: number }>(
      `/live/${streamId}/viewers`
    );
    return response.data.count;
  },
};

export default liveService;
