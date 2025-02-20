from app.extensions import db

class Payment(db.Model):
    __tablename__ = 'payments'

    # Define columns
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(120), nullable=False)
    booking_id = db.Column(db.Integer, db.ForeignKey('bookings.id'), nullable=False)

    # Define relationship to the booking
    booking = db.relationship('Booking', backref=db.backref('payments', lazy=True))


