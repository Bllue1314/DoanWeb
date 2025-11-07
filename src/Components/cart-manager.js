// cart.js - Quản lý giỏ hàng đơn giản
class CartManager {
    constructor() {
        this.items = this.loadFromStorage();
        this.updateCartCount();
    }

    // Lấy sản phẩm từ giỏ hàng
    getItems() {
        return this.items || [];
    }

    addItem(product) {
        if (!this.items) this.items = [];
        const cartItemId = `${product.id}-default`;

        const existingItem = this.items.find(item => item.cartItemId === cartItemId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1,
                selectedColor: null, // Không có màu
                cartItemId: cartItemId // ID mặc định
            });
        }

        this.saveToStorage();
        this.updateCartCount();
        this.showAddToCartMessage(product.name);
    }

    // Xóa sản phẩm khỏi giỏ hàng
    removeItem(cartId) {
        this.items = this.items.filter(item => item.cartItemId !== cartId);
        this.saveToStorage();
        this.updateCartCount();
    }

    // Tính tổng tiền
    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Đếm tổng số sản phẩm
    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Lưu vào localStorage
    saveToStorage() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    // Lấy từ localStorage
    loadFromStorage() {
        try {
            const saved = localStorage.getItem('cart');
            const items = saved ? JSON.parse(saved) : [];
            const migratedItems = items.map(item => {
                // Nếu item đã có cartItemId (hàng mới), giữ nguyên
                if (item.cartItemId) {
                    return item;
                }

                // tự tạo một cái 'default' cho nó
                return {
                    ...item,
                    selectedColor: null, // Hàng cũ không có màu
                    cartItemId: `${item.id}-default` // Tạo ID mặc định
                };
            });

            return migratedItems; // Trả về mảng đã được "nâng cấp"

        } catch (error) {
            return [];
        }
    }

    // Cập nhật số lượng trên icon giỏ hàng
    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            cartCount.textContent = this.getTotalItems();
        }
    }

    // Hiển thị thông báo khi thêm vào giỏ
    showAddToCartMessage(productName) {
        alert(`Đã thêm "${productName}" vào giỏ hàng!`);
    }
}

// Tạo đối tượng cart toàn cục
const cartManager = new CartManager();

// Thêm sự kiện cho nút "Thêm vào giỏ hàng"
document.addEventListener('DOMContentLoaded', function () {
    // Hàm này sẽ được gọi từ list_items.js khi sản phẩm được hiển thị
    window.addToCart = function (product) {
        cartManager.addItem(product);
    };
});
