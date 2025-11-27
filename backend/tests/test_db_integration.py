import os
import psycopg2


def get_db_conn():
    url = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@127.0.0.1:5432/postgres")
    # psycopg2 accepts a libpq connection string
    try:
        return psycopg2.connect(dsn=url)
    except Exception as e:
        # If DB is not available (e.g., Docker not running), raise to allow caller to skip
        raise


def test_postgres_connection_and_simple_query():
    try:
        conn = get_db_conn()
    except Exception as exc:
        # Skip this integration test when a Postgres DB is not reachable locally.
        # This allows running the repo tests without Docker; CI (or a developer) can run this when DB is available.
        import pytest

        pytest.skip(f"Postgres not available locally, skipping integration test: {exc}")
    cur = conn.cursor()
    try:
        cur.execute("CREATE TABLE IF NOT EXISTS test_integration (id SERIAL PRIMARY KEY, name TEXT);")
        cur.execute("INSERT INTO test_integration (name) VALUES (%s) RETURNING id;", ("alice",))
        new_id = cur.fetchone()[0]
        conn.commit()

        cur.execute("SELECT name FROM test_integration WHERE id = %s;", (new_id,))
        row = cur.fetchone()
        assert row is not None and row[0] == "alice"
    finally:
        # cleanup
        cur.execute("DROP TABLE IF EXISTS test_integration;")
        conn.commit()
        cur.close()
        conn.close()
