'use client';

// ==========================================
// Main Layout Component
// ==========================================

import { useState, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { Footer } from './footer';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
  showFooter?: boolean;
}

// Mock data - replace with actual auth state
const mockUser = {
  displayName: 'John Doe',
  avatar: '',
  subscriptionTier: 'premium',
};

const mockSubscriptions = [
  { id: '1', name: 'TechVision', avatar: '', hasNewContent: true },
  { id: '2', name: 'Movie Critic', avatar: '', hasNewContent: false },
  { id: '3', name: 'Sports Hub', avatar: '', hasNewContent: true },
];

export function MainLayout({
  children,
  showSidebar = true,
  showFooter = true,
}: MainLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Determine if user is authenticated (replace with actual auth hook)
  const isAuthenticated = true;

  // Pages where sidebar should be hidden or collapsed
  const fullWidthPages = ['/watch', '/live'];
  const isFullWidthPage = fullWidthPages.some((page) =>
    pathname?.startsWith(page)
  );

  // Auth pages where we hide sidebar completely
  const authPages = ['/login', '/register', '/forgot-password'];
  const isAuthPage = authPages.includes(pathname || '');

  const handleLogin = () => {
    window.location.href = '/login';
  };

  const handleLogout = () => {
    // Handle logout logic
    console.log('Logout');
  };

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        isAuthenticated={isAuthenticated}
        user={mockUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      <div className="flex relative">
        {showSidebar && !isFullWidthPage && (
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            isAuthenticated={isAuthenticated}
            subscriptions={mockSubscriptions}
          />
        )}

        <main
          className={cn(
            'flex-1 min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] transition-[margin] duration-300 w-full min-w-0',
            showSidebar && !isFullWidthPage && (sidebarOpen ? 'md:ml-64' : 'md:ml-16'),
            isFullWidthPage && 'ml-0'
          )}
        >
          {children}
        </main>
      </div>

      {showFooter && !isFullWidthPage && <Footer />}
    </div>
  );
}

export default MainLayout;
