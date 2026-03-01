export async function onRequestPost(context) {
  const { request, env } = context;
  const body = await request.json();

  const { username, email, password } = body;

  if (!email || !password) {
    return new Response(JSON.stringify({ error: "Missing fields" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  // Check if email exists
  const existing = await env.DB.prepare(
    "SELECT id FROM users WHERE email = ?"
  )
  .bind(email)
  .first();

  if (existing) {
    return new Response(JSON.stringify({ error: "Email already registered" }), {
      status: 409,
      headers: { "Content-Type": "application/json" }
    });
  }

  // INSERT RAW PASSWORD
  await env.DB.prepare(`
    INSERT INTO users (username, email, password, created_at)
    VALUES (?, ?, ?, datetime('now'))
  `)
  .bind(username || "", email, password)
  .run();

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
