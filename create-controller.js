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

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    clearError();

    const pin = pinInput.value.trim();
    const pin_confirmation = pinConfirmInput.value.trim();

    if (!/^\d{4}$/.test(pin)) {
      showError("PIN must be exactly 4 digits.");
      return;
    }

    if (pin !== pin_confirmation) {
      showError("PIN confirmation does not match.");
      return;
    }

    try {
      const res = await fetch("/api/pin/create", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ pin, pin_confirmation })
      });

      const data = await res.json().catch(() => ({}));
      console.log("PIN create response:", res.status, data);

      if (!res.ok) {
        showError(data.error || "Unable to create PIN.");
        return;
      }

      localStorage.setItem("USER_HAS_PIN", "1");
      sessionStorage.setItem("PIN_CREATED_SUCCESS", "1");

      const returnTo = sessionStorage.getItem("PIN_RETURN_TO");
      sessionStorage.removeItem("PIN_RETURN_TO");

      window.location.replace(returnTo || "/home.html");
    } catch (err) {
      console.error("PIN create network error:", err);
      showError("Network error. Please try again.");
    }
  });
});
