class Zoo:
    def __init__(self, zoo_name):
        self.zoo_name = zoo_name
        self.animals = []  
        
    def add_animal(self, new_animal):
        if new_animal not in self.animals:  
            self.animals.append(new_animal)
            print(f"Added {new_animal} to {self.zoo_name}!")
        else:
            print(f"{new_animal} already exists in the zoo.")

    def get_animals(self):
        print(f"\nAnimals in {self.zoo_name}:")
        for animal in self.animals:
            print(f"- {animal}")

    def sell_animal(self, animal_sold):
        if animal_sold in self.animals:  
            self.animals.remove(animal_sold)
            print(f"Sold {animal_sold}!")
        else:
            print(f"{animal_sold} is not in our zoo.")

    def sort_animals(self):
        sorted_animals = sorted(self.animals)
        groups = {}
        
        for animal in sorted_animals:
            first_letter = animal[0].upper()
            if first_letter not in groups:
                groups[first_letter] = []
            groups[first_letter].append(animal)
        
        return groups
        
    def get_groups(self):
        print("\nAnimal Groups:")
        groups = self.sort_animals()
        for letter, animals in groups.items():
            print(f"{letter}: {animals}")


my_zoo = Zoo("Wild Kingdom") 


my_zoo.add_animal("Lion")
my_zoo.add_animal("Tiger")
my_zoo.add_animal("Bear")
my_zoo.add_animal("Lion")  


my_zoo.get_animals()
my_zoo.sell_animal("Tiger")
my_zoo.sell_animal("Elephant")  
my_zoo.get_groups()