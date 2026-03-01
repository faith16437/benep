export async function onRequestPost(context) {
  const { request, env } = context
  const db = env.DB

  const body = await request.json()
  const { email, password } = body

  if (!email || !password) {
    return new Response(JSON.stringify({ error: "Missing fields" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    })
  }

  // Query user from D1
  const user = await db.prepare(
    "SELECT * FROM users WHERE email = ?"
  ).bind(email).first()

  if (!user) {
    return new Response(JSON.stringify({ error: "Invalid credentials" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    })
  }

  // Compare password (plain text for now — improve later)
  if (user.password !== password) {
    return new Response(JSON.stringify({ error: "Invalid credentials" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    })
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": `session=${user.id}; HttpOnly; Path=/; SameSite=Lax`
    }
  })
}
