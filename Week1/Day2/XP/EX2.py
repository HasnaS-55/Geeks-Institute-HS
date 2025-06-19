
     

family = {"rick": 43, 'beth': 13, 'morty': 5, 'summer': 8}
while True:
     name = input("Enetr your name: (if you want to stop enter 'quit') ")
     if name == "quit":
          break
     age = int(input("Enter your age: "))
     family[name] = age
     
     


price = []
for key, value in family.items():
        if value < 3:
            price.append(0)
            print(f'{key}, you could go')
            
        elif value >= 3 and value <= 12:
            price.append(10)
            print(f'{key}, Ticket price is 10')
        else:
            price.append(15)
            print(f'{key}, Ticket price is 15')


print(f'Your total for tickets is {sum(price)}')




     
    

    