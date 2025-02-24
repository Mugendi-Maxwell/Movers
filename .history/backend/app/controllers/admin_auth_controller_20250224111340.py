from flask_restful import Resource
from flask import request
from app.services.admin_auth_service import AdminAuthService

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

        # Call the admin authentication service to validate credentials.
        admin_data, error = AdminAuthService.login_admin(email, password)
        if error:
            return {"message": error}, 401
        
        # If using token-based authentication, you might issue a JWT here.
        return {"message": "Login successful", "admin": admin_data}, 200

class AdminLogoutResource(Resource):
    def post(self):
        """
        Endpoint: POST /admin/logout
        For stateless (JWT-based) systems, logout is typically handled on the client side.
        This endpoint simply confirms logout.
        """
        return {"message": "Logout successful"}, 200
