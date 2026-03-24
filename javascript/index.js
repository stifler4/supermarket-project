/* =========================================
   DOCUMENT READY EVENT
   ========================================= */
// This ensures the script waits until the HTML is fully loaded before running.
// Without this, the script might try to find buttons that don't exist yet.
document.addEventListener("DOMContentLoaded", () => {
  // ===========================================
  // PART 1: MOBILE MENU LOGIC
  // ===========================================

  // --- 1. SELECTING ELEMENTS ---
  // We grab the HTML elements by their ID so we can control them with JavaScript.
  const mobileToggle = document.getElementById("mobileToggle"); // The Hamburger Menu Icon
  const mobileSearchToggle = document.getElementById("mobileSearchToggle"); // The Search Icon (Mobile)
  const mobileDrawer = document.getElementById("mobileDrawer"); // The Side Menu Container
  const backdrop = document.getElementById("backdrop"); // The Dark Overlay
  const submenuToggles = document.querySelectorAll(".js-submenu-toggle"); // Category Links with sub-menus

  // --- 2. FUNCTION TO OPEN/CLOSE MOBILE DRAWER ---
  function toggleDrawer() {
    // Check if the drawer currently has the class "active" (which means it's open)
    const isActive = mobileDrawer.classList.contains("active");

    if (isActive) {
      // If it IS open, remove the "active" class to close it (and hide the backdrop)
      mobileDrawer.classList.remove("active");
      backdrop.classList.remove("active");
    } else {
      // If it is CLOSED, add the "active" class to open it (and show the backdrop)
      mobileDrawer.classList.add("active");
      backdrop.classList.add("active");
    }
  }

  // --- 3. ADDING CLICK LISTENERS ---

  // When the Hamburger Icon is clicked, run the toggleDrawer function
  if (mobileToggle) {
    mobileToggle.addEventListener("click", toggleDrawer);
  }

  // When the Mobile Search Icon is clicked, also run toggleDrawer (because the search bar is inside the menu)
  if (mobileSearchToggle) {
    mobileSearchToggle.addEventListener("click", toggleDrawer);
  }

  // When the user clicks on the dark backdrop (outside the menu), close the drawer
  if (backdrop) {
    backdrop.addEventListener("click", toggleDrawer);
  }

  // --- 4. HANDLING MOBILE SUBMENUS (The Accordion Effect) ---
  // Loop through every link that has a submenu
  submenuToggles.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // Stop the link from trying to go to a new page

      // Find the specific submenu list right below this link
      const submenu = link.nextElementSibling;
      // Find the small arrow icon inside the link
      const arrow = link.querySelector("span");

      // Toggle the CSS class "fade-in" which controls the visibility/animation
      submenu.classList.toggle("fade-in");

      // Rotate the arrow and change color based on whether the menu is open or closed
      if (submenu.classList.contains("fade-in")) {
        // Menu is Open: Rotate arrow down and make it gold
        arrow.style.transform = "rotate(180deg)";
        arrow.style.color = "#C5A059";
      } else {
        // Menu is Closed: Rotate arrow back up and make it grey
        arrow.style.transform = "rotate(0deg)";
        arrow.style.color = "#999";
      }
    });
  });

  // ===========================================
  // PART 2: CART DRAWER LOGIC
  // ===========================================
  // Moved inside DOMContentLoaded to ensure elements exist before running.

  // --- 1. SELECT CART ELEMENTS ---
  const cartTrigger = document.getElementById("cartTrigger"); // The Cart Icon in the header
  const cartDrawer = document.getElementById("cartDrawer"); // The Cart Sidebar
  const cartBackdrop = document.getElementById("cartBackdrop"); // The Dark Overlay for Cart
  const closeCartBtn = document.getElementById("closeCartBtn"); // The 'X' button inside cart
  const continueShopBtn = document.querySelector(".continue-shopping-btn"); // "Continue Shopping" button

  // --- 2. FUNCTION TO OPEN CART ---
  function openCart() {
    // Add the "active" class to slide the cart in and show the backdrop
    cartDrawer.classList.add("active");
    cartBackdrop.classList.add("active");

    // OPTIONAL: Close the mobile menu if it happens to be open when clicking the cart
    // (This prevents two menus from being open at the same time)
    // Note: We use the 'mobileDrawer' variable defined in Part 1 above
    if (mobileDrawer) mobileDrawer.classList.remove("active");
    if (backdrop) backdrop.classList.remove("active");
  }

  // --- 3. FUNCTION TO CLOSE CART ---
  function closeCart() {
    // Remove the "active" class to slide the cart out and hide the backdrop
    cartDrawer.classList.remove("active");
    cartBackdrop.classList.remove("active");
  }

  // --- 4. ADDING EVENT LISTENERS FOR THE CART ---

  // Clicking the Cart Icon opens the drawer
  if (cartTrigger) {
    cartTrigger.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent the link from jumping to the top of the page
      openCart();
    });
  }

  // Clicking the 'X' button closes the drawer
  if (closeCartBtn) {
    closeCartBtn.addEventListener("click", closeCart);
  }

  // Clicking the dark backdrop closes the drawer
  if (cartBackdrop) {
    cartBackdrop.addEventListener("click", closeCart);
  }

  // Clicking "Continue Shopping" closes the drawer
  if (continueShopBtn) {
    continueShopBtn.addEventListener("click", closeCart);
  }
}); // End of DOMContentLoaded
