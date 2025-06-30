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
        
        if (choice := input("Please choose an option: ").upper()) == 'E':
            print("\nFinal Menu:")
            show_restaurant_menu()
            print("\nExiting program...")
            break
        
        handle_user_choice(choice)

def handle_user_choice(choice):
    options = {
        'V': view_item,
        'A': add_item_to_menu,
        'D': remove_item_from_menu,
        'U': update_item_from_menu,
        'S': show_restaurant_menu
    }
    if handler := options.get(choice):
        handler()
    else:
        print("Invalid choice, please try again.")

def view_item():
    name = input("Enter item name to view: ")
    item = MenuManager.get_by_name(name)
    if item:
        print(f"\nItem found: {item['item_name']}, Price: ${item['item_price']}")
    else:
        print("Item not found!")

def add_item_to_menu():
    name = input("Enter item name: ")
    while True:
        try:
            price = int(input("Enter item price: "))
            break
        except ValueError:
            print("Please enter a valid number for price")
    
    item = MenuItem(name, price)
    item.save()
    print(f"Item '{name}' added successfully!")

def remove_item_from_menu():
    name = input("Enter item name to delete: ")
    item = MenuItem(name, 0)  # Price doesn't matter for deletion
    item.delete()

def update_item_from_menu():
    old_name = input("Enter current item name: ")
    
    # Verify item exists first
    if not MenuManager.get_by_name(old_name):
        print(f"Item '{old_name}' not found!")
        return
    
    new_name = input("Enter new item name (leave blank to keep current): ").strip()
    new_price = input("Enter new price (leave blank to keep current): ").strip()
    
    item = MenuItem(old_name, 0)  # Temp price for initialization
    
    try:
        if new_name and new_price:
            item.update(new_name, int(new_price))
            print(f"Item updated to '{new_name}' with price ${new_price}")
        elif new_name:
            item.update(new_name=new_name)
            print(f"Item renamed to '{new_name}'")
        elif new_price:
            item.update(new_price=int(new_price))
            print(f"Item price updated to ${new_price}")
        else:
            print("No changes made.")
    except ValueError:
        print("Invalid price entered. Please use numbers only.")

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