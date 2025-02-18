from flask_restful import Resource, Api
from flask import request, jsonify
from app.services.booking_service import BookingService

# Initialize Flask-RESTful API
api = Api()

class BookingListResource(Resource):
    def get(self):
        bookings = BookingService.get_all_bookings()
        return jsonify([booking.serialize() for booking in bookings])

    def post(self):
        data = request.get_json()
        booking = BookingService.create_booking(data)
        return jsonify(booking.serialize()), 201

# Register the route
api.add_resource(BookingListResource, '/bookings')

class BookingResource(Resource):
    def get(self, booking_id):
        booking = BookingService.get_booking_by_id(booking_id)
        if booking:
            return jsonify(booking.serialize())
        return {'message': 'Booking not found'}, 404

    def put(self, booking_id):
        data = request.get_json()
        booking = BookingService.update_booking(booking_id, data)
        if booking:
            return jsonify(booking.serialize())
        return {'message': 'Booking not found'}, 404

    def delete(self, booking_id):
        if BookingService.delete_booking(booking_id):
            return {'message': 'Booking deleted successfully'}, 200
        return {'message': 'Booking not found'}, 404

# Register the individual booking route
api.add_resource(BookingResource, '/bookings/<int:booking_id>')
