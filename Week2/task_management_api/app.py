import os
from dotenv import load_dotenv

import bcrypt
import psycopg2
from psycopg2 import OperationalError, IntegrityError
from flask import Flask, jsonify, request

load_dotenv()

app = Flask(__name__)


# ---------- Database helpers ------------------------------------------------- #
def get_db_connection():
    """
    Create a new psycopg2 connection using environment variables.
    """
    try:
        return psycopg2.connect(
            host=os.getenv("DB_HOST", "localhost"),
            dbname=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            port=os.getenv("DB_PORT", "5432"),
        )
    except OperationalError as exc:
        app.logger.error(f"Database connection failed: {exc}")
        raise


def execute_query(query: str, params=None, *, fetch=False, fetch_one=False):
    """
    Utility wrapper around cursor.execute that:
        • automatically commits / rolls-back
        • safely parameterises queries
        • returns fetched rows (tuple or list[tuple])
    """
    conn = cursor = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(query, params or ())

        if fetch_one:
            result = cursor.fetchone()
        elif fetch:
            result = cursor.fetchall()
        else:
            result = None

        conn.commit()
        return result
    except Exception as exc:
        if conn:
            conn.rollback()
        app.logger.error(
            f"Query failed: {exc}\nQuery: {query}\nParams: {params}"
        )
        raise
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()


# ---------- Password helpers ------------------------------------------------- #
def hash_password(password: str) -> str:
    """
    Hash the plain-text password using bcrypt and return a utf-8 string.
    """
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    """
    Compare plain text password against a stored bcrypt hash (utf-8 string).
    """
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))


# ---------- Health check ----------------------------------------------------- #
@app.get("/health")
def health_check():
    return jsonify({"status": "healthy", "message": "API is running"}), 200


# ---------- User endpoints --------------------------------------------------- #
@app.post("/users")
def create_user():
    try:
        data = request.get_json(force=True)

        # Validation
        for field in ("username", "email", "password"):
            if field not in data:
                return jsonify({"error": f"{field} is required"}), 400

        user_row = execute_query(
            """
            INSERT INTO users (username, email, password_hash, full_name)
            VALUES (%s, %s, %s, %s)
            RETURNING user_id, username, email, full_name, created_at;
            """,
            (
                data["username"],
                data["email"],
                hash_password(data["password"]),
                data.get("full_name"),
            ),
            fetch_one=True,
        )

        user = {
            "user_id": user_row[0],
            "username": user_row[1],
            "email": user_row[2],
            "full_name": user_row[3],
            "created_at": user_row[4].isoformat(),
        }
        return jsonify(user), 201

    except IntegrityError as exc:
        # assumes UNIQUE (username) and UNIQUE (email)
        if "username" in str(exc):
            return jsonify({"error": "Username already exists"}), 409
        if "email" in str(exc):
            return jsonify({"error": "Email already exists"}), 409
        return jsonify({"error": "Database integrity error"}), 400
    except OperationalError:
        return jsonify({"error": "Database unavailable"}), 503
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


@app.post("/login")
def login():
    try:
        data = request.get_json(force=True)
        if "email" not in data or "password" not in data:
            return jsonify({"error": "Email and password are required"}), 400

        user_row = execute_query(
            "SELECT user_id, email, password_hash FROM users WHERE email = %s",
            (data["email"],),
            fetch_one=True,
        )
        if not user_row:
            return jsonify({"error": "Invalid credentials"}), 401

        user_id, email, password_hash = user_row

        if not verify_password(data["password"], password_hash):
            return jsonify({"error": "Invalid credentials"}), 401

        return jsonify({"user_id": user_id, "email": email}), 200

    except OperationalError:
        return jsonify({"error": "Database unavailable"}), 503
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


# ---------- Project endpoints ------------------------------------------------ #
@app.post("/projects")
def create_project():
    try:
        data = request.get_json(force=True)

        for field in ("title", "owner_id"):
            if field not in data:
                return jsonify({"error": f"{field} is required"}), 400

        owner = execute_query(
            "SELECT user_id FROM users WHERE user_id = %s",
            (data["owner_id"],),
            fetch_one=True,
        )
        if not owner:
            return jsonify({"error": "Specified owner does not exist"}), 404

        proj_row = execute_query(
            """
            INSERT INTO projects (title, description, owner_id, status, deadline)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING project_id, title, owner_id, status, created_at;
            """,
            (
                data["title"],
                data.get("description"),
                data["owner_id"],
                data.get("status", "active"),
                data.get("deadline"),
            ),
            fetch_one=True,
        )

        project = {
            "project_id": proj_row[0],
            "title": proj_row[1],
            "owner_id": proj_row[2],
            "status": proj_row[3],
            "created_at": proj_row[4].isoformat(),
        }
        return jsonify(project), 201

    except OperationalError:
        return jsonify({"error": "Database unavailable"}), 503
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


# ---------- Task endpoints --------------------------------------------------- #
VALID_STATUSES = {"todo", "in_progress", "review", "done"}


@app.get("/tasks")
def get_all_tasks():
    """
    Retrieve tasks with optional filters (?status=&priority=&project_id=&assignee_id=)
    """
    try:
        status = request.args.get("status")
        priority = request.args.get("priority")
        project_id = request.args.get("project_id")
        assignee_id = request.args.get("assignee_id")

        base_query = """
            SELECT t.task_id, t.title, t.description, t.status, t.priority,
                   t.due_date, t.created_at, t.updated_at,
                   p.project_id, p.title,
                   u.user_id, u.username
            FROM tasks t
            LEFT JOIN projects p ON t.project_id = p.project_id
            LEFT JOIN users u     ON t.assignee_id = u.user_id
            WHERE 1 = 1
        """
        params = []

        if status:
            base_query += " AND t.status = %s"
            params.append(status)
        if priority:
            base_query += " AND t.priority = %s"
            params.append(int(priority))
        if project_id:
            base_query += " AND t.project_id = %s"
            params.append(int(project_id))
        if assignee_id:
            base_query += " AND t.assignee_id = %s"
            params.append(int(assignee_id))

        rows = execute_query(base_query, params, fetch=True)

        tasks = []
        for r in rows:
            tasks.append(
                {
                    "task_id": r[0],
                    "title": r[1],
                    "description": r[2],
                    "status": r[3],
                    "priority": r[4],
                    "due_date": r[5].isoformat() if r[5] else None,
                    "created_at": r[6].isoformat() if r[6] else None,
                    "updated_at": r[7].isoformat() if r[7] else None,
                    "project": {"project_id": r[8], "title": r[9]} if r[8] else None,
                    "assignee": {"user_id": r[10], "username": r[11]} if r[10] else None,
                }
            )

        return jsonify({"tasks": tasks}), 200

    except ValueError:
        return jsonify({"error": "Invalid filter parameter"}), 400
    except OperationalError:
        return jsonify({"error": "Database unavailable"}), 503
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


@app.get("/tasks/<int:task_id>")
def get_task(task_id):
    try:
        r = execute_query(
            """
            SELECT t.task_id, t.title, t.description, t.status, t.priority,
                   t.due_date, t.created_at, t.updated_at,
                   p.project_id, p.title,
                   u.user_id, u.username
            FROM tasks t
            LEFT JOIN projects p ON t.project_id = p.project_id
            LEFT JOIN users u     ON t.assignee_id = u.user_id
            WHERE t.task_id = %s
            """,
            (task_id,),
            fetch_one=True,
        )

        if not r:
            return jsonify({"error": "Task not found"}), 404

        task = {
            "task_id": r[0],
            "title": r[1],
            "description": r[2],
            "status": r[3],
            "priority": r[4],
            "due_date": r[5].isoformat() if r[5] else None,
            "created_at": r[6].isoformat() if r[6] else None,
            "updated_at": r[7].isoformat() if r[7] else None,
            "project": {"project_id": r[8], "title": r[9]} if r[8] else None,
            "assignee": {"user_id": r[10], "username": r[11]} if r[10] else None,
        }
        return jsonify(task), 200

    except OperationalError:
        return jsonify({"error": "Database unavailable"}), 503
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


@app.post("/tasks")
def create_task():
    try:
        data = request.get_json(force=True)
        if "title" not in data:
            return jsonify({"error": "Title is required"}), 400

        if "status" in data and data["status"] not in VALID_STATUSES:
            return jsonify({"error": "Invalid status value"}), 400

        if "priority" in data:
            if not 1 <= int(data["priority"]) <= 4:
                return jsonify({"error": "Priority must be between 1 and 4"}), 400

        if "project_id" in data:
            if not execute_query(
                "SELECT 1 FROM projects WHERE project_id = %s",
                (data["project_id"],),
                fetch_one=True,
            ):
                return jsonify({"error": "Project not found"}), 404

        if "assignee_id" in data:
            if not execute_query(
                "SELECT 1 FROM users WHERE user_id = %s",
                (data["assignee_id"],),
                fetch_one=True,
            ):
                return jsonify({"error": "Assignee not found"}), 404

        row = execute_query(
            """
            INSERT INTO tasks
                   (title, description, project_id, assignee_id, status, priority, due_date)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            RETURNING task_id, title, description, status, priority, due_date, created_at;
            """,
            (
                data["title"],
                data.get("description"),
                data.get("project_id"),
                data.get("assignee_id"),
                data.get("status", "todo"),
                data.get("priority", 3),
                data.get("due_date"),
            ),
            fetch_one=True,
        )

        task = {
            "task_id": row[0],
            "title": row[1],
            "description": row[2],
            "status": row[3],
            "priority": row[4],
            "due_date": row[5].isoformat() if row[5] else None,
            "created_at": row[6].isoformat(),
        }
        return jsonify(task), 201

    except ValueError:
        return jsonify({"error": "Invalid parameter value"}), 400
    except OperationalError:
        return jsonify({"error": "Database unavailable"}), 503
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


@app.put("/tasks/<int:task_id>")
def update_task(task_id):
    try:
        data = request.get_json(force=True)
        if not data:
            return jsonify({"error": "No data provided"}), 400

        if not execute_query(
            "SELECT 1 FROM tasks WHERE task_id = %s", (task_id,), fetch_one=True
        ):
            return jsonify({"error": "Task not found"}), 404

        if "status" in data and data["status"] not in VALID_STATUSES:
            return jsonify({"error": "Invalid status value"}), 400
        if "priority" in data and not 1 <= int(data["priority"]) <= 4:
            return jsonify({"error": "Priority must be between 1 and 4"}), 400
        if "project_id" in data:
            if not execute_query(
                "SELECT 1 FROM projects WHERE project_id = %s",
                (data["project_id"],),
                fetch_one=True,
            ):
                return jsonify({"error": "Project not found"}), 404
        if "assignee_id" in data:
            if not execute_query(
                "SELECT 1 FROM users WHERE user_id = %s",
                (data["assignee_id"],),
                fetch_one=True,
            ):
                return jsonify({"error": "Assignee not found"}), 404

        row = execute_query(
            """
            UPDATE tasks
               SET title       = COALESCE(%s, title),
                   description = COALESCE(%s, description),
                   project_id  = COALESCE(%s, project_id),
                   assignee_id = COALESCE(%s, assignee_id),
                   status      = COALESCE(%s, status),
                   priority    = COALESCE(%s, priority),
                   due_date    = COALESCE(%s, due_date),
                   updated_at  = CURRENT_TIMESTAMP
             WHERE task_id = %s
         RETURNING task_id, title, description, status, priority,
                   due_date, created_at, updated_at;
            """,
            (
                data.get("title"),
                data.get("description"),
                data.get("project_id"),
                data.get("assignee_id"),
                data.get("status"),
                data.get("priority"),
                data.get("due_date"),
                task_id,
            ),
            fetch_one=True,
        )

        task = {
            "task_id": row[0],
            "title": row[1],
            "description": row[2],
            "status": row[3],
            "priority": row[4],
            "due_date": row[5].isoformat() if row[5] else None,
            "created_at": row[6].isoformat(),
            "updated_at": row[7].isoformat(),
        }
        return jsonify(task), 200

    except ValueError:
        return jsonify({"error": "Invalid parameter value"}), 400
    except OperationalError:
        return jsonify({"error": "Database unavailable"}), 503
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


@app.delete("/tasks/<int:task_id>")
def delete_task(task_id):
    try:
        if not execute_query(
            "SELECT 1 FROM tasks WHERE task_id = %s", (task_id,), fetch_one=True
        ):
            return jsonify({"error": "Task not found"}), 404

        execute_query("DELETE FROM tasks WHERE task_id = %s", (task_id,))
        return jsonify({"message": "Task deleted successfully"}), 200

    except OperationalError:
        return jsonify({"error": "Database unavailable"}), 503
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


# ---------- Main ------------------------------------------------------------- #
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)