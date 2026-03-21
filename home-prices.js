console.log("home-prices.js loaded");

const coins = {
  BTC: "bitcoin",
  ETH: "ethereum",
  XRP: "ripple",
  BCH: "bitcoin-cash",
  XLM: "stellar",
  LTC: "litecoin",
  TRX: "tron",
  DOGE: "dogecoin",
  ALGO: "algorand",
  SOL: "solana",
  DOT: "polkadot",
  ADA: "cardano",
  BNB: "binancecoin",
  USDT: "tether",
  SHIB: "shiba-inu",
  PEPE: "pepe",
  LINK: "chainlink",
  JASMY: "jasmycoin",
  POL: "polygon-ecosystem-token",
  CELO: "celo",
  HBAR: "hedera-hashgraph",
  QNT: "quant-network",
  ONDO: "ondo-finance",
  TRB: "tellor",
  FLR: "flare-networks",
  VET: "vechain",
  IOTX: "iotex",
  ZBCN: "zebec-network",
  LCX: "lcx",
  CRO: "crypto-com-chain"
};

async function updatePrices() {
  try {
    const ids = Object.values(coins);

    for (let i = 0; i < ids.length; i += 10) {
      const chunk = ids.slice(i, i + 10);

      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${chunk.join(",")}&vs_currencies=usd&include_24hr_change=true`
      );

      const data = await res.json();

      Object.entries(coins).forEach(([symbol, id]) => {
        if (!data[id]) return;

        const price = data[id].usd;
        const change = data[id].usd_24h_change;

        document.querySelectorAll(`.${symbol}_price`).forEach(el => {
          el.textContent = `$${price.toLocaleString()}`;
        });

        document.querySelectorAll(`.${symbol}_price_history`).forEach(el => {
          el.textContent = `${change.toFixed(2)}%`;
          el.style.color = change >= 0 ? "green" : "red";
        });
      });
    }
  } catch (err) {
    console.error("Home price update failed:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updatePrices();
  setInterval(updatePrices, 60000);
});
