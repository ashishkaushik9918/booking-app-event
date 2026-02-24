// ==========================================
// API Base Configuration
// ==========================================

import { ApiError, ApiResponse, PaginatedResponse } from '@/types';
import { API_URL, STORAGE_KEYS } from '@/constants';

// Request configuration
interface RequestConfig extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
  requiresAuth?: boolean;
}

// Get auth token from storage
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
};

// Build URL with query params
const buildUrl = (
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined>
): string => {
  const url = new URL(`${API_URL}${endpoint}`);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }
  
  return url.toString();
};

// Base fetch wrapper
async function apiFetch<T>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<ApiResponse<T>> {
  const { params, requiresAuth = false, ...fetchConfig } = config;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...config.headers,
  };

  // Add auth header if required
  if (requiresAuth) {
    const token = getAuthToken();
    if (token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }
  }

  try {
    const response = await fetch(buildUrl(endpoint, params), {
      ...fetchConfig,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      const error: ApiError = {
        code: data.code || 'UNKNOWN_ERROR',
        message: data.message || 'An unexpected error occurred',
        details: data.details,
      };
      throw error;
    }

    return {
      data: data as T,
      success: true,
      message: data.message,
    };
  } catch (error) {
    if ((error as ApiError).code) {
      throw error;
    }
    
    throw {
      code: 'NETWORK_ERROR',
      message: 'Unable to connect to the server. Please check your internet connection.',
    } as ApiError;
  }
}

// HTTP method helpers
export const api = {
  get: <T>(endpoint: string, config?: RequestConfig) =>
    apiFetch<T>(endpoint, { ...config, method: 'GET' }),

  post: <T>(endpoint: string, body?: unknown, config?: RequestConfig) =>
    apiFetch<T>(endpoint, {
      ...config,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T>(endpoint: string, body?: unknown, config?: RequestConfig) =>
    apiFetch<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    }),

  patch: <T>(endpoint: string, body?: unknown, config?: RequestConfig) =>
    apiFetch<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(endpoint: string, config?: RequestConfig) =>
    apiFetch<T>(endpoint, { ...config, method: 'DELETE' }),
};

// Paginated fetch helper
export async function fetchPaginated<T>(
  endpoint: string,
  page: number = 1,
  limit: number = 20,
  config?: RequestConfig
): Promise<PaginatedResponse<T>> {
  const response = await api.get<PaginatedResponse<T>>(endpoint, {
    ...config,
    params: {
      ...config?.params,
      page,
      limit,
    },
  });
  
  return response.data;
}

export default api;
