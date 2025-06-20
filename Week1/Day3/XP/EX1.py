class Cat():
    def __init__(self, cat_name, cat_age):
        self.name = cat_name
        self.age = cat_age

# Step 1: Create cat objects
# cat1 = create the object
cat1 = Cat("Mimi", 2)
cat2 = Cat("Piki", 1)
cat3 = Cat("Or", 4)

# Step 2: Create a function to find the oldest cat
def find_oldest_cat(cat1, cat2, cat3):
    # ... code to find and return the oldest cat ...
    older_cat = cat1.age
    if cat2.age > older_cat:
        older_cat = cat2.age
    elif cat3.age > older_cat:
        older_cat = cat3.age
    return older_cat


# Step 3: Print the oldest cat's details
older_cat_result = find_oldest_cat(cat1, cat2, cat3)
print(older_cat_result)