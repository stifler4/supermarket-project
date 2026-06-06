document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. AUTH HEADER UPDATE (Existing Code)
  // ==========================================
  function updateHeaderAuth() {
    const user = JSON.parse(localStorage.getItem("bbLoggedInUser") || "null");
    const link = document.getElementById("headerAuthLink");
    const icon = document.getElementById("accountIconBtn");

    if (user && link) {
      link.textContent = user.name.split(" ")[0];
      link.href = "account.html";
    }
    if (user && icon) {
      icon.href = "account.html";
    }
  }

  updateHeaderAuth();

  // ==========================================
  // 2. CART BADGE FIX (Added Code)
  // ==========================================
  function updateCartBadge() {
    const badge = document.querySelector(".cart-badge");

    // 1. Force the starting count to 0 (Nothing in cart)
    // If you have a cart saved in localStorage later, you would parse that here instead.
    let cartCount = 0;

    if (badge) {
      badge.textContent = cartCount;

      // 2. If count is 0, hide the badge completely.
      // This removes the "small circle" when the cart is empty.
      if (cartCount === 0) {
        badge.style.display = "none";
      } else {
        badge.style.display = "block"; // Or 'inline-block' depending on your CSS
      }
    }
  }

  // Run the update immediately to fix the icon on page load
  updateCartBadge();
});
