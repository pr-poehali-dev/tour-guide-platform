import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn)

def handler(event: dict, context) -> dict:
    '''API для управления контентом сайта из админ-панели'''
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    try:
        path_params = event.get('pathParams', {})
        query_params = event.get('queryStringParameters', {})
        resource = query_params.get('resource', '')
        item_id = query_params.get('id')
        
        conn = get_db_connection()
        
        if method == 'GET':
            result = handle_get(conn, resource, item_id)
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            result = handle_post(conn, resource, body)
        elif method == 'PUT':
            body = json.loads(event.get('body', '{}'))
            result = handle_put(conn, resource, item_id, body)
        elif method == 'DELETE':
            result = handle_delete(conn, resource, item_id)
        else:
            result = {'error': 'Method not allowed'}
            conn.close()
            return {
                'statusCode': 405,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(result),
                'isBase64Encoded': False
            }
        
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(result, default=str),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }

def handle_get(conn, resource, item_id):
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    tables = {
        'banners': 'banners',
        'objects': 'objects',
        'events': 'events',
        'routes': 'routes',
        'quests': 'quests',
        'news': 'news',
        'reviews': 'reviews',
        'lost_found': 'lost_found',
        'categories': 'categories',
        'settings': 'site_settings'
    }
    
    if resource not in tables:
        return {'error': 'Invalid resource'}
    
    table = tables[resource]
    
    if item_id:
        cursor.execute(f"SELECT * FROM {table} WHERE id = {int(item_id)}")
        result = cursor.fetchone()
    else:
        cursor.execute(f"SELECT * FROM {table} ORDER BY id DESC")
        result = cursor.fetchall()
    
    cursor.close()
    return result if result else []

def handle_post(conn, resource, body):
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    tables = {
        'banners': ('title', 'subtitle', 'button_text', 'button_link', 'image_url', 'position'),
        'objects': ('name', 'category', 'rating', 'reviews', 'distance', 'verified', 'safety_zone', 'image', 'emoji', 'audio_available', 'description'),
        'events': ('title', 'type', 'date', 'date_time', 'time', 'location', 'location_id', 'price', 'image', 'emoji', 'verified', 'rating', 'reviews', 'description', 'distance'),
        'routes': ('title', 'description', 'duration', 'distance', 'difficulty', 'image', 'emoji', 'rating', 'reviews', 'verified'),
        'quests': ('title', 'description', 'difficulty', 'duration', 'points', 'image', 'emoji'),
        'news': ('title', 'excerpt', 'content', 'image_url', 'category', 'published_date'),
        'reviews': ('object_id', 'event_id', 'route_id', 'author_name', 'rating', 'text', 'is_moderated', 'is_approved'),
        'lost_found': ('type', 'category', 'title', 'description', 'location', 'date', 'emoji', 'contact_info'),
        'categories': ('name', 'icon', 'count', 'gradient'),
        'settings': ('setting_key', 'setting_value', 'description')
    }
    
    if resource not in tables:
        return {'error': 'Invalid resource'}
    
    table = resource
    fields = tables[resource]
    
    values = []
    placeholders = []
    valid_fields = []
    
    for field in fields:
        if field in body:
            values.append(body[field])
            placeholders.append('%s')
            valid_fields.append(field)
    
    if not valid_fields:
        return {'error': 'No valid fields provided'}
    
    query = f"INSERT INTO {table} ({', '.join(valid_fields)}) VALUES ({', '.join(placeholders)}) RETURNING id"
    cursor.execute(query, values)
    new_id = cursor.fetchone()['id']
    conn.commit()
    cursor.close()
    
    return {'id': new_id, 'message': 'Created successfully'}

def handle_put(conn, resource, item_id, body):
    if not item_id:
        return {'error': 'ID is required for update'}
    
    cursor = conn.cursor()
    
    tables = {
        'banners': ('title', 'subtitle', 'button_text', 'button_link', 'image_url', 'position', 'is_active'),
        'objects': ('name', 'category', 'rating', 'reviews', 'distance', 'verified', 'safety_zone', 'image', 'emoji', 'audio_available', 'description', 'is_active'),
        'events': ('title', 'type', 'date', 'date_time', 'time', 'location', 'location_id', 'price', 'image', 'emoji', 'verified', 'rating', 'reviews', 'description', 'distance', 'is_active'),
        'routes': ('title', 'description', 'duration', 'distance', 'difficulty', 'image', 'emoji', 'rating', 'reviews', 'verified', 'is_active'),
        'quests': ('title', 'description', 'difficulty', 'duration', 'points', 'image', 'emoji', 'is_active'),
        'news': ('title', 'excerpt', 'content', 'image_url', 'category', 'published_date', 'is_active'),
        'reviews': ('object_id', 'event_id', 'route_id', 'author_name', 'rating', 'text', 'is_moderated', 'is_approved'),
        'lost_found': ('type', 'category', 'title', 'description', 'location', 'date', 'emoji', 'contact_info', 'is_active', 'is_moderated'),
        'categories': ('name', 'icon', 'count', 'gradient', 'is_active'),
        'settings': ('setting_key', 'setting_value', 'description')
    }
    
    if resource not in tables:
        return {'error': 'Invalid resource'}
    
    table = resource
    fields = tables[resource]
    
    updates = []
    values = []
    
    for field in fields:
        if field in body:
            updates.append(f"{field} = %s")
            values.append(body[field])
    
    if not updates:
        return {'error': 'No valid fields to update'}
    
    values.append(int(item_id))
    query = f"UPDATE {table} SET {', '.join(updates)}, updated_at = CURRENT_TIMESTAMP WHERE id = %s"
    cursor.execute(query, values)
    conn.commit()
    cursor.close()
    
    return {'message': 'Updated successfully'}

def handle_delete(conn, resource, item_id):
    if not item_id:
        return {'error': 'ID is required for delete'}
    
    cursor = conn.cursor()
    
    tables = ['banners', 'objects', 'events', 'routes', 'quests', 'news', 'reviews', 'lost_found', 'categories', 'settings']
    
    if resource not in tables:
        return {'error': 'Invalid resource'}
    
    cursor.execute(f"UPDATE {resource} SET is_active = false WHERE id = %s", (int(item_id),))
    conn.commit()
    cursor.close()
    
    return {'message': 'Deleted successfully'}
