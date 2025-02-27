from backend import create_app
from database import Database

app = create_app()

# Initialize the database connection
db = Database()
user_collection = db.get_collection("User")

if __name__ == '__main__':
    app.run(debug=True)