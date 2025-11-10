function displayOrderSummary() {
    const items = cartManager.getItems();
    const total = cartManager.getTotal();

    const summaryList = document.getElementById('summaryItemsList');
    const subtotalEl = document.getElementById('summarySubtotal');
    const totalEl = document.getElementById('summaryTotal');

    if (items.length === 0) {
        summaryList.innerHTML = '<p>Giỏ hàng của bạn đang trống.</p>';
        subtotalEl.textContent = '0 $';
        totalEl.textContent = '0 $';
        return;
    }

    summaryList.innerHTML = items.map(item => `
        <div class="summary-item">
            <img src="${item.image}" alt="${item.name}" class="summary-item-image">
            <div class="summary-item-info">
                <h4>${item.name}</h4>
                
                ${item.selectedColor ? `
                <p class="item-color">
                    Màu: 
                    <span class="item-color-dot" style="background-color: ${item.selectedColor};"></span>
                </p>
                ` : ''}

                <p>Số lượng: ${item.quantity}</p>
            </div>
            <div class="summary-item-price">
                ${(item.price * item.quantity).toLocaleString('en-US')} $
            </div>
        </div>
    `).join('');

    // Cập nhật tổng tiền (thay "đ" bằng "$")
    subtotalEl.textContent = `${total.toLocaleString('en-US')} $`;
    totalEl.textContent = `${total.toLocaleString('en-US')} $`;
}

/**
 * MỚI: Tự động điền thông tin người dùng nếu đã đăng nhập
 */
function prefillUserInfo() {
    const loggedInUsername = localStorage.getItem("loggedInUser");
    const loginPrompt = document.getElementById("loginPrompt");

    if (loggedInUsername) {
        // 1. Ẩn thông báo đăng nhập
        if (loginPrompt) {
            loginPrompt.style.display = 'none';
        }

        // 2. Lấy thông tin chi tiết của user
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const currentUser = users.find(user => user.username === loggedInUsername);

        if (currentUser) {
            // 3. Điền thông tin vào form
            const fullNameInput = document.getElementById('fullName');
            const phoneInput = document.getElementById('phone');
            const emailInput = document.getElementById('email1');
            const addressInput = document.getElementById('address');

            if (fullNameInput) fullNameInput.value = currentUser.username || "";
            if (phoneInput) phoneInput.value = currentUser.phone || "";
            if (emailInput) emailInput.value = currentUser.email || "";
            if (addressInput) addressInput.value = currentUser.address || "";
        }

    } else {
        // Nếu không đăng nhập, đảm bảo thông báo hiển thị
        if (loginPrompt) {
            loginPrompt.style.display = 'flex';
        }
    }
}
// Cập nhật /src/Components/checkout.js

document.addEventListener('DOMContentLoaded', function () {

    // 1. Tự động điền thông tin nếu đã đăng nhập
    prefillUserInfo();

    // 2. Hiển thị tóm tắt đơn hàng
    displayOrderSummary();

    // 3. (MỚI) XỬ LÝ CLICK CHỌN PHƯƠNG THỨC THANH TOÁN
    setupPaymentOptions();

    // 4. Xử lý form
    const paymentForm = document.getElementById('paymentForm');
    paymentForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Lấy dữ liệu form
        const formData = new FormData(paymentForm);
        const name = formData.get('fullName');

        alert(`Cảm ơn, ${name}! Đơn hàng của bạn đã được đặt thành công.`);

        //HistoryOder
        const orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];

        const newOrder = {
            //orderid không được có kí tự mò gần ch

            orderId: Date.now(),
            username: localStorage.getItem("loggedInUser") || "Khách",
            date: new Date().toISOString().split('T')[0],
            address: formData.get('address') ,
            status: "Đang xử lý",
            total: cartManager.getTotal(),
            items: cartManager.getItems()
        };

        orderHistory.push(newOrder);
        localStorage.setItem("orderHistory", JSON.stringify(orderHistory));

        cartManager.items = [];
        cartManager.saveToStorage();
        cartManager.updateCartCount();

        window.location.href = 'index.html';
        const menuBtn = document.getElementById('menuBtn');
        const navLinks = document.querySelector('.nav-links');

        if (menuBtn && navLinks) {
            menuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('show');
            });
        }
    });

});

function setupPaymentOptions() {
    const paymentOptions = document.querySelectorAll('.payment-option');

    paymentOptions.forEach(option => {
        option.addEventListener('click', function () {
            // Xóa class 'selected' khỏi tất cả
            paymentOptions.forEach(opt => opt.classList.remove('selected'));

            // Thêm class 'selected' cho cái vừa click
            this.classList.add('selected');

            // Tự động check nút radio bên trong nó
            this.querySelector('input[type="radio"]').checked = true;
        });
    });
}
