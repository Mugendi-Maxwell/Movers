from app import create_app
from app.extensions import db

# Create the Flask app instance
app = create_app()

# Manage the database tables
with app.app_context():
    db.drop_all()  # Drop all tables
    db.create_all()  # Recreate tables
    print("Tables dropped and recreated successfully.")
