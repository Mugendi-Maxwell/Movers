from flask_restful import Resource, Api, reqparse
from flask import request
from flask_jwt_extended import jwt_required
from app.services.booking_service import BookingService

api = Api()

class BookingListResource(Resource):
    def get(self):
        try:
            bookings, status_code = BookingService.get_all_bookings()
            return bookings, status_code
        except Exception as e:
            return {'message': f'Error retrieving bookings: {str(e)}'}, 500

    @jwt_required()
    def post(self):
        try:
            data = request.get_json()
            booking, status_code = BookingService.create_booking(data)
            return booking, status_code
        except Exception as e:
            return {'message': f'Error creating booking: {str(e)}'}, 500

api.add_resource(BookingListResource, '/bookings')

class BookingResource(Resource):
    def get(self, id):
        try:
            booking, status_code = BookingService.get_booking_by_id(id)
            if booking:
                return booking, status_code
            return {'message': 'Booking not found'}, 404
        except Exception as e:
            return {'message': f'Error retrieving booking: {str(e)}'}, 500

    @jwt_required()
    def put(self, id):
        try:
            data = request.get_json()
            if not data:
                return {'message': 'No input data provided'}, 400
            booking, status_code = BookingService.update_booking(id, data)
            if booking:
                return booking, status_code
            return {'message': 'Booking not found'}, 404
        except Exception as e:
            return {'message': f'Error updating booking: {str(e)}'}, 500

    @jwt_required()
    def delete(self, id):
        try:
            result = BookingService.delete_booking(id)
            if isinstance(result, tuple):
                return result
            if result:
                return {'message': 'Booking deleted successfully'}, 200
            return {'message': 'Booking not found'}, 404
        except Exception as e:
            return {'message': f'Error deleting booking: {str(e)}'}, 500

api.add_resource(BookingResource, '/bookings/<int:id>')
