"""Remove booking_id from feedback model

Revision ID: e4536968f524
Revises: b1035698a7b2
Create Date: 2025-02-28 01:17:32.544662

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = 'e4536968f524'
down_revision: Union[str, None] = 'b1035698a7b2'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Use batch_alter_table for SQLite to drop the booking_id column.
    with op.batch_alter_table('feedback', schema=None) as batch_op:
        batch_op.drop_column('booking_id')


def downgrade() -> None:
    # Recreate the booking_id column and its foreign key constraint.
    with op.batch_alter_table('feedback', schema=None) as batch_op:
        batch_op.add_column(sa.Column('booking_id', sa.Integer(), nullable=False))
        batch_op.create_foreign_key(None, 'bookings', ['booking_id'], ['id'])
