import re
from .basemodel import BaseModel
from flask_login import UserMixin

class User(UserMixin):
    def __init__(self, user_data):
        super().__init__()
        self.id = str(user_data.get('_id'))
        self.first_name = user_data.get('first_name')
        self.last_name = user_data.get('last_name')
        self.email = user_data.get('email')
        self.password = user_data.get('password')
        self.is_admin = user_data.get('is_admin', False)
        self.validate()

    def validate(self):
        """Validate user attributes"""
        if not (self.first_name and len(self.first_name) <= 50):
            raise ValueError("First name is required and must be less than or equal to 50 characters.")
        if not (self.last_name and len(self.last_name) <= 50):
            raise ValueError("Last name is required and must be less than or equal to 50 characters.")
        if not re.match(r"[^@]+@[^@]+\.[^@]+", self.email):
            raise ValueError("Invalid email format.")
        if not self.password:
            raise ValueError("Password is required.")
