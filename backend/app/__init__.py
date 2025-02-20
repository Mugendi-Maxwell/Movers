from flask import Flask
from flask_restful import Api
from .extensions import db
from .config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    api = Api(app) 

    from app.controllers.booking_controller import BookingResource, BookingListResource
    from app.controllers.payment_controller import PaymentResource, PaymentListResource
    from app.controllers.user_controller import UserResource, UserListResource

   
    api.add_resource(BookingListResource, '/bookings')  # For creating and listing bookings
    api.add_resource(BookingResource, '/bookings/<int:id>')  # For retrieving, updating, and deleting a single booking

    api.add_resource(PaymentListResource, '/payments')  # For creating and listing payments
    api.add_resource(PaymentResource, '/payments/<int:id>')  

    api.add_resource(UserListResource, '/users')  
    api.add_resource(UserResource, '/users/<int:id>')  

    return app
