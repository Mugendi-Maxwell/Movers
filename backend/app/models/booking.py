from app.extensions import db


class Booking(db.Model):
    __tablename__ = 'bookings'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # ForeignKey linking to User.id
    service = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(50), nullable=False)

    # Establish relationship with User
    user = db.relationship('User', back_populates='bookings')