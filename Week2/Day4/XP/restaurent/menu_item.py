import psycopg2
from dotenv import load_dotenv
import os

# Load environment variables FIRST
load_dotenv()

# DB Configuration
db_config = {
    'host': os.getenv('DB_HOST'),
    'port': os.getenv('DB_PORT'),
    'database': os.getenv('DB_NAME'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD')
}

class MenuItem:
    def __init__(self, name, price):
        self.name = name
        self.price = price
    
    def _get_connection(self):
        
        return psycopg2.connect(**db_config)
    
    def save(self):
        try:
            with self._get_connection() as connection:
                with connection.cursor() as cursor:
                    query = """
                        INSERT INTO Menu_Items (item_name, item_price) 
                        VALUES (%s, %s) 
                        RETURNING item_id
                    """
                    cursor.execute(query, (self.name, self.price))
                    self.id = cursor.fetchone()[0]
                    connection.commit()
                    print(f"Item {self.name} saved successfully!")
        except Exception as e:
            print(f"Error saving item: {e}")
    
    def delete(self):
        try:
            with self._get_connection() as connection:
                with connection.cursor() as cursor:
                    query = "DELETE FROM Menu_Items WHERE item_name = %s"
                    cursor.execute(query, (self.name,))
                    if cursor.rowcount == 0:
                        print("No item found with that name!")
                    else:
                        connection.commit()
                        print(f"Item {self.name} deleted successfully!")
        except Exception as e:
            print(f"Error deleting item: {e}")
    
    def update(self, new_name=None, new_price=None):
        try:
            with self._get_connection() as connection:
                with connection.cursor() as cursor:
                    if new_name and new_price:
                        query = """
                            UPDATE Menu_Items 
                            SET item_name = %s, item_price = %s 
                            WHERE item_name = %s
                        """
                        cursor.execute(query, (new_name, new_price, self.name))
                    elif new_name:
                        query = "UPDATE Menu_Items SET item_name = %s WHERE item_name = %s"
                        cursor.execute(query, (new_name, self.name))
                    elif new_price:
                        query = "UPDATE Menu_Items SET item_price = %s WHERE item_name = %s"
                        cursor.execute(query, (new_price, self.name))
                    
                    if cursor.rowcount == 0:
                        print("No item found with that name!")
                    else:
                        connection.commit()
                        print("Item updated successfully!")
        except Exception as e:
            print(f"Error updating item: {e}")