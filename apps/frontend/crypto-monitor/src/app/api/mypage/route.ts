import { NextResponse } from 'next/server';

type UserProfile = {
  id: string;
  email: string;
  name: string;
  preferences: {
    notifications: boolean;
    theme: 'light' | 'dark';
  };
  portfolio: {
    coins: Array<{
      symbol: string;
      amount: number;
    }>;
  };
};

// GET handler to fetch user profile data
export async function GET(request: Request) {
  try {
    // TODO: Add authentication check here
    // TODO: Fetch actual user data from database

    // Mock user data for demonstration
    const mockUserProfile: UserProfile = {
      id: 'user123',
      email: 'user@example.com',
      name: 'John Doe',
      preferences: {
        notifications: true,
        theme: 'light',
      },
      portfolio: {
        coins: [
          { symbol: 'BTC', amount: 0.5 },
          { symbol: 'ETH', amount: 5.0 },
        ],
      },
    };

    return NextResponse.json(mockUserProfile, { status: 200 });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT handler to update user settings
export async function PUT(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();

    // Validate request body
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    // TODO: Add authentication check here
    // TODO: Update user data in database

    // Mock successful update response
    return NextResponse.json(
      {
        message: 'Profile updated successfully',
        updatedFields: Object.keys(body),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
