from app.models.user import User
from app.extensions import db

class UserService:
    @staticmethod
    def get_all_users():
        users = User.query.all()
        return [user.to_dict() for user in users]

    @staticmethod
    def get_user_by_id(user_id):
        user = User.query.get(user_id)
        if user:
            return user.to_dict()
        return None

    @staticmethod
    def create_user(data):
        # Create user using 'name', 'email', and 'password'
        user = User(name=data['name'], email=data['email'], password=data['password'])
        db.session.add(user)
        db.session.commit()
        return user.to_dict()

    @staticmethod
    def update_user(user_id, data):
        user = User.query.get(user_id)
        if not user:
            return None
        # Only update name and email if they exist in the incoming data.
        if "name" in data:
            user.name = data["name"]
        if "email" in data:
            user.email = data["email"]
        try:
            db.session.commit()
            return user.to_dict()
        except Exception as e:
            db.session.rollback()
            return None

    @staticmethod
    def delete_user(user_id):
        user = User.query.get(user_id)
        if user:
            try:
                db.session.delete(user)
                db.session.commit()
                return True
            except Exception as e:
                db.session.rollback()
                return False
        return False
