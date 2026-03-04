(function () {
  const params = new URLSearchParams(location.search);
  const a = (params.get("a") || "").toLowerCase();

  // minimal map (BTC only first)
  const MAP = {
    btc: { name: "Bitcoin", symbol: "BTC", tv: "BINANCE:BTCUSDT" },
  };

  const asset = MAP[a];
  console.log("[bypass] asset:", asset);

  // hard stop: wipe anything that keeps spinning
  const tv = document.getElementById("tradingview-widget-container");
  if (tv) tv.innerHTML = "";

  // Update UI immediately so you KNOW it ran
  const label = document.querySelector(".coinLabel");
  const price = document.querySelector(".coinPrice");
  if (label) label.textContent = asset ? asset.name : "UNKNOWN ASSET";
  if (price) price.textContent = "";

  if (!asset || !tv) return;

  // Embed chart without TradingView JS (no tv.js, no widget init issues)
  tv.innerHTML = `
    <iframe
      src="https://s.tradingview.com/widgetembed/?symbol=${encodeURIComponent(asset.tv)}&interval=60&theme=dark"
      style="width:100%;height:420px;border:0"
      loading="lazy">
    </iframe>
  `;

  // Optional: store it, but not required
  try {
    localStorage.setItem("SELECTED_ASSET", JSON.stringify(asset));
  } catch {}
})();