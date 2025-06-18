sandwich_orders = ["Tuna sandwich", "Pastrami sandwich", "Avocado sandwich", "Pastrami sandwich", "Egg sandwich", "Chicken sandwich", "Pastrami sandwich"]
x = 0
while x <= len(sandwich_orders):
    
    if sandwich_orders[x] == "Pastrami sandwich":
        sandwich_orders.pop(x)
    x += 1

print(sandwich_orders)