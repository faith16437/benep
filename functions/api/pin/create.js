export async function onRequestPost(context) {
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

  const body = await request.json();
  const pin = String(body.pin || "").trim();
  const pinConfirmation = String(body.pin_confirmation || "").trim();

  if (!/^\d{4}$/.test(pin)) {
    return new Response(JSON.stringify({ error: "PIN must be exactly 4 digits." }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  if (pin !== pinConfirmation) {
    return new Response(JSON.stringify({ error: "PIN confirmation does not match." }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  const existingPin = await env.DB.prepare(
    "SELECT id FROM user_pins WHERE user_id = ? LIMIT 1"
  )
    .bind(sessionUserId)
    .first();

  if (existingPin) {
    return new Response(JSON.stringify({ error: "PIN already exists." }), {
      status: 409,
      headers: { "Content-Type": "application/json" }
    });
  }

  await env.DB.prepare(
    "INSERT INTO user_pins (user_id, pin) VALUES (?, ?)"
  )
    .bind(sessionUserId, pin)
    .run();

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
