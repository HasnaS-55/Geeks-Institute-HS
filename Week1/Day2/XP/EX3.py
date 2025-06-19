brand = {
    "name": "Zara",
    "creation_date": 1975,
    "creator_name": "Amancio Ortega Gaona",
    "type_of_clothes": ["men", "women", "children", "home"],
    "international_competitors": ["Gap", "H&M", "Benetton"],
    "number_stores": 7000,
    "major_color": {
        "France": "blue", 
        "Spain": "red", 
        "US": ["pink", "green"]
    }
}
brand["number_stores"] = 2
print(f'Client type of Zara are {brand["type_of_clothes"]}')
brand["country_creation"] = "spain"
for x, y in brand.items():
    if x == "internationel_competitors":
        brand["international_competitors"].append("Desigual")

del brand["creation_date"]
print(brand["international_competitors"][-1])
print(brand["major_color"]["US"])


print(len(brand))
print(brand.keys())


more_on_zara = {
    "creation_date": 1990,
    "number_stores": 154
}

brand.update(more_on_zara)
print(brand)