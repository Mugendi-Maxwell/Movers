from flask_restful import Resource, Api
from flask import request
from app.services.payment_service import PaymentService

api = Api()

class PaymentListResource(Resource):
    def get(self):
        # Retrieve email from query parameters
        email = request.args.get("email")
        if not email:
            return {"message": "Email query parameter is required."}, 400
        payments, status_code = PaymentService.get_all_payments(email)
        return payments, status_code

    def post(self):
        data = request.get_json()
        # Ensure required fields are present: amount, payment_method, booking_id, and email.
        if not data.get("amount") or not data.get("payment_method") or not data.get("booking_id") or not data.get("email"):
            return {"message": "Amount, payment method, booking ID, and email are required."}, 400
        payment, status_code = PaymentService.create_payment(data)
        return payment, status_code

api.add_resource(PaymentListResource, '/payments')

class PaymentResource(Resource):
    def get(self, id):
        # Retrieve email from query parameters
        email = request.args.get("email")
        if not email:
            return {"message": "Email query parameter is required."}, 400
        payment, status_code = PaymentService.get_payment_by_id(id, email)
        if payment and isinstance(payment, dict) and payment.get("message"):
            return payment, status_code
        return payment, status_code

    def put(self, id):
        data = request.get_json()
        # Ensure email is provided in the request JSON.
        email = data.get("email")
        if not email:
            return {"message": "Email is required."}, 400
        updated_payment, status_code = PaymentService.update_payment(id, data, email)
        return updated_payment, status_code

    def delete(self, id):
        # Retrieve email from query parameters
        email = request.args.get("email")
        if not email:
            return {"message": "Email query parameter is required."}, 400
        result, status_code = PaymentService.delete_payment(id, email)
        return result, status_code

api.add_resource(PaymentResource, '/payments/<int:id>')
