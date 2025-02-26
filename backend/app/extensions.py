from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager

# Initialize extensions
db = SQLAlchemy()
cors = CORS()
jwt = JWTManager()

# Set to store blacklisted tokens
jwt_blacklist = set()
def token_in_blocklist_callback(jwt_header, jwt_payload):
    jti = jwt_payload["jti"]  # Extract the token's unique identifier
    return jti in jwt_blacklist