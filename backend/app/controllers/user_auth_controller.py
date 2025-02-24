from flask_restful import Resource
from flask import request
from app.models.user import User
from app.extensions import db
import bcrypt

class UserSignupResource(Resource):
    def post(self):
        """
        POST /users/signup
        Expected JSON payload:
        {
            "name": "John Doe",
            "email": "john@example.com",
            "password": "plaintext_password"
        }
        This endpoint creates a new user after hashing the password using bcrypt.
        """
        data = request.get_json()

        # Validate required fields
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        if not name or not email or not password:
            return {"message": "Name, email, and password are required."}, 400

        # Check if a user with the given email already exists
        if User.query.filter_by(email=email).first():
            return {"message": "User with this email already exists."}, 400

        # Hash the password using bcrypt
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        # Convert hashed password bytes to string for storage
        hashed_password = hashed_password.decode('utf-8')

        # Create a new User instance
        new_user = User(
            name=name,
            email=email,
            password=hashed_password  # Store the hashed password
        )
        db.session.add(new_user)
        db.session.commit()

        # Return a success message and user data (excluding password)
        return {"message": "User created successfully", "user": new_user.to_dict()}, 201

class UserLoginResource(Resource):
    def post(self):
        """
        POST /users/login
        Expected JSON payload:
        {
            "email": "john@example.com",
            "password": "plaintext_password"
        }
        This endpoint verifies the admin credentials and returns user info on success.
        """
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return {"message": "Email and password are required."}, 400

        user = User.query.filter_by(email=email).first()
        if not user:
            return {"message": "User not found."}, 404

        # Compare the provided password with the stored hashed password
        if bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
            return {"message": "Login successful", "user": user.to_dict()}, 200
        else:
            return {"message": "Incorrect password"}, 401

class UserLogoutResource(Resource):
    def post(self):
        """
        POST /users/logout
        Since logout in a stateless API (e.g., JWT based) is generally handled client-side,
        this endpoint simply returns a logout confirmation.
        """
        return {"message": "Logout successful"}, 200
