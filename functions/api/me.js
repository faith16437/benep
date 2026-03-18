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
    "SELECT id, username, email, created_at FROM users WHERE id = ?"
  )
    .bind(sessionUserId)
    .first();

  if (!user) {
    return new Response(JSON.stringify({ error: "Not logged in" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  return new Response(JSON.stringify(user), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
