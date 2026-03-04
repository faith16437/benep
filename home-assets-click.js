(function () {
  document.addEventListener(
    "click",
    function (e) {
      // ✅ ONLY target the big list (not the modal)
      const coinItem = e.target.closest("a.coin-item");
      if (!coinItem) return;

      // 🚫 ignore modal items if they ever end up inside DOM overlaps
      if (coinItem.closest("#assetModal")) return;

      // hard stop original navigation
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      const name =
        (coinItem.getAttribute("data-name") || "").trim() ||
        (coinItem.querySelector(".coin-name")?.textContent || "").trim();

      const symbol =
        (coinItem.getAttribute("data-symbol") || "").trim().toUpperCase();

      const icon =
        coinItem.querySelector(".coin-icon img")?.getAttribute("src") ||
        coinItem.querySelector("img")?.getAttribute("src") ||
        "";

      if (!symbol) return;

      localStorage.setItem(
        "SELECTED_ASSET",
        JSON.stringify({ name, symbol, icon })
      );

      // go to your local template page
      window.location.href = "assets.html";
    },
    true // capture phase so we beat other handlers
  );
})();
