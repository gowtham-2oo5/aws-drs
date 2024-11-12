# Document Review Generator

## Overview

The Document Review Generator is an advanced document analysis system that leverages AWS services to extract text, perform sentiment analysis, and identify named entities from uploaded documents. This system provides valuable insights and feedback for document review processes.

## Architecture

The system utilizes the following AWS services:

- Amazon S3: For document storage
- AWS Lambda: For serverless compute
- Amazon Textract: For text extraction from documents
- Amazon Comprehend: For sentiment analysis and named entity recognition
- Amazon DynamoDB: For storing analysis results

## Features

- Automatic text extraction from uploaded documents
- Sentiment analysis of the extracted text
- Named entity recognition
- Generation of readable feedback based on analysis results
- Storage of analysis results for future reference

## Setup Instructions

### Prerequisites

- AWS Account
- AWS CLI configured with appropriate permissions
- Node.js and npm installed

### Backend Setup

1. Create an S3 bucket for document uploads
2. Set up two DynamoDB tables: one for text analysis results and another for document metadata
3. Create a Lambda function and upload the provided code
4. Configure S3 to trigger the Lambda function on object creation
5. Set up appropriate IAM roles and permissions for Lambda to access S3, Textract, Comprehend, and DynamoDB

### Frontend Setup

1. Navigate to the client directory:
   ```
   cd ./client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the `./client` directory with the following content:
   ```
   AWS_ACCESS_KEY_ID=your_access_key_id
   AWS_SECRET_ACCESS_KEY=your_secret_access_key
   AWS_REGION=us-east-1
   DYNAMODB_TABLE_NAME=your_dynamodb_table_name
   AWS_BUCKET_NAME=your_s3_bucket_name
   DYNAMODB_DOCS_TABLE_NAME=your_dynamodb_docs_table_name
   ```
   Replace the placeholder values with your actual AWS credentials and resource names.

4. Start the development server:
   ```
   npm start
   ```

## Usage

1. Upload a document through the web interface
2. The system will automatically process the document and store the results
3. View the analysis results and generated feedback in the web interface

## Security Considerations

- Ensure that all AWS resources are properly secured with appropriate IAM policies
- Implement encryption for data at rest and in transit
- Regularly rotate access keys and review security settings
- Never commit your `.env` file or share your AWS credentials publicly

## Limitations

- The system currently supports English language documents only
- There may be size limitations for uploaded documents based on Lambda and S3 configurations

## Future Enhancements

- Support for multiple languages
- Integration with additional NLP services for more advanced analysis
- Integrate cognito for user auth
- Use pre saved data for more better and accurate review generation