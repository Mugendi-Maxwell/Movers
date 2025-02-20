from app.models.booking import Booking
from app.models.user import User
from app.extensions import db
from datetime import datetime

class BookingService:
    @staticmethod
    def create_booking(user_id, pickup_location, dropoff_location, move_date, price):
        """Create a new booking."""
        # Check if the user exists
        user = User.query.get(user_id)
        if not user:
            return {"message": "User not found"}, 404

        # Validate the move_date
        if move_date < datetime.utcnow():
            return {"message": "Move date cannot be in the past"}, 400
        
        # Create a new booking instance
        booking = Booking(
            user_id=user_id,
            pickup_location=pickup_location,
            dropoff_location=dropoff_location,
            move_date=move_date,
            price=price,
            status="pending"  # Default status is pending
        )

        # Save to the database
        try:
            db.session.add(booking)
            db.session.commit()
            return booking.serialize(), 201
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 500

    @staticmethod
    def get_all_bookings():
        """Get all bookings."""
        bookings = Booking.query.all()
        return [booking.serialize() for booking in bookings], 200

    @staticmethod
    def get_booking_by_id(booking_id):
        """Get a booking by its ID."""
        booking = Booking.query.get(booking_id)
        if not booking:
            return {"message": "Booking not found"}, 404
        return booking.serialize(), 200

    @staticmethod
    def update_booking_status(booking_id, status):
        """Update the status of a booking."""
        booking = Booking.query.get(booking_id)
        if not booking:
            return {"message": "Booking not found"}, 404
        
        # Update the status of the booking
        booking.status = status
        try:
            db.session.commit()
            return booking.serialize(), 200
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 500

    @staticmethod
    def cancel_booking(booking_id):
        """Cancel a booking."""
        booking = Booking.query.get(booking_id)
        if not booking:
            return {"message": "Booking not found"}, 404

        # Set status to canceled
        booking.status = "canceled"
        try:
            db.session.commit()
            return booking.serialize(), 200
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 500
