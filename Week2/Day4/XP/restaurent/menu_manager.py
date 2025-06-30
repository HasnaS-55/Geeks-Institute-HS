import psycopg2
from dotenv import load_dotenv
import os

load_dotenv()

db_config = {
    'host': os.getenv('DB_HOST'),
    'port': os.getenv('DB_PORT'),
    'database': os.getenv('DB_NAME'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD')
}

class MenuManager:
    @classmethod
    def _get_connection(cls):
        
        return psycopg2.connect(**db_config)
    
    @classmethod
    def get_by_name(cls, name):
        try:
            with cls._get_connection() as connection:
                with connection.cursor() as cursor:
                    query = "SELECT * FROM Menu_Items WHERE item_name = %s"
                    cursor.execute(query, (name,))
                    result = cursor.fetchone()
                    return {
                        'item_id': result[0],
                        'item_name': result[1],
                        'item_price': result[2]
                    } if result else None
        except Exception as e:
            print(f"Error fetching item: {e}")
            return None
    
    @classmethod
    def all_items(cls):
        try:
            with cls._get_connection() as connection:
                with connection.cursor() as cursor:
                    cursor.execute("SELECT * FROM Menu_Items")
                    return [{
                        'item_id': row[0],
                        'item_name': row[1],
                        'item_price': row[2]
                    } for row in cursor.fetchall()]
        except Exception as e:
            print(f"Error fetching all items: {e}")
            return []