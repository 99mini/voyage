import { NextResponse } from "next/server";

type SignupRequestBody = {
  email: string;
  password: string;
  confirmPassword: string;
};

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body: SignupRequestBody = await request.json();

    // Validate request body
    if (!body.email || !body.password || !body.confirmPassword) {
      return NextResponse.json(
        { error: "Email, password and password confirmation are required" },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Password validation
    if (body.password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long" }, { status: 400 });
    }

    // Confirm password match
    if (body.password !== body.confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
    }

    // TODO: Add your user registration logic here
    // For example:
    // 1. Check if user already exists
    // 2. Hash the password
    // 3. Store user in database
    // 4. Generate session token

    // For now, return a mock successful response
    return NextResponse.json(
      {
        message: "Signup successful",
        user: {
          email: body.email,
          // Add other user fields as needed
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
