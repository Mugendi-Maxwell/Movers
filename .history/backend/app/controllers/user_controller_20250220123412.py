# from flask_restful import Resource, Api
# from flask import request, jsonify
# from app.services.user_service import UserService

# # Initialize Flask-RESTful API
# api = Api()

# class UserListResource(Resource):
#     def get(self):
#         users = UserService.get_all_users()
#         return jsonify([user.serialize() for user in users])

#     def post(self):
#         data = request.get_json()
#         user = UserService.create_user(data)
#         return jsonify(user.serialize()), 201

# # Register the route
# api.add_resource(UserListResource, '/users')

# class UserResource(Resource):
#     def get(self, user_id):
#         user = UserService.get_user_by_id(user_id)
#         if user:
#             return jsonify(user.serialize())
#         return {'message': 'User not found'}, 404

#     def put(self, user_id):
#         data = request.get_json()
#         user = UserService.update_user(user_id, data)
#         if user:
#             return jsonify(user.serialize())
#         return {'message': 'User not found'}, 404

#     def delete(self, user_id):
#         if UserService.delete_user(user_id):
#             return {'message': 'User deleted successfully'}, 200
#         return {'message': 'User not found'}, 404

# # Register the individual user route
# api.add_resource(UserResource, '/users/<int:user_id>')


from flask_restful import Resource, Api
from flask import request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.services.user_service import UserService

# Initialize Flask-RESTful API
api = Api()

class UserListResource(Resource):
    def get(self):
        users = UserService.get_all_users()
        return jsonify([user.serialize() for user in users])

    def post(self):
        data = request.get_json()
        user = UserService.create_user(data)
        return jsonify(user.serialize()), 201

# Register the route
api.add_resource(UserListResource, '/users')

class UserResource(Resource):
    @jwt_required()
    def get(self, user_id):
        user = UserService.get_user_by_id(user_id)
        if user:
            return jsonify(user.serialize())
        return {'message': 'User not found'}, 404

    @jwt_required()
    def put(self, user_id):
        data = request.get_json()
        user = UserService.update_user(user_id, data)
        if user:
            return jsonify(user.serialize())
        return {'message': 'User not found'}, 404

    @jwt_required()
    def delete(self, user_id):
        if UserService.delete_user(user_id):
            return {'message': 'User deleted successfully'}, 200
        return {'message': 'User not found'}, 404

# Register the individual user route
api.add_resource(UserResource, '/users/<int:user_id>')

class AuthResource(Resource):
    def post(self):
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")
        user = UserService.authenticate_user(email, password)
        if user:
            access_token = create_access_token(identity=user.id)
            return jsonify(access_token=access_token)
        return {'message': 'Invalid credentials'}, 401

api.add_resource(AuthResource, '/auth/login')
