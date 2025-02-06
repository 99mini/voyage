import { NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.POCKETBASE_URL);

// GET handler to fetch available services
export async function GET() {
  try {
    const markets = await pb.collection('technicalanalysis').getFullList({
      fields: 'market,korean_name,english_name',
    });
    return NextResponse.json({ markets }, { status: 200 });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST handler to handle service requests
