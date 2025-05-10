from app.models.booking import Booking
from app.extensions import db

class AdminBookingService:
    @staticmethod
    def get_all_bookings():
        bookings = Booking.query.all()
        # Convert each booking to a dictionary (assuming Booking has a to_dict() method)
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
            # Example: update status and date if provided
            if 'status' in data:
                booking.status = data['status']
            if 'date' in data:
                booking.date = data['date']
            db.session.commit()
            return booking.to_dict()
        return None

    @staticmethod
    def delete_booking(booking_id):
        booking = Booking.query.get(booking_id)
        if booking:
            db.session.delete(booking)
            db.session.commit()
            return True
        return False
