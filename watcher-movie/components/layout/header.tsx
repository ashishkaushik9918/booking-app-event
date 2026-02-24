'use client';

// ==========================================
// Header Component
// ==========================================

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Menu,
  Search,
  Bell,
  Upload,
  User,
  Settings,
  LogOut,
  History,
  ListVideo,
  Crown,
  Moon,
  Sun,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { APP_NAME } from '@/constants';

interface HeaderProps {
  onMenuClick?: () => void;
  isAuthenticated?: boolean;
  user?: {
    displayName: string;
    avatar: string;
    subscriptionTier?: string;
  } | null;
  onLogin?: () => void;
  onLogout?: () => void;
}

export function Header({
  onMenuClick,
  isAuthenticated = false,
  user,
  onLogin,
  onLogout,
}: HeaderProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="flex h-14 sm:h-16 items-center px-3 sm:px-4 lg:px-6 gap-2 sm:gap-4">
        {/* Menu Button & Logo */}
        <div className="flex items-center gap-1 sm:gap-2 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="shrink-0 h-9 w-9 sm:h-10 sm:w-10 rounded-full"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>

          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg sm:text-xl text-primary min-w-0"
          >
            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-primary flex items-center justify-center shrink-0 shadow-sm">
              <span className="text-primary-foreground text-sm font-bold">W</span>
            </div>
            <span className="hidden sm:inline-block truncate">{APP_NAME}</span>
          </Link>
        </div>

        {/* Search Bar - Desktop */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-xl lg:max-w-2xl mx-4 lg:mx-6 items-center gap-2"
        >
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground shrink-0" />
            <Input
              type="search"
              placeholder="Search movies, series, channels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 h-9 sm:h-10 rounded-full border-border/80 bg-muted/50 focus:bg-background"
            />
          </div>
          <Button type="submit" variant="secondary" size="icon" className="h-9 w-9 sm:h-10 sm:w-10 rounded-full shrink-0">
            <Search className="h-4 w-4" />
          </Button>
        </form>

        {/* Search Button - Mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden ml-auto h-9 w-9 rounded-full shrink-0"
          onClick={() => setIsSearchOpen(true)}
        >
          <Search className="h-5 w-5" />
        </Button>

        {/* Right Actions */}
        <div className="ml-auto flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hidden sm:flex h-9 w-9 rounded-full"
          >
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {isAuthenticated ? (
            <>
              {/* Upload Button */}
              <Button variant="ghost" size="icon" asChild>
                <Link href="/upload">
                  <Upload className="h-5 w-5" />
                  <span className="sr-only">Upload</span>
                </Link>
              </Button>

              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground flex items-center justify-center">
                      3
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="flex items-center justify-between px-4 py-2 border-b">
                    <span className="font-semibold">Notifications</span>
                    <Button variant="ghost" size="sm">
                      Mark all as read
                    </Button>
                  </div>
                  <div className="py-2 px-4 text-sm text-muted-foreground text-center">
                    No new notifications
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full p-0"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user?.avatar}
                        alt={user?.displayName}
                      />
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                        {user?.displayName?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-4 py-3 border-b">
                    <p className="font-medium">{user?.displayName}</p>
                    {user?.subscriptionTier && user.subscriptionTier !== 'free' && (
                      <p className="text-xs text-primary flex items-center gap-1 mt-1">
                        <Crown className="h-3 w-3" />
                        {user.subscriptionTier} member
                      </p>
                    )}
                  </div>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <User className="mr-2 h-4 w-4" />
                      Your Channel
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/history">
                      <History className="mr-2 h-4 w-4" />
                      Watch History
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/playlists">
                      <ListVideo className="mr-2 h-4 w-4" />
                      Playlists
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/subscription">
                      <Crown className="mr-2 h-4 w-4" />
                      Subscription
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button onClick={onLogin} size="sm" className="rounded-full text-sm font-medium">
              Sign In
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Search Overlay - full screen */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] bg-background p-4 md:hidden flex flex-col">
          <div className="flex items-center gap-2 min-w-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(false)}
              className="shrink-0 h-10 w-10 rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
            <form onSubmit={handleSearch} className="flex-1 flex gap-2 min-w-0">
              <Input
                type="search"
                placeholder="Search movies, series..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="flex-1 min-w-0 rounded-full h-11"
              />
              <Button type="submit" size="icon" className="shrink-0 h-11 w-11 rounded-full bg-primary text-primary-foreground">
                <Search className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
