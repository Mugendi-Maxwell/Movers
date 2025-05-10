from app.extensions import db

class Feedback(db.Model):
    __tablename__ = 'feedback'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comments = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'rating': self.rating,
            'comments': self.comments,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }
