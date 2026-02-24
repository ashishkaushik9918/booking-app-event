'use client';

// ==========================================
// User Avatar Component
// ==========================================

import { cn } from '@/lib/utils';
import { User } from '@/types';

interface UserAvatarProps {
  user?: Pick<User, 'displayName' | 'avatar'> | null;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-14 h-14 text-lg',
  xl: 'w-20 h-20 text-2xl',
};

export function UserAvatar({ user, size = 'md', className }: UserAvatarProps) {
  const initial = user?.displayName?.charAt(0).toUpperCase() || '?';

  return (
    <div
      className={cn(
        'rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center overflow-hidden',
        sizeClasses[size],
        className
      )}
    >
      {user?.avatar ? (
        <img
          src={user.avatar}
          alt={user.displayName || 'User'}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="font-medium text-primary-foreground">{initial}</span>
      )}
    </div>
  );
}

export default UserAvatar;
