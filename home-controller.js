(function () {
  document.addEventListener("click", function (e) {
    const row = e.target.closest("[data-symbol]");
    if (!row) return;

    const symbol = (row.dataset.symbol || "").toLowerCase();
    if (!symbol) return;

    const name =
      row.querySelector(".coin-name")?.innerText?.trim() ||
      row.querySelector(".text-sm")?.innerText?.trim() ||
      "";

    const icon = row.querySelector("img")?.src || "";

    // store selected coin
    localStorage.setItem(
      "SELECTED_COIN",
      JSON.stringify({ symbol, name, icon })
    );

    // 🚀 ALWAYS go to assets page (no more swap hijack)
    e.preventDefault();
    window.location.href = "/assets.html?a=" + encodeURIComponent(symbol);
  });
})();
