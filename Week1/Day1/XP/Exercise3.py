
try_num = 3
while try_num >= 0:
    name = input("Try to guess my  first name ")
    if name == "Hasna":
        print("Yeeh you guess it!")
        break
    elif try_num == 0:
        print("Number of trying finished try next time")
        break
    else:
        print("OOOh try again")
        try_num -=1
    
