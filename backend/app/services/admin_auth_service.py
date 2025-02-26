import bcrypt
from app.models.user import User
from app.extensions import db

class AdminAuthService:
    @staticmethod
    def signup_admin(data):
        """
        Registers a new admin by inserting a record into the User model with role "admin".
        Args:
            data (dict): Contains 'name', 'email', and 'password'.
        Returns:
            tuple: (admin_data, error) where admin_data is a dictionary of the admin's info if successful.
        """
        email = data.get('email')
        password = data.get('password')
        name = data.get('name')
        
        # Check if a user with the given email already exists
        existing = User.query.filter_by(email=email).first()
        if existing:
            return None, "User with this email already exists."

        # Hash the password using bcrypt
        hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        # Create a new admin user by setting role to 'admin'
        new_admin = User(
            name=name,
            email=email,
            password=hashed,
            role='admin'
        )
        db.session.add(new_admin)
        db.session.commit()
        return new_admin.to_dict(), None

    @staticmethod
    def login_admin(email, password):
        """
        Authenticate an admin using the User model.
        Args:
            email (str): The admin's email.
            password (str): The plaintext password.
        Returns:
            tuple: (admin_data, error) where admin_data is a dictionary if authentication is successful.
        """
        admin = User.query.filter_by(email=email, role='admin').first()
        if not admin:
            return None, "Admin not found."

        if bcrypt.checkpw(password.encode('utf-8'), admin.password.encode('utf-8')):
            return admin.to_dict(), None
        else:
            return None, "Incorrect password."
