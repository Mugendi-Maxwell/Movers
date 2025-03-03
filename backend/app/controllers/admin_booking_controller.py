from flask_restful import Resource, Api, reqparse
from flask import request
from app.services.admin_booking_service import AdminBookingService

api = Api()

class AdminBookingListResource(Resource):
    def options(self):
        # Handle CORS preflight for /admin/bookings
        return {}, 200

    def get(self):
        """
        Retrieve a list of all bookings.
        Admins can view all bookings regardless of the user.
        """
        bookings = AdminBookingService.get_all_bookings()
        return bookings, 200

    def post(self):
        try:
            data = request.get_json()
            booking, status_code = AdminBookingService.create_booking(data)
            return booking, status_code
        except Exception as e:
            return {'message': f'Error creating booking: {str(e)}'}, 500

api.add_resource(AdminBookingListResource, '/admin/bookings')

class AdminBookingResource(Resource):
    def options(self, booking_id):
        # Handle CORS preflight for /admin/bookings/<booking_id>
        return {}, 200

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
        if booking and "message" not in booking:
            return booking, 200
        return {'message': 'Booking not found or error updating booking'}, 404

    def delete(self, booking_id):
        """
        Delete (or cancel) a specific booking.
        """
        result = AdminBookingService.delete_booking(booking_id)
        if isinstance(result, dict) and result.get("message"):
            return result, 404
        return {'message': 'Booking deleted successfully'}, 200

api.add_resource(AdminBookingResource, '/admin/bookings/<int:booking_id>')

class ConfirmBookingResource(Resource):
    def options(self, booking_id):
        # Handle CORS preflight for /admin/bookings/<booking_id>/confirm
        return {}, 200

    def patch(self, booking_id):
        """
        Confirm the move for a specific booking.
        This endpoint updates the booking status to "Confirmed".
        """
        booking = AdminBookingService.confirm_booking(booking_id)
        if booking and "message" not in booking:
            return booking, 200
        return {'message': 'Booking not found or could not be confirmed'}, 404

api.add_resource(ConfirmBookingResource, '/admin/bookings/<int:booking_id>/confirm')
