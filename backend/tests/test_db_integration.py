import os
import psycopg2


def get_db_conn():
    url = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@127.0.0.1:5432/postgres")
    # psycopg2 accepts a libpq connection string
    return psycopg2.connect(dsn=url)


def test_postgres_connection_and_simple_query():
    conn = get_db_conn()
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
