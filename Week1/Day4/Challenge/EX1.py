import math


class Pagination:
    def __init__(self, items = None, page_size = 10):
        self.items = [] if items is None else items
        self.page_size = page_size
        self.current_idx = 0
        self.total_page = math.ceil(len(self.items) / self.page_size)

    def get_visible_items(self, current_page):
        self.current_page = current_page
        idx_start = self.current_page * self.page_size - self.page_size
        idx_fin = idx_start + self.page_size
        
        
        
        
        return print(f'Content of page {self.current_page} is {self.items[idx_start: idx_fin]}')
    
    def go_to_page(self, page_num):
        self.page_num = page_num
        if page_num not in range(0, self.total_page):
            raise ValueError (f'There is no page {self.page_num} ')
            
        else:
            self.get_visible_items(self.page_num)

    def first_page(self):
        return self.get_visible_items(1)
    
    def last_page(self):
        return self.get_visible_items(self.total_page)
    
    def next_page(self):
        self.current_page += 1
        return self.get_visible_items(self.current_page)

    
    def previous_page(self):
        self.current_page -= 1
        return self.get_visible_items(self.current_page)
    
    def __str__(self):
        current_page = self.current_page
        idx_start = current_page * self.page_size - self.page_size
        idx_fin = idx_start + self.page_size
        string = ""

        for i in self.items[idx_start: idx_fin]:
            string += f'\n{i}'

        return print(string)
        
        

        


        
    
book1 = Pagination(list( "ABCDEFGHIJKLMNOPQRSTUVWXY"), 2)
book1.get_visible_items(2)
book1.first_page()
book1.last_page()
book1.previous_page()
book1.next_page()
book1.get_visible_items(2)
book1.__str__()
book1.next_page()
book1.__str__()





       
        