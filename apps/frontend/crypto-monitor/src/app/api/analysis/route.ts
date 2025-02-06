import { NextResponse } from "next/server";
import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.POCKETBASE_URL);

// GET handler to fetch available services
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const market = searchParams.get("market") || "KRW-BTC";
    const analysis = await pb.collection("technicalanalysis").getList(1, 1, {
      filter: `market = "${market}"`,
    });
    return NextResponse.json({ analysis: analysis.items }, { status: 200 });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST handler to handle service requests
