class Dog:
    def __init__(self, name, age, weight):
        self.name = name
        self.age = age
        self.weight = weight
        

    def bark(self):
        return f'{self.name} is barking'
        

    def run_speed(self):
        return int(self.weight / self.age *10)

    def fight(self, other_dog):
        if self.run_speed() * self.weight > other_dog.run_speed() * other_dog.weight:
            return f'{self.name} wons the fight with {other_dog.name}'
        else:
            return f'{other_dog.name} wons the fight with {self.name}'

# Step 2: Create dog instances
#... your code here
dog1 = Dog("Rick", 5, 15)
dog2 = Dog("Moli", 4, 14)
# Step 3: Test dog methods
print(dog1.bark())
print(dog2.run_speed())
print(dog1.fight(dog2))