pizza_topping = []
while True:
    client = input("What topping you want on you pizza? (type 'quit' to stop) ")
    if client == "quit":
        break
    pizza_topping.append(client)
    print(f'You added {client} as your pizza topping')

print(f'You want {pizza_topping} as your pizza topping')


base_price = 10
total = base_price + len(pizza_topping) * 2.5
print(f" Your total is {total}$")
    


