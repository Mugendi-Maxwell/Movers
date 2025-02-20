from flask_restful import Resource, Api
from flask import request
from app.services.inventory_service import InventoryService

# Initialize Flask-RESTful API
api = Api()

class InventoryListResource(Resource):
    def get(self):
        # Assume InventoryService.get_all_items() returns a list of dictionaries
        items = InventoryService.get_all_items()
        return items, 200

    def post(self):
        data = request.get_json()
        # Assume InventoryService.create_item(data) returns a dictionary
        item = InventoryService.create_item(data)
        return item, 201

# Register the route for listing and creating inventory items
api.add_resource(InventoryListResource, '/inventory')

class InventoryResource(Resource):
    def get(self, item_id):
        # Assume InventoryService.get_item_by_id returns a dictionary if found, otherwise None
        item = InventoryService.get_item_by_id(item_id)
        if item:
            return item, 200
        return {'message': 'Item not found'}, 404

    def put(self, item_id):
        data = request.get_json()
        # Assume InventoryService.update_item returns the updated item as a dictionary
        item = InventoryService.update_item(item_id, data)
        if item:
            return item, 200
        return {'message': 'Item not found'}, 404

    def delete(self, item_id):
        if InventoryService.delete_item(item_id):
            return {'message': 'Item deleted successfully'}, 200
        return {'message': 'Item not found'}, 404

# Register the route for individual inventory item operations
api.add_resource(InventoryResource, '/inventory/<int:item_id>')
