from app.models.payment import Payment
from app.extensions import db

class PaymentService:
    @staticmethod
    def get_all_payments():
        """
        Retrieve all payment records from the database.
        Returns:
            A list of dictionaries representing each payment.
        """
        payments = Payment.query.all()
        return [payment.to_dict() for payment in payments]

    @staticmethod
    def create_payment(data):
        """
        Create a new payment using the provided data.
        Args:
            data (dict): A dictionary with keys 'booking_id', 'amount', and optionally 'status'.
        Returns:
            A dictionary representing the newly created payment.
        """
        new_payment = Payment(
            booking_id=data.get('booking_id'),
            amount=data.get('amount'),
            status=data.get('status', 'pending')
        )
        db.session.add(new_payment)
        db.session.commit()
        return new_payment.to_dict()

    @staticmethod
    def get_payment_by_id(payment_id):
        """
        Retrieve a payment record by its ID.
        Args:
            payment_id (int): The ID of the payment.
        Returns:
            A dictionary of payment details if found; otherwise, None.
        """
        payment = Payment.query.get(payment_id)
        if payment:
            return payment.to_dict()
        return None

    @staticmethod
    def update_payment(payment_id, data):
        """
        Update an existing payment record.
        Args:
            payment_id (int): The ID of the payment to update.
            data (dict): A dictionary containing fields to update (e.g., 'amount', 'status', 'booking_id').
        Returns:
            A dictionary of the updated payment if successful; otherwise, None.
        """
        payment = Payment.query.get(payment_id)
        if payment:
            if 'amount' in data:
                payment.amount = data['amount']
            if 'status' in data:
                payment.status = data['status']
            if 'booking_id' in data:
                payment.booking_id = data['booking_id']
            db.session.commit()
            return payment.to_dict()
        return None

    @staticmethod
    def delete_payment(payment_id):
        """
        Delete a payment record from the database.
        Args:
            payment_id (int): The ID of the payment to delete.
        Returns:
            True if the deletion was successful; otherwise, False.
        """
        payment = Payment.query.get(payment_id)
        if payment:
            db.session.delete(payment)
            db.session.commit()
            return True
        return False
