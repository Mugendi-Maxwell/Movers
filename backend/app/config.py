import os
from dotenv import load_dotenv

# Load environment variables from a .env file if it exists
load_dotenv()

# Get the base directory of the project (one level up from the current file's directory)
basedir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

class Config:
    # General configuration
    SECRET_KEY = os.getenv('SECRET_KEY', 'your_secret_key_here')  # Use environment variable or default value
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Database configuration
    # Default to SQLite for development, PostgreSQL for production
    SQLALCHEMY_DATABASE_URI = os.getenv(
        'DATABASE_URL',  # Use DATABASE_URL for PostgreSQL in deployment
        f"sqlite:///{os.path.join(basedir, 'movers.db')}"  # Fallback to SQLite with absolute path for local development
    )
