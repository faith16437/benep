export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const cookie = request.headers.get("cookie") || "";
    const sessionMatch = cookie.match(/(?:^|;\s*)session=([^;]+)/);
    const userId = sessionMatch ? decodeURIComponent(sessionMatch[1]) : null;

    if (!userId) {
      return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const order = await env.DB.prepare(`
      SELECT *
      FROM card_orders
      WHERE user_id = ?
      ORDER BY id DESC
      LIMIT 1
    `).bind(userId).first();

    if (!order) {
      return Response.json({ success: false, message: "No order found" }, { status: 404 });
    }

    if (order.status !== "pending") {
      return Response.json({ success: false, message: "Only pending orders can be cancelled" }, { status: 400 });
    }

    await env.DB.prepare(`
      UPDATE card_orders
      SET status = 'cancelled'
      WHERE id = ?
    `).bind(order.id).run();

    return Response.json({ success: true });
  } catch (err) {
    return Response.json({
      success: false,
      message: "Failed to cancel order",
      error: String(err)
    }, { status: 500 });
  }
}
