document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("pinForm");
  const pinInput = document.getElementById("pin");
  const pinConfirmInput = document.getElementById("pin_confirmation");

  if (!form || !pinInput || !pinConfirmInput) return;

  function showError(message) {
    let errorBox = document.getElementById("pinErrorBox");

    if (!errorBox) {
      errorBox = document.createElement("div");
      errorBox.id = "pinErrorBox";
      errorBox.className = "alert alert-danger";
      form.parentNode.insertBefore(errorBox, form);
    }

    errorBox.textContent = message;
  }

  function clearError() {
    const errorBox = document.getElementById("pinErrorBox");
    if (errorBox) errorBox.remove();
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearError();

    const pin = pinInput.value.trim();
    const confirmPin = pinConfirmInput.value.trim();

    if (!/^\d{4}$/.test(pin)) {
      showError("PIN must be exactly 4 digits.");
      return;
    }

    if (pin !== confirmPin) {
      showError("PIN confirmation does not match.");
      return;
    }

    localStorage.setItem("USER_HAS_PIN", "1");
    localStorage.setItem("USER_PIN", pin);
    sessionStorage.setItem("PIN_CREATED_SUCCESS", "1");

    window.location.href = "/home.html";
  });
});