from flask_restful import Resource
from flask import request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt
from app.services.admin_auth_service import AdminAuthService
from app.extensions import jwt_blacklist  
from app.services.auth_service import AuthService

class AdminSignupResource(Resource):
    def post(self):
        """
        Endpoint: POST /admin/signup
        Expects a JSON payload with:
        {
            "name": "Admin Name",
            "email": "admin@example.com",
            "password": "plaintext_password"
        }
        Creates a new user in the users table with role set to "admin".
        """
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")
        name = data.get("name")
        
        if not email or not password or not name:
            return {"message": "Name, email, and password are required."}, 400

        # Call the admin auth service to sign up an admin
        admin_data, error = AdminAuthService.signup_admin(data)
        if error:
            return {"message": error}, 400

        # Generate JWT token for the newly created admin
        access_token = create_access_token(identity=admin_data["id"])

        return {"message": "Admin signup successful", "admin": admin_data, "token": access_token}, 201


class AdminLoginResource(Resource):
    def post(self):
        """
        Endpoint: POST /admin/login
        Expects a JSON payload with:
        {
            "email": "admin@example.com",
            "password": "plaintext_password"
        }
        Verifies the credentials using bcrypt and returns admin info on success.
        """
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")
        
        if not email or not password:
            return {"message": "Email and password are required."}, 400

        admin_data, error = AdminAuthService.login_admin(email, password)
        if error:
            return {"message": error}, 401

        # Generate JWT token
        access_token = create_access_token(identity=admin_data["id"])

        return {"message": "Login successful", "admin": admin_data, "token": access_token}, 200


class AdminLogoutResource(Resource):
    @jwt_required()
    def post(self):
        """
        POST /admin/logout
        Calls AuthService to log out and delete the admin account.
        """
        return AuthService.logout_and_delete_user()
