import random
def get_random_temp():
    return random.uniform(-10, 40)

def main():
    temperature = get_random_temp()
    print(f'The temperature right now is {temperature} Celsius')
    if temperature < 0:
        print("Brrr, that’s freezing! Wear some extra layers today.")
    elif 0 <= temperature < 16:
        print("Quite chilly! Don’t forget your coat.")
    elif 16 <= temperature < 24:
        print("Nice weather.")
    elif 24 <= temperature < 32:
        print("A bit warm, stay hydrated.")
    else:
        print("It’s really hot! Stay cool.")




