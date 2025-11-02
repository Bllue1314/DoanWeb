async function fetchProducts() {
    try {
        // Giả định file text của bạn tên là 'products.txt'
        // Bạn có thể đổi 'products.txt' thành tên file dữ liệu của bạn
        const response = await fetch('sanpham.txt');
        const text = await response.text();

        // Mỗi dòng trong file tương ứng 1 sản phẩm
        const lines = text.trim().split('\n');

        // Thông dịch từng hàng 
        const products = lines.map(line => {
            // Tách các trường dữ liệu bằng dấu '|'
            const [id, name, description, price, image, colorsStr] = line.split('|');

            // Xử lý chuỗi màu sắc (ví dụ: "#000000,#FFC0CB") thành mảng
            const colors = colorsStr ? colorsStr.trim().split(',').map(c => c.trim()) : [];

            // Định dạng lại thông tin đọc được
            return {
                id: id.trim(),
                name: name.trim(),
                description: description.trim(),
                price: price.trim(), // Giữ nguyên định dạng string (ví dụ: "$99.99")
                image: image ? image.trim() : 'default.jpg',
                colors: colors
            };
        });

        renderProducts(products); // Gọi hàm render với dữ liệu vừa tải
    }
    catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
    }
}

// Hàm tạo HTML cho mỗi sản phẩm (GIỮ NGUYÊN)
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

        
            <a href="playout.html?id=${product.id}" class="product-link">
                <div class="card_img">
                    <img src="${product.image}" alt="${product.name}">
                </div>
            </a>
            <div class="card_content">
                <div class="card_color">
                    <h3>Color:</h3>
                    ${colorSpans}
                </div>
                <div class="card_title">
                    <a href="playout.html?id=${product.id}" class="product-link">
                        ${product.name}
                    </a>
                </div>
                <div class="card_description">
                    ${product.description}
                </div>
                <div class="card_buy">
                    <div class="card_price">
                        ${product.price}
                    </div>
                    <div class="card_action">
                        <a href="playout.html?id=${product.id}">
                            <button>Buy Now</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Render tất cả sản phẩm (CHỈNH SỬA: nhận tham số 'products')
function renderProducts(products) {
    const container = document.getElementById('productsContainer');
    container.innerHTML = products.map(product => createProductCard(product)).join('');
}
// Thêm dòng này vào cuối file list_items.js
fetchProducts();
