export async function onRequestPost(context) {
  const { request } = context
  const body = await request.json()

  const { email, password } = body

  if (!email || !password) {
    return new Response(JSON.stringify({ error: "Missing fields" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    })
  }

  // Fake duplicate check (replace later with real DB)
  if (email === "test@mail.com") {
    return new Response(JSON.stringify({ error: "Email already registered" }), {
      status: 409,
      headers: { "Content-Type": "application/json" }
    })
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": `session=valid; HttpOnly; Path=/; SameSite=Lax`
    }
  })
}