from flask import Flask
from flask_restx import Api

from app.services.facade import RSGFacade
facade = RSGFacade()

def create_app():
    app = Flask(__name__)
    api = Api(app, version='1.0', title='RSG API', description='Relax So Good Application API')
    
    from app.api.users import api as users_ns
    from app.api.products import api as product_ns
    from app.api.reviews import api as reviews_ns
    
    api.add_namespace(users_ns, path='/api/users')
    api.add_namespace(product_ns, path='/api/products')
    api.add_namespace(reviews_ns, path='/api/reviews')
    
    return app