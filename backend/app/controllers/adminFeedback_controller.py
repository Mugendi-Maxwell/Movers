from flask_restful import Resource, Api
from flask import request
from app.models.feedback import Feedback
from app.extensions import db

api = Api()

class AdminFeedbackListResource(Resource):
    def options(self):
        # Handle CORS preflight for /admin/feedback
        return {}, 200

    def get(self):
        """
        Retrieve a list of all feedback records.
        Admins can view feedback from all users.
        """
        feedbacks = Feedback.query.all()
        return [fb.to_dict() for fb in feedbacks], 200

class AdminFeedbackResource(Resource):
    def options(self, feedback_id):
        # Handle CORS preflight for /admin/feedback/<feedback_id>
        return {}, 200

    def get(self, feedback_id):
        """
        Retrieve details of a specific feedback entry by its ID.
        """
        feedback = Feedback.query.get(feedback_id)
        if feedback:
            return feedback.to_dict(), 200
        return {"message": "Feedback not found"}, 404

    def delete(self, feedback_id):
        """
        Delete a specific feedback entry.
        """
        feedback = Feedback.query.get(feedback_id)
        if not feedback:
            return {"message": "Feedback not found"}, 404
        try:
            db.session.delete(feedback)
            db.session.commit()
            return {"message": "Feedback deleted successfully"}, 200
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 500

api.add_resource(AdminFeedbackListResource, '/admin/feedback')
api.add_resource(AdminFeedbackResource, '/admin/feedback/<int:feedback_id>')
