// ===================== DỮ LIỆU SẢN PHẨM =====================
const products = [
  {
    id: 1,
    name: "Logitech Pro X Gaming",
    brand: "Logitech",
    type: "bàn phím",
    description: "The Logitech Pro X Gaming is designed for professional gamers",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400",
  },
  {
    id: 2,
    name: "Razer DeathAdder V2",
    brand: "Razer",
    type: "chuột",
    description: "High precision gaming mouse with ergonomic design",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1593642634367-d91a135587b5?w=400",
  },
  {
    id: 3,
    name: "Corsair K95 RGB",
    brand: "Corsair",
    type: "bàn phím",
    description: "Premium mechanical keyboard with RGB lighting",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400",
  },
  {
    id: 4,
    name: "HyperX Pulsefire",
    brand: "HyperX",
    type: "chuột",
    description: "Lightweight mouse for FPS games",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400",
  },
  {
    id: 5,
    name: "Intel Core i9",
    brand: "Intel",
    type: "cpu",
    description: "High performance CPU for gaming and work",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?w=400",
  },
  {
    id: 6,
    name: "Logitech G915",
    brand: "Logitech",
    type: "bàn phím",
    description: "Wireless mechanical gaming keyboard",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400",
  }
];

// ===================== LOCALSTORAGE =====================
if (!localStorage.getItem("products")) {
  localStorage.setItem("products", JSON.stringify(products));
}
function getProducts() {
  return JSON.parse(localStorage.getItem("products")) || [];
}

// ===================== TẠO THẺ SẢN PHẨM =====================
function createProductCard(p) {
  return `
    <div class="card" data-id="${p.id}">
      <div class="card_img">
        <img src="${p.image}" alt="${p.name}">
      </div>
      <div class="card_content">
        <div class="card_title">${p.name}</div>
        <div class="card_description">${p.description}</div>
        <div class="card_price">${p.price}$</div>
        <button onclick="addToCart(${p.id})">Thêm vào giỏ</button>
      </div>
    </div>
  `;
}

// ===================== HIỂN THỊ SẢN PHẨM =====================
function renderProducts(list = getProducts()) {
  const container = document.getElementById("productsContainer");
  container.innerHTML = list.map(createProductCard).join("");
}

// ===================== LỌC THEO BRAND + TYPE =====================
function applyFilter() {
  const brand = document.getElementById("brandSelect").value;
  const type = document.getElementById("typeSelect").value;

  const all = getProducts();
  const filtered = all.filter(p => {
    const matchBrand = brand ? p.brand === brand : true;
    const matchType = type ? p.type === type : true;
    return matchBrand && matchType;
  });

  renderProducts(filtered);
}

// ===================== GIỎ HÀNG DEMO =====================
function addToCart(id) {
  alert("Đã thêm sản phẩm ID " + id + " vào giỏ hàng!");
}

// ===================== KHỞI ĐỘNG =====================
window.addEventListener("DOMContentLoaded", () => {
  renderProducts();
});
