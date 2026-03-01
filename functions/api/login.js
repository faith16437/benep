export async function onRequestPost(context) {
  const { request, env } = context;
  const body = await request.json();

  const { email, password } = body;

  if (!email || !password) {
    return new Response(JSON.stringify({ error: "Missing fields" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  // Fetch user from D1
  const user = await env.DB.prepare(
    "SELECT * FROM users WHERE email = ?"
  )
  .bind(email)
  .first();

  // RAW password comparison
  if (!user || user.password !== password) {
    return new Response(
      JSON.stringify({ error: "Invalid credentials" }),
      { status: 401 }
    );
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": `session=${user.id}; HttpOnly; Path=/; SameSite=Lax`
    }
  });
}
