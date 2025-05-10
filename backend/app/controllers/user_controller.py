from flask_restful import Resource, Api
from app.services.user_service import UserService

api = Api()

class UserListResource(Resource):
    def get(self):
        # Public endpoint: fetch all users.
        users = UserService.get_all_users()
        return [user.to_dict() for user in users], 200

api.add_resource(UserListResource, '/users')

class UserResource(Resource):
    def get(self, user_id):
        # Public endpoint: fetch details for a user.
        user = UserService.get_user_by_id(user_id)
        if user:
            return user.to_dict(), 200
        return {'message': 'User not found'}, 404

api.add_resource(UserResource, '/users/<int:user_id>')
