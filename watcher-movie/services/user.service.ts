// ==========================================
// User Service
// ==========================================

import { api, fetchPaginated } from './api';
import {
  User,
  UserProfile,
  Video,
  Playlist,
  WatchHistory,
  WatchLater,
  Notification,
  Channel,
  PaginatedResponse,
} from '@/types';
import { VIDEOS_PER_PAGE } from '@/constants';

export const userService = {
  // Get user profile
  getProfile: async (userId: string): Promise<UserProfile> => {
    const response = await api.get<UserProfile>(`/users/${userId}`);
    return response.data;
  },

  // Update profile
  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await api.patch<User>('/users/me', data, {
      requiresAuth: true,
    });
    return response.data;
  },

  // Update avatar
  updateAvatar: async (file: File): Promise<{ avatarUrl: string }> => {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await fetch('/api/users/me/avatar', {
      method: 'POST',
      body: formData,
    });
    
    return response.json();
  },

  // Update channel banner
  updateBanner: async (file: File): Promise<{ bannerUrl: string }> => {
    const formData = new FormData();
    formData.append('banner', file);

    const response = await fetch('/api/users/me/banner', {
      method: 'POST',
      body: formData,
    });
    
    return response.json();
  },

  // Get watch history
  getWatchHistory: async (
    page: number = 1,
    limit: number = VIDEOS_PER_PAGE
  ): Promise<PaginatedResponse<WatchHistory>> => {
    return fetchPaginated<WatchHistory>('/users/me/history', page, limit, {
      requiresAuth: true,
    });
  },

  // Clear watch history
  clearWatchHistory: async (): Promise<void> => {
    await api.delete('/users/me/history', { requiresAuth: true });
  },

  // Remove from history
  removeFromHistory: async (videoId: string): Promise<void> => {
    await api.delete(`/users/me/history/${videoId}`, { requiresAuth: true });
  },

  // Get watch later
  getWatchLater: async (
    page: number = 1,
    limit: number = VIDEOS_PER_PAGE
  ): Promise<PaginatedResponse<WatchLater>> => {
    return fetchPaginated<WatchLater>('/users/me/watch-later', page, limit, {
      requiresAuth: true,
    });
  },

  // Get playlists
  getPlaylists: async (
    userId?: string,
    page: number = 1,
    limit: number = 20
  ): Promise<PaginatedResponse<Playlist>> => {
    const endpoint = userId ? `/users/${userId}/playlists` : '/users/me/playlists';
    return fetchPaginated<Playlist>(endpoint, page, limit, {
      requiresAuth: !userId,
    });
  },

  // Create playlist
  createPlaylist: async (data: {
    title: string;
    description?: string;
    visibility: 'public' | 'private' | 'unlisted';
  }): Promise<Playlist> => {
    const response = await api.post<Playlist>('/playlists', data, {
      requiresAuth: true,
    });
    return response.data;
  },

  // Get playlist details
  getPlaylist: async (playlistId: string): Promise<Playlist> => {
    const response = await api.get<Playlist>(`/playlists/${playlistId}`);
    return response.data;
  },

  // Update playlist
  updatePlaylist: async (
    playlistId: string,
    data: Partial<Playlist>
  ): Promise<Playlist> => {
    const response = await api.patch<Playlist>(`/playlists/${playlistId}`, data, {
      requiresAuth: true,
    });
    return response.data;
  },

  // Delete playlist
  deletePlaylist: async (playlistId: string): Promise<void> => {
    await api.delete(`/playlists/${playlistId}`, { requiresAuth: true });
  },

  // Add video to playlist
  addToPlaylist: async (playlistId: string, videoId: string): Promise<void> => {
    await api.post(`/playlists/${playlistId}/videos`, { videoId }, {
      requiresAuth: true,
    });
  },

  // Remove video from playlist
  removeFromPlaylist: async (
    playlistId: string,
    videoId: string
  ): Promise<void> => {
    await api.delete(`/playlists/${playlistId}/videos/${videoId}`, {
      requiresAuth: true,
    });
  },

  // Get subscriptions
  getSubscriptions: async (
    page: number = 1,
    limit: number = 20
  ): Promise<PaginatedResponse<Channel>> => {
    return fetchPaginated<Channel>('/users/me/subscriptions', page, limit, {
      requiresAuth: true,
    });
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

  // Check subscription status
  isSubscribed: async (channelId: string): Promise<boolean> => {
    const response = await api.get<{ isSubscribed: boolean }>(
      `/channels/${channelId}/subscription-status`,
      { requiresAuth: true }
    );
    return response.data.isSubscribed;
  },

  // Get notifications
  getNotifications: async (
    page: number = 1,
    limit: number = 20
  ): Promise<PaginatedResponse<Notification>> => {
    return fetchPaginated<Notification>('/notifications', page, limit, {
      requiresAuth: true,
    });
  },

  // Mark notification as read
  markNotificationRead: async (notificationId: string): Promise<void> => {
    await api.patch(`/notifications/${notificationId}/read`, null, {
      requiresAuth: true,
    });
  },

  // Mark all notifications as read
  markAllNotificationsRead: async (): Promise<void> => {
    await api.patch('/notifications/read-all', null, { requiresAuth: true });
  },

  // Get unread notification count
  getUnreadNotificationCount: async (): Promise<number> => {
    const response = await api.get<{ count: number }>('/notifications/unread-count', {
      requiresAuth: true,
    });
    return response.data.count;
  },

  // Update notification preferences
  updateNotificationPreferences: async (preferences: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    subscriptionNotifications: boolean;
    commentNotifications: boolean;
  }): Promise<void> => {
    await api.patch('/users/me/notification-preferences', preferences, {
      requiresAuth: true,
    });
  },
};

export default userService;
