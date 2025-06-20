class Dog():
     def __init__(self, name, height):
          self.name = name
          self.height = height

     def bark(self):
          print("Goes woof!")


     def jump(self):
          print(f'{self.name} jump {self.height * 2}cm height')

     
    
davids_dog = Dog("Kooki", 50)
sarahs_dog = Dog("Moly", 90)
print(f'Dog {davids_dog.name} jumps {davids_dog.height}cm') 
print(f'Dog {sarahs_dog.name} jumps {sarahs_dog.height}cm') 

davids_dog.bark()
davids_dog.jump()
sarahs_dog.bark()
sarahs_dog.jump()

def compare(dog1, dog2):
     big_dog = dog1.height
     if dog2.height > dog1.height:
          big_dog = dog2.height
          print(big_dog)
          
     
     
print("\n----------------")
compare(davids_dog, sarahs_dog)






     
    

    
     


          