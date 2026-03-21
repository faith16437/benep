export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/api/prices") {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,bitcoin-cash,stellar,litecoin,tron,dogecoin,algorand,solana,polkadot,cardano,binancecoin,tether,shiba-inu,pepe,chainlink,jasmycoin,polygon-ecosystem-token,celo,hedera-hashgraph,quant-network,ondo-finance,tellor,flare-networks,vechain,iotex,zebec-network,lcx,crypto-com-chain&vs_currencies=usd&include_24hr_change=true",
          {
            headers: {
              "User-Agent": "Mozilla/5.0"
            }
          }
        );

        const data = await res.json();

        return new Response(JSON.stringify(data), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.toString() }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
    }

    return new Response("Not Found", { status: 404 });
  }
};
