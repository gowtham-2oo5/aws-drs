import { NextResponse } from "next/server";
import AWS from "aws-sdk";
import { NextRequest } from "next/server";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

export async function POST(req: NextRequest) {
  try {
    // Parse the form data
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "File not found in the request" },
        { status: 400 }
      );
    }

    // Convert the file to a Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const bucketName = process.env.AWS_BUCKET_NAME as string;

    // Set up S3 upload parameters
    const params = {
      Bucket: bucketName,
      Key: file.name, // File name saved in the S3 bucket
      Body: buffer,
      ContentType: file.type,
    };

    // Upload to S3
    await s3.upload(params).promise();

    return NextResponse.json({ message: "File uploaded successfully!" });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
