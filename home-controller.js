(function () {
  document.addEventListener("click", function (e) {
    const row = e.target.closest("[data-symbol]");
    if (!row) return;

    const symbol = (row.dataset.symbol || "").toLowerCase();

    const name = row.querySelector(".text-sm")?.innerText?.trim() || "";
    const icon = row.querySelector("img")?.src || "";

    localStorage.setItem(
      "SELECTED_COIN",
      JSON.stringify({ symbol, name, icon })
    );

    const action = row.dataset.action || "Swap";

    if (action === "Swap") {
      window.location.href = "swap.html?coin=" + symbol;
    } else if (action === "Send") {
      window.location.href = "withdraw.html?coin=" + symbol;
    } else if (action === "Receive") {
      window.location.href = "receive.html?coin=" + symbol;
    } else {
      window.location.href = "swap.html?coin=" + symbol;
    }
  });
})();
