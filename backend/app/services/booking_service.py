from app.models.booking import Booking
from app.models.user import User
from app.extensions import db
from datetime import datetime, date
from flask_jwt_extended import get_jwt_identity

class BookingService:
    @staticmethod
    def create_booking(pickup_location, dropoff_location, move_date, price):
        """Create a new booking with user_id extracted from JWT."""
        user_id = get_jwt_identity()  # ✅ Extract user_id from JWT

        # Validate user existence
        user = User.query.get(user_id)
        if not user:
            return {"message": "User not found"}, 404

        # Validate move_date (only compare the date, not time)
        move_date_obj = datetime.strptime(move_date, "%Y-%m-%d").date()
        if move_date_obj < date.today():
            return {"message": "Move date cannot be in the past"}, 400

        # Create and save booking
        booking = Booking(
            user_id=user_id,
            pickup_location=pickup_location,
            dropoff_location=dropoff_location,
            move_date=move_date_obj,
            price=price,
            status="pending"  # Default status
        )

        try:
            db.session.add(booking)
            db.session.commit()
            return booking.serialize(), 201
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 500

    @staticmethod
    def get_all_bookings():
        """Retrieve all bookings."""
        bookings = Booking.query.all()
        return [booking.serialize() for booking in bookings], 200

    @staticmethod
    def get_booking_by_id(booking_id):
        """Retrieve a booking by ID."""
        booking = Booking.query.get(booking_id)
        if not booking:
            return {"message": "Booking not found"}, 404
        return booking.serialize(), 200

    @staticmethod
    def update_booking_status(booking_id, status):
        """Update booking status (only if user owns the booking)."""
        user_id = get_jwt_identity()  # ✅ Extract user_id from JWT

        booking = Booking.query.get(booking_id)
        if not booking:
            return {"message": "Booking not found"}, 404

        # Ensure the user is updating their own booking
        if booking.user_id != user_id:
            return {"message": "Unauthorized to update this booking"}, 403

        # Update status
        booking.status = status
        try:
            db.session.commit()
            return booking.serialize(), 200
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 500

    @staticmethod
    def cancel_booking(booking_id):
        """Cancel a booking (only if user owns the booking)."""
        user_id = get_jwt_identity()  # ✅ Extract user_id from JWT

        booking = Booking.query.get(booking_id)
        if not booking:
            return {"message": "Booking not found"}, 404

        # Ensure the user is canceling their own booking
        if booking.user_id != user_id:
            return {"message": "Unauthorized to cancel this booking"}, 403

        # Set status to canceled
        booking.status = "canceled"
        try:
            db.session.commit()
            return booking.serialize(), 200
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 500
