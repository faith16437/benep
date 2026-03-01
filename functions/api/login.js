export async function onRequestPost(context) {
  const { request, env } = context;
  const body = await request.json();

  const { email, password } = body; // this field can be email OR username

  if (!email || !password) {
    return new Response(JSON.stringify({ error: "Missing fields" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  // Search by email OR username
  const user = await env.DB.prepare(
    "SELECT * FROM users WHERE email = ? OR username = ?"
  )
  .bind(email, email)
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
