from flask_restx import Namespace, Resource, fields
from flask import request
from database import Database
from bson.objectid import ObjectId

api = Namespace('cart', description='Cart operations')

# Define the cart item model for input validation and documentation
cart_item_model = api.model('CartItem', {
    'product_id': fields.String(required=True, description='ID of the product'),
    'quantity': fields.Integer(required=True, description='Quantity of the product'),
    'user_id': fields.String(required=True, description='ID of the user')
})

# Initialize the database connection
db = Database()
cart_collection = db.get_collection("Cart")
product_collection = db.get_collection("Product")

@api.route('/')
class Cart(Resource):
    @api.expect(cart_item_model, validate=True)
    @api.response(201, 'Item successfully added to cart')
    @api.response(400, 'Invalid input data')
    def post(self):
        """Add an item to the cart"""
        cart_item_data = api.payload

        # Insert the new cart item
        inserted_doc = cart_collection.insert_one(cart_item_data)
        new_cart_item = cart_collection.find_one({"_id": inserted_doc.inserted_id})
        return {
            'id': str(new_cart_item['_id']),
            'product_id': new_cart_item['product_id'],
            'quantity': new_cart_item['quantity'],
            'user_id': new_cart_item['user_id']
        }, 201

    @api.response(200, 'List of cart items retrieved successfully')
    def get(self):
        """Retrieve a list of all cart items for the user"""
        user_id = request.args.get('user_id')
        if not user_id:
            return {"message": "User ID is required"}, 400

        cart_items = list(cart_collection.find({'user_id': user_id}))
        if not cart_items:
            return {"message": "No items in cart"}, 404
        return [
            {
                'id': str(cart_item['_id']),
                'product_id': cart_item['product_id'],
                'quantity': cart_item['quantity'],
                'user_id': cart_item['user_id']
            } for cart_item in cart_items
        ], 200

@api.route('/total')
class CartTotal(Resource):
    @api.response(200, 'Total price of cart retrieved successfully')
    def get(self):
        """Get the total price of all items in the cart for the user"""
        user_id = request.args.get('user_id')
        if not user_id:
            return {"message": "User ID is required"}, 400

        cart_items = list(cart_collection.find({'user_id': user_id}))
        if not cart_items:
            return {"message": "No items in cart"}, 404

        total_price = 0
        for cart_item in cart_items:
            product = product_collection.find_one({"_id": ObjectId(cart_item['product_id'])})
            if product:
                total_price += product['price'] * cart_item['quantity']

        return {'total_price': total_price}, 200

@api.route('/<cart_item_id>')
class CartItem(Resource):
    @api.response(200, 'Cart item details retrieved successfully')
    @api.response(404, 'Cart item not found')
    def get(self, cart_item_id):
        """Get cart item details by ID"""
        cart_item = cart_collection.find_one({"_id": ObjectId(cart_item_id)})
        if not cart_item:
            return {'error': 'Cart item not found'}, 404
        return {
            'id': str(cart_item['_id']),
            'product_id': cart_item['product_id'],
            'quantity': cart_item['quantity'],
            'user_id': cart_item['user_id']
        }, 200

    @api.expect(cart_item_model, validate=True)
    @api.response(200, 'Cart item updated successfully')
    @api.response(404, 'Cart item not found')
    @api.response(400, 'Invalid input data')
    def put(self, cart_item_id):
        """Update a cart item's information"""
        cart_item_data = api.payload
        updated_cart_item = cart_collection.find_one_and_update(
            {"_id": ObjectId(cart_item_id)},
            {"$set": cart_item_data},
            return_document=True
        )
        if not updated_cart_item:
            return {'error': 'Cart item not found'}, 404
        return {
            'id': str(updated_cart_item['_id']),
            'product_id': updated_cart_item['product_id'],
            'quantity': updated_cart_item['quantity'],
            'user_id': updated_cart_item['user_id']
        }, 200

    @api.response(200, 'Cart item successfully deleted')
    @api.response(404, 'Cart item not found')
    def delete(self, cart_item_id):
        """Delete a cart item by ID"""
        cart_item = cart_collection.find_one({"_id": ObjectId(cart_item_id)})
        if not cart_item:
            return {'error': 'Cart item not found'}, 404
        
        cart_collection.delete_one({"_id": ObjectId(cart_item_id)})
        return {'message': 'Cart item successfully deleted'}, 200