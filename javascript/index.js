/* =========================================
   DOCUMENT READY EVENT
   ========================================= */
// This ensures the script waits until the HTML is fully loaded before running.
document.addEventListener("DOMContentLoaded", () => {
  // ===========================================
  // PART 1: MOBILE MENU LOGIC
  // ===========================================

  // --- 1. SELECTING ELEMENTS ---
  const mobileToggle = document.getElementById("mobileToggle"); // The Hamburger Menu Icon
  const mobileSearchToggle = document.getElementById("mobileSearchToggle"); // The Search Icon (Mobile)
  const mobileDrawer = document.getElementById("mobileDrawer"); // The Side Menu Container
  const backdrop = document.getElementById("backdrop"); // The Dark Overlay
  const submenuToggles = document.querySelectorAll(".js-submenu-toggle"); // Category Links with sub-menus

  // --- 2. FUNCTION TO OPEN/CLOSE MOBILE DRAWER ---
  function toggleDrawer() {
    const isActive = mobileDrawer.classList.contains("active");

    if (isActive) {
      mobileDrawer.classList.remove("active");
      backdrop.classList.remove("active");
    } else {
      mobileDrawer.classList.add("active");
      backdrop.classList.add("active");
    }
  }

  // --- 3. ADDING CLICK LISTENERS ---
  if (mobileToggle) {
    mobileToggle.addEventListener("click", toggleDrawer);
  }

  if (mobileSearchToggle) {
    mobileSearchToggle.addEventListener("click", toggleDrawer);
  }

  if (backdrop) {
    backdrop.addEventListener("click", toggleDrawer);
  }

  // --- 4. HANDLING MOBILE SUBMENUS (The Accordion Effect) ---
  submenuToggles.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // Stop the link from jumping to top of page

      const submenu = link.nextElementSibling;
      const arrow = link.querySelector("span");

      submenu.classList.toggle("fade-in");

      if (submenu.classList.contains("fade-in")) {
        arrow.style.transform = "rotate(180deg)";
        arrow.style.color = "#C5A059";
      } else {
        arrow.style.transform = "rotate(0deg)";
        arrow.style.color = "#999";
      }
    });
  });

  // ===========================================
  // PART 2: CART DRAWER LOGIC
  // ===========================================

  const cartTrigger = document.getElementById("cartTrigger");
  const cartDrawer = document.getElementById("cartDrawer");
  const cartBackdrop = document.getElementById("cartBackdrop");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const continueShopBtn = document.querySelector(".continue-shopping-btn");

  // --- 2. FUNCTION TO OPEN CART ---
  function openCart() {
    cartDrawer.classList.add("active");
    cartBackdrop.classList.add("active");

    // Close mobile menu if it is open
    if (mobileDrawer) mobileDrawer.classList.remove("active");
    if (backdrop) backdrop.classList.remove("active");
  }

  // --- 3. FUNCTION TO CLOSE CART ---
  function closeCart() {
    cartDrawer.classList.remove("active");
    cartBackdrop.classList.remove("active");
  }

  // --- 4. ADDING EVENT LISTENERS FOR THE CART ---
  if (cartTrigger) {
    cartTrigger.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent jumping to top
      openCart();
    });
  }

  if (closeCartBtn) {
    closeCartBtn.addEventListener("click", closeCart);
  }

  if (cartBackdrop) {
    cartBackdrop.addEventListener("click", closeCart);
  }

  if (continueShopBtn) {
    continueShopBtn.addEventListener("click", closeCart);
  }

  // ===========================================
  // PART 3: HERO CAROUSEL LOGIC
  // ===========================================

  const slides = document.querySelectorAll(".carousel-slide");
  const nextBtn = document.getElementById("nextSlide");
  const prevBtn = document.getElementById("prevSlide");
  const indicators = document.querySelectorAll(".indicator");
  const carouselContainer = document.querySelector(".hero-carousel");

  let currentSlide = 0;
  let slideInterval;

  if (slides.length > 0) {
    function showSlide(index) {
      slides.forEach((slide) => slide.classList.remove("active"));
      indicators.forEach((dot) => dot.classList.remove("active"));

      if (index >= slides.length) {
        currentSlide = 0;
      } else if (index < 0) {
        currentSlide = slides.length - 1;
      } else {
        currentSlide = index;
      }

      slides[currentSlide].classList.add("active");
      indicators[currentSlide].classList.add("active");
    }

    function nextSlide() {
      showSlide(currentSlide + 1);
    }

    function prevSlide() {
      showSlide(currentSlide - 1);
    }

    function startSlideShow() {
      slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlideShow() {
      clearInterval(slideInterval);
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        stopSlideShow();
        nextSlide();
        startSlideShow();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        stopSlideShow();
        prevSlide();
        startSlideShow();
      });
    }

    indicators.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        stopSlideShow();
        showSlide(index);
        startSlideShow();
      });
    });

    if (carouselContainer) {
      carouselContainer.addEventListener("mouseenter", stopSlideShow);
      carouselContainer.addEventListener("mouseleave", startSlideShow);
    }

    startSlideShow();
  }

  // ===========================================
  // PART 4: BEST SELLERS SLIDER LOGIC
  // ===========================================

  const productsTrack = document.getElementById("productsTrack");
  const bestSellersPrev = document.getElementById("bestSellersPrev");
  const bestSellersNext = document.getElementById("bestSellersNext");

  if (productsTrack && bestSellersPrev && bestSellersNext) {
    const scrollAmount = 280;

    bestSellersNext.addEventListener("click", () => {
      productsTrack.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    });

    bestSellersPrev.addEventListener("click", () => {
      productsTrack.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    });
  }

  // ===========================================
  // PART 5: MEMBER MODAL LOGIC
  // ===========================================

  const memberBadges = document.querySelectorAll(".member-off");
  const memberModal = document.getElementById("memberModal");
  const closeMemberModal = document.getElementById("closeMemberModal");

  function openMemberModal() {
    if (memberModal) {
      memberModal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  function closeMemberModalFunc() {
    if (memberModal) {
      memberModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  // 1. Click on "20% OFF" Badge
  memberBadges.forEach((badge) => {
    badge.addEventListener("click", (e) => {
      e.stopPropagation();
      openMemberModal();
    });
  });

  // 2. Click on "X" button
  if (closeMemberModal) {
    closeMemberModal.addEventListener("click", closeMemberModalFunc);
  }

  // 3. Click on background overlay
  if (memberModal) {
    memberModal.addEventListener("click", (e) => {
      if (e.target === memberModal) {
        closeMemberModalFunc();
      }
    });
  }

  // 4. Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      memberModal &&
      memberModal.classList.contains("active")
    ) {
      closeMemberModalFunc();
    }
  });

  // ===========================================
  // PART 6: BUNDLES SLIDER LOGIC
  // ===========================================

  const bundleTrack = document.getElementById("bundleTrack");
  const bundlePrev = document.getElementById("bundlePrev");
  const bundleNext = document.getElementById("bundleNext");

  if (bundleTrack && bundlePrev && bundleNext) {
    // Adjust this amount based on your card width + gap (approx 320px)
    const scrollAmount = 320;

    bundleNext.addEventListener("click", () => {
      bundleTrack.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    });

    bundlePrev.addEventListener("click", () => {
      bundleTrack.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    });
  }

  // ==========================================
  // HEAVY 3D WORDPLAY ANIMATION LOGIC
  // ==========================================

  const heavyTitle = document.querySelector(".heavy-title");

  if (heavyTitle) {
    const text = heavyTitle.getAttribute("data-text");
    heavyTitle.innerHTML = "";

    const totalDuration = 10; // Must match CSS animation duration (10s)
    const stagger = 0.15; // Delay between letters

    text.split("").forEach((char, index) => {
      const span = document.createElement("span");

      if (char === " ") {
        span.innerHTML = "&nbsp;";
      } else {
        span.textContent = char;
      }

      span.classList.add("char");

      // --- CALCULATE RANDOM 3D TRAJECTORY ---
      // Random distance between -600px and 600px
      const tx = (Math.random() - 0.5) * 1200;
      const ty = (Math.random() - 0.5) * 1200;
      const tz = (Math.random() - 0.5) * 2000; // Deep Z-axis depth

      // Random rotation angles
      const rx = (Math.random() - 0.5) * 360;
      const ry = (Math.random() - 0.5) * 360;

      // Set CSS Variables for this specific letter
      span.style.setProperty("--tx", `${tx}px`);
      span.style.setProperty("--ty", `${ty}px`);
      span.style.setProperty("--tz", `${tz}px`);
      span.style.setProperty("--rx", `${rx}deg`);
      span.style.setProperty("--ry", `${ry}deg`);

      // Calculate delay so they don't all arrive at once
      // We want them to arrive within the first 3 seconds of the 10s loop
      const delay = index * stagger;

      // We use negative delay to "pre-warm" the animation or just stagger it
      // To keep the loop synced, we keep the delay simple
      span.style.animationDelay = `${delay}s`;

      heavyTitle.appendChild(span);
    });
  }

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

  updateHeaderAuth();
}); // End of DOMContentLoaded
