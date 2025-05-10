from app.models.booking import Booking
from app.models.user import User
from app.models.payment import Payment  # Ensure this is your Payment model with a booking_id column
from app.extensions import db
from datetime import datetime
from flask_jwt_extended import get_jwt_identity

class BookingService:
    @staticmethod
    def create_booking(data):
        """
        Create a new booking.
        Expected data keys:
          - pickup_location: string (current address)
          - dropoff_location: string (move address)
          - move_date: ISO formatted datetime string (e.g., "2025-03-01T10:00")
          - total_price: number (price)
          - move_type: string (move type)
        
        The user_id is extracted from the JWT.
        """
        user_id = get_jwt_identity()  # Extract the authenticated user's ID

        # Validate user existence
        user = User.query.get(user_id)
        if not user:
            return {"message": "User not found"}, 404

        # Validate and convert move_date
        try:
            move_date_str = data.get("move_date")
            move_date_obj = datetime.fromisoformat(move_date_str)
            if move_date_obj < datetime.utcnow():
                return {"message": "Move date cannot be in the past"}, 400
        except Exception as e:
            return {"message": f"Invalid move date format: {str(e)}"}, 400

        # Create the new booking
        booking = Booking(
            user_id=user_id,
            pickup_location=data.get("pickup_location"),
            dropoff_location=data.get("dropoff_location"),
            move_date=move_date_obj,
            total_price=data.get("total_price"),
            move_type=data.get("move_type"),
            status="pending"  # Default status
        )

        try:
            db.session.add(booking)
            db.session.commit()
            return booking.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 500

    @staticmethod
    def get_all_bookings():
        """
        Retrieve all bookings.
        For each booking, if a payment record exists (i.e. a payment with booking_id equal to the booking's id),
        update the status to "Paid".
        """
        bookings = Booking.query.all()
        booking_list = []
        for booking in bookings:
            payment = Payment.query.filter_by(booking_id=booking.id).first()
            if payment:
                booking.status = "Paid"
            booking_list.append(booking.to_dict())
        return booking_list, 200

    @staticmethod
    def get_booking_by_id(booking_id):
        """
        Retrieve a booking by its ID.
        If a payment record exists for the booking, update the status to "Paid".
        """
        booking = Booking.query.get(booking_id)
        if not booking:
            return {"message": "Booking not found"}, 404
        payment = Payment.query.filter_by(booking_id=booking.id).first()
        if payment:
            booking.status = "Paid"
        return booking.to_dict(), 200

    @staticmethod
    def update_booking_status(booking_id, status):
        """
        Update the status of a booking (only if the user owns the booking).
        """
        user_id = get_jwt_identity()  # Extract user_id from JWT

        booking = Booking.query.get(booking_id)
        if not booking:
            return {"message": "Booking not found"}, 404

        # Ensure the user is updating their own booking
        if booking.user_id != user_id:
            return {"message": "Unauthorized to update this booking"}, 403

        booking.status = status
        try:
            db.session.commit()
            return booking.to_dict(), 200
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 500

    @staticmethod
    def cancel_booking(booking_id):
        """
        Cancel a booking (only if the user owns the booking).
        """
        user_id = get_jwt_identity()  # Extract user_id from JWT

        booking = Booking.query.get(booking_id)
        if not booking:
            return {"message": "Booking not found"}, 404

        if booking.user_id != user_id:
            return {"message": "Unauthorized to cancel this booking"}, 403

        booking.status = "canceled"
        try:
            db.session.commit()
            return booking.to_dict(), 200
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 500
