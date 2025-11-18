Alembic migration helper

Basic instructions to generate and apply migrations for the backend.

- Ensure your virtualenv is active: .venv\Scripts\activate
- Set DATABASE_URL environment variable (or edit app/core/config) so Alembic can connect
- Create an autogenerate migration:
  alembic revision --autogenerate -m "add initial models"
- Apply migrations:
  alembic upgrade head

The alembic.ini is configured to use the application settings for the DB URL.
