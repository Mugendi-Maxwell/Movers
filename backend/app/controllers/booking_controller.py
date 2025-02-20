from flask_restful import Resource, Api
from flask import request
from app.services.booking_service import BookingService

# Initialize Flask-RESTful API
api = Api()

class BookingListResource(Resource):
    def get(self):
        # Assume BookingService.get_all_bookings() returns a list of dictionaries
        bookings = BookingService.get_all_bookings()
        return bookings, 200

    def post(self):
        data = request.get_json()
        # Assume BookingService.create_booking(data) returns a dictionary
        booking = BookingService.create_booking(data)
        return booking, 201

# Register the route for listing and creating bookings
api.add_resource(BookingListResource, '/bookings')

class BookingResource(Resource):
    def get(self, booking_id):
        # Assume BookingService.get_booking_by_id returns a dictionary if found, otherwise None
        booking = BookingService.get_booking_by_id(booking_id)
        if booking:
            return booking, 200
        return {'message': 'Booking not found'}, 404

    def put(self, booking_id):
        data = request.get_json()
        # Assume BookingService.update_booking returns the updated booking as a dictionary
        booking = BookingService.update_booking(booking_id, data)
        if booking:
            return booking, 200
        return {'message': 'Booking not found'}, 404

    def delete(self, booking_id):
        if BookingService.delete_booking(booking_id):
            return {'message': 'Booking deleted successfully'}, 200
        return {'message': 'Booking not found'}, 404

# Register the route for individual booking operations
api.add_resource(BookingResource, '/bookings/<int:booking_id>')
