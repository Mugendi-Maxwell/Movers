from app.extensions import db

class Payment(db.Model):
    __tablename__ = 'payments'
    
    id = db.Column(db.Integer, primary_key=True)
    booking_id = db.Column(db.Integer, db.ForeignKey('bookings.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), default="pending")  # 'pending', 'confirmed', 'failed'
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    booking = db.relationship('Booking', backref=db.backref('payments', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'booking_id': self.booking_id,
            'amount': self.amount,
            'status': self.status,
            'created_at': self.created_at,
        }
