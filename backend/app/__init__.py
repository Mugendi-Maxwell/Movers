from flask import Flask
from flask_restful import Api
from flask_cors import CORS   # Import Flask-CORS
from .extensions import db
from .config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Enable CORS for all routes
    CORS(app)

    # Initialize the database
    db.init_app(app)
    
    # Initialize Flask-RESTful API
    api = Api(app)

    # Import controllers and register endpoints
    from app.controllers.booking_controller import BookingResource, BookingListResource
    from app.controllers.payment_controller import PaymentResource, PaymentListResource
    from app.controllers.user_controller import UserResource, UserListResource
    from app.controllers.feedback_controller import FeedbackListResource, FeedbackResource
    from app.controllers.user_auth_controller import UserSignupResource, UserLoginResource, UserLogoutResource
    from app.controllers.admin_booking_controller import AdminBookingListResource, AdminBookingResource
    from app.controllers.admin_payment_controller import AdminPaymentListResource, AdminPaymentResource
    from app.controllers.admin_auth_controller import AdminSignupResource, AdminLoginResource, AdminLogoutResource  # Add AdminSignupResource

    # Register user endpoints
    api.add_resource(UserSignupResource, '/users/signup')
    api.add_resource(UserLoginResource, '/users/login')
    api.add_resource(UserLogoutResource, '/users/logout')
    api.add_resource(BookingListResource, '/bookings')
    api.add_resource(BookingResource, '/bookings/<int:id>')
    api.add_resource(PaymentListResource, '/payments')
    api.add_resource(PaymentResource, '/payments/<int:id>')
    api.add_resource(UserListResource, '/users')
    api.add_resource(UserResource, '/users/<int:id>')
    api.add_resource(FeedbackListResource, '/feedback')
    api.add_resource(FeedbackResource, '/feedback/<int:feedback_id>')

    # Register admin endpoints
    api.add_resource(AdminSignupResource, '/admin/signup')  # Register admin signup endpoint
    api.add_resource(AdminLoginResource, '/admin/login')
    api.add_resource(AdminLogoutResource, '/admin/logout')
    api.add_resource(AdminBookingListResource, '/admin/bookings')
    api.add_resource(AdminBookingResource, '/admin/bookings/<int:booking_id>')
    api.add_resource(AdminPaymentListResource, '/admin/payments')
    api.add_resource(AdminPaymentResource, '/admin/payments/<int:payment_id>')

    return app
