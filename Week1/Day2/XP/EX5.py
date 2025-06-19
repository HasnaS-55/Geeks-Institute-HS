import random

def number(num):
    
    if not 1 <= num <= 100:
        print("Enter a number between 1-100")
        return

    ran_num = random.randint(1, 100)
    if num == ran_num:
        print("Success!")
    else:
        print(f'Fail! Your number: {num} and random number: {ran_num}')



number(5)
    
