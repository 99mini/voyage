'use client';

import { PricingCard } from '@/components/pricing/pricing-card';

export default function PricingPage() {
  return (
    <div className="container mx-auto px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
        <p className="text-foreground/60 max-w-2xl mx-auto">
          Choose the perfect plan for your cryptocurrency monitoring needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <PricingCard
          title="Basic"
          description="Perfect for getting started"
          price={9}
          features={['Real-time price monitoring', 'Basic portfolio tracking', 'Email notifications']}
          buttonText="Get Started"
        />

        <PricingCard
          title="Pro"
          description="For serious traders"
          price={29}
          features={['Everything in Basic', 'Advanced technical analysis', 'Trading automation', '24/7 support']}
          buttonText="Upgrade to Pro"
          buttonClassName="bg-coral-100 hover:bg-coral-200"
          className="border-coral-100"
        />

        <PricingCard
          title="Enterprise"
          description="For large organizations"
          price={99}
          features={['Everything in Pro', 'Custom API integration', 'Dedicated account manager', 'Custom reporting']}
          buttonText="Contact Sales"
        />
      </div>
    </div>
  );
}
