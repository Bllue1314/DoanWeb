document.addEventListener('DOMContentLoaded', function () {
    createPlayout();
});

function createPlayout() {

    // --- Bước 1: Lấy và kiểm tra dữ liệu từ localStorage ---
    const productsJSON = localStorage.getItem('products');

    // Nếu không tìm thấy 'products' trong localStorage, hiển thị lỗi và dừng lại
    if (!productsJSON) {
        console.error("Lỗi: Không tìm thấy 'products' trong localStorage.");
        renderError("Lỗi: Không thể tải dữ liệu sản phẩm.");
        return;
    }

    // Chuyển chuỗi JSON thành mảng JavaScript
    const products = JSON.parse(productsJSON);

    // --- Bước 2: Lấy ID sản phẩm từ URL ---
    const urlParams = new URLSearchParams(window.location.search);
    const productIdString = urlParams.get('id');

    // Nếu không có 'id' trên URL, hiển thị lỗi và dừng lại
    if (!productIdString) {
        console.error("Lỗi: Không tìm thấy 'id' trên URL.");
        renderError("Lỗi: Không tìm thấy ID sản phẩm.");
        return;
    }

    // Chuyển ID từ chuỗi (string) sang số (number)
    const productId = parseInt(productIdString, 10);

    // --- Bước 3: Tìm sản phẩm ---
    const product = products.find(p => p.id === productId);

    // --- Bước 4: Render dữ liệu ra HTML ---
    if (product) {
        // Nếu tìm thấy sản phẩm, gọi hàm render chi tiết
        renderProductDetails(product);
    } else {
        // Nếu không tìm thấy sản phẩm (ví dụ: id=999)
        console.error(`Lỗi: Không tìm thấy sản phẩm với ID: ${productId}`);
        renderError("Sản phẩm không tồn tại!");
    }
}


function renderProductDetails(product) {
    // Cập nhật tiêu đề trang (trên tab trình duyệt)
    document.title = `Sản phẩm | ${product.name}`;

    // Lấy vùng chứa
    const playoutContainer = document.getElementById('playout-container');
    if (!playoutContainer) return;

    // Tạo HTML (Giống hệt code trong `showProductDetail` cũ của bạn)
    const detailHTML = `
    <div class="playout-wrapper">
        <div class="product-detail-container">
            <div class="product-image-section">
                <div class="product-image-wrapper">
                    <img src="${product.image}" alt="${product.name}">
                </div>
            </div>
            <div class="product-info-section">
                <h1 class="product-name">${product.name}</h1>
                <div class="product-price-box">
                    <span class="product-price">$${product.price}</span>
                </div>
                <p class="product-stock">Còn hàng</p>
                <div class="product-description">
                    <p>${product.description}</p>
                </div>
                ${product.colors.length > 0 ? `
                <div class="product-colors">
                    <h3>Màu sắc:</h3>
                    <div class="color-options">
                        ${product.colors.map(c => `<span class="color-dot" style="background-color: ${c}"></span>`).join('')}
                    </div>
                </div>
                ` : ''}
                <div class="product-quantity">
                    <label>Số lượng:</label>
                    <select class="quantity-select">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div class="product-actions">
                    <button class="btn-add-cart">Thêm vào Giỏ hàng</button>
                    <button class="btn-buy-now">Mua ngay</button>
                </div>
            </div>
        </div>
    </div>
    `;

    // "Nhét" HTML vào trang
    playoutContainer.innerHTML = detailHTML;

    // Thêm sự kiện cho nút "Thêm vào giỏ"
    // (Logic y hệt code cũ của bạn)
    const quantitySelect = playoutContainer.querySelector('.quantity-select');
    const btnAddCart = playoutContainer.querySelector('.btn-add-cart');
    const btnBuyNow = playoutContainer.querySelector('.btn-buy-now');

    // --- Sự kiện cho nút "Thêm vào Giỏ hàng" (Đã sửa) ---
    btnAddCart.addEventListener('click', () => {
        const loggedInUser = localStorage.getItem("loggedInUser");
        if (!loggedInUser) {
            alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
            showForm('login'); // Đây là hàm từ log.js
            return;
        }

        // Lấy số lượng từ dropdown
        const quantity = parseInt(quantitySelect.value, 10);

        // Gọi hàm hỗ trợ (chúng ta sẽ tạo ở Bước 2)
        addItemToCart(product, quantity);

        // Hiển thị thông báo (dùng hàm có sẵn từ cart-manager.js)
        cartManager.showAddToCartMessage(product.name);
    });

    // --- Sự kiện cho nút "Mua ngay" (Mới) ---
    btnBuyNow.addEventListener('click', () => {
        const loggedInUser = localStorage.getItem("loggedInUser");
        if (!loggedInUser) {
            alert("Vui lòng đăng nhập để mua hàng.");
            showForm('login');
            return;
        }

        // Lấy số lượng từ dropdown
        const quantity = parseInt(quantitySelect.value, 10);

        // --- Logic "Mua Ngay" ---
        // 1. Xóa sạch giỏ hàng hiện tại
        cartManager.items = [];

        // 2. Tạo item mới với đúng số lượng đã chọn
        const buyNowItem = {
            ...product,
            quantity: quantity
        };

        // 3. Thêm duy nhất item này vào giỏ hàng (đang rỗng)
        cartManager.items.push(buyNowItem);

        // 4. Lưu giỏ hàng (chỉ có 1 item) và cập nhật icon
        cartManager.saveToStorage();
        cartManager.updateCartCount();

        // 5. Chuyển hướng sang trang thanh toán
        window.location.href = 'checkout.html';
    });
}

/**
 * Hiển thị thông báo lỗi lên trang.
 * @param {string} message - Thông báo lỗi cần hiển thị.
 */
function renderError(message) {
    const errorContainer = document.getElementById('playout-container');
    if (errorContainer) {
        errorContainer.innerHTML = `<h1 style="text-align: center; color: red; margin-top: 100px;">${message}</h1>`;
    }
}
function addItemToCart(product, quantity) {
    if (!cartManager) {
        console.error("CartManager không tồn tại!");
        return;
    }

    // Kiểm tra sản phẩm đã có trong giỏ chưa
    const existingItem = cartManager.items.find(item => item.id === product.id);

    if (existingItem) {
        // Nếu có, cộng dồn số lượng
        existingItem.quantity += quantity;
    } else {
        // Nếu chưa, thêm mới với số lượng
        cartManager.items.push({
            ...product,
            quantity: quantity
        });
    }

    // Lưu và cập nhật lại icon
    cartManager.saveToStorage();
    cartManager.updateCartCount();
}
