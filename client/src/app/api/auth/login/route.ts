// /src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import AWS from "aws-sdk";

// Initialize DynamoDB client
const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Check if email and password are provided
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Scan DynamoDB to get all items
    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME!,
    };

    const { Items } = await dynamoDb.scan(params).promise();

    // Find the user manually by email
    const user = Items?.find((item: any) => item.email === email);

    // If user is not found or password does not match, return an error
    if (!user || user.password !== password) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Set session cookie or response header with userId
    const response = NextResponse.json({
      message: "Login successful",
      userId: user.id,
    });
    response.headers.set(
      "Set-Cookie",
      `sessionId=${user.userId}; Path=/; HttpOnly`
    );
    return response;
  } catch (error) {
    console.error("Error logging in user:", error);
    return NextResponse.json(
      { message: "Login failed", error },
      { status: 500 }
    );
  }
}
