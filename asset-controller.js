(async function () {
  const byQuery = (() => {
    const a = new URLSearchParams(location.search).get("a");
    if (!a) return null;

    const key = a.toLowerCase();
    const map = {
      btc: {
        name: "Bitcoin",
        symbol: "BTC",
        icon: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png"
      }
    };

    return map[key] || null;
  })();

  const safeParse = (v) => {
    try {
      return v ? JSON.parse(v) : null;
    } catch {
      return null;
    }
  };

  const asset =
    byQuery ||
    safeParse(localStorage.getItem("SELECTED_ASSET")) ||
    safeParse(sessionStorage.getItem("ACTIVE_ASSET"));

  if (!asset || !asset.symbol) {
    console.warn("No asset found");
    return;
  }

  sessionStorage.setItem("ACTIVE_ASSET", JSON.stringify(asset));

  // =========================
  // SYMBOL → COINGECKO ID MAP
  // =========================
  const map = {
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

  const geckoId = map[asset.symbol];
  if (!geckoId) {
    console.warn("Unsupported asset:", asset.symbol);
    return;
  }

  // =========================
  // DOM TARGETS (MATCH YOUR HTML)
  // =========================
  const iconSelector = ".w-16.h-16 img";

  function applyIcon() {
    const img = document.querySelector(iconSelector);
    if (!img || !asset.icon) return;

    if (img.src !== asset.icon) {
      img.src = asset.icon;
      img.alt = asset.name || asset.symbol;
    }
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

  // =========================
  // PRICE FETCH
  // =========================
  async function updateAsset() {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${geckoId}&vs_currencies=usd&include_24hr_change=true`
      );
      const data = await res.json();
      if (!data[geckoId]) return;

      applyLabels(
        data[geckoId].usd,
        data[geckoId].usd_24h_change
      );

      applyIcon();
    } catch (err) {
      console.error("Price update failed:", err);
    }
  }

  // =========================
  // TRADINGVIEW (INJECT ONCE)
  // =========================
  const tvContainer = document.getElementById("tradingview-widget-container");
  if (tvContainer && !tvContainer.dataset.loaded) {
    const tvSymbol = "BINANCE:BTCUSDT";

    tvContainer.innerHTML = `
      <iframe
        src="https://s.tradingview.com/widgetembed/?symbol=${tvSymbol}&interval=D&theme=dark"
        style="width:100%;height:380px;border:0"
        loading="lazy">
      </iframe>
    `;

    tvContainer.dataset.loaded = "1";
  }

  // =========================
  // 🔒 MUTATION OBSERVER (ICON LOCK)
  // =========================
  const observer = new MutationObserver(() => {
    applyIcon();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // =========================
  // INITIAL + AUTO REFRESH
  // =========================
  applyIcon();
  updateAsset();
  setInterval(updateAsset, 30000);
})();
