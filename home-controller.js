(function () {

  function normalizeSymbol(raw) {
    if (!raw) return "";

    return raw
      .replace(/\(.*?\)/g, "")          // remove (ex-MATIC)
      .replace(/ERC20|TRC20|BSC/gi, "") // remove network
      .replace(/\s+/g, " ")             // normalize spaces
      .trim()
      .split(" ")
      .pop()
      .toUpperCase();
  }

  document.addEventListener(
    "click",
    function (e) {
      // MODAL rows look like: <div onclick="selectAsset('2','Swap')">
      const row = e.target.closest('[onclick^="selectAsset("]');
      if (!row) return;

      // Stop the original inline onclick from running
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      // Extract assetId + actionType from onclick string
      const onclick = row.getAttribute("onclick") || "";
      const m = onclick.match(/selectAsset\('([^']+)'\s*,\s*'([^']+)'\)/);
      if (!m) return;

      const assetId = m[1];
      const actionType = m[2];

      // Grab visible data from the row (no hardcoding)
      const icon = row.querySelector("img")?.src || "";
      const nameLine = row.querySelector(".text-sm")?.innerText?.trim() || "";
      const tokenLine = row.querySelector(".text-xs")?.innerText?.trim() || "";

      // 🔒 NORMALIZED symbol (this is the key fix)
      const symbol = normalizeSymbol(tokenLine);

      localStorage.setItem(
        "SELECTED_COIN",
        JSON.stringify({ id: assetId, name: nameLine, symbol, icon })
      );

      // Route to local templates
      if (actionType === "Swap") window.location.href = "swap.html";
      else if (actionType === "Send") window.location.href = "send.html";
      else if (actionType === "Receive") window.location.href = "receive.html";
      else window.location.href = "swap.html";
    },
    true // capture phase so we run before other handlers
  );

})();
