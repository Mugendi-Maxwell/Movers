import os

class Config:
    # General configuration
    SECRET_KEY = os.getenv('SECRET_KEY', 'your_secret_key_here')  # Use environment variable or default value
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Database configuration
    # Default to SQLite for development, PostgreSQL for production
    SQLALCHEMY_DATABASE_URI = os.getenv(
        'DATABASE_URL',  # Use DATABASE_URL for PostgreSQL in deployment
        'sqlite:///movers.db'  # Fallback to SQLite for local development
    )
