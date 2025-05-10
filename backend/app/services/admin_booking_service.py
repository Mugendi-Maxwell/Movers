from app.models.booking import Booking
from app.extensions import db
from datetime import datetime

class AdminBookingService:
    @staticmethod
    def get_all_bookings():
        bookings = Booking.query.all()
        return [booking.to_dict() for booking in bookings]

    @staticmethod
    def get_booking_by_id(booking_id):
        booking = Booking.query.get(booking_id)
        if booking:
            return booking.to_dict()
        return None

    @staticmethod
    def update_booking(booking_id, data):
        booking = Booking.query.get(booking_id)
        if booking:
            if 'status' in data:
                booking.status = data['status']
            if 'move_date' in data:
                try:
                    # Expecting ISO formatted date string.
                    booking.move_date = datetime.fromisoformat(data['move_date'])
                except Exception as e:
                    return {"message": f"Invalid move_date format: {str(e)}"}
            if 'pickup_location' in data:
                booking.pickup_location = data['pickup_location']
            if 'dropoff_location' in data:
                booking.dropoff_location = data['dropoff_location']
            try:
                db.session.commit()
                return booking.to_dict()
            except Exception as e:
                db.session.rollback()
                return {"message": str(e)}
        return {"message": "Booking not found"}

    @staticmethod
    def confirm_booking(booking_id):
        """
        Confirm a booking by updating its status to "Confirmed".
        Only bookings with a "pending" status can be confirmed.
        """
        booking = Booking.query.get(booking_id)
        if not booking:
            return {"message": "Booking not found"}
        if booking.status.lower() != "pending":
            return {"message": "Only pending bookings can be confirmed"}
        booking.status = "Confirmed"
        try:
            db.session.commit()
            return booking.to_dict()
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}

    @staticmethod
    def delete_booking(booking_id):
        booking = Booking.query.get(booking_id)
        if booking:
            try:
                db.session.delete(booking)
                db.session.commit()
                return {"message": "Booking deleted successfully"}
            except Exception as e:
                db.session.rollback()
                return {"message": str(e)}
        return {"message": "Booking not found"}
