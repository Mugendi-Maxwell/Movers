from app.models.payment import Payment
from app.extensions import db

class AdminPaymentService:
    @staticmethod
    def get_all_payments():
        """
        Retrieve all payment records.
        Returns:
            A list of dictionaries representing each payment.
        """
        payments = Payment.query.all()
        return [payment.to_dict() for payment in payments]

    @staticmethod
    def get_payment_by_id(payment_id):
        """
        Retrieve a payment record by its ID.
        Args:
            payment_id (int): The ID of the payment.
        Returns:
            A dictionary representing the payment if found; otherwise, None.
        """
        payment = Payment.query.get(payment_id)
        if payment:
            return payment.to_dict()
        return None
