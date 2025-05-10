"""Your migration message

Revision ID: b1035698a7b2
Revises: 1acdb77f1ae9
Create Date: 2025-02-27 23:17:44.674106

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa
from sqlalchemy import text  # Import text for raw SQL execution

# revision identifiers, used by Alembic.
revision: str = 'b1035698a7b2'
down_revision: Union[str, None] = '1acdb77f1ae9'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    conn = op.get_bind()
    # Get a list of existing columns in the 'bookings' table.
    existing_columns = [row[1] for row in conn.execute(text("PRAGMA table_info(bookings)")).fetchall()]

    # Conditionally add new columns if they do not exist.
    if 'pickup_location' not in existing_columns:
        op.add_column('bookings', sa.Column('pickup_location', sa.String(length=255), nullable=True))
    if 'dropoff_location' not in existing_columns:
        op.add_column('bookings', sa.Column('dropoff_location', sa.String(length=255), nullable=True))
    if 'move_date' not in existing_columns:
        op.add_column('bookings', sa.Column('move_date', sa.DateTime(), nullable=True))

    # Copy data from the old 'date' column into 'move_date' if not already set.
    op.execute(text("UPDATE bookings SET move_date = date WHERE move_date IS NULL"))

    # Set default values for new columns for existing rows.
    op.execute(text("UPDATE bookings SET pickup_location = 'Unknown' WHERE pickup_location IS NULL"))
    op.execute(text("UPDATE bookings SET dropoff_location = 'Unknown' WHERE dropoff_location IS NULL"))

    # Drop the old "date" column if it exists.
    if 'date' in existing_columns:
        with op.batch_alter_table('bookings', schema=None) as batch_op:
            batch_op.drop_column('date')

    # Alter the new columns to be NOT NULL.
    with op.batch_alter_table('bookings', schema=None) as batch_op:
        batch_op.alter_column('pickup_location', nullable=False)
        batch_op.alter_column('dropoff_location', nullable=False)
        batch_op.alter_column('move_date', nullable=False)

def downgrade() -> None:
    with op.batch_alter_table('bookings', schema=None) as batch_op:
        batch_op.add_column(sa.Column('date', sa.DateTime(), nullable=True))

    op.execute(text("UPDATE bookings SET date = move_date"))

    with op.batch_alter_table('bookings', schema=None) as batch_op:
        batch_op.alter_column('date', nullable=False)
        batch_op.drop_column('move_date')
        batch_op.drop_column('dropoff_location')
        batch_op.drop_column('pickup_location')
