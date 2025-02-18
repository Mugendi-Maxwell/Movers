from app.extensions import db

class User(db.Model):
    __tablename__ = 'users'
    
    # Columns
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    
    # Define the relationship with bookings
    bookings = db.relationship('Booking', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.username}>'

    def serialize(self):
        """Serialize the user instance to a dictionary."""
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

    def set_password(self, password):
        """Method to set the password securely."""
        self.password = password

    def check_password(self, password):
        """Method to check the password."""
        return self.password == password  # Ideally, use a hashing function like bcrypt
