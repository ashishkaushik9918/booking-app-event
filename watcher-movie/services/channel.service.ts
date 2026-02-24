// ==========================================
// Channel Service
// ==========================================

import { api, fetchPaginated } from './api';
import {
  Channel,
  ChannelDetails,
  Video,
  Playlist,
  PaginatedResponse,
} from '@/types';
import { VIDEOS_PER_PAGE } from '@/constants';

export const channelService = {
  // Get channel by ID or handle
  getChannel: async (idOrHandle: string): Promise<ChannelDetails> => {
    const response = await api.get<ChannelDetails>(`/channels/${idOrHandle}`);
    return response.data;
  },

  // Get channel videos
  getChannelVideos: async (
    channelId: string,
    page: number = 1,
    limit: number = VIDEOS_PER_PAGE,
    sortBy: 'latest' | 'popular' | 'oldest' = 'latest'
  ): Promise<PaginatedResponse<Video>> => {
    return fetchPaginated<Video>(`/channels/${channelId}/videos`, page, limit, {
      params: { sortBy },
    });
  },

  // Get channel playlists
  getChannelPlaylists: async (
    channelId: string,
    page: number = 1,
    limit: number = 20
  ): Promise<PaginatedResponse<Playlist>> => {
    return fetchPaginated<Playlist>(
      `/channels/${channelId}/playlists`,
      page,
      limit
    );
  },

  // Get featured channels
  getFeaturedChannels: async (limit: number = 10): Promise<Channel[]> => {
    const response = await api.get<Channel[]>('/channels/featured', {
      params: { limit },
    });
    return response.data;
  },

  // Get popular channels
  getPopularChannels: async (
    page: number = 1,
    limit: number = 20
  ): Promise<PaginatedResponse<Channel>> => {
    return fetchPaginated<Channel>('/channels/popular', page, limit);
  },

  // Search channels
  searchChannels: async (
    query: string,
    page: number = 1,
    limit: number = 20
  ): Promise<PaginatedResponse<Channel>> => {
    return fetchPaginated<Channel>('/channels/search', page, limit, {
      params: { q: query },
    });
  },

  // Get channel community posts (if implemented)
  getCommunityPosts: async (
    channelId: string,
    page: number = 1,
    limit: number = 20
  ): Promise<PaginatedResponse<unknown>> => {
    return fetchPaginated(`/channels/${channelId}/community`, page, limit);
  },

  // Subscribe to channel
  subscribe: async (channelId: string): Promise<void> => {
    await api.post(`/channels/${channelId}/subscribe`, null, {
      requiresAuth: true,
    });
  },

  // Unsubscribe from channel
  unsubscribe: async (channelId: string): Promise<void> => {
    await api.delete(`/channels/${channelId}/subscribe`, {
      requiresAuth: true,
    });
  },

  // Get subscription status
  getSubscriptionStatus: async (
    channelId: string
  ): Promise<{ isSubscribed: boolean; notificationsEnabled: boolean }> => {
    const response = await api.get<{
      isSubscribed: boolean;
      notificationsEnabled: boolean;
    }>(`/channels/${channelId}/subscription-status`, {
      requiresAuth: true,
    });
    return response.data;
  },

  // Toggle channel notifications
  toggleNotifications: async (
    channelId: string,
    enabled: boolean
  ): Promise<void> => {
    await api.patch(
      `/channels/${channelId}/notifications`,
      { enabled },
      { requiresAuth: true }
    );
  },
};

export default channelService;
