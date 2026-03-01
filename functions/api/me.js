export async function onRequestGet(context) {
  const cookie = context.request.headers.get("Cookie") || ""

  if (!cookie.includes("session=valid")) {
    return new Response(JSON.stringify({ authenticated: false }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    })
  }

  return new Response(JSON.stringify({ authenticated: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  })
}