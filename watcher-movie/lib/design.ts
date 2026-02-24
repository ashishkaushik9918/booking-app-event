/**
 * Reusable Tailwind design utilities for Watcher Movie
 * Use with cn() from @/lib/utils for consistent responsive & YouTube-style layouts
 */

// ==========================================
// Video card layout (YouTube-style)
// ==========================================

/** Grid columns: 1 → 2 → 3 → 4 → 5 responsive (YouTube-style) */
export const videoGridCols = {
  default:
    'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5',
  dense:
    'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
  list: 'grid-cols-1',
} as const;

/** Gap between video cards */
export const videoGridGap = 'gap-3 sm:gap-4 lg:gap-5';

/** Video card thumbnail - consistent aspect & radius */
export const videoThumb =
  'relative aspect-video w-full overflow-hidden bg-muted rounded-xl sm:rounded-[0.875rem]';

/** Video card meta - title + channel + stats */
export const videoCardMeta =
  'flex gap-2 sm:gap-3 mt-2 sm:mt-2.5 min-w-0';

/** Channel avatar in card - small circle */
export const channelAvatarSize = 'w-8 h-8 sm:w-9 sm:h-9';

/** Title - 2 lines clamp, responsive text */
export const videoTitle =
  'font-medium text-sm sm:text-[15px] line-clamp-2 leading-snug text-foreground hover:text-primary transition-colors';

/** Channel name + stats - muted, single line */
export const videoMetaText =
  'text-xs sm:text-[13px] text-muted-foreground truncate';

/** Duration badge - bottom right on thumbnail */
export const durationBadge =
  'absolute right-1.5 bottom-1.5 px-1.5 py-0.5 text-[10px] sm:text-[11px] font-medium rounded bg-black/85 text-white';

/** Live badge */
export const liveBadge =
  'absolute left-1.5 top-1.5 px-1.5 py-0.5 text-[10px] font-semibold rounded bg-red-600 text-white uppercase';

/** Premium badge */
export const premiumBadge =
  'absolute right-1.5 top-1.5 px-1.5 py-0.5 text-[10px] font-medium rounded bg-primary text-primary-foreground';
