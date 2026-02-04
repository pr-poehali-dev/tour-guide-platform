"""
API для аутентификации администратора
"""
import json
import os
import hashlib
import secrets
from datetime import datetime, timedelta
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    """Создание подключения к базе данных"""
    return psycopg2.connect(os.environ['DATABASE_URL'])

def hash_password(password: str) -> str:
    """Хеширование пароля с использованием SHA256"""
    return hashlib.sha256(password.encode()).hexdigest()

def generate_token() -> str:
    """Генерация уникального токена сессии"""
    return secrets.token_urlsafe(32)

def handler(event: dict, context) -> dict:
    """
    API для авторизации администратора.
    POST /login - вход (username, password)
    POST /verify - проверка токена (token)
    POST /logout - выход (token)
    """
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        path = event.get('queryStringParameters', {}).get('action', 'login')
        
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
        
        if path == 'login':
            username = body.get('username')
            password = body.get('password')
            
            if not username or not password:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Username and password required'})
                }
            
            password_hash = hash_password(password)
            
            cur.execute(
                f"SELECT id, username FROM {schema}.admins WHERE username = %s AND password_hash = %s",
                (username, password_hash)
            )
            admin = cur.fetchone()
            
            if not admin:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Invalid credentials'})
                }
            
            token = generate_token()
            expires_at = datetime.now() + timedelta(days=7)
            
            cur.execute(
                f"INSERT INTO {schema}.admin_sessions (admin_id, token, expires_at) VALUES (%s, %s, %s)",
                (admin['id'], token, expires_at)
            )
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'token': token,
                    'admin': {
                        'id': admin['id'],
                        'username': admin['username']
                    },
                    'expires_at': expires_at.isoformat()
                })
            }
        
        elif path == 'verify':
            token = body.get('token')
            
            if not token:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Token required'})
                }
            
            cur.execute(
                f"""
                SELECT s.id, s.admin_id, s.expires_at, a.username
                FROM {schema}.admin_sessions s
                JOIN {schema}.admins a ON s.admin_id = a.id
                WHERE s.token = %s AND s.expires_at > NOW()
                """,
                (token,)
            )
            session = cur.fetchone()
            
            if not session:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Invalid or expired token'})
                }
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'valid': True,
                    'admin': {
                        'id': session['admin_id'],
                        'username': session['username']
                    }
                })
            }
        
        elif path == 'logout':
            token = body.get('token')
            
            if token:
                cur.execute(f"UPDATE {schema}.admin_sessions SET expires_at = NOW() WHERE token = %s", (token,))
                conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True})
            }
        
        else:
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Unknown action'})
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