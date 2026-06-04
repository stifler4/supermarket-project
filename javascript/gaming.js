document.addEventListener("DOMContentLoaded", () => {
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
});
