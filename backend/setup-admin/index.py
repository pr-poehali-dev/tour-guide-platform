"""
API для первичной настройки администратора с правильным хешем пароля
"""
import json
import os
import hashlib
import psycopg2

def hash_password(password: str) -> str:
    """Хеширование пароля с использованием SHA256"""
    return hashlib.sha256(password.encode()).hexdigest()

def seed_data(cur, conn):
    """Загрузка начальных данных в базу"""
    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    
    objects_data = [
        ('Донецкий художественный музей', 'Музей', 4.9, 2847, '1.2 км', True, '🏛️', True, 'Крупнейший художественный музей Донбасса с богатой коллекцией живописи и скульптуры.', 'https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=800', True),
        ('Парк Форжа', 'Парк', 4.7, 1523, '0.8 км', True, '🌳', True, 'Крупный парк в центре Донецка с живописными аллеями и зонами отдыха.', 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800', True),
        ('Ресторан "Донбасс"', 'Ресторан', 4.8, 892, '0.3 км', True, '🍽️', False, 'Популярный ресторан с классической кухней и уютной атмосферой.', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', True)
    ]
    
    for obj in objects_data:
        cur.execute(f"""
            INSERT INTO {schema}.objects (name, category, rating, reviews, distance, verified, emoji, audio_available, description, image, is_active)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT DO NOTHING
        """, obj)
    
    routes_data = [
        ('Классический Донецк', 'Главные достопримечательности центра города за один день', '4-5 часов', '8.5 км', 'Легкий', '🏛️', 4.9, 1247, 'Бесплатно', 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800', True),
        ('Парковый маршрут', 'Прогулка по самым красивым паркам города', '3-4 часа', '6.2 км', 'Легкий', '🌳', 4.7, 892, 'Бесплатно', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800', True),
        ('Гастрономический тур', 'Знакомство с местной кухней и лучшими ресторанами', '5-6 часов', '4.8 км', 'Легкий', '🍽️', 4.8, 645, 'от 2000 ₽', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800', True)
    ]
    
    for route in routes_data:
        cur.execute(f"""
            INSERT INTO {schema}.routes (name, description, duration, distance, difficulty, emoji, rating, reviews, price, image, is_active)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT DO NOTHING
        """, route)
    
    categories_data = [
        ('Музеи', 'Building2', '🏛️', True),
        ('Парки', 'TreePine', '🌳', True),
        ('Рестораны', 'UtensilsCrossed', '🍽️', True),
        ('Развлечения', 'Sparkles', '✨', True)
    ]
    
    for cat in categories_data:
        cur.execute(f"""
            INSERT INTO {schema}.categories (name, icon, emoji, is_active)
            VALUES (%s, %s, %s, %s)
            ON CONFLICT DO NOTHING
        """, cat)
    
    banners_data = [
        ('Добро пожаловать в Донецк', 'Откройте для себя историю и культуру города', 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200', 1, True),
        ('Культурные события', 'Не пропустите интересные мероприятия', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200', 2, True)
    ]
    
    for banner in banners_data:
        cur.execute(f"""
            INSERT INTO {schema}.banners (title, subtitle, image_url, position, is_active)
            VALUES (%s, %s, %s, %s, %s)
            ON CONFLICT DO NOTHING
        """, banner)
    
    news_data = [
        ('Открытие новой выставки в художественном музее', 'С 15 февраля в музее начнет работу выставка импрессионистов', 'Донецкий художественный музей представляет новую выставку произведений французских импрессионистов. Экспозиция включает более 50 работ из частных коллекций.', 'Культура', 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=800', '2026-02-01', True),
        ('Фестиваль света пройдет на площади Ленина', 'Грандиозное световое шоу состоится 1 февраля', 'На площади Ленина пройдет фестиваль света с проекциями на фасады зданий. Мероприятие начнется в 18:00 и продлится до 23:00.', 'События', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800', '2026-01-28', True),
        ('Реконструкция парка Форжа завершена', 'Парк открывается после масштабного обновления', 'Завершена реконструкция парка Форжа. Обновлены пешеходные дорожки, установлены новые скамейки и фонари, высажены деревья.', 'Город', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800', '2026-01-25', True)
    ]
    
    for news in news_data:
        cur.execute(f"""
            INSERT INTO {schema}.news (title, excerpt, content, category, image_url, published_date, is_active)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT DO NOTHING
        """, news)
    
    conn.commit()

def handler(event: dict, context) -> dict:
    """
    Одноразовая функция для установки правильного пароля администратора и загрузки данных.
    POST / - обновляет пароль администратора на admin2024 и загружает начальные данные
    """
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    try:
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        
        schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
        password_hash = hash_password('admin2024')
        
        cur.execute(
            f"UPDATE {schema}.admins SET password_hash = %s WHERE username = 'admin'",
            (password_hash,)
        )
        conn.commit()
        
        seed_data(cur, conn)
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': True,
                'message': 'Admin password set and data seeded successfully',
                'credentials': {
                    'username': 'admin',
                    'password': 'admin2024'
                }
            })
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