// cart-display.js - Hiển thị giỏ hàng
document.addEventListener('DOMContentLoaded', function () {
    const cartItemsContainer = document.getElementById('cartItems');
    const totalAmountElement = document.getElementById('totalAmount');
    ////
    const checkoutButton = document.querySelector('.checkout-btn');
    ///
    function displayCart() {
        const items = cartManager.getItems();

        if (items.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Giỏ hàng trống</p>';
            totalAmountElement.textContent = '0';
            return;
        }

        cartItemsContainer.innerHTML = items.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.price.toLocaleString()}$</p>
                </div>
                <div class="cart-item-controls">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <div class="cart-item-total">
                    ${(item.price * item.quantity).toLocaleString()} $
                </div>
            </div>
        `).join('');

        totalAmountElement.textContent = cartManager.getTotal().toLocaleString();
    }

    // Các hàm toàn cục để gọi từ HTML
    window.updateQuantity = function (productId, change) {
        const items = cartManager.getItems();
        const item = items.find(i => i.id === productId);

        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                cartManager.removeItem(productId);
            } else {
                cartManager.saveToStorage();
            }
            displayCart();
        }
    };

    window.removeFromCart = function (productId) {
        cartManager.removeItem(productId);
        displayCart();
    };

    ///
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function (event) {
            if (cartManager.getTotalItems() === 0) {
                //hàm có sẵn ngăn chặn chuyển trang
                event.preventDefault();
                alert("Vui lòng chọn sản phẩm để thanh toán.");
            }
        });
    }
    ///
    displayCart();
});
