// =========================================
// CART STATE
// =========================================
let cart = []; // This holds the cart items in memory
let currentProduct = null; // This holds the product currently being viewed on product.html

// =========================================
// PRODUCT DATABASE (Array of Objects)
// =========================================

const products = [
  {
    id: 1,
    name: "Dish Soap",
    price: 3000,
    category: "Cleaning",
    // TODO: Replace the URL below with your actual image file (e.g., "images/dish-soap.jpg")
    image: "images/Dish_soap.jpg",
    description:
      "Effective cleaning, gentle on hands. Our concentrated formula cuts through grease effortlessly.",
  },
  {
    id: 2,
    name: "Hand Soap",
    price: 2500,
    category: "Bath & Body",
    image: "images/hand_soap.jpg",
    description:
      "Wash away germs naturally with our foaming hand soap formula.",
  },
  {
    id: 3,
    name: "Shampoo",
    price: 5000,
    category: "Bath & Body",
    image: "images/Shampoo.jpg",
    description: "Clean, healthy hair with every wash. Sulfate-free formula.",
  },
  {
    id: 4,
    name: "Conditioner",
    price: 8000,
    category: "Bath & Body",
    image: "images/Conditioner.jpg",
    description: "Silky smooth finish, no buildup. Perfect for all hair types.",
  },
  {
    id: 5,
    name: "Body Wash",
    price: 4500,
    category: "Bath & Body",
    image: "images/Body_Wash.jpg",
    description: "Refreshing daily cleanse with energizing citrus notes.",
  },
  {
    id: 6,
    name: "Lotion",
    price: 6000,
    category: "Bath & Body",
    image: "images/Lotion.jpg",
    description: "Deep moisture for dry skin with shea butter and vitamin E.",
  },
  {
    id: 7,
    name: "Toothpaste",
    price: 1500,
    category: "Bath & Body",
    image: "images/Toothpaste.jpg",
    description: "Natural whitening formula for a brighter smile.",
  },
  {
    id: 8,
    name: "Deodorant",
    price: 2500,
    category: "Bath & Body",
    image: "images/Deodorant.jpg",
    description: "All-day odor protection without harsh chemicals.",
  },
  {
    id: 9,
    name: "Sunscreen",
    price: 8000,
    category: "Bath & Body",
    image: "images/Sunscreen.jpg",
    description: "SPF 50 reef safe formula. Water resistant.",
  },
  {
    id: 10,
    name: "Paper Towels",
    price: 3500,
    category: "Cleaning",
    image: "images/Paper_Towels.jpg",
    description: "Bamboo based, super absorbent. Eco-friendly alternative.",
  },
];

// =========================================
// BUNDLES DATABASE (Premium Starter Sets)
// =========================================

const bundles = [
  {
    id: 11,
    name: "The Bathroom Refresh",
    price: 15000,
    image: "images/The_Bathroom_Refresh.jpg",
    description: "Hand Soap, Lotion, and Ceramic Tray.",
    // Storing badges as objects so we can use the specific CSS class (member-off, best-seller, etc.)
    badges: [
      { text: "20% OFF FOR MEMBERS", className: "member-off" },
      { text: "POPULAR", className: "best-seller" },
    ],
  },
  {
    id: 12,
    name: "The Deep Clean Kit",
    price: 12500,
    image: "images/Deep_Clean_Kit.jpg",
    description: "All-Purpose Cleaner, Glass Spray, Cloths.",
    badges: [
      { text: "15% OFF FOR MEMBERS", className: "member-off" },
      { text: "NEW ARRIVAL", className: "new" },
    ],
  },
  {
    id: 13,
    name: "Kitchen Essentials",
    price: 10000,
    image: "images/Kitchen_Essentials.jpg",
    description: "Dish Soap, Sponge, and Bamboo Brush set.",
    badges: [{ text: "20% OFF FOR MEMBERS", className: "member-off" }],
  },
  {
    id: 14,
    name: "Laundry Routine",
    price: 18000,
    image: "images/Laundry_Routine.jpg",
    description: "Detergent, Fabric Softener, and Stain Stick.",
    badges: [
      { text: "SALE", className: "sale" },
      { text: "TOP RATED", className: "best-seller" },
    ],
  },
  {
    id: 15,
    name: "The Spa Escape",
    price: 22000,
    image: "images/The_Spa_Escape.jpg",
    description: "Body Wash, Bath Salts, and Soy Candle.",
    badges: [{ text: "25% OFF FOR MEMBERS", className: "member-off" }],
  },
  {
    id: 16,
    name: "Morning Skincare",
    price: 25000,
    image: "images/Morning_Skincare.jpg",
    description: "Gentle Cleanser, Toner, and Daily Moisturizer.",
    badges: [{ text: "NEW", className: "new" }],
  },
  {
    id: 17,
    name: "Pet Care Bundle",
    price: 14000,
    image: "images/Pet_Care_Bundle.jpg",
    description: "Natural Pet Shampoo, Paw Wipes, and Towel.",
    badges: [{ text: "10% OFF FOR MEMBERS", className: "member-off" }],
  },
];

// =========================================
// RENDER PRODUCTS TO INDEX PAGE
// =========================================

function renderBestSellers() {
  // 1. Find the empty container
  const container = document.getElementById("productsTrack");

  // 2. Safety Check: If container doesn't exist (like on the product page), stop.
  if (!container) return;

  let productsHTML = "";

  // 3. Loop through the database
  products.forEach((product) => {
    // Format the price: Add Naira sign and commas (e.g., 3000 -> ₦3,000)
    const formattedPrice = "₦" + product.price.toLocaleString();

    // 4. Build the HTML for each card
    productsHTML += `
            <div class="product-card">
                <!-- Badges (Optional: You can add logic for badges here later) -->
                <div class="product-badges">
                    <!-- Leaving empty for now, or you could hardcode specific ones based on ID -->
                </div>

                <div class="product-image">
                    <!-- Dynamic Image from database -->
                    <img src="${product.image}" alt="${product.name}">
                    <div class="image-overlay">
                        <!-- DYNAMIC LINK: product.html?id=X -->
                        <a href="product.html?id=${product.id}" class="shop-now-btn">Shop Now</a>
                    </div>
                </div>
                
                <div class="product-info">
                    <!-- Dynamic Name -->
                    <h3>${product.name}</h3>
                    <!-- Dynamic Description -->
                    <p class="product-desc">${product.description}</p>
                    <!-- Dynamic Price -->
                    <div class="product-price">${formattedPrice}</div>
                </div>
            </div>
        `;
  });

  // 5. Paste the generated HTML into the container
  container.innerHTML = productsHTML;
}

// 6. Run this function when the page finishes loading
document.addEventListener("DOMContentLoaded", renderBestSellers);

// =========================================
// SLIDER FUNCTIONALITY (Premium Sets)
// =========================================

function initBundleSlider() {
  const track = document.getElementById("bundleTrack");
  const prevBtn = document.getElementById("bundlePrev");
  const nextBtn = document.getElementById("bundleNext");

  // Safety check: if these elements don't exist (e.g., on product page), stop.
  if (!track || !prevBtn || !nextBtn) return;

  // Scroll amount: Adjust this number based on how wide your cards are + gap
  // If a card is roughly 280px, 300px is a good smooth scroll.
  const scrollAmount = 300;

  nextBtn.addEventListener("click", () => {
    track.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  });

  prevBtn.addEventListener("click", () => {
    track.scrollBy({
      left: -scrollAmount, // Negative value to scroll left
      behavior: "smooth",
    });
  });
}
// =========================================
// RENDER BUNDLES TO INDEX PAGE (Premium Sets)
// =========================================

function renderBundles() {
  // 1. Find the container with ID "bundleTrack"
  const container = document.getElementById("bundleTrack");

  // 2. Safety Check: If container doesn't exist, stop.
  if (!container) return;

  let bundlesHTML = "";

  // 3. Loop through the bundles database
  bundles.forEach((bundle) => {
    // Format the price: ₦15,000
    const formattedPrice = "₦" + bundle.price.toLocaleString();

    // 4. Build the Badges HTML dynamically
    let badgesHTML = "";
    if (bundle.badges && bundle.badges.length > 0) {
      bundle.badges.forEach((badge) => {
        badgesHTML += `<span class="badge ${badge.className}">${badge.text}</span>`;
      });
    }

    // 5. Build the Card HTML
    bundlesHTML += `
      <div class="product-card bundle-card">
        <!-- Badges Container -->
        <div class="product-badges">
          ${badgesHTML}
        </div>

        <div class="product-image">
          <!-- Dynamic Image -->
          <img src="${bundle.image}" alt="${bundle.name}">
          <div class="image-overlay">
            <!-- Link points to product.html with the specific Bundle ID -->
            <a href="product.html?id=${bundle.id}" class="shop-now-btn">Shop Now</a>
          </div>
        </div>
        
        <div class="product-info">
          <!-- Dynamic Name -->
          <h3>${bundle.name}</h3>
          <!-- Dynamic Description -->
          <p class="product-desc">${bundle.description}</p>
          <!-- Dynamic Price -->
          <div class="product-price">${formattedPrice}</div>
        </div>
      </div>
    `;
  });

  // 6. Paste the generated HTML into the container
  container.innerHTML = bundlesHTML;
}

// =========================================
// LOAD PRODUCT DETAILS ON product.html
// =========================================

function loadProductDetails() {
  // 1. Get the "ID" from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const idFromUrl = parseInt(urlParams.get("id"));

  // 2. Check if ID exists
  if (!idFromUrl) {
    return;
  }

  // 3. Search the database
  // First, try to find it in 'products'
  let product = products.find((p) => p.id === idFromUrl);

  // If not found in 'products', try to find it in 'bundles'
  if (!product) {
    product = bundles.find((b) => b.id === idFromUrl);
  }

  // 4. Check if product was found in EITHER list
  if (!product) {
    console.error(`Error: Product/Bundle with ID ${idFromUrl} not found.`);
    const titleElement = document.getElementById("productTitle");
    if (titleElement) titleElement.textContent = "Error: Product not found.";
    return;
  }

  // --- NEW: SAVE TO GLOBAL VARIABLE ---
  currentProduct = product;

  // 5. Update Page Content
  const titleElement = document.getElementById("productTitle");
  if (titleElement) titleElement.textContent = product.name;

  const formattedPrice = "₦" + product.price.toLocaleString();
  const priceElement = document.getElementById("productPrice");
  if (priceElement) priceElement.textContent = formattedPrice;

  const descElement = document.getElementById("productDesc");
  if (descElement) descElement.textContent = product.description;

  const imgElement = document.getElementById("mainProductImage");
  if (imgElement) {
    imgElement.src = product.image;
    imgElement.alt = product.name;
  }

  // Update the page title in the browser tab
  document.title = `${product.name} | My Supermarket`;

  // ==========================================
  // HANDLE "CREATE A KIT" SECTION
  // ==========================================

  // Select the "Create a Kit" container
  const kitBuilderSection = document.querySelector(".kit-builder");

  if (kitBuilderSection) {
    // If the product object has 'badges' (only bundles have them in our DB),
    // then it's a bundle. Hide the "Create a Kit" section.
    if (product.badges && product.badges.length > 0) {
      kitBuilderSection.style.display = "none";
    } else {
      // It's a single product. Show the "Create a Kit" section.
      kitBuilderSection.style.display = "block";
    }
  }
}

// =========================================
// UPDATE CART BADGE UI
// =========================================

function updateCartCount() {
  // 1. Find the badge element in your HTML
  const cartBadge = document.querySelector(".cart-badge");

  if (!cartBadge) return;

  // 2. Calculate total number of items (sum of all quantities)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // 3. Update the badge text
  cartBadge.textContent = totalItems;

  // 4. Optional: Hide badge if 0, show if > 0
  if (totalItems === 0) {
    cartBadge.style.display = "none";
  } else {
    cartBadge.style.display = "block";
  }
}

// =========================================
// CART & LOCAL STORAGE FUNCTIONS
// =========================================

// 1. Initialize Cart from Local Storage when page loads
function initCart() {
  const savedCart = localStorage.getItem("mySupermarketCart");
  if (savedCart) {
    // If we found saved data, convert it from string back to array
    cart = JSON.parse(savedCart);
    console.log("Loaded cart from storage:", cart);
  }

  // NEW: Update the badge immediately when loading the page
  updateCartCount();
  renderCartItems();
}

// 2. Handle Quantity Buttons (+ and -)
function adjustQty(change) {
  const qtyInput = document.getElementById("mainQty");
  let currentVal = parseInt(qtyInput.value);

  let newVal = currentVal + change;

  // Prevent going below 1
  if (newVal < 1) newVal = 1;

  qtyInput.value = newVal;
}

function addToCart() {
  // Safety check: Do we have a product loaded?
  if (!currentProduct) {
    // You could add a small toast notification here if you want, but for now we just stop.
    console.warn("No product selected.");
    return;
  }

  const qtyInput = document.getElementById("mainQty");
  const quantity = parseInt(qtyInput.value);

  // Check if item is already in the cart array
  const existingItem = cart.find((item) => item.id === currentProduct.id);

  if (existingItem) {
    // If it exists, just update the quantity
    existingItem.quantity += quantity;
    console.log(
      `Updated ${currentProduct.name}. New Quantity: ${existingItem.quantity}`,
    );
  } else {
    // If it doesn't exist, add it to the array
    cart.push({
      id: currentProduct.id,
      name: currentProduct.name,
      price: currentProduct.price,
      image: currentProduct.image,
      quantity: quantity,
    });
    console.log(`${currentProduct.name} added to cart!`);
  }

  // SAVE TO LOCAL STORAGE
  localStorage.setItem("mySupermarketCart", JSON.stringify(cart));

  // UPDATE UI (Badges on desktop/mobile)
  updateCartCount();
  renderCartItems();
}

// =========================================
// CART DRAWER RENDER & LOGIC
// =========================================

// 1. Render Items into the Drawer
function renderCartItems() {
  const cartBody = document.querySelector(".cart-drawer-body");
  const totalPriceEl = document.querySelector(".total-price");

  // Safety check
  if (!cartBody) return;

  // Clear current content
  cartBody.innerHTML = "";

  let totalAmount = 0;

  // Check if cart is empty
  if (cart.length === 0) {
    cartBody.innerHTML = `
            <div class="empty-cart-msg">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ddd" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <p>Your cart is empty.</p>
                <button class="continue-shopping-btn" onclick="document.getElementById('cartBackdrop').style.display='none'; document.getElementById('cartDrawer').classList.remove('active');">Continue Shopping</button>
            </div>
        `;
    totalPriceEl.textContent = "₦0.00";
    return;
  }

  // Loop through cart items and create HTML
  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    totalAmount += itemTotal;

    const itemHTML = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">₦${item.price.toLocaleString()} x ${item.quantity}</div>
                </div>
                <div class="cart-item-total">₦${itemTotal.toLocaleString()}</div>
                <!-- Optional: Remove single item button -->
                <button class="remove-item-btn" onclick="removeSingleItem(${item.id})">
                    &times;
                </button>
            </div>
        `;
    cartBody.innerHTML += itemHTML;
  });

  // Update Total Price
  totalPriceEl.textContent = "₦" + totalAmount.toLocaleString();
}

function clearCart() {
  // 1. Empty the array
  cart = [];

  // 2. Clear Local Storage
  localStorage.removeItem("mySupermarketCart");

  // 3. Update UI (Badge & Drawer)
  updateCartCount();
  renderCartItems();

  console.log("Cart cleared.");
}

// 3. Remove Single Item (Optional but helpful)
function removeSingleItem(id) {
  cart = cart.filter((item) => item.id !== id);

  // Save changes
  localStorage.setItem("mySupermarketCart", JSON.stringify(cart));

  // Update UI
  updateCartCount();
  renderCartItems();
}

// 4. Setup Event Listeners for Buttons
function setupCartButtons() {
  // Listen for clicks on the "Add to Cart" button
  const addBtn = document.getElementById("singleAddBtn");
  if (addBtn) {
    addBtn.addEventListener("click", addToCart);
  }

  // Clear Cart Button
  const clearBtn = document.getElementById("clearCartBtn");
  if (clearBtn) {
    clearBtn.addEventListener("click", clearCart);
  }

  // Open Cart Drawer (When clicking the icon in header)
  const cartTrigger = document.getElementById("cartTrigger");
  const cartBackdrop = document.getElementById("cartBackdrop");
  const cartDrawer = document.getElementById("cartDrawer");
  const closeCartBtn = document.getElementById("closeCartBtn");

  // 1. Open Cart
  if (cartTrigger && cartDrawer) {
    cartTrigger.addEventListener("click", () => {
      cartDrawer.classList.add("active");
      if (cartBackdrop) cartBackdrop.classList.add("active"); // Fixed
    });
  }

  // 2. Close Cart Button
  if (closeCartBtn) {
    closeCartBtn.addEventListener("click", () => {
      cartDrawer.classList.remove("active");
      if (cartBackdrop) cartBackdrop.classList.remove("active"); // Fixed
    });
  }

  // 3. Close Cart Backdrop
  if (cartBackdrop) {
    cartBackdrop.addEventListener("click", () => {
      cartDrawer.classList.remove("active");
      cartBackdrop.classList.remove("active"); // Fixed
    });
  }
}

// =========================================
// SEARCH FUNCTIONALITY
// =========================================

// =========================================
// SEARCH FUNCTIONALITY (DESKTOP & MOBILE)
// =========================================

function initSearch() {
  // 1. Helper function: This does the actual work
  const setupSearchListener = (inputElement, feedbackElement) => {
    if (!inputElement) return;

    inputElement.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        // Get text and clean it
        const query = inputElement.value.trim().toLowerCase();

        // Clear previous errors
        if (feedbackElement) feedbackElement.textContent = "";

        if (query === "") return;

        // Search Products + Bundles
        const allItems = [...products, ...bundles];
        const foundItem = allItems.find((item) =>
          item.name.toLowerCase().includes(query),
        );

        if (foundItem) {
          window.location.href = `product.html?id=${foundItem.id}`;
          return;
        }

        // Search Categories
        const categories = [
          "gaming",
          "electronics",
          "appliances",
          "bath",
          "body",
          "cleaning",
          "foodstuffs",
          "kitchen",
        ];
        const isCategory = categories.some((cat) => query.includes(cat));

        if (isCategory) {
          window.location.href = "index.html";
          return;
        }

        // No Match
        if (feedbackElement) {
          feedbackElement.textContent = "This product is not available";
        }
      }
    });

    // Clear error when typing
    inputElement.addEventListener("input", function () {
      if (feedbackElement) feedbackElement.textContent = "";
    });
  };

  // 2. Attach to Desktop Search
  const desktopInput = document.getElementById("searchInput");
  const desktopFeedback = document.getElementById("searchFeedback");
  setupSearchListener(desktopInput, desktopFeedback);

  // 3. Attach to Mobile Search
  const mobileInput = document.getElementById("mobileSearchInput");
  const mobileFeedback = document.getElementById("mobileSearchFeedback");
  setupSearchListener(mobileInput, mobileFeedback);
}

// Run this function
// =========================================
// INITIALIZE APP (Runs all functions)
// =========================================
document.addEventListener("DOMContentLoaded", () => {
  renderBestSellers(); // Renders individual products
  renderBundles(); // Renders the premium starter sets
  loadProductDetails(); // Loads details if on product.html
  initBundleSlider();

  // --- NEW ADDITIONS ---
  initCart(); // Load cart from Local Storage
  setupCartButtons(); // Attach click listeners
  initSearch();
  updateHeaderAuth();
  // ---------------------

  // AUTH HEADER UPDATE
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
});
