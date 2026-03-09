(async function () {

  // read selected coin
  const params = new URLSearchParams(window.location.search);
  let urlCoin = params.get("a");

  let storedCoin = null;

  try {
    storedCoin = JSON.parse(localStorage.getItem("SELECTED_COIN"));
  } catch {
    storedCoin = null;
  }

  let symbol =
    (urlCoin ||
      storedCoin?.symbol ||
      "BTC"
    ).split("-")[0].toUpperCase();


  // load wallets
  const res = await fetch("/wallets.json");
  const data = await res.json();

  let address = data.wallets[symbol];


  // network mappings

  const ERC20 = ["SHIB","LINK","PEPE","ONDO","QNT","LCX","USDT","BNB"];
  const TRC20 = ["USDT_TRC20"];

  if (ERC20.includes(symbol)) {
    address = data.wallets["ETH"];
  }

  if (symbol === "USDT_TRC20") {
    address = data.wallets["TRX"];
  }


  // update page

  const coinEl = document.getElementById("depositCoin");
  const addrEl = document.getElementById("depositAddress");
  const qrEl = document.getElementById("depositQR");

  if (coinEl) coinEl.textContent = symbol;

  if (addrEl) addrEl.textContent = address;


  // generate QR code

  if (qrEl && address) {
    qrEl.src =
      "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" +
      encodeURIComponent(address);
  }


  // copy address button

  const copyBtn = document.getElementById("copyAddress");

  if (copyBtn && address) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(address);

      copyBtn.innerText = "Copied!";
      setTimeout(() => {
        copyBtn.innerText = "Copy";
      }, 2000);
    });
  }

})();