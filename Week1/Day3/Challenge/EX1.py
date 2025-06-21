class Farm():
    def __init__(self, farm_name):
        self.farm_name = farm_name
        self.name = []
        self.animals = {}

    def add_animal(self, animal_type, count = 1):
        
        if animal_type not in self.animals.keys():
            self.animals[animal_type] = count
        else:
            self.animals[animal_type] += count
        return self.animals
    
    
    def get_info(self):
        print(f'Farm {self.farm_name}')
        for animal, count in self.animals.items():
            print(f'{animal}: {count}')

        print("\n E-I-E-I-O!")

    def get_animal_types(self):
        
        animals_list = sorted(self.animals)
        return animals_list
    
    def get_short_info(self):
        


        animals_sorted = self.get_animal_types()
        new = []
        for y in animals_sorted:
            if self.animals[y] > 1:
                new.append(y + "s")
            elif self.animals[y] == 1:
                new.append(y)
            

        animal = ""
        if len(new) == 1:
             animal = new[0]
        elif len(new) >= 2:
             animal = ", ".join(new[::1])

        print(f'{self.farm_name} farm has {animal}' )

    



macdonald = Farm("McDonald")
macdonald.add_animal('cow', 5)
macdonald.add_animal('sheep')
macdonald.add_animal('sheep')
macdonald.add_animal('goat', 12)
print(macdonald.get_info()) 
print(macdonald.get_animal_types())
print("--------------")

print(macdonald.get_short_info())
        


