from flask_restful import Resource
from flask import request
from app.services.admin_booking_service import AdminBookingService

class AdminBookingListResource(Resource):
    def get(self):
        """
        Retrieve a list of all bookings.
        Admins can view all bookings regardless of the user.
        """
        bookings = AdminBookingService.get_all_bookings()
        return bookings, 200

class AdminBookingResource(Resource):
    def get(self, booking_id):
        """
        Retrieve details of a specific booking by its ID.
        """
        booking = AdminBookingService.get_booking_by_id(booking_id)
        if booking:
            return booking, 200
        return {'message': 'Booking not found'}, 404

    def put(self, booking_id):
        """
        Update booking details (e.g., approve, reschedule, cancel) for a specific booking.
        """
        data = request.get_json()
        booking = AdminBookingService.update_booking(booking_id, data)
        if booking:
            return booking, 200
        return {'message': 'Booking not found'}, 404

    def delete(self, booking_id):
        """
        Delete (or cancel) a specific booking.
        """
        if AdminBookingService.delete_booking(booking_id):
            return {'message': 'Booking deleted successfully'}, 200
        return {'message': 'Booking not found'}, 404
