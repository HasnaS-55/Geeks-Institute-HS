import math

class Circle:
    def __init__(self, radius=1.0):
        self.radius = radius
    
    def perimeter(self):
        return 2 * math.pi * self.radius
    
    def area(self):
        return math.pi * self.radius ** 2
    
    def definition(self):
        print(f"A circle is a round shape where all points are {self.radius} units from the center.")


circle = Circle(5)
print(f"Perimeter: {circle.perimeter():.2f}")
print(f"Area: {circle.area():.2f}")
circle.definition()