from app.models.feedback import Feedback
from app.extensions import db
from flask_jwt_extended import get_jwt_identity

class FeedbackService:
    @staticmethod
    def get_all_feedback():
        """
        Retrieve all feedback records for the authenticated user.
        """
        user_id = get_jwt_identity()  # ✅ Get user ID from JWT
        feedbacks = Feedback.query.filter_by(user_id=user_id).all()
        return [fb.to_dict() for fb in feedbacks]

    @staticmethod
    def get_feedback_by_id(feedback_id):
        """
        Retrieve a specific feedback record by ID (only if it belongs to the user).
        """
        user_id = get_jwt_identity()
        fb = Feedback.query.filter_by(id=feedback_id, user_id=user_id).first()
        if not fb:
            return {"message": "Feedback not found or unauthorized"}, 404
        return fb.to_dict(), 200

    @staticmethod
    def create_feedback(data):
        """
        Create a new feedback entry.
        Expected keys: 'booking_id', 'rating', 'comments' (optional)
        """
        user_id = get_jwt_identity()  # ✅ Extract user_id from JWT

        # Validate required fields
        if "booking_id" not in data or "rating" not in data:
            return {"message": "Missing required fields: 'booking_id' and 'rating'"}, 400

        new_feedback = Feedback(
            user_id=user_id,  # ✅ Set user_id from JWT
            booking_id=data["booking_id"],
            rating=data["rating"],
            comments=data.get("comments", "")  # Optional field
        )

        try:
            db.session.add(new_feedback)
            db.session.commit()
            return new_feedback.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 500

    @staticmethod
    def update_feedback(feedback_id, data):
        """
        Update an existing feedback entry (only if the user owns it).
        Expected keys (optional): 'rating', 'comments'
        """
        user_id = get_jwt_identity()
        fb = Feedback.query.filter_by(id=feedback_id, user_id=user_id).first()

        if not fb:
            return {"message": "Feedback not found or unauthorized"}, 404

        # Update fields if provided
        if "rating" in data:
            fb.rating = data["rating"]
        if "comments" in data:
            fb.comments = data["comments"]

        try:
            db.session.commit()
            return fb.to_dict(), 200
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 500

    @staticmethod
    def delete_feedback(feedback_id):
        """
        Delete a feedback entry (only if the user owns it).
        """
        user_id = get_jwt_identity()
        fb = Feedback.query.filter_by(id=feedback_id, user_id=user_id).first()

        if not fb:
            return {"message": "Feedback not found or unauthorized"}, 404

        try:
            db.session.delete(fb)
            db.session.commit()
            return {"message": "Feedback deleted successfully"}, 200
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 500
