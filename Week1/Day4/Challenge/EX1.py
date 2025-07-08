import math

class Pagination:
    def __init__(self, items=None, page_size=10):
        self.items = [] if items is None else items
        self.page_size = page_size
        self.current_page = 1  
        self.total_pages = max(1, math.ceil(len(self.items) / self.page_size))
    
    def get_visible_items(self):
        start_idx = (self.current_page - 1) * self.page_size
        end_idx = start_idx + self.page_size
        return self.items[start_idx:end_idx]
    
    def go_to_page(self, page_num):
        if not 1 <= page_num <= self.total_pages:
            raise ValueError(f'Invalid page number: {page_num}. Must be between 1 and {self.total_pages}')
        self.current_page = page_num
        return self
    
    def first_page(self):
        self.current_page = 1
        return self
    
    def last_page(self):
        self.current_page = self.total_pages
        return self
    
    def next_page(self):
        if self.current_page < self.total_pages:
            self.current_page += 1
        return self
    
    def previous_page(self):
        if self.current_page > 1:
            self.current_page -= 1
        return self
    
    def __str__(self):
        return '\n'.join(str(item) for item in self.get_visible_items())



alphabetList = list("abcdefghijklmnopqrstuvwxyz")
p = Pagination(alphabetList, 4)

print(p.get_visible_items())  

p.next_page()
print(p.get_visible_items())  

p.last_page()
print(p.get_visible_items())  

p.go_to_page(6)  
print(p.current_page)  

try:
    p.go_to_page(0)  
except ValueError as e:
    print(e)  

print(str(p))  