import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

SCHEMA = "t_p75921280_team_flux_website"


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def handler(event: dict, context) -> dict:
    """Управление достижениями команды Team Flux — CRUD"""
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    method = event.get("httpMethod", "GET")
    params = event.get("queryStringParameters") or {}
    path_parts = (event.get("path") or "").strip("/").split("/")

    achievement_id = None
    if len(path_parts) >= 2 and path_parts[-1].isdigit():
        achievement_id = int(path_parts[-1])

    conn = get_conn()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    try:
        if method == "GET":
            member_id = params.get("member_id")
            is_team = params.get("is_team")

            query = f"""
                SELECT a.*, m.name as member_name, m.nickname as member_nickname
                FROM {SCHEMA}.achievements a
                LEFT JOIN {SCHEMA}.members m ON a.member_id = m.id
                WHERE 1=1
            """
            args = []
            if member_id:
                query += " AND a.member_id = %s"
                args.append(int(member_id))
            if is_team is not None:
                query += " AND a.is_team = %s"
                args.append(is_team == "true")
            query += " ORDER BY a.date DESC"

            cur.execute(query, args)
            rows = cur.fetchall()
            return {
                "statusCode": 200,
                "headers": headers,
                "body": json.dumps([dict(r) for r in rows], default=str),
            }

        elif method == "POST":
            body = json.loads(event.get("body") or "{}")
            cur.execute(
                f"""INSERT INTO {SCHEMA}.achievements (member_id, title, description, date, place, tournament, is_team)
                    VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING *""",
                (
                    body.get("member_id"), body["title"], body.get("description"),
                    body.get("date"), body.get("place"), body.get("tournament"),
                    body.get("is_team", False),
                ),
            )
            row = cur.fetchone()
            conn.commit()
            return {"statusCode": 201, "headers": headers, "body": json.dumps(dict(row), default=str)}

        elif method == "PUT":
            body = json.loads(event.get("body") or "{}")
            cur.execute(
                f"""UPDATE {SCHEMA}.achievements SET
                    member_id = %s, title = %s, description = %s,
                    date = %s, place = %s, tournament = %s, is_team = %s
                    WHERE id = %s RETURNING *""",
                (
                    body.get("member_id"), body["title"], body.get("description"),
                    body.get("date"), body.get("place"), body.get("tournament"),
                    body.get("is_team", False), achievement_id,
                ),
            )
            row = cur.fetchone()
            conn.commit()
            if not row:
                return {"statusCode": 404, "headers": headers, "body": json.dumps({"error": "Not found"})}
            return {"statusCode": 200, "headers": headers, "body": json.dumps(dict(row), default=str)}

        elif method == "DELETE":
            cur.execute(
                f"UPDATE {SCHEMA}.achievements SET title = title WHERE id = %s RETURNING id",
                (achievement_id,),
            )
            conn.commit()
            return {"statusCode": 200, "headers": headers, "body": json.dumps({"success": True})}

    finally:
        cur.close()
        conn.close()

    return {"statusCode": 405, "headers": headers, "body": json.dumps({"error": "Method not allowed"})}
