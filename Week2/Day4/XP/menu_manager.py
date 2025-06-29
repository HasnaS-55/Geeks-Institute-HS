import psycopg2

class MenuManager:
    @classmethod
    def get_by_name(cls, name):
        try:
            connection = psycopg2.connect(
                host="localhost",
                database="restaurant_menu",
                user="postgres",
                password="your_password"
            )
            cursor = connection.cursor()
            
            query = "SELECT * FROM Menu_Items WHERE item_name = %s"
            cursor.execute(query, (name,))
            result = cursor.fetchone()
            
            if result:
                return {'item_id': result[0], 'item_name': result[1], 'item_price': result[2]}
            return None
            
        except (Exception, psycopg2.Error) as error:
            print("Error while fetching item:", error)
        finally:
            if connection:
                cursor.close()
                connection.close()
    
    @classmethod
    def all_items(cls):
        try:
            connection = psycopg2.connect(
                host="localhost",
                database="restaurant_menu",
                user="postgres",
                password="your_password"
            )
            cursor = connection.cursor()
            
            query = "SELECT * FROM Menu_Items"
            cursor.execute(query)
            results = cursor.fetchall()
            
            items = []
            for result in results:
                items.append({'item_id': result[0], 'item_name': result[1], 'item_price': result[2]})
            return items
            
        except (Exception, psycopg2.Error) as error:
            print("Error while fetching all items:", error)
        finally:
            if connection:
                cursor.close()
                connection.close()