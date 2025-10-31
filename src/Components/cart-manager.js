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

    // Thêm sản phẩm vào giỏ hàng
    addItem(product) {
        if (!this.items) this.items = [];
        
        // Kiểm tra sản phẩm đã có trong giỏ chưa
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveToStorage();
        this.updateCartCount();
        this.showAddToCartMessage(product.name);
    }

    // Xóa sản phẩm khỏi giỏ hàng
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
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
            return saved ? JSON.parse(saved) : [];
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
document.addEventListener('DOMContentLoaded', function() {
    // Hàm này sẽ được gọi từ list_items.js khi sản phẩm được hiển thị
    window.addToCart = function(product) {
        cartManager.addItem(product);
    };
});