class Person:
    def __init__(self, first_name, age, last_name = ""):
        self.first_name = first_name
        self.age = age
        self.last_name = last_name

        pass

    def is_18(self):
        if self.age >= 18:
            return True
        else:
            return False
        
class Family(Person):
    def __init__(self, first_name, age, last_name):
        super().__init__(first_name, age, last_name)
        self.members = []

    def born(self, first_name, age):
        self.first_name = first_name
        self.age = age
        
        new_person = Person(self.first_name, self.age, self.last_name)
        
        self.members.append(new_person)
        
    
    
        
    
    def check_majority(self, first_name):
        
        for person in self.members:
            if person.first_name == first_name:
                if self.is_18() == True:
                    print("You are over 18, your parents Jane and John accept that you will go out with your friends")
                    return
                else:
                    print("Sorry, you are not allowed to go out with your friends.")
                    return

            else:
                print(f'{first_name} not found in family members')
                return

    def family_presentation(self):
        print(f'We are {self.last_name.upper()} family')
        print("Here are members: ")
        for person in self.members:
            print(f'- Hi! I am {person.first_name}, my age is {person.age}')
            

family1 = Family("Beek", 60, "Van")
family1.born("Amelia", 2)
family1.born("Beak", 3)
family1.check_majority("Amelia")
family1.check_majority("cc")
family1.family_presentation()


