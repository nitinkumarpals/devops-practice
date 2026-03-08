from flask import Flask
import psycopg2
import redis

app = Flask(__name__)

@app.route("/")
def test_all():

    # Postgres Test
    try:
        conn = psycopg2.connect(
            host="db",
            database="postgres",
            user="postgres",
            password="password"
        )
        conn.close()
        db_status = "Postgres OK"
    except:
        db_status = "Postgres Failed"


    # Redis Test
    try:
        r = redis.Redis(host="redis", port=6379)
        r.set("testkey","HelloRedis")
        value = r.get("testkey").decode()

        redis_status = "Redis OK: " + value
    except:
        redis_status = "Redis Failed"


    return db_status + " | " + redis_status


app.run(host="0.0.0.0", port=5000)
