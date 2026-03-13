document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const selectedKey = (params.get("coin") || "btc").toLowerCase();

  const ASSETS = {
    btc:  { id: 1,  symbol: "BTC",  name: "Bitcoin",            icon: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png" },
    eth:  { id: 2,  symbol: "ETH",  name: "Ethereum",           icon: "https://assets.coingecko.com/coins/images/279/large/ethereum.png" },
    xrp:  { id: 3,  symbol: "XRP",  name: "Ripple",             icon: "https://assets.coingecko.com/coins/images/44/large/xrp.png" },
    bch:  { id: 4,  symbol: "BCH",  name: "Bitcoin Cash",       icon: "https://coin-images.coingecko.com/coins/images/780/large/bitcoin-cash-circle.png" },
    xlm:  { id: 5,  symbol: "XLM",  name: "Stellar",            icon: "https://assets.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png" },
    ltc:  { id: 6,  symbol: "LTC",  name: "Litecoin",           icon: "https://assets.coingecko.com/coins/images/2/large/litecoin.png" },
    trx:  { id: 7,  symbol: "TRX",  name: "Tron",               icon: "https://coin-images.coingecko.com/coins/images/1094/large/tron-logo.png" },
    doge: { id: 8,  symbol: "DOGE", name: "Doge Coin",          icon: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png" },
    algo: { id: 9,  symbol: "ALGO", name: "Algorand",           icon: "https://assets.coingecko.com/coins/images/4380/large/download.png" },
    sol:  { id: 10, symbol: "SOL",  name: "Solana",             icon: "https://assets.coingecko.com/coins/images/4128/large/coinmarketcap-solana-200.png" },
    dot:  { id: 11, symbol: "DOT",  name: "Polkadot",           icon: "https://coin-images.coingecko.com/coins/images/12171/large/polkadot.png" },
    ada:  { id: 12, symbol: "ADA",  name: "Cardano",            icon: "https://assets.coingecko.com/coins/images/975/large/cardano.png" },
    bnb:  { id: 13, symbol: "BNB",  name: "Binance Coin",       icon: "https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png" },
    usdt: { id: 14, symbol: "USDT", name: "Tether",             icon: "https://assets.coingecko.com/coins/images/325/large/Tether-logo.png" },
    shib: { id: 17, symbol: "SHIB", name: "SHIBA INU",          icon: "https://assets.coingecko.com/coins/images/11939/large/shiba.png" },
    pepe: { id: 18, symbol: "PEPE", name: "PEPE",               icon: "https://assets.coingecko.com/coins/images/29850/large/pepe-token.jpeg" },
    link: { id: 19, symbol: "LINK", name: "Chainlink",          icon: "https://coin-images.coingecko.com/coins/images/877/large/chainlink-new-logo.png" },
    jasmy:{ id: 20, symbol: "JASMY",name: "JasmyCoin",          icon: "https://coin-images.coingecko.com/coins/images/13876/large/JASMY200x200.jpg" },
    pol:  { id: 21, symbol: "POL",  name: "Polygon (ex-MATIC)", icon: "https://coin-images.coingecko.com/coins/images/32440/large/polygon.png" },
    celo: { id: 22, symbol: "CELO", name: "Celo",               icon: "https://assets.coingecko.com/coins/images/11090/standard/InjXBNx9_400x400.jpg" },
    hbar: { id: 23, symbol: "HBAR", name: "Hedera",             icon: "https://coin-images.coingecko.com/coins/images/3688/large/hbar.png" },
    qnt:  { id: 24, symbol: "QNT",  name: "Quant",              icon: "https://coin-images.coingecko.com/coins/images/3370/large/5ZOu7brX_400x400.jpg" },
    ondo: { id: 25, symbol: "ONDO", name: "Ondo",               icon: "https://coin-images.coingecko.com/coins/images/26580/large/ONDO.png" },
    trb:  { id: 26, symbol: "TRB",  name: "Tellor Tributes",    icon: "https://assets.coingecko.com/coins/images/9644/large/TRB-New_Logo.png" },
    flr:  { id: 27, symbol: "FLR",  name: "Flare",              icon: "https://coin-images.coingecko.com/coins/images/28624/large/FLR-icon200x200.png" },
    vet:  { id: 28, symbol: "VET",  name: "VeChain",            icon: "https://coin-images.coingecko.com/coins/images/1167/large/VET.png" },
    iotx: { id: 29, symbol: "IOTX", name: "IoTeX",              icon: "https://assets.coingecko.com/coins/images/3334/large/20250731-171811.png" },
    zbcn: { id: 30, symbol: "ZBCN", name: "Zebec Network",      icon: "https://assets.coingecko.com/coins/images/37052/large/zbcn.jpeg" },
    lcx:  { id: 31, symbol: "LCX",  name: "LCX",                icon: "https://assets.coingecko.com/coins/images/9985/large/zRPSu_0o_400x400.jpg" },
    cro:  { id: 32, symbol: "CRO",  name: "Cronos",             icon: "https://coin-images.coingecko.com/coins/images/7310/large/cro_token_logo.png" }
  };

  const asset = ASSETS[selectedKey] || ASSETS.btc;

  const backText = document.querySelector(".max-w-md.mx-auto.px-4.pt-4 span.text-sm");
  const fromText = document.getElementById("from_token_text");
  const fromTokenId = document.querySelector('input[name="from_token_id"]');
  const coinSymbol = document.getElementById("coinSymbol");
  const form = document.getElementById("form");
  const toSelect = document.getElementById("toTokenId");
  const fromInput = document.getElementById("from_amount");
  const fromIcon = document.querySelector("#form .bg-dark .swapbox img");
  const balanceWhite = document.querySelector(".text-xs.text-gray-400 .text-white");

  console.log("[swap-controller] selected =", selectedKey, asset);

  if (backText) backText.textContent = `Swap ${asset.symbol}`;
  if (fromText) fromText.textContent = `${asset.name} (${asset.symbol})`;
  if (fromTokenId) fromTokenId.value = String(asset.id);
  if (coinSymbol) coinSymbol.value = asset.symbol;
  if (form) form.action = `/app/assets/swap_token/${asset.id}`;
  if (fromInput) fromInput.max = "0.00000000";
  if (fromIcon) fromIcon.src = asset.icon;
  if (balanceWhite) balanceWhite.textContent = `0.00000000 ${asset.symbol}`;

  if (toSelect) {
    [...toSelect.options].forEach(opt => (opt.selected = false));

    if (asset.symbol === "BTC") {
      const ethOption = [...toSelect.options].find(opt => opt.dataset.coin_id === "ETH");
      if (ethOption) ethOption.selected = true;
    } else {
      let btcOption = [...toSelect.options].find(opt => opt.dataset.coin_id === "BTC");

      if (!btcOption) {
        btcOption = document.createElement("option");
        btcOption.value = "1";
        btcOption.dataset.coin_id = "BTC";
        btcOption.textContent = "Bitcoin (BTC)";
        toSelect.prepend(btcOption);
      }

      btcOption.selected = true;
    }
  }

  localStorage.setItem("SELECTED_COIN", JSON.stringify(asset));
});

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
  if (now - lastFetch < 15000 && Object.keys(priceCache).length) return priceCache;

  const ids = Object.values(COINGECKO_IDS).join(",");
  const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`);
  const data = await res.json();

  priceCache = data;
  lastFetch = now;
  return data;
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

  const fromSymbol = (saved?.symbol || "BTC").toUpperCase();
  const toSymbol = (toSelect.options[toSelect.selectedIndex]?.dataset.coin_id || "").toUpperCase();

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
