(function () {
  const params = new URLSearchParams(window.location.search);
  const selectedCoin = (params.get("coin") || "btc").toLowerCase();

  const ASSETS = {
    btc:  { id: 1,  symbol: "BTC",  name: "Bitcoin",              icon: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png" },
    eth:  { id: 2,  symbol: "ETH",  name: "Ethereum",             icon: "https://assets.coingecko.com/coins/images/279/large/ethereum.png" },
    xrp:  { id: 3,  symbol: "XRP",  name: "Ripple",               icon: "https://assets.coingecko.com/coins/images/44/large/xrp.png" },
    bch:  { id: 4,  symbol: "BCH",  name: "Bitcoin Cash",         icon: "https://coin-images.coingecko.com/coins/images/780/large/bitcoin-cash-circle.png" },
    xlm:  { id: 5,  symbol: "XLM",  name: "Stellar",              icon: "https://assets.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png" },
    ltc:  { id: 6,  symbol: "LTC",  name: "Litecoin",             icon: "https://assets.coingecko.com/coins/images/2/large/litecoin.png" },
    trx:  { id: 7,  symbol: "TRX",  name: "Tron",                 icon: "https://coin-images.coingecko.com/coins/images/1094/large/tron-logo.png" },
    doge: { id: 8,  symbol: "DOGE", name: "Doge Coin",            icon: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png" },
    algo: { id: 9,  symbol: "ALGO", name: "Algorand",             icon: "https://assets.coingecko.com/coins/images/4380/large/download.png" },
    sol:  { id: 10, symbol: "SOL",  name: "Solana",               icon: "https://assets.coingecko.com/coins/images/4128/large/coinmarketcap-solana-200.png" },
    dot:  { id: 11, symbol: "DOT",  name: "Polkadot",             icon: "https://coin-images.coingecko.com/coins/images/12171/large/polkadot.png" },
    ada:  { id: 12, symbol: "ADA",  name: "Cardano",              icon: "https://assets.coingecko.com/coins/images/975/large/cardano.png" },
    bnb:  { id: 13, symbol: "BNB",  name: "Binance Coin",         icon: "https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png" },
    usdt: { id: 14, symbol: "USDT", name: "Tether",               icon: "https://assets.coingecko.com/coins/images/325/large/Tether-logo.png" },
    shib: { id: 17, symbol: "SHIB", name: "SHIBA INU",            icon: "https://assets.coingecko.com/coins/images/11939/large/shiba.png" },
    pepe: { id: 18, symbol: "PEPE", name: "PEPE",                 icon: "https://assets.coingecko.com/coins/images/29850/large/pepe-token.jpeg" },
    link: { id: 19, symbol: "LINK", name: "Chainlink",            icon: "https://coin-images.coingecko.com/coins/images/877/large/chainlink-new-logo.png" },
    jasmy:{ id: 20, symbol: "JASMY",name: "JasmyCoin",            icon: "https://coin-images.coingecko.com/coins/images/13876/large/JASMY200x200.jpg" },
    pol:  { id: 21, symbol: "POL",  name: "Polygon (ex-MATIC)",   icon: "https://coin-images.coingecko.com/coins/images/32440/large/polygon.png" },
    celo: { id: 22, symbol: "CELO", name: "Celo",                 icon: "https://assets.coingecko.com/coins/images/11090/standard/InjXBNx9_400x400.jpg" },
    hbar: { id: 23, symbol: "HBAR", name: "Hedera",               icon: "https://coin-images.coingecko.com/coins/images/3688/large/hbar.png" },
    qnt:  { id: 24, symbol: "QNT",  name: "Quant",                icon: "https://coin-images.coingecko.com/coins/images/3370/large/5ZOu7brX_400x400.jpg" },
    ondo: { id: 25, symbol: "ONDO", name: "Ondo",                 icon: "https://coin-images.coingecko.com/coins/images/26580/large/ONDO.png" },
    trb:  { id: 26, symbol: "TRB",  name: "Tellor Tributes",      icon: "https://assets.coingecko.com/coins/images/9644/large/TRB-New_Logo.png" },
    flr:  { id: 27, symbol: "FLR",  name: "Flare",                icon: "https://coin-images.coingecko.com/coins/images/28624/large/FLR-icon200x200.png" },
    vet:  { id: 28, symbol: "VET",  name: "VeChain",              icon: "https://coin-images.coingecko.com/coins/images/1167/large/VET.png" },
    iotx: { id: 29, symbol: "IOTX", name: "IoTeX",                icon: "https://assets.coingecko.com/coins/images/3334/large/20250731-171811.png" },
    zbcn: { id: 30, symbol: "ZBCN", name: "Zebec Network",        icon: "https://assets.coingecko.com/coins/images/37052/large/zbcn.jpeg" },
    lcx:  { id: 31, symbol: "LCX",  name: "LCX",                  icon: "https://assets.coingecko.com/coins/images/9985/large/zRPSu_0o_400x400.jpg" },
    cro:  { id: 32, symbol: "CRO",  name: "Cronos",               icon: "https://coin-images.coingecko.com/coins/images/7310/large/cro_token_logo.png" }
  };

  const asset = ASSETS[selectedCoin] || ASSETS.btc;

  const backLabel = document.querySelector(".max-w-md.mx-auto.px-4.pt-4 span.text-sm");
  const fromText = document.getElementById("from_token_text");
  const fromTokenIdInput = document.querySelector('input[name="from_token_id"]');
  const coinSymbolInput = document.getElementById("coinSymbol");
  const cryptoAmountInput = document.getElementById("cryptoAmount");
  const balanceText = document.querySelector(".text-xs.text-gray-400 .text-white");
  const form = document.getElementById("form");
  const fromAmountInput = document.getElementById("from_amount");
  const toSelect = document.getElementById("toTokenId");
  const fromIcon = document.querySelector("#form .bg-dark .swapbox img");

  if (backLabel) backLabel.textContent = `Swap ${asset.symbol}`;
  if (fromText) fromText.textContent = `${asset.name} (${asset.symbol})`;
  if (fromTokenIdInput) fromTokenIdInput.value = asset.id;
  if (coinSymbolInput) coinSymbolInput.value = asset.symbol;
  if (cryptoAmountInput) cryptoAmountInput.value = "0.00000000";
  if (balanceText) balanceText.textContent = `0.00000000 ${asset.symbol}`;
  if (fromAmountInput) fromAmountInput.max = "0.00000000";
  if (form) form.action = `https://web3ledgernetwork.com/app/assets/swap_token/${asset.id}`;
  if (fromIcon) fromIcon.src = asset.icon;

  if (toSelect) {
    [...toSelect.options].forEach(option => {
      option.selected = false;
    });

    if (asset.symbol === "BTC") {
      const ethOpt = [...toSelect.options].find(o => o.dataset.coin_id === "ETH");
      if (ethOpt) ethOpt.selected = true;
    } else {
      let btcOpt = [...toSelect.options].find(o => o.dataset.coin_id === "BTC");

      if (!btcOpt) {
        btcOpt = document.createElement("option");
        btcOpt.value = "1";
        btcOpt.dataset.coin_id = "BTC";
        btcOpt.textContent = "Bitcoin (BTC)";
        toSelect.prepend(btcOpt);
      }

      btcOpt.selected = true;
    }
  }

  localStorage.setItem("SELECTED_COIN", JSON.stringify(asset));
})();
