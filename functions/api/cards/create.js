export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const cookie = request.headers.get("cookie") || "";
    const sessionMatch = cookie.match(/(?:^|;\s*)session=([^;]+)/);
    const userId = sessionMatch ? decodeURIComponent(sessionMatch[1]) : null;

    if (!userId) {
      return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const design = body.design || "purple";
    const amountUsd = 20000;
    const walletAddress = "TCUkHngdk8ir5xCsMssZCxHkW6uWkQeYuD";

    const now = new Date();
    const nowIso = now.toISOString();
    const expires = new Date(now.getTime() + 15 * 60 * 1000).toISOString();

    const existing = await env.DB.prepare(`
      SELECT *
      FROM card_orders
      WHERE user_id = ?
      ORDER BY id DESC
      LIMIT 1
    `).bind(userId).first();

    if (existing) {
      if (existing.status === "pending" && new Date(existing.expires_at).getTime() > Date.now()) {
        return Response.json({
          success: true,
          reused: true,
          order: existing
        });
      }

      if (existing.status === "pending" && new Date(existing.expires_at).getTime() <= Date.now()) {
        await env.DB.prepare(`
          UPDATE card_orders
          SET status = 'expired'
          WHERE id = ?
        `).bind(existing.id).run();
      }
    }

    const orderCode = generateOrderCode();

    await env.DB.prepare(`
      INSERT INTO card_orders (
        user_id, order_code, card_type, design, amount_usd,
        crypto_symbol, wallet_address, status, created_at, expires_at
      )
      VALUES (?, ?, 'QFS Card', ?, ?, 'TRX', ?, 'pending', ?, ?)
    `).bind(
      userId,
      orderCode,
      design,
      amountUsd,
      walletAddress,
      nowIso,
      expires
    ).run();

    const order = await env.DB.prepare(`
      SELECT *
      FROM card_orders
      WHERE order_code = ?
      LIMIT 1
    `).bind(orderCode).first();

    return Response.json({
      success: true,
      reused: false,
      order
    });
  } catch (err) {
    return Response.json({
      success: false,
      message: "Failed to create card order",
      error: String(err)
    }, { status: 500 });
  }
}

function generateOrderCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 8; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}
