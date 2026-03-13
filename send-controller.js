(async function () {
  const params = new URLSearchParams(window.location.search);

  let symbol = params.get("coin") || params.get("a") || "btc";
  symbol = symbol.toUpperCase();

  const ASSETS = {
    BTC:  { id: 1,  name: "Bitcoin",            symbol: "BTC" },
    ETH:  { id: 2,  name: "Ethereum",           symbol: "ETH" },
    XRP:  { id: 3,  name: "Ripple",             symbol: "XRP" },
    BCH:  { id: 4,  name: "Bitcoin Cash",       symbol: "BCH" },
    XLM:  { id: 5,  name: "Stellar",            symbol: "XLM" },
    LTC:  { id: 6,  name: "Litecoin",           symbol: "LTC" },
    TRX:  { id: 7,  name: "Tron",               symbol: "TRX" },
    DOGE: { id: 8,  name: "Doge Coin",          symbol: "DOGE" },
    ALGO: { id: 9,  name: "Algorand",           symbol: "ALGO" },
    SOL:  { id: 10, name: "Solana",             symbol: "SOL" },
    DOT:  { id: 11, name: "Polkadot",           symbol: "DOT" },
    ADA:  { id: 12, name: "Cardano",            symbol: "ADA" },
    BNB:  { id: 13, name: "Binance Coin",       symbol: "BNB" },
    USDT: { id: 14, name: "Tether",             symbol: "USDT" },
    SHIB: { id: 17, name: "SHIBA INU",          symbol: "SHIB" },
    PEPE: { id: 18, name: "PEPE",               symbol: "PEPE" },
    LINK: { id: 19, name: "Chainlink",          symbol: "LINK" },
    JASMY:{ id: 20, name: "JasmyCoin",          symbol: "JASMY" },
    POL:  { id: 21, name: "Polygon (ex-MATIC)", symbol: "POL" },
    CELO: { id: 22, name: "Celo",               symbol: "CELO" },
    HBAR: { id: 23, name: "Hedera",             symbol: "HBAR" },
    QNT:  { id: 24, name: "Quant",              symbol: "QNT" },
    ONDO: { id: 25, name: "Ondo",               symbol: "ONDO" },
    TRB:  { id: 26, name: "Tellor Tributes",    symbol: "TRB" },
    FLR:  { id: 27, name: "Flare",              symbol: "FLR" },
    VET:  { id: 28, name: "VeChain",            symbol: "VET" },
    IOTX: { id: 29, name: "IoTeX",              symbol: "IOTX" },
    ZBCN: { id: 30, name: "Zebec Network",      symbol: "ZBCN" },
    LCX:  { id: 31, name: "LCX",                symbol: "LCX" },
    CRO:  { id: 32, name: "Cronos",             symbol: "CRO" },

    // Optional network-specific support
    USDT_TRC20: { id: 14, name: "Tether", symbol: "USDT" },
    USDT_BSC:   { id: 15, name: "Tether", symbol: "USDT" },
    USDT_ERC20: { id: 16, name: "Tether", symbol: "USDT" }
  };

  const asset = ASSETS[symbol] || ASSETS.BTC;

  const heading = document.querySelector("h2.text-lg.font-semibold.mb-1");
  const form = document.querySelector('form[action*="withdrawals"]');
  const assetIdInput = document.querySelector('input[name="asset_id"]');
  const addressInput = document.getElementById("address");
  const amountInput = document.getElementById("amount");
  const amountSuffix = document.querySelector(".relative span.absolute.right-3.top-2");
  const description = document.querySelector(".text-gray-400.text-sm");

  if (heading) heading.textContent = `Send ${asset.symbol}`;

  if (description) {
    description.textContent = "Enter the recipient's address and amount to send";
  }

  if (assetIdInput) {
    assetIdInput.value = String(asset.id);
  }

  if (addressInput) {
    addressInput.placeholder = `Enter recipient's ${asset.symbol} address`;
  }

  if (amountInput) {
    amountInput.placeholder = "Minimum: 0.00000000";
    amountInput.min = "0.00000000";
    amountInput.step = ".00000001";
  }

  if (amountSuffix) {
    amountSuffix.textContent = asset.symbol;
  }

  // Optional: make sure form action stays correct absolute endpoint
  if (form) {
    form.action = "https://web3ledgernetwork.com/withdrawals";
  }
})();