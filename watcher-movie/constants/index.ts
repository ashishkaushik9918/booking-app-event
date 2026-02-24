// ==========================================
// Watcher-Movie Constants
// ==========================================

export const APP_NAME = 'Watcher Movie';
export const APP_DESCRIPTION = 'Your ultimate video streaming destination for movies, series, live events, and more.';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Navigation Links
export const NAV_LINKS = [
  { label: 'Home', href: '/', icon: 'Home' },
  { label: 'Browse', href: '/browse', icon: 'Compass' },
  { label: 'Movies', href: '/browse/movies', icon: 'Film' },
  { label: 'Series', href: '/browse/series', icon: 'Tv' },
  { label: 'Live', href: '/live', icon: 'Radio' },
  { label: 'Sports', href: '/browse/sports', icon: 'Trophy' },
] as const;

export const USER_NAV_LINKS = [
  { label: 'Watch History', href: '/history', icon: 'History' },
  { label: 'Watch Later', href: '/watch-later', icon: 'Clock' },
  { label: 'Playlists', href: '/playlists', icon: 'ListVideo' },
  { label: 'Subscriptions', href: '/subscriptions', icon: 'Users' },
  { label: 'Downloads', href: '/downloads', icon: 'Download' },
] as const;

// Video Categories
export const VIDEO_CATEGORIES = [
  { value: 'movies', label: 'Movies', icon: 'Film' },
  { value: 'series', label: 'TV Series', icon: 'Tv' },
  { value: 'sports', label: 'Sports', icon: 'Trophy' },
  { value: 'gaming', label: 'Gaming', icon: 'Gamepad2' },
  { value: 'music', label: 'Music', icon: 'Music' },
  { value: 'news', label: 'News', icon: 'Newspaper' },
  { value: 'education', label: 'Education', icon: 'GraduationCap' },
  { value: 'entertainment', label: 'Entertainment', icon: 'Sparkles' },
  { value: 'technology', label: 'Technology', icon: 'Laptop' },
  { value: 'lifestyle', label: 'Lifestyle', icon: 'Heart' },
  { value: 'documentary', label: 'Documentary', icon: 'FileVideo' },
  { value: 'kids', label: 'Kids', icon: 'Baby' },
] as const;

// Video Quality Options
export const VIDEO_QUALITIES = [
  { value: '360p', label: '360p', bitrate: '400 Kbps' },
  { value: '480p', label: '480p', bitrate: '750 Kbps' },
  { value: '720p', label: '720p HD', bitrate: '1.5 Mbps' },
  { value: '1080p', label: '1080p Full HD', bitrate: '4.5 Mbps' },
  { value: '1440p', label: '1440p 2K', bitrate: '9 Mbps' },
  { value: '4K', label: '4K Ultra HD', bitrate: '20 Mbps' },
] as const;

// Playback Speeds
export const PLAYBACK_SPEEDS = [
  { value: 0.25, label: '0.25x' },
  { value: 0.5, label: '0.5x' },
  { value: 0.75, label: '0.75x' },
  { value: 1, label: 'Normal' },
  { value: 1.25, label: '1.25x' },
  { value: 1.5, label: '1.5x' },
  { value: 1.75, label: '1.75x' },
  { value: 2, label: '2x' },
] as const;

// Subscription Plans
export const SUBSCRIPTION_PLANS = [
  {
    id: 'free',
    name: 'Free',
    tier: 'free',
    price: 0,
    currency: 'USD',
    billingPeriod: 'monthly',
    features: [
      'Access to free content',
      'Standard quality streaming',
      'Watch on 1 device',
      'Ad-supported viewing',
    ],
    isPopular: false,
  },
  {
    id: 'basic',
    name: 'Basic',
    tier: 'basic',
    price: 7.99,
    currency: 'USD',
    billingPeriod: 'monthly',
    features: [
      'All free content',
      'HD quality streaming',
      'Watch on 2 devices',
      'Limited ads',
      'Watch history sync',
    ],
    isPopular: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    tier: 'premium',
    price: 14.99,
    currency: 'USD',
    billingPeriod: 'monthly',
    features: [
      'All content access',
      '4K Ultra HD streaming',
      'Watch on 4 devices',
      'Ad-free experience',
      'Offline downloads',
      'Early access to originals',
      'Priority support',
    ],
    isPopular: true,
  },
  {
    id: 'family',
    name: 'Family',
    tier: 'family',
    price: 22.99,
    currency: 'USD',
    billingPeriod: 'monthly',
    features: [
      'Everything in Premium',
      'Up to 6 user profiles',
      'Watch on 6 devices',
      'Kids profiles with parental controls',
      'Family sharing',
      'Group watch party',
    ],
    isPopular: false,
  },
] as const;

// Upload Date Filters
export const UPLOAD_DATE_FILTERS = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This week' },
  { value: 'month', label: 'This month' },
  { value: 'year', label: 'This year' },
] as const;

// Duration Filters
export const DURATION_FILTERS = [
  { value: 'short', label: 'Under 4 minutes' },
  { value: 'medium', label: '4-20 minutes' },
  { value: 'long', label: 'Over 20 minutes' },
] as const;

// Sort Options
export const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'date', label: 'Upload date' },
  { value: 'views', label: 'View count' },
  { value: 'rating', label: 'Rating' },
] as const;

// Social Auth Providers
export const SOCIAL_AUTH_PROVIDERS = [
  { id: 'google', name: 'Google', icon: 'Chrome' },
  { id: 'apple', name: 'Apple', icon: 'Apple' },
  { id: 'facebook', name: 'Facebook', icon: 'Facebook' },
  { id: 'twitter', name: 'X (Twitter)', icon: 'Twitter' },
] as const;

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const VIDEOS_PER_PAGE = 24;
export const COMMENTS_PER_PAGE = 20;
export const SEARCH_RESULTS_PER_PAGE = 20;

// Video Player
export const SEEK_TIME = 10; // seconds
export const VOLUME_STEP = 0.1;
export const DEFAULT_VOLUME = 0.8;

// Cache Keys
export const CACHE_KEYS = {
  TRENDING_VIDEOS: 'trending-videos',
  HOME_FEED: 'home-feed',
  USER_PROFILE: 'user-profile',
  WATCH_HISTORY: 'watch-history',
  WATCH_LATER: 'watch-later',
  SUBSCRIPTIONS: 'subscriptions',
  NOTIFICATIONS: 'notifications',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'watcher-auth-token',
  REFRESH_TOKEN: 'watcher-refresh-token',
  USER_PREFERENCES: 'watcher-preferences',
  WATCH_PROGRESS: 'watcher-watch-progress',
  THEME: 'watcher-theme',
  VOLUME: 'watcher-volume',
  QUALITY: 'watcher-quality',
} as const;

// Theme
export const THEMES = ['light', 'dark', 'system'] as const;
export type Theme = typeof THEMES[number];

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;
