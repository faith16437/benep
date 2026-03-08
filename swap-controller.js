(function () {
  const saved = localStorage.getItem("SELECTED_COIN");
  if (!saved) return;

  const coin = JSON.parse(saved);

  const fromText = document.getElementById("from_token_text");
  const toSelect = document.getElementById("toTokenId");

  if (!fromText || !toSelect) return;

  // ----- ensure BTC exists as TO option -----
  let btcOption = [...toSelect.options].find(
    o => o.dataset.coin_id === "BTC"
  );

  if (!btcOption) {
    btcOption = document.createElement("option");
    btcOption.value = "BTC";
    btcOption.dataset.coin_id = "BTC";
    btcOption.textContent = "Bitcoin (BTC)";
    toSelect.prepend(btcOption);
  }

  // ===== CASE 1: BTC selected =====
  if (coin.symbol === "BTC") {
    fromText.textContent = "Bitcoin (BTC)";

    // ETH must exist already
    const ethOpt = [...toSelect.options].find(
      o => o.dataset.coin_id === "ETH"
    );
    if (ethOpt) ethOpt.selected = true;

    return;
  }

  // ===== CASE 2: any other coin =====
  fromText.textContent = `${coin.name} (${coin.symbol})`;

  btcOption.selected = true;
})();
// ===== LIVE SWAP PRICING (append below existing code) =====

// CoinGecko ID mapping (ASSET-level, NOT network-level)
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

  // ---- missing items from your list (JASMY downward) ----
  JASMY: "jasmycoin",
  POL: "polygon-ecosystem-token",     // Polygon (ex-MATIC) (POL)
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

// Fetch + cache prices
async function fetchPrices() {
  const now = Date.now();
  if (now - lastFetch < 15000 && Object.keys(priceCache).length) {
    return priceCache;
  }

  const ids = Object.values(COINGECKO_IDS).join(",");
  const url =
    `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;

  const res = await fetch(url);
  const data = await res.json();

  priceCache = data;
  lastFetch = now;
  return data;
}

// Normalize symbols like:
// USDT-TRC20 → USDT
// SHIB-ERC20 → SHIB
function normalizeSymbol(sym) {
  if (!sym) return null;
  return sym.split("-")[0].toUpperCase();
}

window.checkPrice = async function () {
  const fromInput = document.getElementById("from_amount");
  const toInput = document.getElementById("to_amount");
  const toSelect = document.getElementById("toTokenId");
  const fromText = document.getElementById("from_token_text");

  if (!fromInput || !toInput || !toSelect || !fromText) return;

  const fromAmount = parseFloat(fromInput.value);
  if (!fromAmount || fromAmount <= 0) {
    toInput.value = "";
    return;
  }

  // ---- FROM SYMBOL ----
  let fromSymbol = "BTC";
  if (!fromText.textContent.includes("BTC")) {
    try {
      const saved = JSON.parse(localStorage.getItem("SELECTED_COIN"));
      if (saved?.symbol) fromSymbol = saved.symbol;
    } catch {}
  }
  fromSymbol = normalizeSymbol(fromSymbol);

  // ---- TO SYMBOL ----
  let toSymbol = toSelect.options[toSelect.selectedIndex]?.dataset.coin_id;
  toSymbol = normalizeSymbol(toSymbol);

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

  // ---- CALCULATION ----
  const result = (fromAmount * fromUsd) / toUsd;
  toInput.value = result.toFixed(6);

  // ---- QUOTE TEXT ----
  const quote = document.querySelector(".fromTokenFiatPrice");
  if (quote) quote.textContent = `$${fromUsd.toLocaleString()}`;
};

// Run once on load
setTimeout(() => window.checkPrice?.(), 0);


