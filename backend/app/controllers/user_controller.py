from flask_restful import Resource, Api, request
from app.services.user_service import UserService

api = Api()

class UserListResource(Resource):
    def get(self):
        users = UserService.get_all_users()
        # Since each user is already a dict, just return users.
        return users, 200

    def post(self):
        data = request.get_json()
        user = UserService.create_user(data)
        return user, 201

api.add_resource(UserListResource, '/users')

class UserResource(Resource):
    def get(self, user_id):
        user = UserService.get_user_by_id(user_id)
        if user:
            return user, 200
        return {'message': 'User not found'}, 404

    def put(self, user_id):
        data = request.get_json()
        updated_user = UserService.update_user(user_id, data)
        if updated_user:
            return updated_user, 200
        return {'message': 'User not found or error updating user'}, 404

    def delete(self, user_id):
        if UserService.delete_user(user_id):
            return {'message': 'User deleted successfully'}, 200
        return {'message': 'User not found'}, 404

api.add_resource(UserResource, '/users/<int:user_id>')
