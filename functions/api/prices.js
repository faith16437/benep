export async function onRequestGet() {
  try {
    const url =
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,bitcoin-cash,stellar,litecoin,tron,dogecoin,algorand,solana,polkadot,cardano,binancecoin,tether,shiba-inu,pepe,chainlink,jasmycoin,polygon-ecosystem-token,celo,hedera-hashgraph,quant-network,ondo-finance,tellor,flare-networks,vechain,iotex,zebec-network,lcx,crypto-com-chain&vs_currencies=usd&include_24hr_change=true";

    const res = await fetch(url);
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
