import json
import urllib.parse
import boto3
from decimal import Decimal
import uuid
import re
import textwrap

# Initialize AWS clients
s3_client = boto3.client('s3')
textract_client = boto3.client('textract')
comprehend_client = boto3.client('comprehend')
dynamodb = boto3.resource('dynamodb')

# Define the DynamoDB table name
TABLE_NAME = 'TextAnalysisResults'  # Replace with your actual DynamoDB table name

# Define a basic list of common English stopwords
STOPWORDS = set([
    'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 
    'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 
    'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 
    'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 
    'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 
    'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 
    'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 
    'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 
    'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 
    'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 
    'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 
    'now'
])

def preprocess_text(text):
    # Remove unwanted characters and extra whitespace
    cleaned_text = re.sub(r'\s+', ' ', text)  # Remove extra whitespaces
    cleaned_text = re.sub(r'[^\w\s]', '', cleaned_text)  # Remove special characters

    # Tokenize and remove stopwords
    tokens = cleaned_text.lower().split()
    filtered_tokens = [word for word in tokens if word not in STOPWORDS]

    # Join tokens back to a string
    processed_text = ' '.join(filtered_tokens)
    return processed_text

def generate_feedback(entities, sentiment):
    feedback = f"Sentiment Analysis shows the document has a {sentiment} tone.\n"
    
    if entities:
        feedback += "\nNamed Entities Recognized:\n"
        for entity in entities:
            feedback += f"- {entity['Text']} ({entity['Type']})\n"
    else:
        feedback += "No significant named entities detected.\n"
        
    # Format feedback for readability
    wrapped_feedback = textwrap.fill(feedback, width=80)
    return wrapped_feedback

def lambda_handler(event, context):
    # Retrieve S3 bucket and key from the event
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'], encoding='utf-8')
    
    # Step 1: Download the object from S3
    try:
        response = s3_client.get_object(Bucket=bucket, Key=key)
        document_bytes = response['Body'].read()
        content_type = response['ContentType']
        print("CONTENT TYPE: " + content_type)
    except Exception as e:
        print(f"Error retrieving object from S3: {e}")
        raise e

    # Step 2: Perform text extraction with Textract
    try:
        textract_response = textract_client.detect_document_text(
            Document={'Bytes': document_bytes}
        )
        
        # Extract detected text
        extracted_text = " ".join([item['Text'] for item in textract_response['Blocks'] if item['BlockType'] == 'LINE'])
        
        if not extracted_text:
            print("No text extracted from the document.")
            return {"status": "No text found"}
        
        # Preprocess the extracted text
        processed_text = preprocess_text(extracted_text)
        
    except Exception as e:
        print(f"Error using Textract for text extraction: {e}")
        raise e

    # Step 3: Use Comprehend for Named Entity Recognition (NER) and Sentiment Analysis (SA)
    try:
        # Perform NER
        ner_response = comprehend_client.detect_entities(
            Text=processed_text,
            LanguageCode='en'
        )
        
        # Perform Sentiment Analysis
        sentiment_response = comprehend_client.detect_sentiment(
            Text=processed_text,
            LanguageCode='en'
        )
        
        # Extracted named entities and sentiment data
        entities = ner_response['Entities']
        sentiment = sentiment_response['Sentiment']
        sentiment_score = {k: Decimal(str(v)) for k, v in sentiment_response['SentimentScore'].items()}
        
        # Convert float scores in entities to Decimal
        for entity in entities:
            if 'Score' in entity:
                entity['Score'] = Decimal(str(entity['Score']))
        
        # Generate readable feedback based on entities and sentiment
        feedback = generate_feedback(entities, sentiment)
        
    except Exception as e:
        print(f"Error using Comprehend for NER/SA: {e}")
        raise e

    # Step 4: Store results in DynamoDB
    try:
        table = dynamodb.Table(TABLE_NAME)
        item = {
            'id': str(uuid.uuid4()),  # Generate a unique ID
            'DocumentName': key,
            'Entities': entities,
            'Sentiment': sentiment,
            'SentimentScore': sentiment_score,
            'ExtractedText': extracted_text,
            'ProcessedText': processed_text,
            'Feedback': feedback  # Store the readable feedback
        }
        table.put_item(Item=item)
        
        print("Results stored successfully in DynamoDB.")
        return {"status": "success"}
        
    except Exception as e:
        print(f"Error storing data in DynamoDB: {e}")
        raise e
