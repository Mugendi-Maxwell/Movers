from flask_restful import Resource
from app.services.admin_payment_service import AdminPaymentService

class AdminPaymentListResource(Resource):
    def get(self):
        """
        Retrieve all payments.
        Only viewing is allowed for admins.
        """
        payments = AdminPaymentService.get_all_payments()
        return payments, 200

class AdminPaymentResource(Resource):
    def get(self, payment_id):
        """
        Retrieve details of a specific payment by its ID.
        """
        payment = AdminPaymentService.get_payment_by_id(payment_id)
        if payment:
            return payment, 200
        return {'message': 'Payment not found'}, 404
