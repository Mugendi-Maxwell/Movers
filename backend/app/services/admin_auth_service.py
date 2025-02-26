import bcrypt
from app.models.user import User  # No separate Admin model; using User model
from app.extensions import db, jwt_blacklist
from flask_jwt_extended import create_access_token, get_jwt_identity, get_jwt

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
            role='admin'  # Set role as 'admin'
        )
        db.session.add(new_admin)
        db.session.commit()
        return new_admin.to_dict(), None

    @staticmethod
    def login_admin(data):
        """
        Handles admin login by verifying credentials and returning a JWT token.
        Args:
            data (dict): Contains 'email' and 'password'.
        Returns:
            tuple: (response_data, error)
        """
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return None, "Email and password are required."

        # Check if the user exists and has the 'admin' role
        admin = User.query.filter_by(email=email, role="admin").first()
        if not admin:
            return None, "Admin not found."

        # Verify the password
        if bcrypt.checkpw(password.encode('utf-8'), admin.password.encode('utf-8')):
            # Generate JWT token
            access_token = create_access_token(identity=admin.id)
            return {"message": "Login successful", "admin": admin.to_dict(), "token": access_token}, None
        else:
            return None, "Incorrect password"

    @staticmethod
    def logout_admin():
        """
        Handles admin logout by blacklisting the token and deleting the admin account.
        """
        admin_id = get_jwt_identity()  # Get admin ID from token
        jti = get_jwt()["jti"]  # Retrieve token's unique identifier

        
        jwt_blacklist.add(jti)

        # Find and delete the admin from the database
        admin = User.query.filter_by(id=admin_id, role="admin").first()  # Check role explicitly
        if admin:
            db.session.delete(admin)
            db.session.commit()
            return {"message": "Admin account deleted and logged out successfully"}, 200
        
        return {"message": "Admin not found or already deleted"}, 404
