print("All numbers from 1 to 20:")
for num in range(1, 21):
    print(num, end="")


print("\nNumbers at even indixes:")
numbers = list(range(1, 21))  
for index, nu in enumerate(numbers):
    if index % 2 == 0:  
        print(nu, end=' ')
  