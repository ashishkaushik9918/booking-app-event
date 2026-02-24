// ==========================================
// Subscription Service
// ==========================================

import { api } from './api';
import { SubscriptionPlan, UserSubscription } from '@/types';

export const subscriptionService = {
  // Get available plans
  getPlans: async (): Promise<SubscriptionPlan[]> => {
    const response = await api.get<SubscriptionPlan[]>('/subscriptions/plans');
    return response.data;
  },

  // Get current subscription
  getCurrentSubscription: async (): Promise<UserSubscription | null> => {
    const response = await api.get<UserSubscription | null>(
      '/subscriptions/current',
      { requiresAuth: true }
    );
    return response.data;
  },

  // Subscribe to a plan
  subscribe: async (
    planId: string,
    paymentMethodId: string
  ): Promise<UserSubscription> => {
    const response = await api.post<UserSubscription>(
      '/subscriptions',
      { planId, paymentMethodId },
      { requiresAuth: true }
    );
    return response.data;
  },

  // Upgrade/downgrade subscription
  changePlan: async (newPlanId: string): Promise<UserSubscription> => {
    const response = await api.patch<UserSubscription>(
      '/subscriptions/current',
      { planId: newPlanId },
      { requiresAuth: true }
    );
    return response.data;
  },

  // Cancel subscription
  cancelSubscription: async (reason?: string): Promise<void> => {
    await api.delete('/subscriptions/current', {
      requiresAuth: true,
      body: JSON.stringify({ reason }),
    });
  },

  // Pause subscription
  pauseSubscription: async (pauseUntil: string): Promise<UserSubscription> => {
    const response = await api.patch<UserSubscription>(
      '/subscriptions/current/pause',
      { pauseUntil },
      { requiresAuth: true }
    );
    return response.data;
  },

  // Resume subscription
  resumeSubscription: async (): Promise<UserSubscription> => {
    const response = await api.patch<UserSubscription>(
      '/subscriptions/current/resume',
      null,
      { requiresAuth: true }
    );
    return response.data;
  },

  // Get billing history
  getBillingHistory: async (): Promise<
    {
      id: string;
      date: string;
      amount: number;
      status: 'paid' | 'pending' | 'failed';
      invoiceUrl: string;
    }[]
  > => {
    const response = await api.get<
      {
        id: string;
        date: string;
        amount: number;
        status: 'paid' | 'pending' | 'failed';
        invoiceUrl: string;
      }[]
    >('/subscriptions/billing-history', { requiresAuth: true });
    return response.data;
  },

  // Get payment methods
  getPaymentMethods: async (): Promise<
    {
      id: string;
      type: 'card' | 'paypal' | 'bank';
      last4?: string;
      brand?: string;
      isDefault: boolean;
    }[]
  > => {
    const response = await api.get<
      {
        id: string;
        type: 'card' | 'paypal' | 'bank';
        last4?: string;
        brand?: string;
        isDefault: boolean;
      }[]
    >('/payment-methods', { requiresAuth: true });
    return response.data;
  },

  // Add payment method
  addPaymentMethod: async (
    paymentMethodToken: string
  ): Promise<{ id: string }> => {
    const response = await api.post<{ id: string }>(
      '/payment-methods',
      { token: paymentMethodToken },
      { requiresAuth: true }
    );
    return response.data;
  },

  // Set default payment method
  setDefaultPaymentMethod: async (paymentMethodId: string): Promise<void> => {
    await api.patch(
      `/payment-methods/${paymentMethodId}/default`,
      null,
      { requiresAuth: true }
    );
  },

  // Remove payment method
  removePaymentMethod: async (paymentMethodId: string): Promise<void> => {
    await api.delete(`/payment-methods/${paymentMethodId}`, {
      requiresAuth: true,
    });
  },

  // Rent/Buy content (TVOD)
  purchaseContent: async (
    contentId: string,
    type: 'rent' | 'buy',
    paymentMethodId: string
  ): Promise<{ transactionId: string; expiresAt?: string }> => {
    const response = await api.post<{
      transactionId: string;
      expiresAt?: string;
    }>(
      '/purchases',
      { contentId, type, paymentMethodId },
      { requiresAuth: true }
    );
    return response.data;
  },

  // Get purchased content
  getPurchasedContent: async (): Promise<
    {
      id: string;
      contentId: string;
      type: 'rent' | 'buy';
      purchasedAt: string;
      expiresAt?: string;
    }[]
  > => {
    const response = await api.get<
      {
        id: string;
        contentId: string;
        type: 'rent' | 'buy';
        purchasedAt: string;
        expiresAt?: string;
      }[]
    >('/purchases', { requiresAuth: true });
    return response.data;
  },
};

export default subscriptionService;
