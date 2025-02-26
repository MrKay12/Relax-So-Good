from flask_restx import Namespace, Resource, fields
from database import Database

api = Namespace('products', description='Product operations')

# Define the product model for input validation and documentation
product_model = api.model('Product', {
    'name': fields.String(required=True, description='Name of the product'),
    'description': fields.String(required=True, description='Description of the product'),
    'price': fields.Float(required=True, description='Price of the product'),
    'quantity': fields.Integer(required=True, description='Quantity of the product')
})

# Initialize the database connection
db = Database()
product_collection = db.get_collection("Product")

@api.route('/')
class ProductList(Resource):
    @api.expect(product_model, validate=True)
    @api.response(201, 'Product successfully created')
    @api.response(400, 'Invalid input data')
    def post(self):
        """Register a new product"""
        product_data = api.payload

        # Insert the new product
        inserted_doc = product_collection.insert_one(product_data)
        new_product = product_collection.find_one({"_id": inserted_doc.inserted_id})
        return {
            'id': str(new_product['_id']),
            'name': new_product['name'],
            'description': new_product['description'],
            'price': new_product['price'],
            'quantity': new_product['quantity']
        }, 201

    @api.response(200, 'List of products retrieved successfully')
    def get(self):
        """Retrieve a list of all products"""
        products = list(product_collection.find())
        if not products:
            return {"message": "No products found"}, 404
        return [
            {
                'id': str(product['_id']),
                'name': product['name'],
                'description': product['description'],
                'price': product['price'],
                'quantity': product['quantity']
            } for product in products
        ], 200
    
@api.route('/<product_id>')
class ProductResource(Resource):
    @api.response(200, 'Product details retrieved successfully')
    @api.response(404, 'Product not found')
    def get(self, product_id):
        """Get product details by ID"""
        from bson.objectid import ObjectId
        product = product_collection.find_one({"_id": ObjectId(product_id)})
        if not product:
            return {'error': 'Product not found'}, 404
        return {
            'id': str(product['_id']),
            'name': product['name'],
            'description': product['description'],
            'price': product['price'],
            'quantity': product['quantity']
        }, 200

    @api.expect(product_model, validate=True)
    @api.response(200, 'Product updated successfully')
    @api.response(404, 'Product not found')
    @api.response(400, 'Invalid input data')
    def put(self, product_id):
        """Update a product's information"""
        from bson.objectid import ObjectId
        product_data = api.payload
        updated_product = product_collection.find_one_and_update(
            {"_id": ObjectId(product_id)},
            {"$set": product_data},
            return_document=True
        )
        if not updated_product:
            return {'error': 'Product not found'}, 404
        return {
            'id': str(updated_product['_id']),
            'name': updated_product['name'],
            'description': updated_product['description'],
            'price': updated_product['price'],
            'quantity': updated_product['quantity']
        }, 200
    
    @api.response(200, 'Product successfully deleted')
    @api.response(404, 'Product not found')
    def delete(self, product_id):
        """Delete a product by ID"""
        from bson.objectid import ObjectId
        product = product_collection.find_one({"_id": ObjectId(product_id)})
        if not product:
            return {'error': 'Product not found'}, 404
        
        product_collection.delete_one({"_id": ObjectId(product_id)})
        return {'message': 'Product successfully deleted'}, 200