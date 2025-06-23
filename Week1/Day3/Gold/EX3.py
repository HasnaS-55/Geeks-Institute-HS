class MenuManager:
    def __init__(self):
        self.menu = [
            {"name": "Soup", "price": 10, "spice": "B", "gluten": False},
            {"name": "Hamburger", "price": 15, "spice": "A", "gluten": True},
            {"name": "Salad", "price": 18, "spice": "A", "gluten": False},
            {"name": "French Fries", "price": 5, "spice": "C", "gluten": False},
            {"name": "Beef bourguignon", "price": 25, "spice": "B", "gluten": True}
        ]
    
    def add_item(self, name, price, spice, gluten):
        new_item = {
            "name": name,
            "price": price,
            "spice": spice.upper(),
            "gluten": gluten
        }
        self.menu.append(new_item)
        print(f"{name} has been added to the menu.")
    
    def update_item(self, name, price, spice, gluten):
        for item in self.menu:
            if item["name"].lower() == name.lower():
                item.update({
                    "price": price,
                    "spice": spice.upper(),
                    "gluten": gluten
                })
                print(f"{name} has been updated.")
                return
        print(f"{name} is not in the menu.")
    
    def remove_item(self, name):
        for i, item in enumerate(self.menu):
            if item["name"].lower() == name.lower():
                del self.menu[i]
                print(f"{name} has been removed from the menu.")
                print("Updated menu:", self.menu)
                return
        print(f"{name} is not in the menu.")
    
    def show_menu(self):
        print("\nCurrent Menu:")
        print("-" * 30)
        for item in self.menu:
            spice_meaning = {
                "A": "Not spicy",
                "B": "A little spicy",
                "C": "Very spicy"
            }
            print(f"{item['name']:20} ${item['price']:<5} {spice_meaning[item['spice']]:<15} {'Gluten' if item['gluten'] else 'No gluten'}")

if __name__ == "__main__":
    manager = MenuManager()
    manager.show_menu()
    
   
    manager.add_item("Pasta", 12, "A", True)
    
    
    manager.update_item("Salad", 20, "B", False)
    
   
    manager.remove_item("French Fries")
    
    
    manager.remove_item("Pizza")
    
    manager.show_menu()