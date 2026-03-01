export async function onRequestPost(context) {
  const { request } = context
  const body = await request.json()

  const { email, password } = body

  // TODO: replace with real DB check
  if (email !== "test@mail.com" || password !== "123456") {
    return new Response(JSON.stringify({ error: "Invalid credentials" }), {
      status: 401,
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