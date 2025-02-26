from app.models.user import User
from app.extensions import db, jwt_blacklist
from flask_jwt_extended import get_jwt_identity, get_jwt

class AuthService:
    @staticmethod
    def logout_and_delete_user():
        """
        Logs out the user (admin or customer) by blacklisting their token
        and deleting their account.
        """
        user_id = get_jwt_identity()  # Get user ID from JWT token
        jti = get_jwt()["jti"]  # Retrieve token's unique identifier

        # Add token to blacklist
        jwt_blacklist.add(jti)

        # Find the user in the database
        user = User.query.get(user_id)
        if user:
            role = user.role  # Check if user is an 'admin' or 'customer'
            db.session.delete(user)
            db.session.commit()
            return {"message": f"{role.capitalize()} account deleted and logged out successfully"}, 200
        
        return {"message": "User not found"}, 404
