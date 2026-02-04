"""
API для получения данных сайта (объекты, маршруты, баннеры, новости, категории)
"""
import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    """Создание подключения к базе данных"""
    return psycopg2.connect(os.environ['DATABASE_URL'])

def handler(event: dict, context) -> dict:
    """
    API для получения данных из базы данных.
    GET /objects - получить все активные объекты
    GET /routes - получить все активные маршруты
    GET /banners - получить все активные баннеры
    GET /news - получить все активные новости
    GET /categories - получить все активные категории
    GET /objects/:id - получить объект по ID
    GET /routes/:id - получить маршрут по ID
    GET /news/:id - получить новость по ID
    """
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
        
        resource = event.get('queryStringParameters', {}).get('resource', 'objects')
        item_id = event.get('queryStringParameters', {}).get('id')
        
        if method == 'GET':
            if item_id:
                cur.execute(f"SELECT * FROM {schema}.{resource} WHERE id = %s", (item_id,))
                result = cur.fetchone()
                
                if not result:
                    return {
                        'statusCode': 404,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Not found'})
                    }
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps(dict(result), default=str)
                }
            else:
                cur.execute(f"SELECT * FROM {schema}.{resource} WHERE is_active = true ORDER BY id")
                results = cur.fetchall()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps([dict(r) for r in results], default=str)
                }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            columns = ', '.join(body.keys())
            placeholders = ', '.join(['%s'] * len(body))
            values = list(body.values())
            
            cur.execute(
                f"INSERT INTO {schema}.{resource} ({columns}) VALUES ({placeholders}) RETURNING *",
                values
            )
            result = cur.fetchone()
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(dict(result), default=str)
            }
        
        elif method == 'PUT':
            if not item_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'ID required'})
                }
            
            body = json.loads(event.get('body', '{}'))
            
            set_clause = ', '.join([f"{k} = %s" for k in body.keys()])
            values = list(body.values()) + [item_id]
            
            cur.execute(
                f"UPDATE {schema}.{resource} SET {set_clause}, updated_at = CURRENT_TIMESTAMP WHERE id = %s RETURNING *",
                values
            )
            result = cur.fetchone()
            conn.commit()
            
            if not result:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Not found'})
                }
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(dict(result), default=str)
            }
        
        elif method == 'DELETE':
            if not item_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'ID required'})
                }
            
            cur.execute(
                f"UPDATE {schema}.{resource} SET is_active = false, updated_at = CURRENT_TIMESTAMP WHERE id = %s RETURNING *",
                (item_id,)
            )
            result = cur.fetchone()
            conn.commit()
            
            if not result:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Not found'})
                }
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True})
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Method not allowed'})
            }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }
    finally:
        if 'cur' in locals():
            cur.close()
        if 'conn' in locals():
            conn.close()