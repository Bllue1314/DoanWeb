// Danh sách sản phẩm - Bạn có thể thêm/sửa/xóa sản phẩm ở đây
const products = [
    {
        name: "Logitech Pro X Gaming",
        description: "The Logitech Pro X Gaming is designed for professional gamers",
        price: "$99.99",
        image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400",
        colors: ["#000000", "#FFC0CB"]
    },
    {
        name: "Razer BlackWidow V3",
        description: "Mechanical gaming keyboard with RGB lighting",
        price: "$139.99",
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=400",
        colors: ["#000000", "#00FF00"]
    },
    {
        name: "SteelSeries Apex Pro",
        description: "Adjustable mechanical switches for ultimate control",
        price: "$199.99",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
        colors: ["#000000", "#FF0000"]
    },
    {
        name: "Corsair K95 RGB",
        description: "Premium gaming keyboard with Cherry MX switches",
        price: "$179.99",
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400",
        colors: ["#000000", "#FFD700"]
    },
    {
        name: "HyperX Alloy FPS",
        description: "Compact mechanical keyboard for FPS games",
        price: "$89.99",
        image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400",
        colors: ["#000000", "#FF4500"]
    },
    {
        name: "Logitech G915",
        description: "Wireless mechanical gaming keyboard",
        price: "$249.99",
        image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400",
        colors: ["#000000", "#FFFFFF"]
    }
];

// Hàm tạo HTML cho mỗi sản phẩm
function createProductCard(product) {
    const colorSpans = product.colors.map(color =>
        `<span style="background-color: ${color}"></span>`
    ).join('');

    return `
        <div class="card">
            <div class="card_heart">
                <i class='bx bx-heart'></i>
                <i class='bx bxs-heart'></i>
            </div>
            <div class="card_cart">
                <i class='bx bx-cart'></i>
                <i class='bx bxs-cart'></i>
            </div>
            <div class="card_img">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="card_content">
                <div class="card_color">
                    <h3>Color:</h3>
                    ${colorSpans}
                </div>
                <div class="card_title">
                    ${product.name}
                </div>
                <div class="card_description">
                    ${product.description}
                </div>
                <div class="card_buy">
                    <div class="card_price">
                        ${product.price}
                    </div>
                    <div class="card_action">
                        <button onclick="buyProduct('${product.name}')">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Render tất cả sản phẩm
function renderProducts() {
    const container = document.getElementById('productsContainer');
    container.innerHTML = products.map(product => createProductCard(product)).join('');
}

// Hàm xử lý khi click Buy Now
function buyProduct(productName) {
    alert(`Added "${productName}" to cart!`);
}

// Render sản phẩm khi trang load
renderProducts();