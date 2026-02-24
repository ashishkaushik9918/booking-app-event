'use client';

// ==========================================
// Subscription Plan Card Component
// ==========================================

import { Check, Crown, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { SubscriptionPlan } from '@/types';

interface SubscriptionCardProps {
  plan: SubscriptionPlan;
  isCurrentPlan?: boolean;
  onSelect?: (planId: string) => void;
  className?: string;
}

export function SubscriptionCard({
  plan,
  isCurrentPlan = false,
  onSelect,
  className,
}: SubscriptionCardProps) {
  return (
    <Card
      className={cn(
        'relative overflow-hidden transition-all',
        plan.isPopular && 'border-primary shadow-lg scale-105',
        isCurrentPlan && 'ring-2 ring-primary',
        className
      )}
    >
      {plan.isPopular && (
        <div className="absolute top-0 right-0">
          <Badge className="rounded-none rounded-bl-lg">
            <Star className="w-3 h-3 mr-1 fill-current" />
            Most Popular
          </Badge>
        </div>
      )}

      {isCurrentPlan && (
        <div className="absolute top-0 left-0">
          <Badge variant="secondary" className="rounded-none rounded-br-lg">
            Current Plan
          </Badge>
        </div>
      )}

      <CardHeader className="text-center pt-8">
        <div className="mx-auto mb-4">
          <div
            className={cn(
              'w-16 h-16 rounded-full flex items-center justify-center',
              plan.tier === 'free' && 'bg-muted',
              plan.tier === 'basic' && 'bg-blue-500/10',
              plan.tier === 'premium' && 'bg-primary/10',
              plan.tier === 'family' && 'bg-purple-500/10'
            )}
          >
            <Crown
              className={cn(
                'w-8 h-8',
                plan.tier === 'free' && 'text-muted-foreground',
                plan.tier === 'basic' && 'text-blue-500',
                plan.tier === 'premium' && 'text-primary',
                plan.tier === 'family' && 'text-purple-500'
              )}
            />
          </div>
        </div>

        <h3 className="text-xl font-bold">{plan.name}</h3>

        <div className="mt-4">
          <span className="text-4xl font-bold">
            ${plan.price.toFixed(2)}
          </span>
          {plan.price > 0 && (
            <span className="text-muted-foreground">
              /{plan.billingPeriod === 'monthly' ? 'mo' : 'yr'}
            </span>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          variant={plan.isPopular ? 'default' : 'outline'}
          disabled={isCurrentPlan}
          onClick={() => onSelect?.(plan.id)}
        >
          {isCurrentPlan
            ? 'Current Plan'
            : plan.price === 0
            ? 'Get Started'
            : 'Subscribe'}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default SubscriptionCard;
