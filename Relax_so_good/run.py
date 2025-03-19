from backend import create_app
from database import Database
from flask_login import LoginManager
from backend.models.user import User
from flask_cors import CORS  # Import Flask-CORS
from flask import Flask, request, jsonify
import os
from bson.objectid import ObjectId

app = create_app()

# Set the secret key to a random value
app.secret_key = os.urandom(24)  # Replace with a strong, unique key for production

# Initialize the database connection
db = Database()
user_collection = db.get_collection("User")

# Initialize Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)

# Enable CORS
CORS(app, resources={r"/*": {"origins": "http://localhost:8000/Relax_so_good/frontend2/pages/"}})

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

@login_manager.user_loader
def load_user(user_id):
    user_data = user_collection.find_one({"_id": ObjectId(user_id)})
    if user_data:
        return User(user_data)
    return None

if __name__ == '__main__':
    app.run(debug=True)