async function fetchProducts() {
    try {
        const response = await fetch('sanpham.txt'); // Đọc file sanpham.txt
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
                price: price.trim(),
                image: image ? image.trim() : 'default.jpg',
                colors: colors
            };
        });

        return products; // Trả về mảng sản phẩm đã được xử lý
    }
    catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
        return []; // Trả về mảng rỗng nếu có lỗi
    }
}

// Hàm chính: Tải dữ liệu, SAU ĐÓ tìm và hiển thị sản phẩm
async function loadProductDetails() {

    // 1. Chờ cho đến khi tải xong toàn bộ sản phẩm từ file text
    const products = await fetchProducts();

    // 2. Lấy ID sản phẩm từ thanh địa chỉ URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id'); // Ví dụ: 'logitech-pro-x'

    // 3. Tìm sản phẩm trong mảng (vừa tải về) dựa trên ID
    const product = products.find(p => p.id === productId);

    // 4. Nếu tìm thấy, cập nhật nội dung trang playout.html
    if (product) {
        // Cập nhật tiêu đề
        document.querySelector('.product-title').innerText = product.name;

        // Cập nhật ảnh
        const mainImage = document.querySelector('.product-main-img');
        mainImage.src = product.image;
        mainImage.alt = product.name;

        // Cập nhật giá
        document.querySelector('.final-price').innerText = product.price;

        // Cập nhật màu sắc
        const colorContainer = document.querySelector('.card_color');
        const colorSpans = product.colors.map(color =>
            `<span style="background-color: ${color}"></span>`
        ).join('');
        // Ghi đè HTML cũ bằng các màu mới
        colorContainer.innerHTML = `<h3>Color:</h3> ${colorSpans}`;

    } else {
        // Xử lý nếu không tìm thấy ID (ví dụ: ai đó gõ URL sai)
        document.querySelector('.product-summary-grid').innerHTML =
            "<h1>Sản phẩm không tồn tại!</h1>";
    }
}

// 5. Gọi hàm chính để bắt đầu quá trình
loadProductDetails();