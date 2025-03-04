from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from .extensions import db
from .config import Config

# Module-level set to store blacklisted tokens
jwt_blacklist = set()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Enable CORS for all routes
    CORS(app)

    # Configure JWT
    app.config["JWT_SECRET_KEY"] = "your_secret_key_here"  # Replace with a secure key
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = False  # Tokens never expire automatically; they are invalidated on logout.
    app.config["JWT_BLACKLIST_ENABLED"] = True       # Enable token blacklisting
    app.config["JWT_BLACKLIST_TOKEN_CHECKS"] = ["access", "refresh"]

    jwt = JWTManager(app)

    # Define JWT token-in-blacklist check
    @jwt.token_in_blocklist_loader
    def check_if_token_in_blacklist(jwt_header, jwt_payload):
        """
        Check if the JWT token is blacklisted (revoked).
        """
        return jwt_payload["jti"] in jwt_blacklist

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
    from app.controllers.admin_booking_controller import AdminBookingListResource, AdminBookingResource, ConfirmBookingResource
    from app.controllers.admin_payment_controller import AdminPaymentListResource, AdminPaymentResource
    from app.controllers.admin_auth_controller import AdminSignupResource, AdminLoginResource, AdminLogoutResource
    from app.controllers.inventory_controller import InventoryListResource, InventoryResource
    from app.controllers.adminFeedback_controller import AdminFeedbackResource, AdminFeedbackListResource
    
    # Register user endpoints
    api.add_resource(InventoryResource, "/inventory/<int:item_id>")
    api.add_resource(InventoryListResource, "/inventory")
    api.add_resource(UserSignupResource, '/users/signup')
    api.add_resource(UserLoginResource, '/users/login')
    api.add_resource(UserLogoutResource, '/users/logout')
    api.add_resource(BookingListResource, '/bookings')
    api.add_resource(BookingResource, '/bookings/<int:id>')
    api.add_resource(PaymentListResource, '/payments')
    api.add_resource(PaymentResource, '/payments/<int:id>')
    api.add_resource(UserListResource, '/users')
    api.add_resource(UserResource, '/users/<int:user_id>')
    api.add_resource(FeedbackListResource, '/feedback')
    api.add_resource(FeedbackResource, '/feedback/<int:feedback_id>')

    # Register admin endpoints
    api.add_resource(AdminFeedbackListResource, '/admin/feedback')
    api.add_resource(AdminFeedbackResource, '/admin/feedback/<int:feedback_id>')
    api.add_resource(ConfirmBookingResource, '/admin/bookings/<int:booking_id>/confirm')

    api.add_resource(AdminSignupResource, '/admin/signup')
    api.add_resource(AdminLoginResource, '/admin/login')
    api.add_resource(AdminLogoutResource, '/admin/logout')
    api.add_resource(AdminBookingListResource, '/admin/bookings')
    api.add_resource(AdminBookingResource, '/admin/bookings/<int:booking_id>')
    api.add_resource(AdminPaymentListResource, '/admin/payments')
    api.add_resource(AdminPaymentResource, '/admin/payments/<int:payment_id>')

    return app
