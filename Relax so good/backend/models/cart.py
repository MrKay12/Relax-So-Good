from backend.models.basemodel import BaseModel
from backend.models.product import Product

class Cart:
    def __init__(self):
        self.items = []

    def add_item(self, item):
        self.items.append(item)

    def remove_item(self, item_name):
        self.items = [item for item in self.items if item['name'] != item_name]

    def get_total_price(self):
        return sum(item['price'] for item in self.items)

    def get_items(self):
        return self.items

# Example usage:
#cart = Cart()
#cart.add_item({'name': 'Apple', 'price': 1.00})
#cart.add_item({'name': 'Banana', 'price': 0.50})
#print(cart.get_items())  # [{'name': 'Apple', 'price': 1.00}, {'name': 'Banana', 'price': 0.50}]
#print(cart.get_total_price())  # 1.50
#cart.remove_item('Apple')
#print(cart.get_items())  # [{'name': 'Banana', 'price': 0.50}]
#print(cart.get_total_price())  # 0.50

