# app/services/auth_service.py

from flask import jsonify
from flask_jwt_extended import get_jwt



def logout_user():
    
    
    return {"message": "Logout successful"}, 200
