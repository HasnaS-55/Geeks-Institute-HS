import math
import turtle 

class Circle():
    def __init__(self, radius = None, diameter = None):
        if radius is not None:
            self.radius = radius
        elif diameter is not None:
            self.radius = diameter / 2
        self.diameter = diameter

    
        
    
        
    
    def area_compute(self):
        return f'The area is {math.pi * self.radius ** 2 : .2f}cm2'
        
        

    def __add__(self, other):
        new_radius = self.radius + other.radius

        
        return Circle(new_radius)
        
        
        

    
    def __gt__(self, other):
        
        return self.radius > other.radius
    
    def __eq__(self, other):
        
        return self.radius == other.radius
    

    
    
    

    

c1 = Circle(radius=5)
c2 = Circle(diameter=14)  

c1.area_compute()
c2.area_compute()


print("c1 = c2", c1 == c2) 

# Addition
c3 = c1 + c2
print(f'c1 + c2 = Circle: radius {c3.radius}, area {c3.area_compute()}')

print("c1 > c2", c1 > c2)



sorted_circles = sorted([c1, c2])

for circle in sorted_circles:
    print(f'Circle with radius: {circle.radius}')








        