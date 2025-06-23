class Phone:
    def __init__(self, phone_number):
        self.phone_number = phone_number
        self.call_history = []
        self.messages = []
    
    def call(self, other_phone):
        call_string = f"{self.phone_number} called {other_phone.phone_number}"
        print(call_string)
        self.call_history.append(call_string)
        other_phone.call_history.append(f"Incoming call from {self.phone_number}")
    
    def show_call_history(self):
        print(f"\nCall history for {self.phone_number}:")
        for i, call in enumerate(self.call_history, 1):
            print(f"{i}. {call}")
    
    def send_message(self, other_phone, content):
        message = {
            'to': other_phone.phone_number,
            'from': self.phone_number,
            'content': content
        }
        self.messages.append({'direction': 'outgoing', **message})
        other_phone.messages.append({'direction': 'incoming', **message})
        print(f"\nMessage sent from {self.phone_number} to {other_phone.phone_number}")
    
    def show_outgoing_messages(self):
        print(f"\nOutgoing messages from {self.phone_number}:")
        for i, msg in enumerate([m for m in self.messages if m['direction'] == 'outgoing'], 1):
            print(f"{i}. To: {msg['to']}\n   Content: {msg['content']}")
    
    def show_incoming_messages(self):
        print(f"\nIncoming messages to {self.phone_number}:")
        for i, msg in enumerate([m for m in self.messages if m['direction'] == 'incoming'], 1):
            print(f"{i}. From: {msg['from']}\n   Content: {msg['content']}")
    
    def show_messages_from(self, number):
        print(f"\nMessages from {number} to {self.phone_number}:")
        messages = [m for m in self.messages 
                   if m['direction'] == 'incoming' and m['from'] == number]
        for i, msg in enumerate(messages, 1):
            print(f"{i}. Content: {msg['content']}")


# Testing the code
if __name__ == "__main__":
    # Create phones
    phone1 = Phone("123-4567")
    phone2 = Phone("765-4321")
    phone3 = Phone("555-1234")

    # Test calls
    phone1.call(phone2)
    phone2.call(phone3)
    phone3.call(phone1)

    # Test messages
    phone1.send_message(phone2, "Hey, how are you?")
    phone2.send_message(phone1, "I'm good, thanks!")
    phone1.send_message(phone3, "Meeting at 3pm")
    phone3.send_message(phone1, "Got it, see you there")

    # Display histories
    phone1.show_call_history()
    phone2.show_call_history()
    phone3.show_call_history()

    # Display messages
    phone1.show_outgoing_messages()
    phone1.show_incoming_messages()
    phone1.show_messages_from("765-4321")
    phone1.show_messages_from("555-1234")