user_word = input("Entrer a word : ")

result = ""

for char in user_word:
    if len(result) == 0 or char != result[-1]:
        result += char

print(result)