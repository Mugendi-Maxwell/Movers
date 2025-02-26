from flask_restful import Resource
from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services.feedback_service import FeedbackService

class FeedbackListResource(Resource):
    @jwt_required()
    def get(self):
        """
        Retrieve all feedback records for the authenticated user.
        """
        user_id = get_jwt_identity()  # Get authenticated user ID
        feedbacks = FeedbackService.get_feedback_by_user(user_id)
        return feedbacks, 200

    @jwt_required()
    def post(self):
        """
        Create a new feedback entry.
        Expected JSON payload:
        {
            "booking_id": 1,
            "rating": 5,
            "comments": "Excellent service!"
        }
        """
        data = request.get_json()
        user_id = get_jwt_identity()  # Get authenticated user ID

        # Ensure required fields are present
        if not data.get("booking_id") or not data.get("rating"):
            return {"message": "Booking ID and rating are required."}, 400

        data["user_id"] = user_id  # Attach user ID from JWT
        feedback = FeedbackService.create_feedback(data)
        return feedback, 201

class FeedbackResource(Resource):
    @jwt_required()
    def get(self, feedback_id):
        """
        Retrieve details for a specific feedback entry by ID.
        Ensures that only the feedback owner can access it.
        """
        user_id = get_jwt_identity()
        feedback = FeedbackService.get_feedback_by_id(feedback_id)

        if feedback and feedback["user_id"] == user_id:
            return feedback, 200
        return {"message": "Feedback not found or unauthorized."}, 404

    @jwt_required()
    def put(self, feedback_id):
        """
        Update an existing feedback entry.
        Only the owner of the feedback can update it.
        Expected JSON payload:
        {
            "rating": 4,
            "comments": "Good service, but room for improvement."
        }
        """
        user_id = get_jwt_identity()
        feedback = FeedbackService.get_feedback_by_id(feedback_id)

        if not feedback or feedback["user_id"] != user_id:
            return {"message": "Feedback not found or unauthorized."}, 404

        data = request.get_json()
        updated_feedback = FeedbackService.update_feedback(feedback_id, data)
        return updated_feedback, 200

    @jwt_required()
    def delete(self, feedback_id):
        """
        Delete a feedback entry.
        Only the owner of the feedback can delete it.
        """
        user_id = get_jwt_identity()
        feedback = FeedbackService.get_feedback_by_id(feedback_id)

        if not feedback or feedback["user_id"] != user_id:
            return {"message": "Feedback not found or unauthorized."}, 404

        FeedbackService.delete_feedback(feedback_id)
        return {"message": "Feedback deleted successfully"}, 200
