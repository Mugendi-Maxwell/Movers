from flask_restful import Resource, Api
from flask import request
from flask_jwt_extended import jwt_required
from app.services.inventory_service import InventoryService

api = Api()

class InventoryListResource(Resource):
    @jwt_required()
    def get(self):
        """Retrieve all inventory items (Admin Only)."""
        return InventoryService.get_all_items()

    @jwt_required()
    def post(self):
        """Create a new inventory item (Admin Only)."""
        data = request.get_json()
        return InventoryService.create_item(data), 201

api.add_resource(InventoryListResource, "/inventory")


class InventoryResource(Resource):
    @jwt_required()
    def get(self, item_id):
        """Retrieve a specific inventory item (Admin Only)."""
        item = InventoryService.get_item_by_id(item_id)
        if item:
            return item, 200
        return {"message": "Item not found"}, 404

    @jwt_required()
    def put(self, item_id):
        """Update an inventory item (Admin Only)."""
        data = request.get_json()
        item = InventoryService.update_item(item_id, data)
        if item:
            return item, 200
        return {"message": "Item not found"}, 404

    @jwt_required()
    def delete(self, item_id):
        """Delete an inventory item (Admin Only)."""
        if InventoryService.delete_item(item_id):
            return {"message": "Item deleted successfully"}, 200
        return {"message": "Item not found"}, 404

api.add_resource(InventoryResource, "/inventory/<int:item_id>")
