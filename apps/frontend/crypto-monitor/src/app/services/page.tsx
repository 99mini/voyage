'use client';

import { Services } from '@/components/services/services';
import { ServiceHeader } from '@/components/services/service-header';
import { ServiceCard } from '@/components/services/service-card';

export default function ServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-8 py-16">
        <ServiceHeader />

        <Services />

        <div className="mt-16 space-y-8">
          <ServiceCard
            title="Portfolio Management"
            description="Our advanced portfolio management tools provide you with real-time tracking, performance analytics, and risk assessment capabilities. Features include:"
            features={[
              'Real-time portfolio valuation and tracking',
              'Performance analytics and historical data',
              'Risk assessment and diversification analysis',
              'Customizable alerts and notifications',
            ]}
          />

          <ServiceCard
            title="Market Analysis"
            description="Stay ahead of the market with our comprehensive analysis tools and real-time market data. Our platform provides:"
            features={[
              'Technical analysis indicators and charts',
              'Market sentiment analysis',
              'Price alerts and notifications',
              'Historical data and trend analysis',
            ]}
          />

          <ServiceCard
            title="Trading Automation"
            description="Maximize your trading efficiency with our automated trading solutions. Our platform offers:"
            features={[
              'Customizable trading strategies',
              'Automated order execution',
              'Risk management rules',
              'Performance tracking and reporting',
            ]}
          />
        </div>
      </div>
    </div>
  );
}
