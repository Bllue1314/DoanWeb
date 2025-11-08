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
localStorage.setItem("products", JSON.stringify(products));

// ===================== HÀM XỬ LÝ LOCAL STORAGE =====================
function getsanpham() {
  return JSON.parse(localStorage.getItem("products")) || [];
}

function luusanpham(products) {
  localStorage.setItem("products", JSON.stringify(products));
}

// ===================== THÊM SẢN PHẨM =====================
function openAddModal() {
  // Xóa dữ liệu cũ trong form
  document.getElementById("editForm").reset();

  // Gỡ dataset.id để phân biệt với edit
  delete document.getElementById("editModal").dataset.id;

  // Đổi tiêu đề popup
  document.querySelector("#editModal h2").textContent = "Thêm sản phẩm mới";

  // Hiện popup
  document.getElementById("editModal").classList.remove("hidden");
}

// ===================== MỞ SỬA SẢN PHẨM =====================
function openEditModal(id) {
  const products = getsanpham();
  const product = products.find(p => p.id === id);
  if (!product) return alert("Không tìm thấy sản phẩm!");

  // Gán giá trị vào input
  document.getElementById("editName").value = product.name;
  document.getElementById("editBrand").value = product.brand;
  document.getElementById("editType").value = product.type;
  document.getElementById("editPrice").value = product.price;
  document.getElementById("editDescription").value = product.description;
  document.getElementById("editImage").value = product.image;

  document.getElementById("editModal").dataset.id = id;
  document.getElementById("editModal").classList.remove("hidden");
}

// ===================== ĐÓNG SẢN PHẨM =====================
function closeModal() {
  document.getElementById("editModal").classList.add("hidden");
}

// ===================== LƯU DỮ LIỆU (THÊM HOẶC SỬA) =====================
document.getElementById("editForm").addEventListener("submit", e => {
  e.preventDefault();

  const modal = document.getElementById("editModal");
  const idAttr = modal.dataset.id;
  const products = getsanpham();

  const productData = {
    name: document.getElementById("editName").value,
    brand: document.getElementById("editBrand").value,
    type: document.getElementById("editType").value,
    price: parseFloat(document.getElementById("editPrice").value),
    description: document.getElementById("editDescription").value,
    image: document.getElementById("editImage").value || "https://via.placeholder.com/150"
  };

  if (idAttr) {
    // ========== TRƯỜNG HỢP SỬA ==========
    const id = parseInt(idAttr);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return alert("Không tìm thấy sản phẩm!");

    products[index] = { ...products[index], ...productData };
    alert("Đã cập nhật sản phẩm!");
  } else {
    // ========== TRƯỜNG HỢP THÊM ==========
    const newProduct = { id: Date.now(), ...productData };
    products.push(newProduct);
    alert("Đã thêm sản phẩm mới!");
  }

  luusanpham(products);
  closeModal();
  renderProducts();
});


// =====================XÓA SẢN PHẨM =====================
function xoasanpham(id) {
  const products = getsanpham().filter(p => p.id !== id);
  luusanpham(products);
  renderProducts();
  alert("Đã xóa sản phẩm!");
}

// ===================== HIỂN THỊ SẢN PHẨM =====================
function renderProducts() {
  const container = document.getElementById("productsContainer");
  const products = getsanpham();

  if (!products.length) {
    container.innerHTML = "<p>Chưa có sản phẩm nào.</p>";
    return;
  }

  container.innerHTML = products.map(p => `
    <div class="product-card">
      <img src="${p.image}" alt="${p.name}" class="product-img">
      <div class="product-info">
        <div id="name"><strong>${p.name}</strong></div>
        <div><strong>Hãng:</strong> ${p.brand}</div>
        <div><strong>Loại:</strong> ${p.type}</div>
        <div><strong>Giá:</strong> ${p.price.toLocaleString()}$</div>
        <div class="desc"><strong>Mô tả:</strong> ${p.description}</div>
        <div class="product-actions">
          <button class="edit-btn" onclick="openEditModal(${p.id})">
            <i class="fa fa-pen"></i> Sửa
          </button>
          <button class="delete-btn" onclick="xoasanpham(${p.id})">
            <i class="fa fa-trash"></i> Xóa
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

document.addEventListener("DOMContentLoaded", renderProducts);



