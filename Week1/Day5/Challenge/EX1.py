import math
import turtle 

class Circle():
    def __init__(self, radius = None, diameter = None):
        self.radius = radius
        self.diameter = diameter

    
        
    
        
    
    def area_compute(self):
        if self.radius != None:
            return print(f'The area is {math.pi * self.radius ** 2}cm2')
        elif self.diameter != None:
            return print(f'The area is {1/4 * math.pi * self.diameter ** 2}cm2')
        
    def __str__(self):
        if self.radius == None:
            print(f'Cirsle diameter is {self.diameter}cm')
        elif self.diameter == None:
            print(f'Cirsle radius is {self.radius}cm') 
        else:
            print(f'Cirsle diameter is {self.diameter}cm and radius is {self.radius}cm')

    def __add__(self, other):
        
        new_radius = self.radius + other.radius
        return Circle(radius = new_radius)

    
    def __gt__(self, other):
        
        return self.radius > other.radius
    
    def __eq__(self, other):
        
        return self.radius == other.radius
    
    
    

    

c1 = Circle(radius=5)
c2 = Circle(diameter=14)  # radius=7

c1.area_compute()


print(c1 == c2) 

# Addition
c3 = c1 + c2
print(c3)



circles = [Circle(radius=10), Circle(radius=5), Circle(radius=7)]
sorted_circles = sorted(circles)  
print(sorted_circles)








        