from flask_restx import Namespace, Resource, fields
from database import Database

api = Namespace('users', description='User operations')

user_model = api.model('User', {
    'first_name': fields.String(required=True, description='First name of the user'),
    'last_name': fields.String(required=True, description='Last name of the user'),
    'email': fields.String(required=True, description='Email of the user')
})

# Initialize the database connection
db = Database()
user_collection = db.get_collection("User")

@api.route('/')
class Userlist(Resource):
    @api.expect(user_model, validate=True)
    @api.response(201, 'User successfully created')
    @api.response(400, 'Email already registered')
    @api.response(400, 'Invalid input data')
    def post(self):
        """Register a new user"""
        user_data = api.payload

        # Check if the email is already registered
        existing_user = user_collection.find_one({"email": user_data['email']})
        if existing_user:
            return {'error': 'Email already registered'}, 400

        # Insert the new user
        inserted_doc = user_collection.insert_one(user_data)
        new_user = user_collection.find_one({"_id": inserted_doc.inserted_id})
        return {
            'id': str(new_user['_id']),
            'first_name': new_user['first_name'],
            'last_name': new_user['last_name'],
            'email': new_user['email']
        }, 201

    @api.response(200, 'List of Users retrieved successfully')
    def get(self):
        """Retrieve a list of all Users"""
        users = list(user_collection.find())
        if not users:
            return {"message": "No users found"}, 404
        return [
            {
                'id': str(user['_id']),
                'first_name': user['first_name'],
                'last_name': user['last_name'],
                'email': user['email']
            } for user in users
        ], 200

@api.route('/<user_id>')
class UserResource(Resource):
    @api.response(200, 'User details retrieved successfully')
    @api.response(404, 'User not found')
    def get(self, user_id):
        """Get user details by ID"""
        from bson.objectid import ObjectId
        user = user_collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            return {'error': 'User not found'}, 404
        return {
            'id': str(user['_id']),
            'first_name': user['first_name'],
            'last_name': user['last_name'],
            'email': user['email']
        }, 200

    @api.expect(user_model, validate=True)
    @api.response(200, 'User successfully updated')
    @api.response(404, 'User not found')
    @api.response(400, 'Invalid input data')
    def put(self, user_id):
        """Update user information"""
        from bson.objectid import ObjectId
        user_data = api.payload
        updated_user = user_collection.find_one_and_update(
            {"_id": ObjectId(user_id)},
            {"$set": user_data},
            return_document=True
        )
        if not updated_user:
            return {'error': 'User not found'}, 404
        return {
            'id': str(updated_user['_id']),
            'first_name': updated_user['first_name'],
            'last_name': updated_user['last_name'],
            'email': updated_user['email']
        }, 200

    @api.response(200, 'User successfully deleted')
    @api.response(404, 'User not found')
    def delete(self, user_id):
        """Delete a user by ID"""
        from bson.objectid import ObjectId
        user = user_collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            return {'error': 'User not found'}, 404
        
        user_collection.delete_one({"_id": ObjectId(user_id)})
        return {'message': 'User successfully deleted'}, 200