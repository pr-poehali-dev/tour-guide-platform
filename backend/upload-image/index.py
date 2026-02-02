import json
import os
import boto3
import base64
import uuid
from datetime import datetime

def get_s3_client():
    return boto3.client('s3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
    )

def handler(event: dict, context) -> dict:
    '''API для загрузки изображений в S3 хранилище'''
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        
        if 'image' not in body:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'No image data provided'}),
                'isBase64Encoded': False
            }
        
        image_data = body['image']
        folder = body.get('folder', 'images')
        
        if image_data.startswith('data:image'):
            header, image_data = image_data.split(',', 1)
            content_type = header.split(':')[1].split(';')[0]
            extension = content_type.split('/')[1]
        else:
            content_type = 'image/jpeg'
            extension = 'jpg'
        
        image_bytes = base64.b64decode(image_data)
        
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        unique_id = str(uuid.uuid4())[:8]
        filename = f"{timestamp}_{unique_id}.{extension}"
        key = f"{folder}/{filename}"
        
        s3 = get_s3_client()
        s3.put_object(
            Bucket='files',
            Key=key,
            Body=image_bytes,
            ContentType=content_type
        )
        
        cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'url': cdn_url,
                'filename': filename,
                'key': key
            }),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
