export async function onRequestGet(context) {
  const { request, env } = context;
  const cookie = request.headers.get("Cookie") || "";

  const match = cookie.match(/(?:^|;\s*)session=([^;]+)/);
  const sessionUserId = match ? decodeURIComponent(match[1]) : null;

  if (!sessionUserId) {
    return new Response(JSON.stringify({ error: "Not logged in" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  const user = await env.DB.prepare(
    "SELECT id FROM users WHERE id = ?"
  )
    .bind(sessionUserId)
    .first();

  if (!user) {
    return new Response(JSON.stringify({ error: "Not logged in" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  const pinRow = await env.DB.prepare(
    "SELECT id FROM user_pins WHERE user_id = ? LIMIT 1"
  )
    .bind(sessionUserId)
    .first();

  return new Response(JSON.stringify({ hasPin: !!pinRow }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
