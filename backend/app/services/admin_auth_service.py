import bcrypt
from app.models.user import User
from app.extensions import db
from flask_jwt_extended import get_jwt_identity, get_jwt
 
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
    def logout_admin():
        """
        Handles admin logout by blacklisting the token and deleting the admin account.
        """
        admin_id = get_jwt_identity()  # Get admin ID from token
        jti = get_jwt()["jti"]  # Retrieve token's unique identifier

        # Add token to blacklist
        jwt_blacklist.add(jti)

        # Find and delete the admin from the database
        admin = Admin.query.get(admin_id)
        if admin:
            db.session.delete(admin)
            db.session.commit()
            return {"message": "Admin account deleted and logged out successfully"}, 200
        
        return {"message": "Admin not found"}, 404
