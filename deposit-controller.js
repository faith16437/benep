(async function () {
  const params = new URLSearchParams(window.location.search);

  let symbol = params.get("coin") || params.get("a") || "btc";
  symbol = symbol.toUpperCase();

  const res = await fetch("/wallets.json");
  const data = await res.json();

  function getWalletKey(sym) {
    if (!sym) return "BTC";

    // Network-specific overrides
    if (sym === "USDT_TRC20") return "TRX";
    if (sym === "USDT_ERC20") return "ETH";
    if (sym === "USDT_BSC") return "BNB";

    // ERC20 tokens use ETH address
    const ERC20 = ["SHIB", "LINK", "PEPE", "ONDO", "QNT", "LCX", "JASMY"];
    if (ERC20.includes(sym)) return "ETH";

    return sym;
  }

  const walletKey = getWalletKey(symbol);
  const address = data.wallets[walletKey] || "";

  const coinEl = document.getElementById("depositCoin");
  const addrEl = document.getElementById("depositAddress");
  const qrEl = document.getElementById("depositQR");
  const copyBtn = document.getElementById("copyAddress");

  if (coinEl) coinEl.textContent = symbol;
  if (addrEl) addrEl.textContent = address || "Address not found";

  if (qrEl && address) {
    qrEl.src =
      "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" +
      encodeURIComponent(address);
  }

  if (copyBtn && address) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(address);
        copyBtn.innerText = "Copied!";
      } catch {
        copyBtn.innerText = "Copy failed";
      }

      setTimeout(() => {
        copyBtn.innerText = "Copy Address";
      }, 2000);
    });
  }
})();
