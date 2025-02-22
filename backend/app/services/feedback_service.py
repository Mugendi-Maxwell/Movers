from app.models.feedback import Feedback
from app.extensions import db

class FeedbackService:
    @staticmethod
    def get_all_feedback():
        """
        Retrieve all feedback records.
        In a real application, you might filter by the authenticated user's ID.
        """
        feedbacks = Feedback.query.all()
        return [fb.to_dict() for fb in feedbacks]

    @staticmethod
    def get_feedback_by_id(feedback_id):
        """
        Retrieve a specific feedback record by its ID.
        """
        fb = Feedback.query.get(feedback_id)
        if fb:
            return fb.to_dict()
        return None

    @staticmethod
    def create_feedback(data):
        """
        Create a new feedback entry.
        Expected keys: 'user_id', 'booking_id', 'rating', 'comments' (optional)
        """
        new_feedback = Feedback(
            user_id=data.get('user_id'),
            booking_id=data.get('booking_id'),
            rating=data.get('rating'),
            comments=data.get('comments')
        )
        db.session.add(new_feedback)
        db.session.commit()
        return new_feedback.to_dict()

    @staticmethod
    def update_feedback(feedback_id, data):
        """
        Update an existing feedback entry.
        Expected keys (if provided): 'rating', 'comments'
        """
        fb = Feedback.query.get(feedback_id)
        if fb:
            if 'rating' in data:
                fb.rating = data['rating']
            if 'comments' in data:
                fb.comments = data['comments']
            db.session.commit()
            return fb.to_dict()
        return None

    @staticmethod
    def delete_feedback(feedback_id):
        """
        Delete a feedback entry.
        """
        fb = Feedback.query.get(feedback_id)
        if fb:
            db.session.delete(fb)
            db.session.commit()
            return True
        return False
