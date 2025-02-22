from flask_restful import Resource
from flask import request
from app.services.payment_service import PaymentService

class PaymentListResource(Resource):
    def get(self):
        """
        GET method to retrieve all payments.
        Assumes PaymentService.get_all_payments() returns a list of dictionaries.
        """
        payments = PaymentService.get_all_payments()
        return payments, 200

    def post(self):
        """
        POST method to create a new payment.
        Expects JSON input; PaymentService.create_payment returns a dictionary.
        """
        data = request.get_json()
        payment = PaymentService.create_payment(data)
        return payment, 201

class PaymentResource(Resource):
    def get(self, id):
        """
        GET method to retrieve a single payment by ID.
        """
        payment = PaymentService.get_payment_by_id(id)
        if payment:
            return payment, 200
        return {'message': 'Payment not found'}, 404

    def put(self, id):
        """
        PUT method to update an existing payment by ID.
        """
        data = request.get_json()
        payment = PaymentService.update_payment(id, data)
        if payment:
            return payment, 200
        return {'message': 'Payment not found'}, 404

    def delete(self, id):
        """
        DELETE method to delete a payment by ID.
        """
        if PaymentService.delete_payment(id):
            return {'message': 'Payment deleted successfully'}, 200
        return {'message': 'Payment not found'}, 404
