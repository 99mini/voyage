import { NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.POCKETBASE_URL);

// GET handler to fetch available services
export async function GET() {
  try {
    const market = 'KRW-BTC';
    const services = await pb.collection('technicalanalysis').getList(1, 1, {
      filter: `market = "${market}"`,
    });
    return NextResponse.json({ services: services.items }, { status: 200 });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST handler to handle service requests
