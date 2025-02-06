import { NextResponse } from 'next/server';

type PricingPlan = {
  id: string;
  name: string;
  price: number;
  interval: 'monthly' | 'yearly';
  features: string[];
};

type SubscriptionRequest = {
  planId: string;
  userId: string;
  paymentMethod: string;
};

// Mock pricing plans data
const pricingPlans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 9.99,
    interval: 'monthly',
    features: ['Real-time crypto prices', 'Basic portfolio tracking', 'Email alerts'],
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    price: 19.99,
    interval: 'monthly',
    features: ['All Basic features', 'Advanced technical analysis', 'API access', 'Priority support'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise Plan',
    price: 49.99,
    interval: 'monthly',
    features: [
      'All Pro features',
      'Custom integrations',
      'Dedicated account manager',
      'Custom reporting',
      'SLA guarantee',
    ],
  },
];

// GET handler to fetch pricing plans
export async function GET() {
  try {
    return NextResponse.json({ plans: pricingPlans }, { status: 200 });
  } catch (error) {
    console.error('Error fetching pricing plans:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST handler to handle plan subscriptions
export async function POST(request: Request) {
  try {
    const body: SubscriptionRequest = await request.json();

    // Validate request body
    if (!body.planId || !body.userId || !body.paymentMethod) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate plan exists
    const plan = pricingPlans.find((p) => p.id === body.planId);
    if (!plan) {
      return NextResponse.json({ error: 'Invalid plan ID' }, { status: 400 });
    }

    // TODO: Implement actual subscription logic
    // 1. Verify user exists
    // 2. Process payment
    // 3. Create subscription record
    // 4. Send confirmation email

    return NextResponse.json(
      {
        message: 'Subscription successful',
        subscription: {
          planId: body.planId,
          userId: body.userId,
          startDate: new Date().toISOString(),
          status: 'active',
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error processing subscription:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
