from flask_restx import Namespace, Resource, fields
import flask
from database import Database
from backend.models.user import User
import flask_login
from flask_login import UserMixin, login_user, LoginManager, logout_user as flask_logout_user, current_user
from werkzeug.security import check_password_hash, generate_password_hash

from flask import current_app

api = Namespace('users', description='User operations')

user_model = api.model('User', {
    'first_name': fields.String(required=True, description='First name of the user'),
    'last_name': fields.String(required=True, description='Last name of the user'),
    'email': fields.String(required=True, description='Email of the user'),
    'password': fields.String(required=True, description='Password of the user')
})

login_model = api.model('Login', {
    'email': fields.String(required=True, description='Email of the user'),
    'password': fields.String(required=True, description='Password of the user')
})

# Initialize the database connection
db = Database()
user_collection = db.get_collection("User")

@api.route('/')
class Userlist(Resource):
    # @api.expect(user_model, validate=True)
    @api.response(201, 'User successfully created')
    @api.response(400, 'Email already registered')
    @api.response(400, 'Invalid input data')
    def post(self):
        """Register a new user"""
        user_data = api.payload
        
        print(user_data)

        # Check if the email is already registered
        existing_user = user_collection.find_one({"email": user_data['email']})
        
        print(existing_user)
        
        if (existing_user):
            return {'error': 'Email already registered'}, 400
        
        # Hash the password before storing it
        user_data['password'] = generate_password_hash(user_data['password'])

        # Insert the new user
        inserted_doc = user_collection.insert_one(user_data)
        return {
            'id': str(inserted_doc.inserted_id),
            'first_name': user_data['firstName'],
            'last_name': user_data['lastName'],
            'email': user_data['email']
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
                'first_name': user['firstName'],
                'last_name': user['lastName'],
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
            'first_name': user['firstName'],
            'last_name': user['lastName'],
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
            'first_name': updated_user['firstName'],
            'last_name': updated_user['lastName'],
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

@api.route('/login')
class UserLogin(Resource): 
    @api.expect(login_model, validate=True)
    @api.response(200, 'User successfully logged in')
    @api.response(401, 'Invalid email or password')
    def post(self):
        """Login a user"""
        login_data = api.payload
        user_data = user_collection.find_one({"email": login_data['email']})
        
        if user_data and check_password_hash(user_data['password'], login_data['password']):
            user_obj = User(user_data)
            login_user(user_obj)
            
            return {'message': 'User successfully logged in'}, 200
        
        return {'error': 'Invalid email or password'}, 401

@api.route('/logout')
class UserLogout(Resource):
    @api.response(200, 'User successfully logged out')
    @api.response(401, 'User not logged in')
    def get(self):
        """Logout a user"""
        if current_user.is_authenticated:
            flask_logout_user()
            return {'message': 'User successfully logged out'}, 200
        return {'error': 'User not logged in'}, 401

@api.route('/current')
class CurrentUser(Resource):
    @api.response(200, 'User details retrieved successfully')
    @api.response(401, 'User not logged in')
    def get(self):
        """Get details of the current user"""
        if current_user.is_authenticated:
            return {
                'id': str(current_user.id),
                'firstName': current_user.firstName,
                'lastName': current_user.lastName,
                'email': current_user.email
             }, 200
        return {'error': 'User not logged in'}, 401
