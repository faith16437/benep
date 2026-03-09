(function () {
  const savedRaw = localStorage.getItem("SELECTED_COIN");
  const fromText = document.getElementById("from_token_text");
  const toSelect = document.getElementById("toTokenId");

  if (!fromText || !toSelect) return;

  let coin = null;
  try {
    coin = savedRaw ? JSON.parse(savedRaw) : null;
  } catch {
    coin = null;
  }

  let symbol = (coin?.symbol || "BTC").split("-")[0].toUpperCase();
  let name = coin?.name || "Bitcoin";

  let btcOption = [...toSelect.options].find(o => o.dataset.coin_id === "BTC");

  if (!btcOption) {
    btcOption = document.createElement("option");
    btcOption.value = "BTC";
    btcOption.dataset.coin_id = "BTC";
    btcOption.textContent = "Bitcoin (BTC)";
    toSelect.prepend(btcOption);
  }

  if (symbol === "BTC") {
    fromText.textContent = "Bitcoin (BTC)";
    const ethOpt = [...toSelect.options].find(o => o.dataset.coin_id === "ETH");
    if (ethOpt) ethOpt.selected = true;
    return;
  }

  fromText.textContent = `${name} (${symbol})`;
  btcOption.selected = true;
})();

const COINGECKO_IDS = {
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

let priceCache = {};
let lastFetch = 0;

async function fetchPrices() {
  const now = Date.now();
  if (now - lastFetch < 15000 && Object.keys(priceCache).length) {
    return priceCache;
  }

  const ids = Object.values(COINGECKO_IDS).join(",");
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;

  const res = await fetch(url);
  const data = await res.json();

  priceCache = data;
  lastFetch = now;
  return data;
}

function normalizeSymbol(sym) {
  if (!sym) return null;
  return sym.split("-")[0].toUpperCase();
}

window.checkPrice = async function () {
  const fromInput = document.getElementById("from_amount");
  const toInput = document.getElementById("to_amount");
  const toSelect = document.getElementById("toTokenId");

  if (!fromInput || !toInput || !toSelect) return;

  const fromAmount = parseFloat(fromInput.value);
  if (!fromAmount || fromAmount <= 0) {
    toInput.value = "";
    return;
  }

  let saved = null;
  try {
    saved = JSON.parse(localStorage.getItem("SELECTED_COIN"));
  } catch {
    saved = null;
  }

  let fromSymbol = normalizeSymbol(saved?.symbol || "BTC");
  let toSymbol = normalizeSymbol(
    toSelect.options[toSelect.selectedIndex]?.dataset.coin_id || ""
  );

  if (!COINGECKO_IDS[fromSymbol] || !COINGECKO_IDS[toSymbol]) {
    toInput.value = "";
    return;
  }

  const prices = await fetchPrices();

  const fromUsd = prices[COINGECKO_IDS[fromSymbol]]?.usd;
  const toUsd = prices[COINGECKO_IDS[toSymbol]]?.usd;

  if (!fromUsd || !toUsd) {
    toInput.value = "";
    return;
  }

  const result = (fromAmount * fromUsd) / toUsd;
  toInput.value = result.toFixed(6);

  const quote = document.querySelector(".fromTokenFiatPrice");
  if (quote) quote.textContent = `$${fromUsd.toLocaleString()}`;
};

setTimeout(() => {
  window.checkPrice?.();
}, 0);
