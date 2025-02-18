from flask import Flask
from flask_restful import Api
from .extensions import db
from .config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    api = Api(app)  # Initialize Flask-RESTful Api

    # Register resources (controllers)
    from app.controllers.booking_controller import BookingResource
    from app.controllers.payment_controller import PaymentResource
    from app.controllers.user_controller import UserResource

    # Add resources with URL routes
    api.add_resource(BookingResource, '/bookings/<int:id>', '/bookings')  # Example for booking resource
    api.add_resource(PaymentResource, '/payments/<int:id>', '/payments')  # Example for payment resource
    api.add_resource(UserResource, '/users/<int:id>', '/users')  # Example for user resource

   

    
    return app
