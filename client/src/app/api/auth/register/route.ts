// /src/app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import AWS from "aws-sdk";

// Initialize DynamoDB client with environment variables
const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export async function GET() {
  return NextResponse.json({
    message: "Hello world",
  });
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    // Check if email and password are provided
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const userId = crypto.randomUUID();

    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME!,
      Item: {
        id: userId,
        name,
        email,
        password,
      },
    };

    // Save the new user to DynamoDB
    await dynamoDb.put(params).promise();
    return NextResponse.json({
      message: "User registered successfully",
      userId,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { message: "Failed to register user", error },
      { status: 500 }
    );
  }
}
