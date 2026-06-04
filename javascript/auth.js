// =========================================
// auth.js — Login / Signup Logic
// Used by: login.html
// =========================================

document.addEventListener("DOMContentLoaded", () => {
  // If already logged in, send straight to account page
  const loggedInUser = JSON.parse(
    localStorage.getItem("bbLoggedInUser") || "null",
  );
  if (loggedInUser && window.location.pathname.includes("login")) {
    window.location.href = "account.html";
    return;
  }

  // --- ELEMENTS ---
  const loginTab = document.getElementById("loginTab");
  const signupTab = document.getElementById("signupTab");
  const loginSection = document.getElementById("loginSection");
  const signupSection = document.getElementById("signupSection");

  const loginSubmitBtn = document.getElementById("loginSubmitBtn");
  const signupSubmitBtn = document.getElementById("signupSubmitBtn");

  const switchToSignup = document.getElementById("switchToSignup");
  const switchToLogin = document.getElementById("switchToLogin");

  // --- TAB SWITCH ---
  function showTab(tab) {
    loginSection.classList.add("hidden");
    signupSection.classList.add("hidden");
    loginTab.classList.remove("active");
    signupTab.classList.remove("active");

    if (tab === "login") {
      loginSection.classList.remove("hidden");
      loginTab.classList.add("active");
    } else {
      signupSection.classList.remove("hidden");
      signupTab.classList.add("active");
    }
  }

  if (loginTab) loginTab.addEventListener("click", () => showTab("login"));
  if (signupTab) signupTab.addEventListener("click", () => showTab("signup"));
  if (switchToSignup)
    switchToSignup.addEventListener("click", (e) => {
      e.preventDefault();
      showTab("signup");
    });
  if (switchToLogin)
    switchToLogin.addEventListener("click", (e) => {
      e.preventDefault();
      showTab("login");
    });

  // --- FEEDBACK ---
  function showFeedback(elId, message, type) {
    const el = document.getElementById(elId);
    if (!el) return;
    el.textContent = message;
    el.className = "auth-feedback " + type;
  }

  // --- PASSWORD TOGGLE ---
  document.querySelectorAll(".toggle-pw").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const input = document.getElementById(targetId);
      if (!input) return;
      input.type = input.type === "password" ? "text" : "password";
    });
  });

  // --- SIGNUP ---
  if (signupSubmitBtn) {
    signupSubmitBtn.addEventListener("click", () => {
      const name = document.getElementById("signupName").value.trim();
      const email = document
        .getElementById("signupEmail")
        .value.trim()
        .toLowerCase();
      const password = document.getElementById("signupPassword").value;

      // Validate
      if (!name || !email || !password) {
        showFeedback("signupFeedback", "Please fill in all fields.", "error");
        return;
      }
      if (!email.includes("@") || !email.includes(".")) {
        showFeedback("signupFeedback", "Please enter a valid email.", "error");
        return;
      }
      if (password.length < 6) {
        showFeedback(
          "signupFeedback",
          "Password must be at least 6 characters.",
          "error",
        );
        return;
      }

      // Check if email already exists
      const users = JSON.parse(localStorage.getItem("bbUsers") || "[]");
      if (users.find((u) => u.email === email)) {
        showFeedback(
          "signupFeedback",
          "An account with this email already exists.",
          "error",
        );
        return;
      }

      // Save user with memberSince date
      const newUser = {
        name,
        email,
        password,
        memberSince: new Date().toLocaleDateString("en-GB", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      };
      users.push(newUser);
      localStorage.setItem("bbUsers", JSON.stringify(users));

      // Auto-login
      localStorage.setItem("bbLoggedInUser", JSON.stringify({ name, email }));

      showFeedback(
        "signupFeedback",
        "Account created! Redirecting...",
        "success",
      );
      setTimeout(() => {
        window.location.href = "account.html";
      }, 1200);
    });
  }

  // --- LOGIN ---
  if (loginSubmitBtn) {
    loginSubmitBtn.addEventListener("click", () => {
      const email = document
        .getElementById("loginEmail")
        .value.trim()
        .toLowerCase();
      const password = document.getElementById("loginPassword").value;

      if (!email || !password) {
        showFeedback("loginFeedback", "Please fill in all fields.", "error");
        return;
      }

      const users = JSON.parse(localStorage.getItem("bbUsers") || "[]");
      const user = users.find(
        (u) => u.email === email && u.password === password,
      );

      if (!user) {
        showFeedback("loginFeedback", "Incorrect email or password.", "error");
        return;
      }

      // Save session
      localStorage.setItem(
        "bbLoggedInUser",
        JSON.stringify({ name: user.name, email: user.email }),
      );

      showFeedback(
        "loginFeedback",
        `Welcome back, ${user.name}! Redirecting...`,
        "success",
      );
      setTimeout(() => {
        window.location.href = "account.html";
      }, 1000);
    });

    // Allow Enter key to submit on password field
    document
      .getElementById("loginPassword")
      ?.addEventListener("keydown", (e) => {
        if (e.key === "Enter") loginSubmitBtn.click();
      });
  }
});
