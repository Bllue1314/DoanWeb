document.addEventListener("DOMContentLoaded", () => {
  // Định nghĩa cấu trúc tab
  const tabs = [
    {
      id: "tab-products",
      sectionId: "productSection",
      renderFunction: "renderProducts"
    },
    {
      id: "tab-users",
      sectionId: "userSection",
      renderFunction: "renderUser"
    },
    {
      id: "tab-orders",
      sectionId: "orderSection",
      renderFunction: "renderOrders"
    },
    {
      id: "tab-imports",
      sectionId: "importSection",
      renderFunction: "renderImports"
    },
    {
      id: "tab-prices",
      sectionId: "priceSection",
      renderFunction: "showPriceTab"
    },
    {
      id: "tab-inventory",
      sectionId: "inventorySection",
      renderFunction: "renderInventory"
    }
  ];

  // Thêm event listener cho mỗi tab
  tabs.forEach(tab => {
    const tabElement = document.getElementById(tab.id);
    if (!tabElement) return;

    tabElement.addEventListener("click", e => {
      e.preventDefault();

      // Ẩn tất cả sections
      tabs.forEach(t => {
        document.getElementById(t.sectionId)?.classList.add("hidden");
      });

      // Hiện section được chọn
      document.getElementById(tab.sectionId)?.classList.remove("hidden");

      // Gọi hàm render tương ứng
      if (typeof window[tab.renderFunction] === "function") {
        if (tab.id === "tab-prices") {
          // Tab giá có thêm tham số để chọn sub-tab
          window[tab.renderFunction]("category");
        } else {
          window[tab.renderFunction]();
        }
      }

      // Đánh dấu tab đang hoạt động
      setActiveTab(tabElement);
    });
  });

  // Đặt tab mặc định
  setActiveTab(document.getElementById("tab-products"));
});

// Hiệu ứng active cho tab hiện tại
/*
 * Hiệu ứng active cho tab hiện tại
 * - Input: activeLink (element của tab được chọn)
 * - Hành động: remove class 'active-tab' trên tất cả link, add cho link được chọn
 */
function setActiveTab(activeLink) {
  document.querySelectorAll(".nav a").forEach(a => {
    a.classList.remove("active-tab");
  });
  activeLink.classList.add("active-tab");
}

// ===================== MẪU USER =====================
const user = [
  {
    id: 1,
    name: "Lê Đức Thọ",
    call: "0938123456",
    email: "leductho@gmail.com",
    address: "123 Nguyễn Trãi, Quận 5, TP.HCM",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    passworks:"2513648",
    lock: 0
  },
  {
    id: 2,
    name: "Nguyễn Văn A",
    call: "0987654321",
    email: "nguyenvana@gmail.com",
    address: "45 Lê Lợi, Quận 1, TP.HCM",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    passworks:"26723623527",
    lock: 0
  },
  {
    id: 3,
    name: "Trần Thị B",
    call: "0905123123",
    email: "tranthib@gmail.com",
    address: "12 Hai Bà Trưng, Quận 3, TP.HCM",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    passworks:"623623547",
    lock: 0
  },
  {
    id: 4,
    name: "Phạm Minh Cường",
    call: "0912456789",
    email: "cuongpham@gmail.com",
    address: "67 Nguyễn Huệ, Quận 1, TP.HCM",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    passworks:"3523612547",
    lock: 0
  },
  {
    id: 5,
    name: "Đặng Thị Hồng",
    call: "0978123456",
    email: "hongdang@gmail.com",
    address: "22 Pasteur, Quận 1, TP.HCM",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    passworks:"234262525",
    lock: 0
  },
  {
    id: 6,
    name: "Vũ Đức Nam",
    call: "0932345678",
    email: "namvu@gmail.com",
    address: "55 Võ Văn Tần, Quận 3, TP.HCM",
    image: "https://randomuser.me/api/portraits/men/21.jpg",
    passworks:"3673462352",
    lock: 0
  },
  {
    id: 7,
    name: "Bùi Thanh Hà",
    call: "0909456123",
    email: "thanhha@gmail.com",
    address: "101 Nguyễn Đình Chiểu, Quận 3, TP.HCM",
    image: "https://randomuser.me/api/portraits/women/47.jpg",
    passworks:"63583435247",
    lock: 0
  },
  {
    id: 8,
    name: "Phan Văn Quang",
    call: "0945567890",
    email: "quangphan@gmail.com",
    address: "36 Hoàng Diệu, Quận 4, TP.HCM",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
    passworks:"8978974563",
    lock: 0
  },
  {
    id: 9,
    name: "Ngô Thị Lan",
    call: "0988123123",
    email: "lanngo@gmail.com",
    address: "9 Nguyễn Văn Cừ, Quận 5, TP.HCM",
    image: "https://randomuser.me/api/portraits/women/38.jpg",
    passworks:"25326236",
    lock: 0
  },
  {
    id: 10,
    name: "Trịnh Công Sơn",
    call: "0919123456",
    email: "sontrinh@gmail.com",
    address: "88 Lý Thường Kiệt, Quận 10, TP.HCM",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
    passworks:"25324235",
    lock: 0
  }
];
localStorage.setItem("users", JSON.stringify(user));

// ===================== LẤY THÔNG TIN TỪ LOCAL =====================
/*
 * Lấy mảng user từ localStorage
 * Trả về [] nếu không có
 */
function getuser(){
  const user = JSON.parse(localStorage.getItem("users"));
  return user ? user : [];
}
// ===================== LƯU DANH SÁCH USER =====================
/*
 * Lưu mảng user vào localStorage và refresh UI
 */
function savedata(user){
  localStorage.setItem("users", JSON.stringify(user));
  alert("Đã lưu thông tin");
  renderUser();
}
// ===================== XÓA USER =====================
/*
 * Xóa user theo id
 */
function remove(id){
  let user = getuser().filter(p => p.id !== id);
  savedata(user);
  alert("Đã xóa user");
  renderUser()
}
// ===================== RESET MẬT KHẨU =====================
/*
 * Reset mật khẩu user
 * - Ở đây mật khẩu mặc định được đặt là '1' (ví dụ demo)
 * - Thực tế nên có flow reset an toàn hơn
 */
function resetPassword(id) {
  const users = getuser();
  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    alert("Không tìm thấy người dùng!");
    return;
  }
  users[index].passworks = "1";
  localStorage.setItem("users", JSON.stringify(users));
  renderUser();
   alert(`Đã reset mật khẩu của tài khoản: ${users[index].name}`);
}

// ===================== KHÓA TÀI KHOẢN =====================
/*
 * Khóa / mở khóa tài khoản user
 * - Nếu lock === 0 -> đặt 1 (khóa)
 * - Nếu lock === 1 -> đặt 0 (mở)
 */
function block(id) {
  const users = getuser();
  const index = users.findIndex(u => u.id === id);

  //trường hợp render lỗi 
  if (index === -1) {
    alert("Không tìm thấy người dùng!");
    return;
  }

  if (users[index].lock === 0) {
    users[index].lock = 1;
    localStorage.setItem("users", JSON.stringify(users));
    renderUser();
    alert(`Đã khóa tài khoản của: ${users[index].name}`);
  } else {
    users[index].lock = 0;
    localStorage.setItem("users", JSON.stringify(users));
    renderUser();
    alert(`Đã mở khóa tài khoản của: ${users[index].name}`);
  }
}

// ===================== HIỂN THỊ USER =====================
function renderUser() {
  const container = document.getElementById("usersContainer");
  const users = getuser();

  if (users.length === 0) {
    container.innerHTML = "<p>Chưa có người dùng nào.</p>";
    return;
  }

  // hiển thị theo dạng bảng
  container.innerHTML = `
    <div class="table_container show" id="user-info">
      <table>
        <thead id="user-head">
          <tr>
            <th><strong>Tên</strong></th>
            <th><strong>Số Điện Thoại</strong></th>
            <th><strong>Địa Chỉ</strong></th>
            <th><strong>Email</strong></th>
            <th><strong></strong></th>
          </tr>
        </thead>
        <tbody id="userbody">
          ${users.map(u => `
            <tr>
              <td>${u.name}</td>
              <td>${u.call}</td>
              <td>${u.address}</td>
              <td>${u.email}</td>
              <td>
                <button class="lock" onclick="block(${u.id})">Khóa TK</button>
                <button class="reset" onclick="resetPassword(${u.id})">Reset MK</button>
                <button class="delete" onclick="remove(${u.id})">Xóa TK</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}


document.addEventListener("DOMContentLoaded", renderUser);

// Hàm để lấy sản phẩm từ localStorage
function getsanpham() {
    return JSON.parse(localStorage.getItem('products')) || [];
}

// Hàm để lưu sản phẩm vào localStorage
function luusanpham(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// Hàm mở form thêm sản phẩm mới
function openAddModal() {
    document.getElementById("editForm").reset();
    document.querySelector(".modal").dataset.id = '';
    document.querySelector(".modal h2").textContent = "Thêm Sản Phẩm Mới";
    document.querySelector(".modal").classList.remove("hidden");
}

// Hàm mở form sửa sản phẩm
function openEditModal(id) {
    let products = getsanpham();
    let product = products.find(p => p.id == id);
    
    if (product) {
        document.getElementById("editName").value = product.name;
        document.getElementById("editCategory").value = product.category;
        document.getElementById("editType").value = product.type || '';
        document.getElementById("editBrand").value = product.brand || '';
        document.getElementById("editPrice").value = product.price || 0;
        document.getElementById("editQuantity").value = product.quantity || product.stock || 0;
        document.getElementById("editColors").value = Array.isArray(product.colors) ? product.colors.join(',') : (product.colors || '');
        document.getElementById("editImage").value = product.image || '';
        document.getElementById("editDescription").value = product.description || '';
        document.getElementById("editSpecs").value = typeof product.specifications === 'object' ? 
            JSON.stringify(product.specifications, null, 2) : 
            (product.specifications || '');
        document.getElementById("editIsHidden").checked = product.isHidden || false;
        
        document.querySelector(".modal").dataset.id = id;
        document.querySelector(".modal h2").textContent = "Sửa Thông Tin Sản Phẩm";
        document.querySelector(".modal").classList.remove("hidden");
    } else {
        alert("Không tìm thấy sản phẩm!");
    }
}

// Hàm đóng form
function closeModal() {
    document.querySelector(".modal").classList.add("hidden");
}

// Xử lý khi submit form
document.getElementById("editForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Validate the form
    const price = parseFloat(document.getElementById("editPrice").value);
    const quantity = parseInt(document.getElementById("editQuantity").value);
    
    if (isNaN(price) || price < 0) {
        alert("Vui lòng nhập giá hợp lệ");
        return;
    }
    
    if (isNaN(quantity) || quantity < 0) {
        alert("Vui lòng nhập số lượng hợp lệ");
        return;
    }
    
    // Parse specifications from JSON
    let specifications;
    try {
        const specsStr = document.getElementById("editSpecs").value.trim();
        specifications = specsStr ? JSON.parse(specsStr) : {};
    } catch (e) {
        alert("Định dạng thông số kỹ thuật không hợp lệ. Vui lòng nhập theo định dạng JSON");
        return;
    }

    let sanpham = {
        name: document.getElementById("editName").value.trim(),
        category: document.getElementById("editCategory").value.trim(),
        type: document.getElementById("editType").value.trim(),
        brand: document.getElementById("editBrand").value.trim(),
        price: price,
        colors: document.getElementById("editColors").value.split(",").map(c => c.trim()).filter(c => c),
        image: document.getElementById("editImage").value.trim(),
        description: document.getElementById("editDescription").value.trim(),
        specifications: specifications,
        quantity: quantity,
        stock: quantity, // Sync stock with quantity
        isHidden: document.getElementById("editIsHidden").checked
    };

    let products = getsanpham();
    let id = document.querySelector(".modal").dataset.id;
    
    if (id) {
        // Edit mode - update existing product
        let index = products.findIndex(p => p.id == id);
        if (index !== -1) {
            sanpham.id = id;
            products[index] = sanpham;
        }
    } else {
        // Chế độ thêm mới
        sanpham.id = Date.now();
        sanpham.isHidden = false;
        sanpham.quantity = sanpham.stock || 0;
        products.push(sanpham);
    }
    
    luusanpham(products);
    renderProducts();
    closeModal();
});

// Hàm xóa sản phẩm
function xoasanpham(id) {
    if (confirm("Bạn có chắc muốn xóa sản phẩm này không?")) {
        let products = getsanpham().filter(p => p.id != id);
        luusanpham(products);
        renderProducts();
    }
}

// Hàm ẩn/hiện sản phẩm
function toggleHidden(id) {
    let products = getsanpham();
    let product = products.find(p => p.id == id);
    if (product) {
        product.isHidden = !product.isHidden;
        luusanpham(products);
        renderProducts();
    }
}

// Khởi tạo các bộ lọc từ dữ liệu sản phẩm
function initializeFilters() {
    const products = getsanpham();
    
    // Lấy danh sách danh mục và thương hiệu duy nhất
    const categories = [...new Set(products.map(p => p.type))];
    const brands = [...new Set(products.map(p => p.brand))];
    
    // Cập nhật select danh mục
    const categorySelect = document.getElementById("filterCategory");
    categorySelect.innerHTML = '<option value="">Tất cả danh mục</option>' +
        categories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
    
    // Cập nhật select thương hiệu
    const brandSelect = document.getElementById("filterBrand");
    brandSelect.innerHTML = '<option value="">Tất cả thương hiệu</option>' +
        brands.map(brand => `<option value="${brand}">${brand}</option>`).join('');
}

// Áp dụng bộ lọc
function applyProductFilters() {
    const category = document.getElementById("filterCategory").value;
    const brand = document.getElementById("filterBrand").value;
    const search = document.getElementById("filterSearch").value.toLowerCase();
    
    let products = getsanpham();
    let filtered = products.filter(product => {
        const matchCategory = !category || product.category === category;
        const matchBrand = !brand || product.brand === brand;
        const matchSearch = !search || 
            product.name.toLowerCase().includes(search) ||
            product.description.toLowerCase().includes(search);
            
        return matchCategory && matchBrand && matchSearch;
    });
    
    renderFilteredProducts(filtered);
    document.getElementById("clearProductFilters").style.display = 
        (category || brand || search) ? "inline-block" : "none";
}

// Xóa bộ lọc
function clearProductFilters() {
    document.getElementById("filterCategory").value = "";
    document.getElementById("filterBrand").value = "";
    document.getElementById("filterSearch").value = "";
    document.getElementById("clearProductFilters").style.display = "none";
    renderProducts();
}

// Hiển thị danh sách sản phẩm đã lọc
function renderFilteredProducts(products) {
    // Delegate to the main render function so we have one canonical renderer
    renderProducts(products);
}

// Hiển thị danh sách sản phẩm (có hoặc không có bộ lọc)
function renderProducts(filteredProducts = null) {
    const products = filteredProducts || getsanpham();
    let html = '';

    if (!products || products.length === 0) {
        html = '<div class="no-results">Không tìm thấy sản phẩm nào phù hợp</div>';
    } else {
        products.forEach(product => {
            const colorHtml = (product.colors || []).map(color =>
                `<span class="color-swatch" style="background-color: ${color}"></span>`
            ).join('');

            html += `
            <div class="product-card ${product.isHidden ? 'hidden-product' : ''}">
                <img src="${product.image}" alt="${product.name}" class="product-img">
                <div class="product-info">
                    <h2>${product.name}</h2>
                    
                    <div class="details">
                        <div class="detail-item">
                            <span class="label">Thương hiệu:</span>
                            <span class="value">${product.brand || '---'}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">Danh mục:</span>
                            <span class="value">${product.category || '---'}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">Giá bán:</span>
                            <span class="value price">${typeof product.price === 'number' ? product.price.toLocaleString('en-US') : product.price} $</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">Tồn kho:</span>
                            <span class="value ${(product.quantity || 0) <= 5 ? 'low-stock' : ''}">${product.quantity || 0} sản phẩm</span>
                        </div>
                    </div>

                    <div class="color-list">
                        <span class="label">Màu sắc:</span>
                        <div class="swatches">${colorHtml}</div>
                    </div>

                    <p class="desc">${product.description || ''}</p>

                    ${product.isHidden ? '<div class="hidden-notice">🚫 Sản phẩm đang bị ẩn khỏi cửa hàng</div>' : ''}
                </div>
                <div class="product-actions">
                    <button onclick="openEditModal(${product.id})" class="edit-btn">Sửa</button>
                    <button onclick="xoasanpham(${product.id})" class="delete-btn">Xóa</button>
                    <button onclick="toggleHidden(${product.id})" class="visibility-btn">
                        ${product.isHidden ? 'Hiện' : 'Ẩn'}
                    </button>
                </div>
            </div>`;
        });
    }

    document.getElementById("productsContainer").innerHTML = html;
}

// Tải sản phẩm mẫu khi trang được tải
document.addEventListener('DOMContentLoaded', () => {
    // Nếu chưa có dữ liệu trong localStorage, lấy từ sample-data.js
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify(sampleProducts));
    }
    
    // Hiển thị danh sách
    renderProducts();
    
    // Khởi tạo bộ lọc
    initializeFilters();
});






// ===================== QUẢN LÝ STORAGE =====================
function getPrices() {
  return JSON.parse(localStorage.getItem('prices')) || {
    categories: {},  // Tỷ lệ lợi nhuận theo danh mục
    products: {}     // Tỷ lệ lợi nhuận theo sản phẩm
  };
}

/*
 * Lưu cấu trúc prices vào localStorage
 */
function savePrices(prices) {
  localStorage.setItem('prices', JSON.stringify(prices));
}

// ===================== HIỂN THỊ TAB GIÁ =====================
/*
 * Hiển thị tab quản lý giá: có 2 tab - category và product
 * - Thiết lập style active trên nút
 * - Gọi render tương ứng
 */
function showPriceTab(tab) {
  // Reset active state
  document.querySelectorAll('#priceSection .tabs button')
    .forEach(btn => btn.classList.remove('active'));
  
  // Set active tab
  document.querySelector(`button[onclick="showPriceTab('${tab}')"]`)
    .classList.add('active');
  
  // Add back button if not exists
  const backBtn = document.querySelector('#priceBackBtn');
  if (!backBtn) {
    const filtersDiv = document.querySelector('#priceSection .tabs');
    const newBackBtn = document.createElement('button');
    newBackBtn.id = 'priceBackBtn';
    newBackBtn.className = 'back-btn';
    newBackBtn.textContent = 'Quay lại';
    newBackBtn.onclick = () => {
      showPriceTab('category');
      newBackBtn.remove();
    };
    filtersDiv.appendChild(newBackBtn);
  }

  if (tab === 'category') {
    renderCategoryPrices();
  } else {
    renderProductPrices();
  }
}

// ===================== QUẢN LÝ GIÁ THEO DANH MỤC =====================
/*
 * Hiển thị bảng quản lý tỷ lệ lợi nhuận theo danh mục
 * - Lấy danh sách danh mục từ products
 * - Hiển thị input để chỉnh profit %, onchange sẽ gọi updateCategoryProfit
 */
function renderCategoryPrices() {
  const prices = getPrices();
  const container = document.getElementById('pricesContainer');
  
  // Lấy danh sách các danh mục từ sản phẩm
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const categories = [...new Set(products.map(p => p.category || p.type))];

  container.innerHTML = `
    <table class="prices-table">
      <thead>
        <tr>
          <th>Danh mục</th>
          <th>Tỷ lệ lợi nhuận (%)</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        ${categories.map(cat => `
          <tr>
            <td>${cat}</td>
            <td>
                <input type="number" min="0" max="100" 
                  value="${prices.categories[cat] || 30}"
                  onchange="updateCategoryProfit('${cat}', this.value)">
              </td>
            <td>
              <button onclick="applyToAllProducts('${cat}')">
                Áp dụng cho tất cả SP
              </button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

// ===================== QUẢN LÝ GIÁ THEO SẢN PHẨM =====================
/*
 * Hiển thị bảng quản lý giá theo sản phẩm
 * - Lấy tỷ lệ ưu tiên: prices.products[product.id] || prices.categories[product.type] || default
 * - Lấy giá vốn gần nhất từ imports (getLatestCostPrice), tính giá bán
 */
function renderProductPrices() {
  const prices = getPrices();
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const container = document.getElementById('pricesContainer');

  container.innerHTML = `
    <table class="prices-table">
      <thead>
        <tr>
          <th>Sản phẩm</th>
          <th>Danh mục</th>
          <th>Giá vốn</th>
          <th>Tỷ lệ LN (%)</th>
          <th>Giá bán</th>
        </tr>
      </thead>
      <tbody>
        ${products.map(product => {
          const profit = prices.products[product.id] || 
                        prices.categories[product.category || product.type] || 30;
          const costPrice = getLatestCostPrice(product.id);
          const sellPrice = calculateSellPrice(costPrice, profit);
          
          return `
            <tr>
              <td>${product.name}</td>
              <td>${product.category || product.type}</td>
              <td>${costPrice.toLocaleString()}đ</td>
              <td>
                <input type="number" min="0" max="100" 
                  value="${profit}"
                  onchange="updateProductProfit(${product.id}, this.value)">
              </td>
              <td>${sellPrice.toLocaleString()}đ</td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;
}

// ===================== CẬP NHẬT TỶ LỆ LỢI NHUẬN =====================
/*
 * Cập nhật tỷ lệ lợi nhuận theo danh mục và lưu
 */
function updateCategoryProfit(category, profit) {
  const prices = getPrices();
  prices.categories[category] = parseFloat(profit);
  savePrices(prices);
  renderCategoryPrices();
}

/*
 * Cập nhật tỷ lệ lợi nhuận cho 1 sản phẩm cụ thể
 */
function updateProductProfit(productId, profit) {
  const prices = getPrices();
  prices.products[productId] = parseFloat(profit);
  savePrices(prices);
  renderProductPrices();
}

// ===================== HÀM HỖ TRỢ =====================
/*
 * Lấy giá vốn (cost price) gần nhất cho productId
 * - Tìm import có status 'completed', sắp xếp theo date giảm dần và lấy phần tử đầu
 * - Nếu không có import trả về 0
 */
function getLatestCostPrice(productId) {
  const imports = JSON.parse(localStorage.getItem('imports')) || [];
  const pid = typeof productId === 'string' ? parseInt(productId) : productId;
  const latestImport = imports
    .filter(imp => (imp.productId === pid || String(imp.productId) === String(productId)) && imp.status === 'completed')
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    
  return latestImport ? latestImport.price : 0;
}

/*
 * Tính giá bán từ giá vốn và tỷ lệ lợi nhuận (%)
 */
function calculateSellPrice(costPrice, profitPercent) {
  return costPrice * (1 + profitPercent / 100);
}

/*
 * Áp dụng tỷ lệ lợi nhuận của danh mục cho tất cả sản phẩm thuộc danh mục đó
 */
function applyToAllProducts(category) {
  const prices = getPrices();
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const categoryProfit = prices.categories[category];

  products
    .filter(p => (p.category || p.type) === category)
    .forEach(p => {
      prices.products[p.id] = categoryProfit;
    });

  savePrices(prices);
  renderProductPrices();
  alert(`Đã áp dụng tỷ lệ lợi nhuận ${categoryProfit}% cho tất cả sản phẩm thuộc ${category}`);
}

// Khởi tạo khi trang load
/*
 * Khởi tạo dữ liệu mẫu cho prices nếu chưa có, và mở tab category mặc định
 */
document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('prices')) {
    // Tạo dữ liệu mẫu
    const samplePrices = {
      categories: {
        'Điện thoại': 25,
        'Laptop': 20,
        'Phụ kiện': 35
      },
      products: {}
    };
    savePrices(samplePrices);
  }
  showPriceTab('category');
});




// ===================== QUẢN LÝ ORDER =====================
function getOrders() {
  return JSON.parse(localStorage.getItem('orders')) || [];
}

/*
 * Lưu mảng đơn hàng vào localStorage
 */
function saveOrders(orders) {
  localStorage.setItem('orders', JSON.stringify(orders));
}

// ===================== TÌM KIẾM ĐƠN HÀNG =====================
/*
 * Tìm kiếm / lọc đơn hàng theo ngày và trạng thái
 * Lấy giá trị từ DOM (orderFromDate, orderToDate, orderStatus)
 * Sau khi lọc gọi renderOrders với mảng kết quả
 */
function searchOrders() {
  const fromDate = document.getElementById('orderFromDate').value;
  const toDate = document.getElementById('orderToDate').value;
  const status = document.getElementById('orderStatus').value;

  // Show back button after filtering
  const backBtn = document.querySelector('#orderBackBtn');
  if (!backBtn) {
    const filtersDiv = document.querySelector('#orderSection .section-filters');
    const newBackBtn = document.createElement('button');
    newBackBtn.id = 'orderBackBtn';
    newBackBtn.className = 'back-btn';
    newBackBtn.textContent = 'Quay lại';
    newBackBtn.onclick = () => {
      document.getElementById('orderFromDate').value = '';
      document.getElementById('orderToDate').value = '';
      document.getElementById('orderStatus').value = '';
      renderOrders();
      newBackBtn.remove();
    };
    filtersDiv.appendChild(newBackBtn);
  }

  let orders = getOrders();
  
  // Lọc theo ngày
  if (fromDate) {
    orders = orders.filter(order => order.date >= fromDate);
  }
  if (toDate) {
    orders = orders.filter(order => order.date <= toDate);
  }
  
  // Lọc theo trạng thái
  if (status) {
    orders = orders.filter(order => order.status === status);
  }

  renderOrders(orders);
}

// ===================== CẬP NHẬT TRẠNG THÁI ĐƠN HÀNG =====================
/*
 * Cập nhật trạng thái đơn hàng
 * Input: orderId (số), newStatus (string)
 * Side-effects: ghi localStorage, cập nhật tồn kho nếu hủy (tùy logic)
 * Lưu ý: code cũ có điều kiện kiểm tra trạng thái trước/sau; đảm bảo không double-restore
 */
function updateOrderStatus(orderId, newStatus) {
  const orders = getOrders();
  const orderIndex = orders.findIndex(order => order.id === orderId);
  
  if (orderIndex === -1) {
    alert('Không tìm thấy đơn hàng!');
    return;
  }
  
  // Cập nhật trạng thái
  // Nếu cần logic phức tạp hơn (workflow), mở rộng ở đây
  orders[orderIndex].status = newStatus;
  
  // Nếu đơn hàng bị hủy, cộng lại số lượng tồn
  // (Chú ý: điều kiện cũ so sánh trước/sau có thể không đúng, ta chỉ xử lý khi newStatus === 'cancelled')
  if (newStatus === 'cancelled') {
    orders[orderIndex].items.forEach(item => {
      updateInventory(item.productId, item.quantity); // Cộng lại số lượng
    });
  }
  
  saveOrders(orders);
  renderOrders();
  alert('Đã cập nhật trạng thái đơn hàng!');
}

// ===================== XEM CHI TIẾT ĐƠN HÀNG =====================
/*
 * Hiển thị modal chi tiết đơn hàng
 * Input: orderId
 * Hành động: build HTML chi tiết, list các item, các nút thao tác dựa trên trạng thái
 */
function viewOrderDetails(orderId) {
  const orders = getOrders();
  const order = orders.find(o => o.id === orderId);
  
  if (!order) {
    alert('Không tìm thấy đơn hàng!');
    return;
  }

  const modal = document.getElementById('orderDetailModal');
  const container = modal.querySelector('.modal-content');
  
  container.innerHTML = `
    <h2>Chi tiết đơn hàng #${order.id}</h2>
    <p><strong>Ngày đặt:</strong> ${order.date}</p>
    <p><strong>Khách hàng:</strong> ${getUserName(order.userId)}</p>
    <p><strong>Trạng thái:</strong> ${getStatusText(order.status)}</p>
    
    <table class="order-items">
      <thead>
        <tr>
          <th>Sản phẩm</th>
          <th>Số lượng</th>
          <th>Đơn giá</th>
          <th>Thành tiền</th>
        </tr>
      </thead>
      <tbody>
        ${order.items.map(item => `
          <tr>
            <td>${getProductName(item.productId)}</td>
            <td>${item.quantity}</td>
            <td>${item.price.toLocaleString()}đ</td>
            <td>${(item.quantity * item.price).toLocaleString()}đ</td>
          </tr>
        `).join('')}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3"><strong>Tổng cộng:</strong></td>
          <td><strong>${order.total.toLocaleString()}đ</strong></td>
        </tr>
      </tfoot>
    </table>
    
    <div class="modal-buttons">
      ${order.status === 'new' ? `
        <button onclick="updateOrderStatus(${order.id}, 'processing')">
          Xử lý đơn hàng
        </button>
      ` : ''}
      ${order.status === 'processing' ? `
        <button onclick="updateOrderStatus(${order.id}, 'delivered')">
          Xác nhận đã giao
        </button>
      ` : ''}
      ${order.status !== 'delivered' && order.status !== 'cancelled' ? `
        <button onclick="updateOrderStatus(${order.id}, 'cancelled')">
          Hủy đơn hàng
        </button>
      ` : ''}
      <button onclick="closeOrderDetail()">Đóng</button>
    </div>
  `;
  
  modal.classList.remove('hidden');
}

// ===================== HIỂN THỊ DANH SÁCH ĐƠN HÀNG =====================
/*
 * Hiển thị danh sách đơn hàng dạng bảng
 * Mặc định render toàn bộ orders; có thể truyền mảng đã lọc
 */
function renderOrders(orders = getOrders()) {
  const container = document.getElementById('ordersContainer');
  
  if (!orders.length) {
    container.innerHTML = '<p>Chưa có đơn hàng nào.</p>';
    return;
  }

  container.innerHTML = `
    <table class="orders-table">
      <thead>
        <tr>
          <th>Mã đơn</th>
          <th>Ngày đặt</th>
          <th>Khách hàng</th>
          <th>Tổng tiền</th>
          <th>Trạng thái</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        ${orders.map(order => `
          <tr>
            <td>#${order.id}</td>
            <td>${order.date}</td>
            <td>${getUserName(order.userId)}</td>
            <td>${order.total.toLocaleString()}đ</td>
            <td>${getStatusText(order.status)}</td>
            <td>
              <button onclick="viewOrderDetails(${order.id})">
                Xem chi tiết
              </button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

// ===================== HÀM HỖ TRỢ =====================
/*
 * Chuyển mã trạng thái sang chuỗi hiển thị (readable)
 */
function getStatusText(status) {
  const statusMap = {
    'new': 'Mới đặt',
    'processing': 'Đang xử lý',
    'delivered': 'Đã giao',
    'cancelled': 'Đã hủy'
  };
  return statusMap[status] || status;
}

/*
 * Lấy tên người dùng theo userId. Nếu không tìm thấy trả về 'Khách vãng lai'
 */
function getUserName(userId) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.id === userId);
  return user ? user.name : 'Khách vãng lai';
}

/*
 * Lấy tên sản phẩm theo id (dùng để hiển thị trong chi tiết đơn hoặc bảng)
 */
function getProductName(productId) {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const pid = typeof productId === 'string' ? parseInt(productId) : productId;
  const product = products.find(p => p.id === pid || String(p.id) === String(productId));
  return product ? product.name : 'Không xác định';
}

/*
 * Cập nhật tồn kho (dùng chung với imports và khi hủy đơn trong updateOrderStatus)
 */
function updateInventory(productId, quantity) {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const pid = typeof productId === 'string' ? parseInt(productId) : productId;
  const index = products.findIndex(p => p.id === pid || String(p.id) === String(productId));

  if (index !== -1) {
    // Update both legacy `quantity` and new `stock` fields
    products[index].quantity = (products[index].quantity || 0) + quantity;
    products[index].stock = (products[index].stock || 0) + quantity;
    localStorage.setItem('products', JSON.stringify(products));
  }
}

// Đóng modal chi tiết đơn hàng
function closeOrderDetail() {
  document.getElementById('orderDetailModal').classList.add('hidden');
}

// Khởi tạo khi trang load
/*
 * Khởi tạo dữ liệu mẫu khi load trang nếu chưa có orders
 */
document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('orders')) {
    // Tạo dữ liệu mẫu
    const sampleOrders = [
      {
        id: 1,
        date: '2025-11-01',
        userId: 1,
        status: 'new',
        items: [
          {
            productId: 1,
            quantity: 2,
            price: 20000
          }
        ],
        total: 40000
      }
    ];
    saveOrders(sampleOrders);
  }
  renderOrders();
});







// ===================== QUẢN LÝ INVENTORY =====================
/*
 * Lấy dữ liệu báo cáo tồn kho từ localStorage
 * Trả về object inventory (key-value) hoặc object rỗng nếu chưa có
 */
function getInventory() {
  return JSON.parse(localStorage.getItem('inventory')) || {};
}

/*
 * Lưu object báo cáo tồn kho vào localStorage
 */
function saveInventory(inventory) {
  localStorage.setItem('inventory', JSON.stringify(inventory));
}

// ===================== KIỂM TRA HÀNG SẮP HẾT =====================
/*
 * Kiểm tra và cảnh báo các sản phẩm sắp hết hàng
 * - Lọc các sản phẩm có quantity <= 5
 * - Gọi renderInventory để hiển thị danh sách và thông báo alert
 */
function checkLowStock() {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const lowStockProducts = products.filter(p => (p.quantity || 0) <= 5);
  
  renderInventory(lowStockProducts);
  if (lowStockProducts.length) {
    alert(`Có ${lowStockProducts.length} sản phẩm sắp hết hàng!`);
  } else {
    alert('Không có sản phẩm nào sắp hết hàng.');
  }
}

// ===================== LỌC THEO DANH MỤC =====================
/*
 * Lọc danh sách inventory theo danh mục được chọn trên UI
 */
function filterByCategory() {
  const category = document.getElementById('categoryFilter').value;
  const products = JSON.parse(localStorage.getItem('products')) || [];
  
  // Show back button after filtering
  const backBtn = document.querySelector('#inventoryBackBtn');
  if (!backBtn && category) {
    const filtersDiv = document.querySelector('#inventorySection .section-filters');
    const newBackBtn = document.createElement('button');
    newBackBtn.id = 'inventoryBackBtn';
    newBackBtn.className = 'back-btn';
    newBackBtn.textContent = 'Quay lại';
    newBackBtn.onclick = () => {
      document.getElementById('categoryFilter').value = '';
      renderInventory();
      newBackBtn.remove();
    };
    filtersDiv.appendChild(newBackBtn);
  }
  
  const filteredProducts = category ? 
    products.filter(p => (p.category || p.type) === category) : 
    products;
    
  renderInventory(filteredProducts);
}

// ===================== BÁO CÁO NHẬP XUẤT TỒN =====================
/*
 * Sinh báo cáo nhập/xuất/tồn cho 1 sản phẩm theo khoảng thời gian
 * Input: productId, fromDate (YYYY-MM-DD), toDate (YYYY-MM-DD)
 * Output: { import: tổng số nhập, export: tổng xuất, balance: chênh lệch }
 * Lưu ý: chỉ tính các phiếu nhập có status === 'completed' và các đơn hàng không bị 'cancelled'
 */
function generateInventoryReport(productId, fromDate, toDate) {
  const imports = JSON.parse(localStorage.getItem('imports')) || [];
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  
  // Lọc theo thời gian và sản phẩm
  const pid = typeof productId === 'string' ? parseInt(productId) : productId;
  const productImports = imports
    .filter(imp => 
      (imp.productId === pid || String(imp.productId) === String(productId)) &&
      imp.status === 'completed' &&
      imp.date >= fromDate &&
      imp.date <= toDate
    );
    
  const productOrders = orders
    .filter(order => 
      order.status !== 'cancelled' &&
      order.date >= fromDate &&
      order.date <= toDate
    )
    .map(order => order.items)
    .flat()
  .filter(item => item.productId === pid || String(item.productId) === String(productId));
    
  // Tính tổng
  const totalImport = productImports.reduce((sum, imp) => sum + (imp.quantity || 0), 0);
  const totalExport = productOrders.reduce((sum, item) => sum + (item.quantity || 0), 0);
  
  return {
    import: totalImport,
    export: totalExport,
    balance: totalImport - totalExport
  };
}

// ===================== HIỂN THỊ TỒN KHO =====================
/*
 * Hiển thị bảng tồn kho
 * - Nếu không truyền products thì mặc định lấy toàn bộ products từ storage
 * - Hiển thị: tên, danh mục, tồn kho hiện tại, nhập trong tháng, xuất trong tháng, trạng thái
 */
function renderInventory(products = JSON.parse(localStorage.getItem('products')) || []) {
  const container = document.getElementById('inventoryContainer');
  
  if (!products.length) {
    container.innerHTML = '<p>Không có sản phẩm nào.</p>';
    return;
  }

  // Cập nhật danh sách danh mục cho filter
  updateCategoryFilter(products);

  // Lấy ngày đầu tháng và cuối tháng hiện tại
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
    .toISOString().split('T')[0];
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    .toISOString().split('T')[0];

  container.innerHTML = `
    <table class="inventory-table">
      <thead>
        <tr>
          <th>Sản phẩm</th>
          <th>Danh mục</th>
          <th>Tồn kho</th>
          <th>Nhập trong tháng</th>
          <th>Xuất trong tháng</th>
          <th>Trạng thái</th>
        </tr>
      </thead>
      <tbody>
        ${products.map(product => {
          const report = generateInventoryReport(
            product.id,
            firstDay,
            lastDay
          );
          const stockVal = (typeof product.stock !== 'undefined') ? product.stock : (product.quantity || 0);
          const status = getStockStatus(stockVal);
          
          return `
            <tr class="${status.class}">
              <td>${product.name}</td>
              <td>${product.category || product.type || ''}</td>
              <td>${stockVal}</td>
              <td>${report.import}</td>
              <td>${report.export}</td>
              <td>${status.text}</td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;
}

// ===================== HÀM HỖ TRỢ =====================
/*
 * Cập nhật danh sách option cho bộ lọc danh mục
 */
function updateCategoryFilter(products) {
  const categories = [...new Set(products.map(p => p.category || p.type))];
  const filter = document.getElementById('categoryFilter');
  
  filter.innerHTML = `
    <option value="">Tất cả danh mục</option>
    ${categories.map(cat => 
      `<option value="${cat}">${cat}</option>`
    ).join('')}
  `;
}

/*
 * Trả về trạng thái tồn kho (text, css class) dựa trên quantity
 */
function getStockStatus(quantity) {
  if (quantity <= 0) {
    return { text: 'Hết hàng', class: 'out-of-stock' };
  }
  if (quantity <= 5) {
    return { text: 'Sắp hết', class: 'low-stock' };
  }
  return { text: 'Còn hàng', class: '' };
}

// Khởi tạo khi trang load
/*
 * Khi trang load: đảm bảo mọi product có thuộc tính quantity (nếu chưa có -> gán 0)
 * Sau đó gọi renderInventory để hiển thị
 */
document.addEventListener('DOMContentLoaded', () => {
  // Khởi tạo số lượng tồn cho products nếu chưa có
  const products = JSON.parse(localStorage.getItem('products')) || [];
  let hasChanges = false;
  
  products.forEach(product => {
    // Ensure both legacy and new stock fields exist for compatibility
    if (typeof product.quantity === 'undefined') {
      product.quantity = (typeof product.stock !== 'undefined') ? product.stock : 0;
      hasChanges = true;
    }
    if (typeof product.stock === 'undefined') {
      product.stock = product.quantity || 0;
      hasChanges = true;
    }
  });
  
  if (hasChanges) {
    localStorage.setItem('products', JSON.stringify(products));
  }
  
  renderInventory();
});






// ===================== QUẢN LÝ IMPORT =====================
/*
 * Lấy danh sách phiếu nhập từ localStorage
 * Trả về mảng phiếu nhập hoặc mảng rỗng nếu chưa có
 */
function getImports() {
  return JSON.parse(localStorage.getItem('imports')) || [];
}

/*
 * Lưu mảng phiếu nhập vào localStorage
 * Tham số: imports - mảng các object phiếu nhập
 */
function saveImports(imports) {
  localStorage.setItem('imports', JSON.stringify(imports));
}

// ===================== QUẢN LÝ PHIẾU NHẬP =====================
/*
 * Mở modal tạo phiếu nhập mới
 * Hành động: reset form, đặt ngày mặc định là hôm nay, populate select sản phẩm, show modal
 * Side-effect: không ghi dữ liệu, chỉ chuẩn bị UI
 */
function openImportModal() {
  document.getElementById('importForm').reset();
  // If previously in edit mode, clear it so this is a fresh create
  delete document.getElementById('importModal').dataset.id;
  
  // Set ngày mặc định là ngày hiện tại
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('importDate').value = today;
  
  // Cập nhật danh sách sản phẩm trong dropdown
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const productSelect = document.getElementById('importProductId');
  
  productSelect.innerHTML = `
    <option value="">Chọn sản phẩm</option>
    ${products.map(p => `
      <option value="${p.id}">${p.name} - ${p.brand}</option>
    `).join('')}
  `;

  document.getElementById('importModal').classList.remove('hidden');
}

/*
 * Đóng modal nhập hàng
 */
function closeImportModal() {
  document.getElementById('importModal').classList.add('hidden');
}

// Xử lý form nhập hàng
/*
 * Xử lý submit form nhập hàng
 * - Tạo object importData từ form
 * - Gọi addImport để thêm vào storage
 */
document.getElementById('importForm').addEventListener('submit', e => {
  e.preventDefault();

  const modal = document.getElementById('importModal');
  const editId = modal.dataset.id;

  const importData = {
    date: document.getElementById('importDate').value,
    productId: parseInt(document.getElementById('importProductId').value),
    quantity: parseInt(document.getElementById('importQuantity').value),
    price: parseFloat(document.getElementById('importPrice').value)
  };

  if (editId) {
    // Edit existing import (only allowed for pending imports)
    const imports = getImports();
    const idx = imports.findIndex(i => String(i.id) === String(editId));
    if (idx === -1) {
      alert('Phiếu nhập không tồn tại hoặc đã bị xóa.');
      closeImportModal();
      return;
    }

    // Only allow editing if still pending
    if (imports[idx].status !== 'pending') {
      alert('Chỉ có thể sửa phiếu nhập khi ở trạng thái "Chờ xử lý".');
      closeImportModal();
      return;
    }

    imports[idx].date = importData.date;
    imports[idx].productId = importData.productId;
    imports[idx].quantity = importData.quantity;
    imports[idx].price = importData.price;
    imports[idx].total = importData.quantity * importData.price;

    saveImports(imports);
    renderImports();
    alert('Đã cập nhật phiếu nhập.');
    delete modal.dataset.id;
    closeImportModal();
    return;
  }

  // Otherwise create new import
  addImport(importData);
  closeImportModal();
});

// ===================== SỬA PHIẾU NHẬP =====================
/*
 * Mở modal và populate dữ liệu của phiếu nhập để sửa
 * Chỉ cho phép sửa khi phiếu đang ở trạng thái 'pending'
 */
function editImport(id) {
  const imports = getImports();
  const imp = imports.find(i => i.id === id);
  if (!imp) {
    alert('Không tìm thấy phiếu nhập để sửa.');
    return;
  }

  if (imp.status !== 'pending') {
    alert('Chỉ có thể sửa phiếu nhập khi ở trạng thái "Chờ xử lý".');
    return;
  }

  // Điền dữ liệu vào form
  document.getElementById('importDate').value = imp.date;
  document.getElementById('importQuantity').value = imp.quantity;
  document.getElementById('importPrice').value = imp.price;

  // Rebuild product select and set value
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const productSelect = document.getElementById('importProductId');
  productSelect.innerHTML = `\n    <option value="">Chọn sản phẩm</option>\n    ${products.map(p => `\n      <option value="${p.id}" ${p.id === imp.productId ? 'selected' : ''}>${p.name} - ${p.brand}</option>\n    `).join('')}\n  `;

  // Mark modal as edit mode
  document.getElementById('importModal').dataset.id = id;
  document.getElementById('importModal').classList.remove('hidden');
}

// ===================== TÌM KIẾM PHIẾU NHẬP =====================
/*
 * Tìm kiếm / lọc danh sách phiếu nhập theo ngày và trạng thái
 * Input: giá trị lấy trực tiếp từ các input trên DOM
 * Output: gọi renderImports với mảng đã lọc
 */
function searchImports() {
  const fromDate = document.getElementById('importFromDate').value;
  const toDate = document.getElementById('importToDate').value;
  const status = document.getElementById('importStatus').value;

  // Show back button after filtering
  const backBtn = document.querySelector('#importBackBtn');
  if (!backBtn) {
    const filtersDiv = document.querySelector('#importSection .section-filters');
    const newBackBtn = document.createElement('button');
    newBackBtn.id = 'importBackBtn';
    newBackBtn.className = 'back-btn';
    newBackBtn.textContent = 'Quay lại';
    newBackBtn.onclick = () => {
      document.getElementById('importFromDate').value = '';
      document.getElementById('importToDate').value = '';
      document.getElementById('importStatus').value = '';
      renderImports();
      newBackBtn.remove();
    };
    filtersDiv.appendChild(newBackBtn);
  }

  let imports = getImports();
  
  // Lọc theo ngày
  if (fromDate) {
    imports = imports.filter(imp => imp.date >= fromDate);
  }
  if (toDate) {
    imports = imports.filter(imp => imp.date <= toDate);
  }
  
  // Lọc theo trạng thái
  if (status) {
    imports = imports.filter(imp => imp.status === status);
  }

  renderImports(imports);
}

// ===================== THÊM PHIẾU NHẬP MỚI =====================
/*
 * Thêm một phiếu nhập mới vào danh sách
 * Input: importData { date, productId, quantity, price }
 * Hành động: tạo object mới với id, status mặc định 'pending', tính total, lưu vào storage
 */
function addImport(importData) {
  const imports = getImports();
  const newImport = {
    id: Date.now(),
    date: importData.date,
    productId: importData.productId,
    quantity: importData.quantity,
    price: importData.price,
    status: 'pending',
    total: importData.quantity * importData.price
  };

  imports.push(newImport);
  saveImports(imports);
  renderImports();
  alert('Đã tạo phiếu nhập mới!');
}

// ===================== HOÀN THÀNH PHIẾU NHẬP =====================
/*
 * Hoàn thành một phiếu nhập (chuyển status -> 'completed')
 * Side-effect: cập nhật tồn kho qua updateInventory
 */
function completeImport(id) {
  const imports = getImports();
  const importIndex = imports.findIndex(imp => imp.id === id);
  
  if (importIndex === -1) {
    alert('Không tìm thấy phiếu nhập!');
    return;
  }

  // Cập nhật trạng thái
  imports[importIndex].status = 'completed';
  
  // Cập nhật tồn kho
  const imp = imports[importIndex];
  updateInventory(imp.productId, imp.quantity);
  
  saveImports(imports);
  renderImports();
  alert('Đã hoàn thành phiếu nhập!');
}

// ===================== HIỂN THỊ PHIẾU NHẬP =====================
/*
 * Hiển thị danh sách phiếu nhập dạng bảng
 * - Mặc định render toàn bộ imports; có thể truyền mảng đã lọc
 */
function renderImports(imports = getImports()) {
  const container = document.getElementById('importsContainer');
  
  if (!imports.length) {
    container.innerHTML = '<p>Chưa có phiếu nhập nào.</p>';
    return;
  }

  container.innerHTML = `
    <table class="imports-table">
      <thead>
        <tr>
          <th>Ngày nhập</th>
          <th>Sản phẩm</th>
          <th>Số lượng</th>
          <th>Giá nhập</th>
          <th>Thành tiền</th>
          <th>Trạng thái</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        ${imports.map(imp => `
          <tr>
            <td>${imp.date}</td>
            <td>${getProductName(imp.productId)}</td>
            <td>${imp.quantity}</td>
            <td>${imp.price.toLocaleString()}đ</td>
            <td>${imp.total.toLocaleString()}đ</td>
            <td>${imp.status === 'pending' ? 'Chờ xử lý' : 'Đã hoàn thành'}</td>
            <td>
              ${imp.status === 'pending' ? `
                <button onclick="completeImport(${imp.id})">Hoàn thành</button>
                <button onclick="editImport(${imp.id})">Sửa</button>
              ` : ''}
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

// ===================== HÀM HỖ TRỢ =====================
/*
 * Lấy tên sản phẩm theo productId (dùng để hiển thị trong bảng phiếu nhập)
 */
function getProductName(productId) {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  // Normalize types (ids may be string or number)
  const pid = typeof productId === 'string' ? parseInt(productId) : productId;
  const product = products.find(p => p.id === pid || String(p.id) === String(productId));
  return product ? product.name : 'Không xác định';
}

/*
 * Cập nhật tồn kho cho sản phẩm
 * - Nếu product tồn tại: cộng thêm quantity (thường dùng khi completeImport)
 * - Lưu ý: quantity có thể là số âm nếu muốn trừ tồn
 */
function updateInventory(productId, quantity) {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const pid = typeof productId === 'string' ? parseInt(productId) : productId;
  const index = products.findIndex(p => p.id === pid || String(p.id) === String(productId));

  if (index !== -1) {
    // Update both legacy `quantity` and new `stock` fields for compatibility
    products[index].quantity = (products[index].quantity || 0) + quantity;
    products[index].stock = (products[index].stock || 0) + quantity;
    localStorage.setItem('products', JSON.stringify(products));
  }
}

// Khởi tạo khi trang load
/*
 * Khởi tạo khi load trang: nếu chưa có dữ liệu imports thì tạo mẫu để dễ test
 */
document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('imports')) {
    // Tạo dữ liệu mẫu
    const sampleImports = [
      {
        id: 1,
        date: '2025-11-01',
        productId: 1,
        quantity: 100,
        price: 15000,
        status: 'completed',
        total: 1500000
      }
    ];
    saveImports(sampleImports);
  }
  renderImports();
});