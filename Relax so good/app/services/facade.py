from app.persistence.repository import InMemoryRepository
from app.models.user import User
from app.models.product import Product
from app.models.review import Review

class RSGFacade:
    def __init__(self):
        self.user_repo = InMemoryRepository()
        self.product_repo = InMemoryRepository()
        self.review_repo = InMemoryRepository()

#User Facades
    def create_user(self, user_data):
        user = User(**user_data)
        self.user_repo.add(user)
        return user

    def get_user(self, user_id):
        return self.user_repo.get(user_id)
    
    def get_all_user(self):
        return self.user_repo.get_all()

    def get_user_by_email(self, email):
        return self.user_repo.get_by_attribute('email', email)
    
    def update_user(self, user_id, user_data):
        user = self.user_repo.get(user_id)
        if not user:
            return None
        for key, value in user_data.items():
            setattr(user, key, value)
        return user

#Review Facade
    def create_review(self, review_data):
        review = Review(**review_data)
        self.review_repo.add(review)
        return review

    def get_review(self, review_id):
        review = self.review_repo.get(review_id)
        if not review:
            raise ValueError("Review not found.")
        return review

    def get_all_reviews(self):
        return self.review_repo.get_all()

    def get_reviews_by_place(self, place_id):

        place = self.place_repo.get(place_id)
        if not place:
            return None
        return [review for review in self.review_repo.get_all() if review.place_id == place_id]

    def update_review(self, review_id, review_data):
        existing_review = self.review_repo.get(review_id)
        if not existing_review:
            raise ValueError("Review not found.")

        # Update the existing place's attributes based on provided data
        for key, value in review_data.items():
            if hasattr(existing_review, key):
                setattr(existing_review, key, value)
        
        self.review_repo.update(review_id, existing_review.__dict__)  # Pass the dictionary of attributes

        return existing_review

    def delete_review(self, review_id):
        review = self.review_repo.get(review_id)
        if review:
            self.review_repo.delete(review_id)
            return {'message': 'Review deleted sucessfully'}
