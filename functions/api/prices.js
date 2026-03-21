export default {
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/api/prices") {
      const cgUrl =
        "https://api.coingecko.com/api/v3/simple/price" +
        "?ids=bitcoin,ethereum,ripple,bitcoin-cash,stellar,litecoin,tron,dogecoin,algorand,solana" +
        "&vs_currencies=usd&include_24hr_change=true";

      try {
        const res = await fetch(cgUrl, {
          headers: {
            "User-Agent": "benepp/1.0 (crypto dashboard)",
            "Accept": "application/json"
          }
        });

        const data = await res.json();

        return new Response(JSON.stringify(data), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        });
      } catch (err) {
        return new Response(
          JSON.stringify({ error: "Failed to fetch prices" }),
          { status: 500 }
        );
      }
    }

    return new Response("Not found", { status: 404 });
  }
};
