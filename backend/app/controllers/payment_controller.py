from flask_restful import Resource
from flask import request
from app.models.payment import Payment
from app.extensions import db

class PaymentResource(Resource):
    def get(self, id=None):
        """
        GET method to retrieve a single payment by ID or all payments.
        """
        if id:
            # Fetch a single payment by ID
            payment = Payment.query.get_or_404(id)
            return {'id': payment.id, 'amount': payment.amount, 'status': payment.status, 'booking_id': payment.booking_id}
        else:
            # Fetch all payments
            payments = Payment.query.all()
            return [{'id': payment.id, 'amount': payment.amount, 'status': payment.status, 'booking_id': payment.booking_id} for payment in payments]

    def post(self):
        """
        POST method to create a new payment.
        """
        data = request.get_json()
        new_payment = Payment(
            amount=data['amount'],
            status=data['status'],
            booking_id=data['booking_id']
        )
        db.session.add(new_payment)
        db.session.commit()
        return {'message': 'Payment created successfully', 'id': new_payment.id}, 201

    def put(self, id):
        """
        PUT method to update an existing payment by ID.
        """
        data = request.get_json()
        payment = Payment.query.get_or_404(id)

        # Update payment details
        payment.amount = data['amount']
        payment.status = data['status']
        db.session.commit()

        return {'message': 'Payment updated successfully'}

    def delete(self, id):
        """
        DELETE method to delete a payment by ID.
        """
        payment = Payment.query.get_or_404(id)
        db.session.delete(payment)
        db.session.commit()
        return {'message': 'Payment deleted successfully'}
