(async function () {

const params = new URLSearchParams(window.location.search);
let symbol = params.get("a");

if (!symbol) symbol = "btc";

symbol = symbol.split("-")[0].toUpperCase();

const res = await fetch("/wallets.json");
const data = await res.json();

let address = data.wallets[symbol];

const ERC20 = ["SHIB","LINK","PEPE","ONDO","QNT","LCX","USDT","BNB"];
const TRC20 = ["USDT_TRC20"];

if (ERC20.includes(symbol)) {
address = data.wallets["ETH"];
}

if (symbol === "USDT_TRC20") {
address = data.wallets["TRX"];
}

const coinEl = document.getElementById("depositCoin");
const addrEl = document.getElementById("depositAddress");
const qrEl = document.getElementById("depositQR");
const copyBtn = document.getElementById("copyAddress");

if (coinEl) coinEl.textContent = symbol;

if (addrEl) addrEl.textContent = address;

if (qrEl && address) {
qrEl.src =
"https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" +
encodeURIComponent(address);
}

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
