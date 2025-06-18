a = input("Enter 1st number ")
b = input("Enter 2nd number ")
c = input("Enter 3th number ")

if a > b and a > c :
    print(f'The greatest number is {a}')
elif b > a and b > c :
    print(f'The greatest number is {b}')
else:
    print(f'The greatest number is {c}')