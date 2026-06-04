// =========================================
// account.js — Account / Profile Page Logic
// Used by: account.html
// =========================================

document.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = JSON.parse(
    localStorage.getItem("bbLoggedInUser") || "null",
  );

  const accountGuard = document.getElementById("accountGuard");
  const accountContent = document.getElementById("accountContent");

  // --- GUARD: Redirect if not logged in ---
  if (!loggedInUser) {
    if (accountGuard) accountGuard.classList.remove("hidden");
    if (accountContent) accountContent.classList.add("hidden");
    return;
  }

  // Logged in: show content
  if (accountGuard) accountGuard.classList.add("hidden");
  if (accountContent) accountContent.classList.remove("hidden");

  // --- POPULATE PROFILE BANNER ---
  const initial = loggedInUser.name.charAt(0).toUpperCase();
  document.getElementById("profileInitial").textContent = initial;
  document.getElementById("profileName").textContent = loggedInUser.name;
  document.getElementById("profileEmail").textContent = loggedInUser.email;

  // --- POPULATE PROFILE INFO SECTION ---
  document.getElementById("infoName").textContent = loggedInUser.name;
  document.getElementById("infoEmail").textContent = loggedInUser.email;

  // Get member since from full user record
  const allUsers = JSON.parse(localStorage.getItem("bbUsers") || "[]");
  const fullUser = allUsers.find((u) => u.email === loggedInUser.email);
  document.getElementById("infoMemberSince").textContent =
    fullUser?.memberSince || "N/A";

  // --- LOAD PURCHASE HISTORY ---
  const storageKey = "bbOrders_" + loggedInUser.email;
  const orderHistory = JSON.parse(localStorage.getItem(storageKey) || "[]");

  // --- OVERVIEW STATS ---
  const totalOrders = orderHistory.length;
  const totalItems = orderHistory.reduce(
    (sum, order) => sum + order.items.reduce((s, i) => s + i.quantity, 0),
    0,
  );
  const totalSpent = orderHistory.reduce((sum, order) => sum + order.total, 0);

  document.getElementById("totalOrdersCount").textContent = totalOrders;
  document.getElementById("totalItemsCount").textContent = totalItems;
  document.getElementById("totalSpentAmount").textContent =
    "₦" + totalSpent.toLocaleString();

  // --- RENDER ORDER CARDS ---
  function buildOrderHTML(orders) {
    if (!orders || orders.length === 0) {
      return `
                <div class="empty-history">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ddd" stroke-width="1.5">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                    <p>No orders yet. Start shopping!</p>
                    <a href="index.html" style="color:#C5A059; font-weight:600; text-decoration:none;">Browse Products →</a>
                </div>
            `;
    }

    return orders
      .map((order) => {
        const itemsHTML = order.items
          .map(
            (item) => `
                <div class="order-item-row">
                    <img src="${item.image}" alt="${item.name}" class="order-item-img"
                         onerror="this.style.background='#f0f0f0'; this.src=''">
                    <span class="order-item-name">${item.name}</span>
                    <span class="order-item-qty">x${item.quantity}</span>
                    <span class="order-item-price">₦${(item.price * item.quantity).toLocaleString()}</span>
                </div>
            `,
          )
          .join("");

        return `
                <div class="order-card">
                    <div class="order-card-header">
                        <span class="order-date">${order.date}</span>
                        <span class="order-total-tag">₦${order.total.toLocaleString()}</span>
                        <span class="order-status">Completed</span>
                    </div>
                    <div class="order-items-list">
                        ${itemsHTML}
                    </div>
                </div>
            `;
      })
      .join("");
  }

  // Recent orders: last 3
  const recentOrders = [...orderHistory].reverse().slice(0, 3);
  document.getElementById("recentOrdersPreview").innerHTML =
    buildOrderHTML(recentOrders);

  // Full order history (reversed so newest first)
  document.getElementById("fullOrderHistory").innerHTML = buildOrderHTML(
    [...orderHistory].reverse(),
  );

  // --- SIDEBAR NAVIGATION ---
  const navLinks = document.querySelectorAll(".account-nav-link");
  const sections = document.querySelectorAll(".account-section");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("data-section");

      navLinks.forEach((l) => l.classList.remove("active"));
      sections.forEach((s) => s.classList.add("hidden"));

      link.classList.add("active");
      const targetSection = document.getElementById("section-" + target);
      if (targetSection) targetSection.classList.remove("hidden");
    });
  });

  // --- LOGOUT ---
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("bbLoggedInUser");
      window.location.href = "index.html";
    });
  }

  // --- CHANGE PASSWORD ---
  const changePwBtn = document.getElementById("changePwBtn");
  if (changePwBtn) {
    changePwBtn.addEventListener("click", () => {
      const currentPw = document.getElementById("currentPw").value;
      const newPw = document.getElementById("newPw").value;
      const feedback = document.getElementById("pwChangeFeedback");

      if (!currentPw || !newPw) {
        feedback.textContent = "Please fill in both fields.";
        feedback.className = "auth-feedback error";
        return;
      }
      if (newPw.length < 6) {
        feedback.textContent = "New password must be at least 6 characters.";
        feedback.className = "auth-feedback error";
        return;
      }

      const users = JSON.parse(localStorage.getItem("bbUsers") || "[]");
      const userIdx = users.findIndex((u) => u.email === loggedInUser.email);

      if (userIdx === -1 || users[userIdx].password !== currentPw) {
        feedback.textContent = "Current password is incorrect.";
        feedback.className = "auth-feedback error";
        return;
      }

      users[userIdx].password = newPw;
      localStorage.setItem("bbUsers", JSON.stringify(users));

      feedback.textContent = "Password updated successfully!";
      feedback.className = "auth-feedback success";

      document.getElementById("currentPw").value = "";
      document.getElementById("newPw").value = "";
    });
  }
});

// =========================================
// SAVE ORDER TO HISTORY (call on checkout)
// =========================================
function saveOrderToHistory(cartItems, total) {
  const loggedInUser = JSON.parse(
    localStorage.getItem("bbLoggedInUser") || "null",
  );
  if (!loggedInUser) return;

  const storageKey = "bbOrders_" + loggedInUser.email;
  const orderHistory = JSON.parse(localStorage.getItem(storageKey) || "[]");

  const newOrder = {
    date: new Date().toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    items: cartItems,
    total: total,
  };

  orderHistory.push(newOrder);
  localStorage.setItem(storageKey, JSON.stringify(orderHistory));
}
