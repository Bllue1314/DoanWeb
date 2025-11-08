// manager-tab.js

document.addEventListener("DOMContentLoaded", () => {
  const tabProducts = document.getElementById("tab-products");
  const tabUsers = document.getElementById("tab-users");

  const productSection = document.getElementById("productSection");
  const userSection = document.getElementById("userSection");

  // Khi nhấn "Sản phẩm"
  tabProducts.addEventListener("click", e => {
    e.preventDefault();
    productSection.classList.remove("hidden");
    userSection.classList.add("hidden");

    // Gọi lại render sản phẩm
    if (typeof renderProducts === "function") {
      renderProducts();
    }

    // Đánh dấu tab đang hoạt động
    setActiveTab(tabProducts);
  });

  // Khi nhấn "Khách hàng"
  tabUsers.addEventListener("click", e => {
    e.preventDefault();
    userSection.classList.remove("hidden");
    productSection.classList.add("hidden");

    // Gọi lại render user
    if (typeof renderUser === "function") {
      renderUser();
    }

    // Đánh dấu tab đang hoạt động
    setActiveTab(tabUsers);
  });

  // Đặt tab mặc định
  setActiveTab(tabProducts);
});

// Hiệu ứng active cho tab hiện tại
function setActiveTab(activeLink) {
  document.querySelectorAll(".nav a").forEach(a => {
    a.classList.remove("active-tab");
  });
  activeLink.classList.add("active-tab");
}
