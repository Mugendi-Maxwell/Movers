from app.models.payment import Payment
from app.models.booking import Booking
from app.models.user import User
from app.extensions import db

class PaymentService:
    @staticmethod
    def get_all_payments(email):
        """
        Retrieve all payments for the user with the given email.
        Returns a list of payments in the format:
          {
              'id': <int>,
              'booking_id': <int>,
              'amount': <float>,
              'status': <string>,
              'created_at': <ISO formatted datetime string or None>
          }
        """
        user = User.query.filter_by(email=email).first()
        if not user:
            return {"message": "User not found"}, 404

        payments = (
            db.session.query(Payment)
            .join(Booking)
            .filter(Booking.user_id == user.id)
            .all()
        )
        return [payment.to_dict() for payment in payments], 200

    @staticmethod
    def create_payment(data):
        """
        Create a new payment using the provided data.
        Expected keys in data:
            - booking_id: int
            - amount: float
            - payment_method: string (if required)
            - email: string (to identify the user)
        The Payment model eventually returns data in the format:
            {
                'id': self.id,
                'booking_id': self.booking_id,
                'amount': self.amount,
                'status': self.status,
                'created_at': self.created_at.isoformat() if self.created_at else None,
            }
        """
        email = data.get("email")
        if not email:
            return {"message": "Email is required"}, 400

        user = User.query.filter_by(email=email).first()
        if not user:
            return {"message": "User not found"}, 404

        booking_id = data.get("booking_id")
        amount = data.get("amount")

        # Ensure the booking exists and belongs to the user.
        booking = Booking.query.filter_by(id=booking_id, user_id=user.id).first()
        if not booking:
            return {"message": "Booking not found or unauthorized"}, 404

        new_payment = Payment(
            booking_id=booking_id,
            amount=amount,
            status=data.get("status", "pending")
        )

        try:
            db.session.add(new_payment)
            db.session.commit()
            print("Payment created with ID:", new_payment.id)
            return new_payment.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            print("Error creating payment:", e)
            return {"message": str(e)}, 500

    @staticmethod
    def get_payment_by_id(payment_id, email):
        """
        Retrieve a specific payment by its ID, ensuring that it belongs to the user
        identified by the provided email.
        """
        user = User.query.filter_by(email=email).first()
        if not user:
            return {"message": "User not found"}, 404

        payment = (
            db.session.query(Payment)
            .join(Booking)
            .filter(Payment.id == payment_id, Booking.user_id == user.id)
            .first()
        )
        if not payment:
            return {"message": "Payment not found or unauthorized"}, 404
        return payment.to_dict(), 200

    @staticmethod
    def update_payment(payment_id, data, email):
        """
        Update an existing payment record (only if it belongs to the user identified by email).
        Allowed keys for update: 'amount', 'status'.
        Returns the updated payment in the format:
          {
              'id': <int>,
              'booking_id': <int>,
              'amount': <float>,
              'status': <string>,
              'created_at': <ISO formatted datetime string or None>
          }
        """
        user = User.query.filter_by(email=email).first()
        if not user:
            return {"message": "User not found"}, 404

        payment = (
            db.session.query(Payment)
            .join(Booking)
            .filter(Payment.id == payment_id, Booking.user_id == user.id)
            .first()
        )
        if not payment:
            return {"message": "Payment not found or unauthorized"}, 404

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
    def delete_payment(payment_id, email):
        """
        Delete a payment record (only if it belongs to the user identified by email).
        Returns a success message if deletion is successful.
        """
        user = User.query.filter_by(email=email).first()
        if not user:
            return {"message": "User not found"}, 404

        payment = (
            db.session.query(Payment)
            .join(Booking)
            .filter(Payment.id == payment_id, Booking.user_id == user.id)
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
