from flask import Flask
from flask_restx import Api
from flask_login import LoginManager, UserMixin, login_user

from backend.services.facade import RSGFacade
facade = RSGFacade()

def create_app():
    app = Flask(__name__)
    login_manager = LoginManager()
    login_manager.init_app(app)
    api = Api(app, version='1.0', title='RSG API', description='Relax So Good Application API')

    from backend.api.users import api as users_ns
    from backend.api.products import api as product_ns
    from backend.api.reviews import api as reviews_ns
    from backend.api.cart import api as cart_ns

    api.add_namespace(users_ns, path='/api/users')
    api.add_namespace(product_ns, path='/api/products')
    api.add_namespace(reviews_ns, path='/api/reviews')
    api.add_namespace(cart_ns, path='/api/cart')

    return app