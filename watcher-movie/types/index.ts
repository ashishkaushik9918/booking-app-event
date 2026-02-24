// ==========================================
// Watcher-Movie Type Definitions
// ==========================================

// User Types
export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatar: string;
  bio?: string;
  channelBanner?: string;
  isVerified: boolean;
  subscriberCount: number;
  subscriptionTier?: SubscriptionTier;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  totalVideos: number;
  totalViews: number;
  totalWatchTime: number;
  socialLinks?: SocialLinks;
}

export interface SocialLinks {
  twitter?: string;
  instagram?: string;
  facebook?: string;
  website?: string;
}

// Authentication Types
export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends AuthCredentials {
  username: string;
  displayName: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// Video Types
export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number;
  views: number;
  likes: number;
  dislikes: number;
  uploadedAt: string;
  channel: Channel;
  category: VideoCategory;
  tags: string[];
  isLive: boolean;
  isPremium: boolean;
  resolution: VideoResolution;
}

export interface VideoDetails extends Video {
  videoUrl: string;
  subtitles: Subtitle[];
  chapters: Chapter[];
  relatedVideos: Video[];
  comments: Comment[];
  commentCount: number;
}

export interface Subtitle {
  id: string;
  language: string;
  label: string;
  url: string;
}

export interface Chapter {
  title: string;
  startTime: number;
  endTime: number;
  thumbnail?: string;
}

export type VideoResolution = '360p' | '480p' | '720p' | '1080p' | '1440p' | '4K' | '8K';

export type VideoCategory = 
  | 'movies'
  | 'series'
  | 'sports'
  | 'gaming'
  | 'music'
  | 'news'
  | 'education'
  | 'entertainment'
  | 'technology'
  | 'lifestyle'
  | 'documentary'
  | 'kids';

// Channel Types
export interface Channel {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  banner?: string;
  description?: string;
  subscriberCount: number;
  videoCount: number;
  isVerified: boolean;
  createdAt: string;
}

export interface ChannelDetails extends Channel {
  videos: Video[];
  playlists: Playlist[];
  featuredVideo?: Video;
  socialLinks?: SocialLinks;
  about?: string;
  location?: string;
  joinedDate: string;
  totalViews: number;
}

// Playlist Types
export interface Playlist {
  id: string;
  title: string;
  description?: string;
  thumbnail: string;
  videoCount: number;
  visibility: 'public' | 'private' | 'unlisted';
  createdBy: User;
  videos: Video[];
  createdAt: string;
  updatedAt: string;
}

// Comment Types
export interface Comment {
  id: string;
  content: string;
  author: User;
  likes: number;
  dislikes: number;
  replies: Comment[];
  replyCount: number;
  createdAt: string;
  updatedAt: string;
  isEdited: boolean;
  isPinned: boolean;
  isHearted: boolean;
}

// Live Streaming Types
export interface LiveStream {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channel: Channel;
  viewerCount: number;
  startedAt: string;
  category: VideoCategory;
  tags: string[];
  chatEnabled: boolean;
  streamUrl: string;
}

export interface LiveChat {
  id: string;
  message: string;
  author: User;
  timestamp: string;
  type: 'message' | 'superchat' | 'membership';
  amount?: number;
}

// Subscription Types
export type SubscriptionTier = 'free' | 'basic' | 'premium' | 'family';

export interface SubscriptionPlan {
  id: string;
  name: string;
  tier: SubscriptionTier;
  price: number;
  currency: string;
  billingPeriod: 'monthly' | 'yearly';
  features: string[];
  isPopular: boolean;
}

export interface UserSubscription {
  id: string;
  plan: SubscriptionPlan;
  status: 'active' | 'cancelled' | 'expired' | 'paused';
  startDate: string;
  endDate: string;
  autoRenew: boolean;
}

// Watch History & Progress
export interface WatchHistory {
  id: string;
  video: Video;
  watchedAt: string;
  progress: number;
  completed: boolean;
}

export interface WatchLater {
  id: string;
  video: Video;
  addedAt: string;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'video' | 'live' | 'comment' | 'subscription' | 'system';
  title: string;
  message: string;
  thumbnail?: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

// Search Types
export interface SearchFilters {
  query: string;
  category?: VideoCategory;
  uploadDate?: 'today' | 'week' | 'month' | 'year';
  duration?: 'short' | 'medium' | 'long';
  resolution?: VideoResolution;
  sortBy?: 'relevance' | 'date' | 'views' | 'rating';
  type?: 'video' | 'channel' | 'playlist';
}

export interface SearchResults {
  videos: Video[];
  channels: Channel[];
  playlists: Playlist[];
  totalResults: number;
  page: number;
  hasMore: boolean;
}

// Analytics Types
export interface VideoAnalytics {
  views: number;
  watchTime: number;
  averageViewDuration: number;
  likes: number;
  dislikes: number;
  comments: number;
  shares: number;
  retentionData: RetentionPoint[];
  demographicData: DemographicData;
  trafficSources: TrafficSource[];
}

export interface RetentionPoint {
  timestamp: number;
  percentage: number;
}

export interface DemographicData {
  ageGroups: { group: string; percentage: number }[];
  genders: { gender: string; percentage: number }[];
  countries: { country: string; views: number }[];
}

export interface TrafficSource {
  source: string;
  views: number;
  percentage: number;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

// Error Types
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string>;
}
