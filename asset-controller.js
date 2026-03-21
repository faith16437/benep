(async function () {
  const ASSETS = {
    btc: {
      name: "Bitcoin",
      symbol: "BTC",
      icon: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
      geckoId: "bitcoin",
      tv: "BINANCE:BTCUSDT"
    },
    eth: {
      name: "Ethereum",
      symbol: "ETH",
      icon: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
      geckoId: "ethereum",
      tv: "BINANCE:ETHUSDT"
    },
    xrp: {
      name: "Ripple",
      symbol: "XRP",
      icon: "https://assets.coingecko.com/coins/images/44/large/xrp.png",
      geckoId: "ripple",
      tv: "BINANCE:XRPUSDT"
    },
    bch: {
      name: "Bitcoin Cash",
      symbol: "BCH",
      icon: "https://coin-images.coingecko.com/coins/images/780/large/bitcoin-cash-circle.png",
      geckoId: "bitcoin-cash",
      tv: "BINANCE:BCHUSDT"
    },
    xlm: {
      name: "Stellar",
      symbol: "XLM",
      icon: "https://assets.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png",
      geckoId: "stellar",
      tv: "BINANCE:XLMUSDT"
    },
    ltc: {
      name: "Litecoin",
      symbol: "LTC",
      icon: "https://assets.coingecko.com/coins/images/2/large/litecoin.png",
      geckoId: "litecoin",
      tv: "BINANCE:LTCUSDT"
    },
    trx: {
      name: "Tron",
      symbol: "TRX",
      icon: "https://coin-images.coingecko.com/coins/images/1094/large/tron-logo.png",
      geckoId: "tron",
      tv: "BINANCE:TRXUSDT"
    },
    doge: {
      name: "Dogecoin",
      symbol: "DOGE",
      icon: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png",
      geckoId: "dogecoin",
      tv: "BINANCE:DOGEUSDT"
    },
    algo: {
      name: "Algorand",
      symbol: "ALGO",
      icon: "https://assets.coingecko.com/coins/images/4380/large/download.png",
      geckoId: "algorand",
      tv: "BINANCE:ALGOUSDT"
    },
    sol: {
      name: "Solana",
      symbol: "SOL",
      icon: "https://assets.coingecko.com/coins/images/4128/large/coinmarketcap-solana-200.png",
      geckoId: "solana",
      tv: "BINANCE:SOLUSDT"
    },
    dot: {
      name: "Polkadot",
      symbol: "DOT",
      icon: "https://coin-images.coingecko.com/coins/images/12171/large/polkadot.png",
      geckoId: "polkadot",
      tv: "BINANCE:DOTUSDT"
    },
    ada: {
      name: "Cardano",
      symbol: "ADA",
      icon: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
      geckoId: "cardano",
      tv: "BINANCE:ADAUSDT"
    },
    bnb: {
      name: "Binance Coin",
      symbol: "BNB",
      icon: "https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png",
      geckoId: "binancecoin",
      tv: "BINANCE:BNBUSDT"
    },
    usdt: {
      name: "Tether",
      symbol: "USDT",
      icon: "https://assets.coingecko.com/coins/images/325/large/Tether-logo.png",
      geckoId: "tether",
      tv: "BINANCE:USDTUSD"
    },
    shib: {
      name: "Shiba Inu",
      symbol: "SHIB",
      icon: "https://assets.coingecko.com/coins/images/11939/large/shiba.png",
      geckoId: "shiba-inu",
      tv: "BINANCE:SHIBUSDT"
    },
    pepe: {
      name: "PEPE",
      symbol: "PEPE",
      icon: "https://assets.coingecko.com/coins/images/29850/large/pepe-token.jpeg",
      geckoId: "pepe",
      tv: "BINANCE:PEPEUSDT"
    },
    link: {
      name: "Chainlink",
      symbol: "LINK",
      icon: "https://coin-images.coingecko.com/coins/images/877/large/chainlink-new-logo.png",
      geckoId: "chainlink",
      tv: "BINANCE:LINKUSDT"
    },
    jasmy: {
      name: "JasmyCoin",
      symbol: "JASMY",
      icon: "https://coin-images.coingecko.com/coins/images/13876/large/JASMY200x200.jpg",
      geckoId: "jasmycoin",
      tv: "BINANCE:JASMYUSDT"
    },
    pol: {
      name: "Polygon",
      symbol: "POL",
      icon: "https://coin-images.coingecko.com/coins/images/32440/large/polygon.png",
      geckoId: "polygon-ecosystem-token",
      tv: "BINANCE:POLUSDT"
    },
    celo: {
      name: "Celo",
      symbol: "CELO",
      icon: "https://assets.coingecko.com/coins/images/11090/standard/InjXBNx9_400x400.jpg",
      geckoId: "celo",
      tv: "BINANCE:CELOUSDT"
    },
    hbar: {
      name: "Hedera",
      symbol: "HBAR",
      icon: "https://coin-images.coingecko.com/coins/images/3688/large/hbar.png",
      geckoId: "hedera-hashgraph",
      tv: "BINANCE:HBARUSDT"
    },
    qnt: {
      name: "Quant",
      symbol: "QNT",
      icon: "https://coin-images.coingecko.com/coins/images/3370/large/5ZOu7brX_400x400.jpg",
      geckoId: "quant-network",
      tv: "BINANCE:QNTUSDT"
    },
    ondo: {
      name: "Ondo",
      symbol: "ONDO",
      icon: "https://coin-images.coingecko.com/coins/images/26580/large/ONDO.png",
      geckoId: "ondo-finance",
      tv: "BINANCE:ONDOUSDT"
    },
    trb: {
      name: "Tellor",
      symbol: "TRB",
      icon: "https://assets.coingecko.com/coins/images/9644/large/TRB-New_Logo.png",
      geckoId: "tellor",
      tv: "BINANCE:TRBUSDT"
    },
    flr: {
      name: "Flare",
      symbol: "FLR",
      icon: "https://coin-images.coingecko.com/coins/images/28624/large/FLR-icon200x200.png",
      geckoId: "flare-networks",
      tv: "BINANCE:FLRUSDT"
    },
    vet: {
      name: "VeChain",
      symbol: "VET",
      icon: "https://coin-images.coingecko.com/coins/images/1167/large/VET.png",
      geckoId: "vechain",
      tv: "BINANCE:VETUSDT"
    },
    iotx: {
      name: "IoTeX",
      symbol: "IOTX",
      icon: "https://assets.coingecko.com/coins/images/3334/large/20250731-171811.png",
      geckoId: "iotex",
      tv: "BINANCE:IOTXUSDT"
    },
    zbcn: {
      name: "Zebec Network",
      symbol: "ZBCN",
      icon: "https://assets.coingecko.com/coins/images/37052/large/zbcn.jpeg",
      geckoId: "zebec-network",
      tv: "BINANCE:ZBCNUSDT"
    },
    lcx: {
      name: "LCX",
      symbol: "LCX",
      icon: "https://assets.coingecko.com/coins/images/9985/large/zRPSu_0o_400x400.jpg",
      geckoId: "lcx",
      tv: "BINANCE:LCXUSDT"
    },
    cro: {
      name: "Cronos",
      symbol: "CRO",
      icon: "https://coin-images.coingecko.com/coins/images/7310/large/cro_token_logo.png",
      geckoId: "crypto-com-chain",
      tv: "BINANCE:CROUSDT"
    }
  };

  const safeParse = (v) => {
    try { return v ? JSON.parse(v) : null; } catch { return null; }
  };

  const q = (new URLSearchParams(location.search).get("a") || "").toLowerCase();

  const asset =
    ASSETS[q] ||
    safeParse(localStorage.getItem("SELECTED_ASSET")) ||
    safeParse(sessionStorage.getItem("ACTIVE_ASSET"));

  if (!asset || !asset.symbol) {
    console.warn("No asset found");
    return;
  }

  sessionStorage.setItem("ACTIVE_ASSET", JSON.stringify(asset));

  const iconSelector = ".w-16.h-16 img";

  function applyIcon() {
    const img = document.querySelector(iconSelector);
    if (!img || !asset.icon) return;
    img.src = asset.icon;
    img.alt = asset.name || asset.symbol;
  }

  function applyLabels(price, change) {
    const priceEl = document.querySelector(".coinPrice");
    const changeEl = document.getElementById("priceHistory");
    const labelEl = document.querySelector(".coinLabel");

    if (priceEl) priceEl.textContent = `$${price.toLocaleString()}`;
    if (changeEl) {
      changeEl.textContent = `${change.toFixed(2)}%`;
      changeEl.style.color = change >= 0 ? "green" : "red";
    }
    if (labelEl) labelEl.textContent = `${asset.symbol} Current Price`;
  }

  async function updateAsset() {
  try {
    const res = await fetch("https://round-poetry-6598.officeusps368.workers.dev/api/prices");
    const data = await res.json();

    if (!data[asset.geckoId]) return;

    applyLabels(
      data[asset.geckoId].usd,
      data[asset.geckoId].usd_24h_change
    );

    applyIcon();
  } catch (err) {
    console.error("Price update failed:", err);
  }
}

  const tvContainer = document.getElementById("tradingview-widget-container");
if (tvContainer) {
  tvContainer.innerHTML = "";
  tvContainer.removeAttribute("data-loaded");

  tvContainer.innerHTML = `
    <iframe
      src="https://s.tradingview.com/widgetembed/?symbol=${encodeURIComponent(asset.tv)}&interval=D&theme=dark"
      style="width:100%;height:380px;border:0"
      loading="lazy">
    </iframe>
  `;

  tvContainer.dataset.loaded = "1";
}

  const observer = new MutationObserver(() => applyIcon());
  observer.observe(document.body, { childList: true, subtree: true });

  applyIcon();
  updateAsset();
  let updating = false;

async function safeUpdate() {
  if (updating) return;
  updating = true;

  await updateAsset();

  setTimeout(() => {
    updating = false;
    safeUpdate();
  }, 60000); // 60 seconds (safe)
}

safeUpdate();
})();
