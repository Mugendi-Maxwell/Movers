from flask_restful import Resource
from flask import request
from app.services.feedback_service import FeedbackService

class FeedbackListResource(Resource):
    def get(self):
        """
        Retrieve all feedback records.
        (In a production scenario, you would typically filter this to only include feedback 
         for the authenticated user.)
        """
        feedbacks = FeedbackService.get_all_feedback()
        return feedbacks, 200

    def post(self):
        """
        Create a new feedback entry.
        Expected JSON payload:
        {
            "user_id": 1,
            "booking_id": 1,
            "rating": 5,
            "comments": "Excellent service!"
        }
        """
        data = request.get_json()
        feedback = FeedbackService.create_feedback(data)
        return feedback, 201

class FeedbackResource(Resource):
    def get(self, feedback_id):
        """
        Retrieve details for a specific feedback entry by ID.
        """
        feedback = FeedbackService.get_feedback_by_id(feedback_id)
        if feedback:
            return feedback, 200
        return {'message': 'Feedback not found'}, 404

    def put(self, feedback_id):
        """
        Update an existing feedback entry.
        Expected JSON payload (fields to update, e.g., rating and/or comments):
        {
            "rating": 4,
            "comments": "Good service, but room for improvement."
        }
        """
        data = request.get_json()
        feedback = FeedbackService.update_feedback(feedback_id, data)
        if feedback:
            return feedback, 200
        return {'message': 'Feedback not found'}, 404

    def delete(self, feedback_id):
        """
        Delete a feedback entry.
        """
        if FeedbackService.delete_feedback(feedback_id):
            return {'message': 'Feedback deleted successfully'}, 200
        return {'message': 'Feedback not found'}, 404
