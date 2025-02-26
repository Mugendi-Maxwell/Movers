from app.models.payment import Payment
from app.models.booking import Booking
from app.extensions import db
from flask_jwt_extended import get_jwt_identity

class PaymentService:
    @staticmethod
    def get_all_payments():
        """
        Retrieve all payments for the authenticated user.
        """
        user_id = get_jwt_identity()  # ✅ Extract user ID from JWT

        # Fetch only payments belonging to the user's bookings
        payments = (
            db.session.query(Payment)
            .join(Booking)
            .filter(Booking.user_id == user_id)
            .all()
        )
        return [payment.to_dict() for payment in payments], 200

    @staticmethod
    def create_payment(data):
        """
        Create a new payment using the provided data.
        Args:
            data (dict): A dictionary with keys 'booking_id' and 'amount'.
        Returns:
            A dictionary representing the newly created payment.
        """
        user_id = get_jwt_identity()  # ✅ Extract user ID from JWT
        booking_id = data.get("booking_id")
        amount = data.get("amount")

        # Ensure the booking exists and belongs to the user
        booking = Booking.query.filter_by(id=booking_id, user_id=user_id).first()
        if not booking:
            return {"message": "Booking not found or unauthorized"}, 404

        new_payment = Payment(
            booking_id=booking_id,
            amount=amount,
            status=data.get("status", "pending"),  # Default status: pending
        )

        try:
            db.session.add(new_payment)
            db.session.commit()
            return new_payment.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 500

    @staticmethod
    def get_payment_by_id(payment_id):
        """
        Retrieve a specific payment by its ID (only if the user owns it).
        """
        user_id = get_jwt_identity()

        payment = (
            db.session.query(Payment)
            .join(Booking)
            .filter(Payment.id == payment_id, Booking.user_id == user_id)
            .first()
        )

        if not payment:
            return {"message": "Payment not found or unauthorized"}, 404
        return payment.to_dict(), 200

    @staticmethod
    def update_payment(payment_id, data):
        """
        Update an existing payment record (only if the user owns it).
        """
        user_id = get_jwt_identity()

        payment = (
            db.session.query(Payment)
            .join(Booking)
            .filter(Payment.id == payment_id, Booking.user_id == user_id)
            .first()
        )

        if not payment:
            return {"message": "Payment not found or unauthorized"}, 404

        # Update fields if provided
        if "amount" in data:
            payment.amount = data["amount"]
        if "status" in data:
            payment.status = data["status"]

        try:
            db.session.commit()
            return payment.to_dict(), 200
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 500

    @staticmethod
    def delete_payment(payment_id):
        """
        Delete a payment record (only if the user owns it).
        """
        user_id = get_jwt_identity()

        payment = (
            db.session.query(Payment)
            .join(Booking)
            .filter(Payment.id == payment_id, Booking.user_id == user_id)
            .first()
        )

        if not payment:
            return {"message": "Payment not found or unauthorized"}, 404

        try:
            db.session.delete(payment)
            db.session.commit()
            return {"message": "Payment deleted successfully"}, 200
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 500
