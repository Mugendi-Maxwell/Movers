from flask_restful import Resource
from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services.payment_service import PaymentService

class PaymentListResource(Resource):
    @jwt_required()
    def get(self):
        """
        GET method to retrieve all payments for the authenticated user.
        """
        user_id = get_jwt_identity()  # Get authenticated user ID
        payments = PaymentService.get_payments_by_user(user_id)
        return payments, 200

    @jwt_required()
    def post(self):
        """
        POST method to create a new payment.
        Expects JSON input:
        {
            "amount": 1000,
            "payment_method": "M-Pesa"
        }
        """
        data = request.get_json()
        user_id = get_jwt_identity()  # Get authenticated user ID

        # Ensure required fields are present
        if not data.get("amount") or not data.get("payment_method"):
            return {"message": "Amount and payment method are required."}, 400

        data["user_id"] = user_id  # Attach user ID from JWT
        payment = PaymentService.create_payment(data)
        return payment, 201

class PaymentResource(Resource):
    @jwt_required()
    def get(self, id):
        """
        GET method to retrieve a single payment by ID.
        Ensures only the payment owner can access it.
        """
        user_id = get_jwt_identity()
        payment = PaymentService.get_payment_by_id(id)

        if payment and payment["user_id"] == user_id:
            return payment, 200
        return {"message": "Payment not found or unauthorized."}, 404

    @jwt_required()
    def put(self, id):
        """
        PUT method to update an existing payment by ID.
        Only the payment owner can update it.
        """
        user_id = get_jwt_identity()
        payment = PaymentService.get_payment_by_id(id)

        if not payment or payment["user_id"] != user_id:
            return {"message": "Payment not found or unauthorized."}, 404

        data = request.get_json()
        updated_payment = PaymentService.update_payment(id, data)
        return updated_payment, 200

    @jwt_required()
    def delete(self, id):
        """
        DELETE method to delete a payment by ID.
        Only the payment owner can delete it.
        """
        user_id = get_jwt_identity()
        payment = PaymentService.get_payment_by_id(id)

        if not payment or payment["user_id"] != user_id:
            return {"message": "Payment not found or unauthorized."}, 404

        PaymentService.delete_payment(id)
        return {"message": "Payment deleted successfully"}, 200
