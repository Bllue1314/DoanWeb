//lấy thông tin
const items = document.querySelectorAll(".item");
const cartContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

//tạo một mảng để ghi các sản phẩm
let cart = [];

// Hiển thị giỏ hàng
function renderCart() {
  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach((product, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <span>${product.name} x${product.qty}</span>
      <span>${(product.price * product.qty).toLocaleString()} ₫</span>
      <button class="remove-btn" onclick="removeItem(${index})">X</button>
    `;
    cartContainer.appendChild(div);
    total += product.price * product.qty;
  });

  cartTotal.textContent = `Tổng tiền: ${total.toLocaleString()} ₫`;
}

// Xóa sản phẩm
function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

// Thêm sản phẩm vào giỏ
items.forEach((item) => {
  item.addEventListener("click", () => {
    const name = item.getAttribute("data-name");
    const price = parseInt(item.getAttribute("data-price"));

    // Kiểm tra nếu sản phẩm đã có -> tăng số lượng
    const found = cart.find((p) => p.name === name);
    if (found) {
      found.qty++;
    } else {
      cart.push({ name, price, qty: 1 });
    }

    renderCart();
  });
});

