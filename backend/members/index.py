import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

SCHEMA = "t_p75921280_team_flux_website"


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def handler(event: dict, context) -> dict:
    """Управление участниками команды Team Flux — CRUD"""
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

    member_id = None
    if len(path_parts) >= 2 and path_parts[-1].isdigit():
        member_id = int(path_parts[-1])

    conn = get_conn()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    try:
        if method == "GET":
            if member_id:
                cur.execute(
                    f"SELECT * FROM {SCHEMA}.members WHERE id = %s", (member_id,)
                )
                member = cur.fetchone()
                if not member:
                    return {"statusCode": 404, "headers": headers, "body": json.dumps({"error": "Not found"})}
                cur.execute(
                    f"SELECT * FROM {SCHEMA}.achievements WHERE member_id = %s ORDER BY date DESC",
                    (member_id,),
                )
                achievements = cur.fetchall()
                return {
                    "statusCode": 200,
                    "headers": headers,
                    "body": json.dumps({"member": dict(member), "achievements": [dict(a) for a in achievements]}, default=str),
                }
            else:
                active_only = params.get("active", "true") == "true"
                if active_only:
                    cur.execute(f"SELECT * FROM {SCHEMA}.members WHERE is_active = TRUE ORDER BY sort_order ASC, id ASC")
                else:
                    cur.execute(f"SELECT * FROM {SCHEMA}.members ORDER BY sort_order ASC, id ASC")
                members = cur.fetchall()
                return {
                    "statusCode": 200,
                    "headers": headers,
                    "body": json.dumps([dict(m) for m in members], default=str),
                }

        elif method == "POST":
            body = json.loads(event.get("body") or "{}")
            cur.execute(
                f"""INSERT INTO {SCHEMA}.members (name, role, nickname, bio, avatar_url, social_vk, social_tg, join_date, is_active, sort_order)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING *""",
                (
                    body["name"], body["role"], body.get("nickname"),
                    body.get("bio"), body.get("avatar_url"),
                    body.get("social_vk"), body.get("social_tg"),
                    body.get("join_date"), body.get("is_active", True),
                    body.get("sort_order", 0),
                ),
            )
            member = cur.fetchone()
            conn.commit()
            return {"statusCode": 201, "headers": headers, "body": json.dumps(dict(member), default=str)}

        elif method == "PUT":
            body = json.loads(event.get("body") or "{}")
            cur.execute(
                f"""UPDATE {SCHEMA}.members SET
                    name = %s, role = %s, nickname = %s, bio = %s,
                    avatar_url = %s, social_vk = %s, social_tg = %s,
                    join_date = %s, is_active = %s, sort_order = %s,
                    updated_at = NOW()
                    WHERE id = %s RETURNING *""",
                (
                    body["name"], body["role"], body.get("nickname"),
                    body.get("bio"), body.get("avatar_url"),
                    body.get("social_vk"), body.get("social_tg"),
                    body.get("join_date"), body.get("is_active", True),
                    body.get("sort_order", 0), member_id,
                ),
            )
            member = cur.fetchone()
            conn.commit()
            if not member:
                return {"statusCode": 404, "headers": headers, "body": json.dumps({"error": "Not found"})}
            return {"statusCode": 200, "headers": headers, "body": json.dumps(dict(member), default=str)}

        elif method == "DELETE":
            cur.execute(f"UPDATE {SCHEMA}.members SET is_active = FALSE WHERE id = %s RETURNING id", (member_id,))
            row = cur.fetchone()
            conn.commit()
            if not row:
                return {"statusCode": 404, "headers": headers, "body": json.dumps({"error": "Not found"})}
            return {"statusCode": 200, "headers": headers, "body": json.dumps({"success": True})}

    finally:
        cur.close()
        conn.close()

    return {"statusCode": 405, "headers": headers, "body": json.dumps({"error": "Method not allowed"})}
