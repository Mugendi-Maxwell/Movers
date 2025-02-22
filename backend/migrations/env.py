from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context
from app import create_app
from app.extensions import db
from app.models.user import User
from app.models.booking import Booking
from app.models.payment import Payment
from app.models.feedback import Feedback
from app.models.inventory import Inventory
# Load Alembic configuration
config = context.config

# Setup logging
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Dynamically set SQLAlchemy database URL from Flask app config
app = create_app()
with app.app_context():
    config.set_main_option("sqlalchemy.url", app.config["SQLALCHEMY_DATABASE_URI"])
    target_metadata = db.metadata


def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations in 'online' mode."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
