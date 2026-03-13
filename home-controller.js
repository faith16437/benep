(function () {
  function normalizeSymbol(raw) {
    if (!raw) return "";

    return raw
      .replace(/\(.*?\)/g, "")
      .replace(/ERC20|TRC20|BSC/gi, "")
      .replace(/\s+/g, " ")
      .trim()
      .split(" ")
      .pop()
      .toUpperCase();
  }

  document.addEventListener(
    "click",
    function (e) {
      const row = e.target.closest('[onclick^="selectAsset("]');
      if (!row) return;

      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      const onclick = row.getAttribute("onclick") || "";
      const m = onclick.match(/selectAsset\('([^']+)'\s*,\s*'([^']+)'\)/);
      if (!m) return;

      const assetId = m[1];
      const actionType = m[2];

      const icon = row.querySelector("img")?.src || "";
      const nameLine = row.querySelector(".text-sm")?.innerText?.trim() || "";
      const tokenLine = row.querySelector(".text-xs")?.innerText?.trim() || "";

      const symbol = normalizeSymbol(tokenLine);

      localStorage.setItem(
        "SELECTED_COIN",
        JSON.stringify({ id: assetId, name: nameLine, symbol, icon })
      );

      if (actionType === "Swap") {
  window.location.href = "swap.html?coin=" + encodeURIComponent(symbol.toLowerCase());
} else if (actionType === "Send") {
  window.location.href = "withdraw?coin=" + encodeURIComponent(symbol.toLowerCase());
} else if (actionType === "Receive") {
  window.location.href = "receive.html?coin=" + encodeURIComponent(symbol.toLowerCase());
} else {
  window.location.href = "swap.html?coin=" + encodeURIComponent(symbol.toLowerCase());
}
    },
    true
  );
})();
