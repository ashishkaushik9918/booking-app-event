'use client';

// ==========================================
// Subscription Plans Page
// ==========================================

import { Crown, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SubscriptionCard } from '@/components/user/subscription-card';
import { SUBSCRIPTION_PLANS } from '@/constants';
import { SubscriptionPlan } from '@/types';
import { useState } from 'react';

const plans: SubscriptionPlan[] = SUBSCRIPTION_PLANS.map((plan) => ({
  ...plan,
  tier: plan.tier as 'free' | 'basic' | 'premium' | 'family',
  billingPeriod: plan.billingPeriod as 'monthly' | 'yearly',
}));

const features = [
  { feature: 'Access to free content', free: true, basic: true, premium: true, family: true },
  { feature: 'HD streaming (720p)', free: true, basic: true, premium: true, family: true },
  { feature: 'Full HD streaming (1080p)', free: false, basic: true, premium: true, family: true },
  { feature: '4K Ultra HD streaming', free: false, basic: false, premium: true, family: true },
  { feature: 'Ad-free experience', free: false, basic: false, premium: true, family: true },
  { feature: 'Offline downloads', free: false, basic: false, premium: true, family: true },
  { feature: 'Multiple profiles', free: false, basic: false, premium: '4', family: '6' },
  { feature: 'Simultaneous streams', free: '1', basic: '2', premium: '4', family: '6' },
  { feature: 'Early access to originals', free: false, basic: false, premium: true, family: true },
  { feature: 'Priority support', free: false, basic: false, premium: true, family: true },
  { feature: 'Kids profiles', free: false, basic: false, premium: false, family: true },
  { feature: 'Group watch party', free: false, basic: false, premium: false, family: true },
];

export default function SubscriptionPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const currentPlanId = 'free'; // This would come from auth/user state

  const handleSelectPlan = (planId: string) => {
    console.log('Selected plan:', planId);
    // Navigate to checkout or payment flow
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 mb-4">
          <Crown className="h-8 w-8 text-primary" />
          <h1 className="text-3xl lg:text-4xl font-bold">Choose Your Plan</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Unlock premium features and enjoy unlimited entertainment.
          Start with a free trial and upgrade anytime.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center gap-4 p-1 rounded-full bg-muted">
          <Button
            variant={billingPeriod === 'monthly' ? 'default' : 'ghost'}
            size="sm"
            className="rounded-full"
            onClick={() => setBillingPeriod('monthly')}
          >
            Monthly
          </Button>
          <Button
            variant={billingPeriod === 'yearly' ? 'default' : 'ghost'}
            size="sm"
            className="rounded-full gap-2"
            onClick={() => setBillingPeriod('yearly')}
          >
            Yearly
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Save 20%
            </Badge>
          </Button>
        </div>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {plans.map((plan) => (
          <SubscriptionCard
            key={plan.id}
            plan={{
              ...plan,
              price:
                billingPeriod === 'yearly'
                  ? plan.price * 12 * 0.8
                  : plan.price,
              billingPeriod,
            }}
            isCurrentPlan={currentPlanId === plan.id}
            onSelect={handleSelectPlan}
          />
        ))}
      </div>

      {/* Feature Comparison */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Compare Plans</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-4 font-medium">Feature</th>
                <th className="text-center py-4 px-4 font-medium">Free</th>
                <th className="text-center py-4 px-4 font-medium">Basic</th>
                <th className="text-center py-4 px-4 font-medium">
                  <div className="flex items-center justify-center gap-1">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Premium
                  </div>
                </th>
                <th className="text-center py-4 px-4 font-medium">Family</th>
              </tr>
            </thead>
            <tbody>
              {features.map((row, index) => (
                <tr key={index} className="border-b">
                  <td className="py-4 px-4">{row.feature}</td>
                  <td className="text-center py-4 px-4">
                    {typeof row.free === 'boolean' ? (
                      row.free ? (
                        <Check className="h-5 w-5 text-primary mx-auto" />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )
                    ) : (
                      <span>{row.free}</span>
                    )}
                  </td>
                  <td className="text-center py-4 px-4">
                    {typeof row.basic === 'boolean' ? (
                      row.basic ? (
                        <Check className="h-5 w-5 text-primary mx-auto" />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )
                    ) : (
                      <span>{row.basic}</span>
                    )}
                  </td>
                  <td className="text-center py-4 px-4 bg-primary/5">
                    {typeof row.premium === 'boolean' ? (
                      row.premium ? (
                        <Check className="h-5 w-5 text-primary mx-auto" />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )
                    ) : (
                      <span>{row.premium}</span>
                    )}
                  </td>
                  <td className="text-center py-4 px-4">
                    {typeof row.family === 'boolean' ? (
                      row.family ? (
                        <Check className="h-5 w-5 text-primary mx-auto" />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )
                    ) : (
                      <span>{row.family}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          <div className="p-4 rounded-lg bg-muted/50">
            <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
            <p className="text-muted-foreground">
              Yes, you can cancel your subscription at any time. Your access will
              continue until the end of your current billing period.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-muted/50">
            <h3 className="font-semibold mb-2">
              What payment methods do you accept?
            </h3>
            <p className="text-muted-foreground">
              We accept all major credit cards, debit cards, PayPal, and various
              regional payment methods.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-muted/50">
            <h3 className="font-semibold mb-2">
              Can I switch plans later?
            </h3>
            <p className="text-muted-foreground">
              Absolutely! You can upgrade or downgrade your plan at any time.
              Changes will be reflected in your next billing cycle.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-muted/50">
            <h3 className="font-semibold mb-2">
              Is there a free trial?
            </h3>
            <p className="text-muted-foreground">
              Yes! New subscribers can enjoy a 7-day free trial of our Premium
              plan. No commitment required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
