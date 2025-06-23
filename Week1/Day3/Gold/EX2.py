import random

class MyList:
    def __init__(self, letters):
        self.letters = letters
    
    def reverse_list(self):
        return self.letters[::-1]
    
    def sort_list(self):
        return sorted(self.letters)
    
    def generate_random_list(self):
        return [random.randint(0, 100) for _ in range(len(self.letters))]


my_list = MyList(['c', 'a', 'b', 'e', 'd'])
print("Original:", my_list.letters)
print("Reversed:", my_list.reverse_list())
print("Sorted:", my_list.sort_list())
print("Random numbers:", my_list.generate_random_list())