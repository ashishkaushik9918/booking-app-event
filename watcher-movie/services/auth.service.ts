// ==========================================
// Authentication Service
// ==========================================

import { api } from './api';
import {
  User,
  AuthCredentials,
  RegisterData,
  AuthResponse,
} from '@/types';
import { STORAGE_KEYS } from '@/constants';

// Token management
const setTokens = (accessToken: string, refreshToken: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  }
};

const clearTokens = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  }
};

const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
};

export const authService = {
  // Login with email/password
  login: async (credentials: AuthCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    const { accessToken, refreshToken, user } = response.data;
    setTokens(accessToken, refreshToken);
    return response.data;
  },

  // Register new user
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    const { accessToken, refreshToken } = response.data;
    setTokens(accessToken, refreshToken);
    return response.data;
  },

  // Logout
  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout', null, { requiresAuth: true });
    } finally {
      clearTokens();
    }
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>('/auth/me', { requiresAuth: true });
    return response.data;
  },

  // Refresh access token
  refreshToken: async (): Promise<AuthResponse> => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await api.post<AuthResponse>('/auth/refresh', {
      refreshToken,
    });
    
    const { accessToken, refreshToken: newRefreshToken } = response.data;
    setTokens(accessToken, newRefreshToken);
    return response.data;
  },

  // Social login
  socialLogin: async (
    provider: 'google' | 'apple' | 'facebook' | 'twitter',
    token: string
  ): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(`/auth/${provider}`, { token });
    const { accessToken, refreshToken } = response.data;
    setTokens(accessToken, refreshToken);
    return response.data;
  },

  // Request password reset
  requestPasswordReset: async (email: string): Promise<void> => {
    await api.post('/auth/forgot-password', { email });
  },

  // Reset password
  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    await api.post('/auth/reset-password', { token, newPassword });
  },

  // Change password
  changePassword: async (
    currentPassword: string,
    newPassword: string
  ): Promise<void> => {
    await api.post(
      '/auth/change-password',
      { currentPassword, newPassword },
      { requiresAuth: true }
    );
  },

  // Verify email
  verifyEmail: async (token: string): Promise<void> => {
    await api.post('/auth/verify-email', { token });
  },

  // Resend verification email
  resendVerificationEmail: async (): Promise<void> => {
    await api.post('/auth/resend-verification', null, { requiresAuth: true });
  },

  // Enable 2FA
  enable2FA: async (): Promise<{ qrCode: string; secret: string }> => {
    const response = await api.post<{ qrCode: string; secret: string }>(
      '/auth/2fa/enable',
      null,
      { requiresAuth: true }
    );
    return response.data;
  },

  // Verify 2FA
  verify2FA: async (code: string): Promise<void> => {
    await api.post('/auth/2fa/verify', { code }, { requiresAuth: true });
  },

  // Disable 2FA
  disable2FA: async (code: string): Promise<void> => {
    await api.post('/auth/2fa/disable', { code }, { requiresAuth: true });
  },

  // Delete account
  deleteAccount: async (password: string): Promise<void> => {
    await api.delete('/auth/account', {
      requiresAuth: true,
      body: JSON.stringify({ password }),
    });
    clearTokens();
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },
};

export default authService;
