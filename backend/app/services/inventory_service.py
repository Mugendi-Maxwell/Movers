from app.models.inventory import Inventory  # adjust the import path to your Inventory model
from app.extensions import db

class InventoryService:
    @staticmethod
    def get_all_items():
        """Retrieve all inventory items."""
        items = Inventory.query.all()
        return [item.to_dict() for item in items]

    @staticmethod
    def create_item(data):
        """Create a new inventory item."""
        # Extract required fields from the request data
        move_type = data.get("move_type")
        base_price = data.get("base_price")
        
        # Create a new Inventory instance
        new_item = Inventory(move_type=move_type, base_price=base_price)
        db.session.add(new_item)
        db.session.commit()
        return new_item.to_dict()

    @staticmethod
    def get_item_by_id(item_id):
        """Retrieve a specific inventory item by its ID."""
        item = Inventory.query.get(item_id)
        return item.to_dict() if item else None

    @staticmethod
    def update_item(item_id, data):
        """Update an existing inventory item."""
        item = Inventory.query.get(item_id)
        if not item:
            return None

        # Update fields if they exist in the incoming data
        if "move_type" in data:
            item.move_type = data.get("move_type")
        if "base_price" in data:
            item.base_price = data.get("base_price")
        
        db.session.commit()
        return item.to_dict()

    @staticmethod
    def delete_item(item_id):
        """Delete an inventory item."""
        item = Inventory.query.get(item_id)
        if not item:
            return False
        db.session.delete(item)
        db.session.commit()
        return True
