'use client';

// ==========================================
// Sidebar Component
// ==========================================

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Compass,
  Film,
  Tv,
  Radio,
  Trophy,
  History,
  Clock,
  ListVideo,
  Users,
  Download,
  Crown,
  Flame,
  Music,
  Gamepad2,
  Newspaper,
  GraduationCap,
  Heart,
  Settings,
  HelpCircle,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
  isAuthenticated?: boolean;
  subscriptions?: {
    id: string;
    name: string;
    avatar: string;
    hasNewContent: boolean;
  }[];
}

const mainNavItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Compass, label: 'Browse', href: '/browse' },
  { icon: Flame, label: 'Trending', href: '/trending' },
  { icon: Radio, label: 'Live', href: '/live' },
];

const browseItems = [
  { icon: Film, label: 'Movies', href: '/browse/movies' },
  { icon: Tv, label: 'TV Series', href: '/browse/series' },
  { icon: Trophy, label: 'Sports', href: '/browse/sports' },
  { icon: Gamepad2, label: 'Gaming', href: '/browse/gaming' },
  { icon: Music, label: 'Music', href: '/browse/music' },
  { icon: Newspaper, label: 'News', href: '/browse/news' },
  { icon: GraduationCap, label: 'Education', href: '/browse/education' },
];

const userNavItems = [
  { icon: History, label: 'History', href: '/history' },
  { icon: Clock, label: 'Watch Later', href: '/watch-later' },
  { icon: ListVideo, label: 'Playlists', href: '/playlists' },
  { icon: Heart, label: 'Liked Videos', href: '/liked' },
  { icon: Download, label: 'Downloads', href: '/downloads' },
];

export function Sidebar({ isOpen, onClose, isAuthenticated = false, subscriptions = [] }: SidebarProps) {
  const pathname = usePathname();

  const NavLink = ({
    href,
    icon: Icon,
    label,
    hasNotification,
  }: {
    href: string;
    icon: React.ElementType;
    label: string;
    hasNotification?: boolean;
  }) => {
    const isActive = pathname === href;

    return (
      <Link href={href}>
        <Button
          variant={isActive ? 'secondary' : 'ghost'}
          className={cn(
            'w-full justify-start gap-3',
            isOpen ? 'px-4' : 'px-3 justify-center',
            isActive && 'bg-primary/10 text-primary'
          )}
        >
          <div className="relative">
            <Icon className="h-5 w-5" />
            {hasNotification && (
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-destructive" />
            )}
          </div>
          {isOpen && <span className="truncate">{label}</span>}
        </Button>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile overlay when sidebar open - click to close */}
      {isOpen && (
        <button
          type="button"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden cursor-default"
          aria-label="Close sidebar"
        />
      )}
      <aside
        className={cn(
          'fixed left-0 top-14 sm:top-16 z-50 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] border-r border-border bg-background transition-all duration-300 ease-out',
          'md:z-40',
          isOpen ? 'w-72 sm:w-64 translate-x-0' : '-translate-x-full md:translate-x-0 w-16',
          'shadow-xl md:shadow-none'
        )}
      >
      <ScrollArea className="h-full py-4">
        <div className="space-y-4 px-2">
          {/* Main Navigation */}
          <nav className="space-y-1">
            {mainNavItems.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </nav>

          <Separator />

          {/* Browse Categories */}
          {isOpen && (
            <div>
              <h3 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Browse
              </h3>
              <nav className="space-y-1">
                {browseItems.map((item) => (
                  <NavLink key={item.href} {...item} />
                ))}
              </nav>
            </div>
          )}

          {!isOpen && (
            <nav className="space-y-1">
              {browseItems.slice(0, 3).map((item) => (
                <NavLink key={item.href} {...item} />
              ))}
            </nav>
          )}

          <Separator />

          {/* User Library */}
          {isAuthenticated && (
            <>
              {isOpen && (
                <div>
                  <h3 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Library
                  </h3>
                  <nav className="space-y-1">
                    {userNavItems.map((item) => (
                      <NavLink key={item.href} {...item} />
                    ))}
                  </nav>
                </div>
              )}

              {!isOpen && (
                <nav className="space-y-1">
                  {userNavItems.slice(0, 3).map((item) => (
                    <NavLink key={item.href} {...item} />
                  ))}
                </nav>
              )}

              <Separator />

              {/* Subscriptions */}
              {isOpen && subscriptions.length > 0 && (
                <div>
                  <h3 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Subscriptions
                  </h3>
                  <nav className="space-y-1">
                    {subscriptions.map((channel) => (
                      <Link key={channel.id} href={`/channel/${channel.id}`}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-3 px-4"
                        >
                          <div className="relative">
                            <div className="h-6 w-6 rounded-full bg-muted overflow-hidden">
                              {channel.avatar ? (
                                <img
                                  src={channel.avatar}
                                  alt={channel.name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="h-full w-full flex items-center justify-center text-xs font-medium">
                                  {channel.name.charAt(0)}
                                </div>
                              )}
                            </div>
                            {channel.hasNewContent && (
                              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-primary" />
                            )}
                          </div>
                          <span className="truncate">{channel.name}</span>
                        </Button>
                      </Link>
                    ))}
                    <Link href="/subscriptions">
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 px-4 text-primary"
                      >
                        <Users className="h-5 w-5" />
                        <span>View All</span>
                      </Button>
                    </Link>
                  </nav>
                </div>
              )}

              <Separator />
            </>
          )}

          {/* Premium CTA */}
          {isOpen && (
            <div className="px-2">
              <Link href="/subscription">
                <div className="p-4 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Go Premium</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    Unlock 4K streaming, ad-free viewing, and exclusive content.
                  </p>
                  <Button size="sm" className="w-full">
                    Upgrade Now
                  </Button>
                </div>
              </Link>
            </div>
          )}

          {/* Footer Links */}
          {isOpen && (
            <div className="px-4 pt-4 space-y-2">
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <Link href="/about" className="hover:text-foreground">
                  About
                </Link>
                <Link href="/contact" className="hover:text-foreground">
                  Contact
                </Link>
                <Link href="/terms" className="hover:text-foreground">
                  Terms
                </Link>
                <Link href="/privacy" className="hover:text-foreground">
                  Privacy
                </Link>
              </div>
              <p className="text-xs text-muted-foreground">
                © 2026 Watcher Movie
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </aside>
    </>
  );
}

export default Sidebar;
