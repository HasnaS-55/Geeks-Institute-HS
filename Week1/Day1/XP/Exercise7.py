basket = ["Banana", "Apples", "Oranges", "Blueberries"]
basket.pop(0)

basket.remove("Blueberries")

basket.append("Kiwi")

basket.insert(0, "Apples")

print(f"Apples count is {basket.count("Apples")}")

basket.clear()
print(basket)