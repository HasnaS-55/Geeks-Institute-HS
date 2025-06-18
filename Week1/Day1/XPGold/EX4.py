names = ['Samus', 'Cortana', 'V', 'Link', 'Mario', 'Cortana', 'Samus']


user_name = input("Enter your name: ").capitalize()

for name in names:
    
    if name == user_name:
        print(f"The first occurrence of {user_name} is at index {names.index(name)}")
        break
    


    
    
    

