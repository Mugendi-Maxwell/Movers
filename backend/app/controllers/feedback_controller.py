from flask_restful import Resource, Api
from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services.feedback_service import FeedbackService

api = Api()

class FeedbackListResource(Resource):
    @jwt_required()
    def get(self):
        """
        Retrieve all feedback records for the authenticated user.
        Each feedback record is returned as a dictionary:
          {
            'id': <int>,
            'user_id': <int>,
            'rating': <int>,
            'comments': <str>,
            'created_at': <ISO formatted datetime or None>,
          }
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
            "rating": <number>,
            "comments": <string> (optional),
            "mood": <number> (optional)
          }
        The user_id is extracted from the JWT.
        Returns the newly created feedback in the format:
          {
            'id': <int>,
            'user_id': <int>,
            'rating': <int>,
            'comments': <str>,
            'created_at': <ISO formatted datetime or None>,
          }
        """
        data = request.get_json()
        user_id = get_jwt_identity()  # Get authenticated user ID

        # Ensure required fields are present
        if not data.get("rating"):
            return {"message": "Rating is required."}, 400

        # Attach user_id from JWT
        data["user_id"] = user_id
        feedback = FeedbackService.create_feedback(data)
        return feedback, 201

class FeedbackResource(Resource):
    @jwt_required()
    def get(self, feedback_id):
        """
        Retrieve details for a specific feedback entry by ID.
        Only the feedback owner can access it.
        Returns a dictionary in the format:
          {
            'id': <int>,
            'user_id': <int>,
            'rating': <int>,
            'comments': <str>,
            'created_at': <ISO formatted datetime or None>,
          }
        """
        user_id = get_jwt_identity()
        feedback = FeedbackService.get_feedback_by_id(feedback_id)
        if feedback and feedback.get("user_id") == user_id:
            return feedback, 200
        return {"message": "Feedback not found or unauthorized."}, 404

    @jwt_required()
    def put(self, feedback_id):
        """
        Update an existing feedback entry.
        Expected JSON payload (fields to update):
          {
            "rating": <number>,
            "comments": <string>
          }
        Only the owner of the feedback can update it.
        Returns the updated feedback record.
        """
        user_id = get_jwt_identity()
        feedback = FeedbackService.get_feedback_by_id(feedback_id)
        if not feedback or feedback.get("user_id") != user_id:
            return {"message": "Feedback not found or unauthorized."}, 404

        data = request.get_json()
        updated_feedback = FeedbackService.update_feedback(feedback_id, data)
        return updated_feedback, 200

    @jwt_required()
    def delete(self, feedback_id):
        """
        Delete a feedback entry.
        Only the owner of the feedback can delete it.
        Returns a success message if deletion is successful.
        """
        user_id = get_jwt_identity()
        feedback = FeedbackService.get_feedback_by_id(feedback_id)
        if not feedback or feedback.get("user_id") != user_id:
            return {"message": "Feedback not found or unauthorized."}, 404

        FeedbackService.delete_feedback(feedback_id)
        return {"message": "Feedback deleted successfully"}, 200

api.add_resource(FeedbackListResource, '/feedback')
api.add_resource(FeedbackResource, '/feedback/<int:feedback_id>')
