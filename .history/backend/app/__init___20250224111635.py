from flask import Flask
from flask_restful import Api
from .extensions import db
from .config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    api = Api(app)

    # Import user-related controllers
    from app.controllers.booking_controller import BookingResource, BookingListResource
    from app.controllers.payment_controller import PaymentResource, PaymentListResource
    from app.controllers.user_controller import UserResource, UserListResource
    from app.controllers.feedback_controller import FeedbackListResource, FeedbackResource

    # Import admin-related controllers (bookings, payments, authentication)
    from app.controllers.admin_booking_controller import AdminBookingListResource, AdminBookingResource
    from app.controllers.admin_payment_controller import AdminPaymentListResource, AdminPaymentResource
    from app.controllers.admin_auth_controller import AdminSignupResource, AdminLoginResource, AdminLogoutResource

    # Register user endpoints
    api.add_resource(BookingListResource, '/bookings')      # User bookings list and creation
    api.add_resource(BookingResource, '/bookings/<int:id>')   # User individual booking operations

    api.add_resource(PaymentListResource, '/payments')        # User payments list and creation
    api.add_resource(PaymentResource, '/payments/<int:id>')     # User individual payment operations

    api.add_resource(UserListResource, '/users')              # User list endpoints
    api.add_resource(UserResource, '/users/<int:id>')         # Individual user operations

    api.add_resource(FeedbackListResource, '/feedback')       # Feedback endpoints (list and create)
    api.add_resource(FeedbackResource, '/feedback/<int:feedback_id>')  # Individual feedback operations

    # Register admin endpoints
    api.add_resource(AdminBookingListResource, '/admin/bookings')     # Admin view of all bookings
    api.add_resource(AdminBookingResource, '/admin/bookings/<int:booking_id>')  # Admin booking details

    api.add_resource(AdminPaymentListResource, '/admin/payments')     # Admin view of all payments
    api.add_resource(AdminPaymentResource, '/admin/payments/<int:payment_id>')  # Admin payment details

    # Register admin authentication endpoints
    api.add_resource(AdminSignupResource, '/admin/signup')            # Admin signup
    api.add_resource(AdminLoginResource, '/admin/login')              # Admin login
    api.add_resource(AdminLogoutResource, '/admin/logout')            # Admin logout

    return app
