from flask_restful import Resource, Api, reqparse
from flask import  request
from app.services.booking_service import BookingService


api = Api()

# Parser for validating input
booking_parser = reqparse.RequestParser()
booking_parser.add_argument('selected_inventory', type=dict, required=True, help='Selected inventory is required.')
booking_parser.add_argument('current_address', type=str, required=True, help='Current address is required.')
booking_parser.add_argument('new_address', type=str, required=True, help='New address is required.')
booking_parser.add_argument('details', type=dict, required=False, help='Additional booking details (optional).')

class BookingListResource(Resource):
    def get(self):
        try:
            bookings = BookingService.get_all_bookings()
            return bookings, 200
        except Exception as e:
            return {'message': f'Error retrieving bookings: {str(e)}'}, 500

    def post(self):
        try:
            data = booking_parser.parse_args()
            booking = BookingService.create_booking(data)
            return booking, 201
        except Exception as e:
            return {'message': f'Error creating booking: {str(e)}'}, 500

# Register the route for listing and creating bookings
api.add_resource(BookingListResource, '/bookings')

class BookingResource(Resource):
    def get(self, booking_id):
        try:
            booking = BookingService.get_booking_by_id(booking_id)
            if booking:
                return booking, 200
            return {'message': 'Booking not found'}, 404
        except Exception as e:
            return {'message': f'Error retrieving booking: {str(e)}'}, 500

    def put(self, booking_id):
        try:
            data = request.get_json()
            if not data:
                return {'message': 'No input data provided'}, 400

            booking = BookingService.update_booking(booking_id, data)
            if booking:
                return booking, 200
            return {'message': 'Booking not found'}, 404
        except Exception as e:
            return {'message': f'Error updating booking: {str(e)}'}, 500

    def delete(self, booking_id):
        try:
            if BookingService.delete_booking(booking_id):
                return {'message': 'Booking deleted successfully'}, 200
            return {'message': 'Booking not found'}, 404
        except Exception as e:
            return {'message': f'Error deleting booking: {str(e)}'}, 500

# Register the route for individual booking operations
api.add_resource(BookingResource, '/bookings/<int:booking_id>')


