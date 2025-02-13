from backend.models.basemodel import BaseModel
from backend.models.product import Product
from backend.models.user import User

class Review(BaseModel):
    def __init__(self, text, rating, user_id, product_id):
        super().__init__()
        self.text = text
        self.rating = rating
        self.user_id = user_id
        self.product_id = product_id
        
    def validate(self):
        if not self.text:
            raise ValueError("Review text is required.")
        if not (1 <= self.rating <= 5):
            raise ValueError("Rating must be between 1 and 5.")
        if not isinstance(self.product, Product):
            raise ValueError("Product must be a valid Product instance.")
        if not isinstance(self.user, User):
            raise ValueError("User must be a valid User instance.")

        