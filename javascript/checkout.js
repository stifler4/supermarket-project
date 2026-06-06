// =========================================
// checkout.js — Checkout Page Logic
// Used by: checkout.html
// =========================================

document.addEventListener("DOMContentLoaded", () => {
  // --- GET STATE ---
  const loggedInUser = JSON.parse(
    localStorage.getItem("bbLoggedInUser") || "null",
  );
  const cart = JSON.parse(localStorage.getItem("mySupermarketCart") || "[]");

  // --- ELEMENTS ---
  const checkoutGuard = document.getElementById("checkoutGuard");
  const emptyCartGuard = document.getElementById("emptyCartGuard");
  const checkoutContent = document.getElementById("checkoutContent");
  const checkoutSuccess = document.getElementById("checkoutSuccess");

  // --- UPDATE HEADER ---
  function updateHeaderAuth() {
    const link = document.getElementById("headerAuthLink");
    const icon = document.getElementById("accountIconBtn");
    if (loggedInUser && link) {
      link.textContent = loggedInUser.name.split(" ")[0];
      link.href = "account.html";
    }
    if (loggedInUser && icon) icon.href = "account.html";
  }
  updateHeaderAuth();

  // --- GUARD 1: Not logged in ---
  if (!loggedInUser) {
    checkoutGuard.classList.remove("hidden");
    return;
  }

  // --- GUARD 2: Empty cart ---
  if (cart.length === 0) {
    emptyCartGuard.classList.remove("hidden");
    return;
  }

  // --- SHOW CHECKOUT CONTENT ---
  checkoutContent.classList.remove("hidden");

  // --- CALCULATE TOTALS ---
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // --- GET WALLET BALANCE ---
  const walletKey = "bbWallet_" + loggedInUser.email;
  const walletBalance = parseFloat(localStorage.getItem(walletKey) || "0");

  // --- RENDER ITEMS ---
  const itemsList = document.getElementById("checkoutItemsList");
  itemsList.innerHTML = cart
    .map(
      (item) => `
        <div class="checkout-item-row">
            <img src="${item.image}" alt="${item.name}" class="checkout-item-img"
                 onerror="this.style.background='#f0f0f0'">
            <div class="checkout-item-details">
                <span class="checkout-item-name">${item.name}</span>
                <span class="checkout-item-qty">Qty: ${item.quantity}</span>
            </div>
            <span class="checkout-item-price">&#8358;${(item.price * item.quantity).toLocaleString()}</span>
        </div>
    `,
    )
    .join("");

  // --- POPULATE SUMMARY ---
  document.getElementById("checkoutSubtotal").textContent =
    "₦" + total.toLocaleString();
  document.getElementById("checkoutTotal").textContent =
    "₦" + total.toLocaleString();
  document.getElementById("checkoutWalletBalance").textContent =
    "₦" + walletBalance.toLocaleString();

  const balanceAfter = walletBalance - total;
  const balanceAfterEl = document.getElementById("balanceAfter");
  balanceAfterEl.textContent = "₦" + Math.max(0, balanceAfter).toLocaleString();

  // --- CHECK IF BALANCE IS SUFFICIENT ---
  const confirmBtn = document.getElementById("confirmOrderBtn");
  const lowBalanceWarn = document.getElementById("lowBalanceWarning");

  if (walletBalance < total) {
    // Not enough balance
    lowBalanceWarn.classList.remove("hidden");
    confirmBtn.disabled = true;
    confirmBtn.style.opacity = "0.5";
    confirmBtn.style.cursor = "not-allowed";
    balanceAfterEl.style.color = "#dc2626";
  }

  // --- CONFIRM ORDER ---
  confirmBtn.addEventListener("click", () => {
    if (walletBalance < total) return;

    // 1. Deduct from wallet
    const newBalance = walletBalance - total;
    localStorage.setItem(walletKey, newBalance.toString());

    // 2. Save order to history
    const storageKey = "bbOrders_" + loggedInUser.email;
    const orderHistory = JSON.parse(localStorage.getItem(storageKey) || "[]");
    orderHistory.push({
      date: new Date().toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      items: cart,
      total: total,
    });
    localStorage.setItem(storageKey, JSON.stringify(orderHistory));

    // 3. Clear cart
    localStorage.removeItem("mySupermarketCart");

    // 4. Show success
    checkoutContent.classList.add("hidden");
    checkoutSuccess.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // --- MOBILE DRAWER ---
  const mobileToggle = document.getElementById("mobileToggle");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const backdrop = document.getElementById("backdrop");

  if (mobileToggle) {
    mobileToggle.addEventListener("click", () => {
      mobileDrawer.classList.toggle("active");
      backdrop.classList.toggle("active");
    });
  }
  if (backdrop) {
    backdrop.addEventListener("click", () => {
      mobileDrawer.classList.remove("active");
      backdrop.classList.remove("active");
    });
  }
});
