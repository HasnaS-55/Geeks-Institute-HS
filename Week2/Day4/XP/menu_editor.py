from menu_item import MenuItem
from menu_manager import MenuManager

def show_user_menu():
    while True:
        print("\n==== Restaurant Menu Manager ====")
        print("V - View an Item")
        print("A - Add an Item")
        print("D - Delete an Item")
        print("U - Update an Item")
        print("S - Show the Menu")
        print("E - Exit")
        
        choice = input("Please choose an option: ").upper()
        
        if choice == 'V':
            name = input("Enter item name to view: ")
            item = MenuManager.get_by_name(name)
            if item:
                print(f"\nItem found: {item['item_name']}, Price: ${item['item_price']}")
            else:
                print("Item not found!")
        elif choice == 'A':
            add_item_to_menu()
        elif choice == 'D':
            remove_item_from_menu()
        elif choice == 'U':
            update_item_from_menu()
        elif choice == 'S':
            show_restaurant_menu()
        elif choice == 'E':
            print("\nFinal Menu:")
            show_restaurant_menu()
            print("\nExiting program...")
            break
        else:
            print("Invalid choice, please try again.")

def add_item_to_menu():
    name = input("Enter item name: ")
    price = int(input("Enter item price: "))
    item = MenuItem(name, price)
    item.save()

def remove_item_from_menu():
    name = input("Enter item name to delete: ")
    item = MenuItem(name, 0)  
    item.delete()

def update_item_from_menu():
    old_name = input("Enter current item name: ")
    new_name = input("Enter new item name (leave blank to keep current): ")
    new_price = input("Enter new price (leave blank to keep current): ")
    
    new_price = int(new_price) if new_price else None
    item = MenuItem(old_name, 0)  
    
    if new_name and new_price:
        item.update(new_name, new_price)
    elif new_name:
        item.update(new_name=new_name)
    elif new_price:
        item.update(new_price=new_price)
    else:
        print("No changes specified!")

def show_restaurant_menu():
    items = MenuManager.all_items()
    if not items:
        print("\nThe menu is currently empty!")
    else:
        print("\n==== Restaurant Menu ====")
        for item in items:
            print(f"{item['item_name']}: ${item['item_price']}")

if __name__ == "__main__":
    show_user_menu()