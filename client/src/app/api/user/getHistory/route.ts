import { NextRequest, NextResponse } from "next/server";
import AWS from "aws-sdk";

// Configure AWS SDK
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Define types for the expected item structure
interface Item {
  id: string;
  name: string;
  price: number;
}

export async function GET(req: NextRequest) {
  try {
    // Scan DynamoDB table to retrieve all items
    const params: AWS.DynamoDB.DocumentClient.ScanInput = {
      TableName: process.env.DYNAMODB_DOCS_TABLE_NAME!, // Use the table name from environment variable
    };

    // Perform the scan operation
    const data = await dynamoDB.scan(params).promise();

    // Return the items in a proper format for rendering
    const items = data.Items as Item[];

    return NextResponse.json({
      success: true,
      items,
    });
  } catch (error: any) {
    console.error("Error retrieving items from DynamoDB:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch data from DynamoDB.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
