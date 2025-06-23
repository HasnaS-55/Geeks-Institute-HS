class BankAccount:
    def __init__(self, username, password, initial_balance=0):
        self.balance = initial_balance
        self.username = username
        self.password = password
        self.authenticated = False
    
    def authenticate(self, username, password):
        if username == self.username and password == self.password:
            self.authenticated = True
        return self.authenticated
    
    def deposit(self, amount):
        if not self.authenticated:
            raise Exception("Not authenticated")
        if not isinstance(amount, (int, float)) or amount <= 0:
            raise Exception("Amount must be a positive number")
        self.balance += amount
        return self.balance
    
    def withdraw(self, amount):
        if not self.authenticated:
            raise Exception("Not authenticated")
        if not isinstance(amount, (int, float)) or amount <= 0:
            raise Exception("Amount must be a positive number")
        if amount > self.balance:
            raise Exception("Insufficient funds")
        self.balance -= amount
        return self.balance
    
    def __str__(self):
        return f"Account ({self.username}): Balance ${self.balance:.2f}"


class MinimumBalanceAccount(BankAccount):
    def __init__(self, username, password, initial_balance=0, minimum_balance=0):
        super().__init__(username, password, initial_balance)
        self.minimum_balance = minimum_balance
    
    def withdraw(self, amount):
        if not self.authenticated:
            raise Exception("Not authenticated")
        if not isinstance(amount, (int, float)) or amount <= 0:
            raise Exception("Amount must be a positive number")
        if self.balance - amount < self.minimum_balance:
            raise Exception(f"Cannot withdraw below minimum balance of {self.minimum_balance}")
        self.balance -= amount
        return self.balance


class ATM:
    def __init__(self, account_list, try_limit=2):
        if not all(isinstance(acc, (BankAccount, MinimumBalanceAccount)) for acc in account_list):
            raise Exception("account_list must contain only BankAccount instances")
        if not isinstance(try_limit, int) or try_limit <= 0:
            try_limit = 2
        self.account_list = account_list
        self.try_limit = try_limit
        self.current_tries = 0
        self.show_main_menu()
    
    def show_main_menu(self):
        while True:
            print("\nATM Main Menu")
            print("1. Log in")
            print("2. Exit")
            choice = input("Select an option: ")
            
            if choice == "1":
                username = input("Enter username: ")
                password = input("Enter password: ")
                self.log_in(username, password)
            elif choice == "2":
                print("Goodbye!")
                exit()
            else:
                print("Invalid choice")
    
    def log_in(self, username, password):
        while self.current_tries < self.try_limit:
            for account in self.account_list:
                if account.authenticate(username, password):
                    self.current_tries = 0
                    self.show_account_menu(account)
                    return
            
            self.current_tries += 1
            if self.current_tries < self.try_limit:
                print(f"Invalid credentials. {self.try_limit - self.current_tries} attempts remaining.")
                username = input("Enter username: ")
                password = input("Enter password: ")
        
        print("Maximum login attempts reached. Shutting down.")
        exit()
    
    def show_account_menu(self, account):
        while True:
            print(f"\nAccount Menu - {account.username}")
            print("1. Deposit")
            print("2. Withdraw")
            print("3. Exit")
            choice = input("Select an option: ")
            
            try:
                if choice == "1":
                    amount = float(input("Enter deposit amount: "))
                    account.deposit(amount)
                    print(f"New balance: {account.balance:.2f}")
                elif choice == "2":
                    amount = float(input("Enter withdrawal amount: "))
                    account.withdraw(amount)
                    print(f"New balance: {account.balance:.2f}")
                elif choice == "3":
                    return
                else:
                    print("Invalid choice")
            except Exception as e:
                print(f"Error: {e}")



if __name__ == "__main__":
    
    regular_account = BankAccount("john", "1234", 1000)
    min_balance_account = MinimumBalanceAccount("jane", "5678", 1500, 500)
    
    
    atm = ATM([regular_account, min_balance_account], 3)