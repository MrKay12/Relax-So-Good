from flask_restx import Namespace, Resource, fields
from backend.services.facade import RSGFacade
from backend import facade

api = Namespace('products', description='Product operations')

# Define the product model for input validation and documentation
product_model = api.model('Product', {
    'name': fields.String(required=True, description='Name of the product'),
    'description': fields.String(required=True, description='Description of the product'),
    'price': fields.Float(required=True, description='Price of the product'),
    'quantity': fields.Integer(required=True, description='Quantity of the product')
})

@api.route('/')
class ProductList(Resource):
    @api.expect(product_model, validate=True)
    @api.response(201, 'Product successfully created')
    @api.response(400, 'Invalid input data')
    def post(self):
        """Register a new product"""
        product_data = api.payload
        new_product = facade.create_product(product_data)
        return {'id': new_product.id, 'name': new_product.name, 'description': new_product.description, 'price': new_product.price, 'quantity': new_product.quantity}, 201

    @api.response(200, 'List of products retrieved successfully')
    def get(self):
        """Retrieve a list of all products"""
        products = facade.get_all_products()
        return [{'id': product.id, 'name': product.name, 'description': product.description, 'price': product.price, 'quantity': product.quantity} for product in products], 200
    
@api.route('/<product_id>')
class ProductResource(Resource):
    @api.response(200, 'Product details retrieved successfully')
    @api.response(404, 'Product not found')
    def get(self, product_id):
        """Get product details by ID"""
        product = facade.get_product(product_id)
        if not product:
            return {'error': 'Product not found'}, 404
        return {'id': product.id, 'name': product.name, 'description': product.description, 'price': product.price, 'quantity': product.quantity}, 200

    @api.expect(product_model, validate=True)
    @api.response(200, 'Product updated successfully')
    @api.response(404, 'Product not found')
    @api.response(400, 'Invalid input data')
    def put(self, product_id):
        """Update a product's information"""
        product_data = api.payload
        product = facade.get_product(product_id)

        if not product:
            return {'error': 'Product not found'}, 404

        updated_product = facade.update_product(product_id, product_data)
        return {'id': updated_product.id, 'name': updated_product.name, 'description': updated_product.description, 'price': updated_product.price, 'quantity': updated_product.quantity}, 200
    
    @api.response(200, 'Product successfully deleted')
    @api.response(404, 'Product not found')
    def delete(self, product_id):
        """Delete a product by ID"""
        product = facade.get_product(product_id)
        if not product:
            return {'error': 'Product not found'}, 404
        
        facade.delete_product(product_id)
        return {'message': 'Product successfully deleted'}, 200