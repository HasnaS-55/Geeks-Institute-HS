from game import Game

def get_user_menu_choice():
    while True:
        choice = input("\nMenu:\n(g) Play a new game\n(s) Show scores\n(q) Quit\n").lower()
        if choice in ['g', 's', 'q']:
            return choice
        print("Invalid input. Please try again.")

def print_results(results):
    print("\nGame Results:")
    print(f"Wins: {results['win']}")
    print(f"Losses: {results['loss']}")
    print(f"Draws: {results['draw']}")
    print("\nThank you for playing!")

def main():
    results = {'win': 0, 'loss': 0, 'draw': 0}
    
    while True:
        choice = get_user_menu_choice()
        
        if choice == 'g':
            game = Game()
            result = game.play()
            results[result] += 1
        elif choice == 's':
            print_results(results)
        elif choice == 'q':
            print_results(results)
            break

if __name__ == "__main__":
    main()