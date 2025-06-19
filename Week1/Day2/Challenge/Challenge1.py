word = input("Enter a word: ")

dict_word = {}
for index, letter in enumerate(word):
    if letter not in dict_word:
        dict_word[letter]= []
    dict_word[letter].append(index)

print(dict_word)