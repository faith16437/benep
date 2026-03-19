export async function onRequestGet(context) {
  const { request, env } = context;

  try {
    const cookie = request.headers.get("cookie") || "";
    const sessionMatch = cookie.match(/(?:^|;\s*)session=([^;]+)/);
    const userId = sessionMatch ? decodeURIComponent(sessionMatch[1]) : null;

    if (!userId) {
      return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    let order = await env.DB.prepare(`
      SELECT *
      FROM card_orders
      WHERE user_id = ?
      ORDER BY id DESC
      LIMIT 1
    `).bind(userId).first();

    if (!order) {
      return Response.json({ success: true, order: null });
    }

    if (order.status === "pending" && new Date(order.expires_at).getTime() <= Date.now()) {
      await env.DB.prepare(`
        UPDATE card_orders
        SET status = 'expired'
        WHERE id = ?
      `).bind(order.id).run();

      order = await env.DB.prepare(`
        SELECT *
        FROM card_orders
        WHERE id = ?
        LIMIT 1
      `).bind(order.id).first();
    }

    return Response.json({ success: true, order });
  } catch (err) {
    return Response.json({
      success: false,
      message: "Failed to fetch card order",
      error: String(err)
    }, { status: 500 });
  }
}
