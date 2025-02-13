from flask_restx import Namespace, Resource, fields
from backend.services.facade import RSGFacade
from backend import facade

api = Namespace('reviews', description='Review operations')

review_model = api.model('Review', {
    'text': fields.String(required=True, description='Text of the review'),
    'rating': fields.Integer(required=True, description='Rating of the product (1-5)'),
    'user_id': fields.String(required=True, description='ID of the user'),
    'product_id': fields.String(required=True, description='ID of the product')
})

@api.route('/')
class ReviewList(Resource):
    @api.expect(review_model)
    @api.response(201, 'Review successfully created')
    @api.response(400, 'Invalid input data')
    def post(self):
        review_data = api.payload
        if ('text' not in review_data or 'rating' not in review_data or
                'user_id' not in review_data or 'product_id' not in review_data):
            return {'message': 'Missing required fields'}, 400

        new_review = facade.create_review(review_data)
        return {
                'id': new_review.id,
                'text': new_review.text,
                'rating': new_review.rating,
                'user_id': new_review.user_id,
                'product_id': new_review.product_id
            }, 201

    @api.response(200, 'List of reviews retrieved successfully')
    def get(self):
        """Retrieve a list of all reviews"""
        reviews = facade.get_all_reviews()
        return [
            {
                'id': review.id,
                'text': review.text,
                'rating': review.rating,
                'user_id': review.user_id,
                'product_id': review.product_id
            } for review in reviews
        ], 200

@api.route('/<review_id>')
class ReviewResource(Resource):
    @api.response(200, 'Review details retrieved successfully')
    @api.response(404, 'Review not found')
    def get(self, review_id):
        """Get review details by ID"""
        review = facade.get_review(review_id)
        if not review:
            return {'error': 'Review not found'}, 404
        print("Review retrieved:", review)
        return {
            'id': review.id,
            'text': review.text,
            'rating': review.rating,
            'user_id': review.user_id,
            'product_id': review.product_id
        }, 200
        
    @api.expect(review_model)
    @api.response(200, 'Review successfully updated')
    @api.response(404, 'Review not found')
    @api.response(400, 'Invalid input data')
    def put(self, review_id):
        review_data = api.payload
        if ('text' not in review_data or 'rating' not in review_data or
                'user_id' not in review_data or 'product_id' not in review_data):
            return {'message': 'Missing required fields'}, 400

        updated_review = facade.update_review(review_id, review_data)
        if not updated_review:
            return {'error': 'Review not found'}, 404

        return {
            'id': updated_review.id,
            'text': updated_review.text,
            'rating': updated_review.rating,
            'user_id': updated_review.user_id,
            'product_id': updated_review.product_id
        }, 200
    
    @api.response(204, 'Review successfully deleted')
    @api.response(404, 'Review not found')
    def delete(self, review_id):
        review = facade.get_review(review_id)
        if review:
            return {'message': 'Review deleted successfully'}, 200
        else:
            return {'error': 'Review not found'}, 404

@api.route('/product/<product_id>/reviews')
class ProductReviews(Resource):
    @api.response(200, 'List of reviews for a product retrieved successfully')
    @api.response(404, 'Product not found')
    def get(self, product_id):
        reviews = facade.get_reviews_by_product(product_id)
        if not reviews:
            return {'error': 'Product not found'}, 404

        return [
            {
                'id': review.id,
                'text': review.text,
                'rating': review.rating,
                'user_id': review.user_id,
                'product_id': review.product_id
            } for review in reviews
        ], 200