import { NextResponse } from "next/server";

type LoginRequestBody = {
  email: string;
  password: string;
};

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body: LoginRequestBody = await request.json();

    // Validate request body
    if (!body.email || !body.password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // TODO: Add your authentication logic here
    // For example:
    // 1. Check if user exists in database
    // 2. Verify password hash
    // 3. Generate session token

    // For now, return a mock successful response
    return NextResponse.json(
      {
        message: "Login successful",
        // You might want to return user data and/or tokens here
        user: {
          email: body.email,
          // Add other user fields as needed
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
