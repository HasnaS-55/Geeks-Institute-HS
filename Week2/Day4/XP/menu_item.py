import psycopg2

class MenuItem:
    def __init__(self, name, price):
        self.name = name
        self.price = price
    
    def save(self):
        try:
            connection = psycopg2.connect(
                host="localhost",
                database="restaurant_menu",
                user="postgres",
                password="your_password"
            )
            cursor = connection.cursor()
            
            query = "INSERT INTO Menu_Items (item_name, item_price) VALUES (%s, %s) RETURNING item_id"
            cursor.execute(query, (self.name, self.price))
            self.id = cursor.fetchone()[0]
            
            connection.commit()
            print(f"Item {self.name} saved successfully!")
            
        except (Exception, psycopg2.Error) as error:
            print("Error while saving item:", error)
        finally:
            if connection:
                cursor.close()
                connection.close()
    
    def delete(self):
        try:
            connection = psycopg2.connect(
                host="localhost",
                database="restaurant_menu",
                user="postgres",
                password="your_password"
            )
            cursor = connection.cursor()
            
            query = "DELETE FROM Menu_Items WHERE item_name = %s"
            cursor.execute(query, (self.name,))
            
            if cursor.rowcount == 0:
                print("No item found with that name!")
            else:
                connection.commit()
                print(f"Item {self.name} deleted successfully!")
                
        except (Exception, psycopg2.Error) as error:
            print("Error while deleting item:", error)
        finally:
            if connection:
                cursor.close()
                connection.close()
    
    def update(self, new_name=None, new_price=None):
        try:
            connection = psycopg2.connect(
                host="localhost",
                database="restaurant_menu",
                user="postgres",
                password="your_password"
            )
            cursor = connection.cursor()
            
            if new_name and new_price:
                query = "UPDATE Menu_Items SET item_name = %s, item_price = %s WHERE item_name = %s"
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
                print(f"Item updated successfully!")
                
        except (Exception, psycopg2.Error) as error:
            print("Error while updating item:", error)
        finally:
            if connection:
                cursor.close()
                connection.close()