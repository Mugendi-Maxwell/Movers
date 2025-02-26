from app.extensions import db

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)  # Stores the hashed password
    role = db.Column(db.String(20), default="customer")  # 'customer' or 'admin'
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    def to_dict(self):
     return {
        'id': self.id,
        'booking_id': self.booking_id,
        'amount': self.amount,
        'status': self.status,
        'created_at': self.created_at.isoformat() if self.created_at else None,
    }

