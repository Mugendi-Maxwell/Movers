from app.extensions import db

class Inventory(db.Model):
    __tablename__ = 'inventory'
    
    id = db.Column(db.Integer, primary_key=True)
    move_type = db.Column(db.String(50), unique=True, nullable=False) 
    base_price = db.Column(db.Float, nullable=False)  
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    def to_dict(self):
        return {
            'id': self.id,
            'move_type': self.move_type,
            'base_price': self.base_price,
            'created_at': self.created_at,
        }
