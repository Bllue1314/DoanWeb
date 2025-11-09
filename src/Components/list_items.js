
// const initialProducts = JSON.parse(localStorage.getItem('products')) || products;
function getProductsFromStorage() {
    let products = JSON.parse(localStorage.getItem("products"));
    // Nếu localStorage rỗng, trả về một mảng rỗng.
    if (!products) {
        products = [];
    }
    return products;
}
const products = getProductsFromStorage();
// Hàm tạo HTML cho mỗi sản phẩm
// Hàm tạo HTML cho mỗi sản phẩm
function createProductCard(product) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isLiked = favorites.includes(String(product.id)) ? "liked" : "";
    const colorSpans = product.colors.map(color =>
        `<span style="background-color: ${color}"></span>`
    ).join('');

    return `
        <div class="card" data-product-id="${product.id}">
            <div class="card_heart ${isLiked}">
                <i class='bx bx-heart'></i>
                <i class='bx bxs-heart'></i>
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
                <div class="card_action">
                    <div class="card_buy">
                        <div class="card_price">${product.price}$</div>
                        <button>Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

let currentPage = 1;
const itemsPerPage = 6; // Mỗi trang 6 sản phẩm
let currentProductList = products;

// Render tất cả sản phẩm
// function renderProducts(list) {
//     currentProductList = list; // *** CẬP NHẬT: Lưu lại danh sách đang xem
//     currentPage = 1;
//     const container = document.getElementById('productsContainer');
//     //lọc sản phẩm ẩn
//     const visibleProducts = list.filter(product => !product.isHidden);
//     const start = (currentPage - 1) * itemsPerPage;
//     const end = start + itemsPerPage;

//     const productsToShow = list.slice(start, end);

//     container.innerHTML = productsToShow.map(product => createProductCard(product)).join('');
//     addClickEventsToCards();
//     addClickEventsToHearts();
//     renderPagination();

// }
// Hàm kiểm tra và lọc sản phẩm ẩn
function filterHiddenProducts(products) {
    console.log("🔍 Kiểm tra sản phẩm ẩn:");
    
    const visibleProducts = [];
    const hiddenProducts = [];
    
    products.forEach(product => {
        if (product.isHidden) {
            hiddenProducts.push(product);
            console.log(`🚫 ẨN: ${product.name} (ID: ${product.id})`);
        } else {
            visibleProducts.push(product);
            console.log(`👀 HIỆN: ${product.name} (ID: ${product.id})`);
        }
    });
    
    console.log(`📊 Kết quả: ${visibleProducts.length} hiện / ${hiddenProducts.length} ẩn`);
    return visibleProducts;
}
function addClickEventsToBuyNow() {
    const buyButtons = document.querySelectorAll('#productsContainer .card_action button');

    buyButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Ngăn sự kiện click của thẻ (card) chạy
            event.stopPropagation();

            const loggedInUser = localStorage.getItem("loggedInUser");
            if (!loggedInUser) {
                alert("Vui lòng đăng nhập để mua hàng.");
                // Giả sử bạn có hàm showForm() ở global
                if (typeof showForm === 'function') {
                    showForm('login');
                }
                return;
            }

            // Lấy ID sản phẩm từ card cha
            const card = button.closest('.card');
            const productId = card.dataset.productId;

            // Tìm thông tin sản phẩm đầy đủ từ mảng 'products'
            const product = products.find(p => String(p.id) === productId);
            if (!product) return;

            // ---- Logic "Buy Now" ----
            // Giả sử cartManager đã được định nghĩa ở đâu đó

            // 1. Lấy màu mặc định (màu đầu tiên)
            const selectedColor = (product.colors && product.colors.length > 0) ? product.colors[0] : null;

            // 2. Số lượng mặc định là 1 (vì không có ô chọn ở trang chính)
            const quantity = 1;
            const colorId = selectedColor || 'default';
            const cartItemId = `${product.id}-${colorId}`;
            // 3. Xóa sạch giỏ hàng hiện tại
            cartManager.items = [];

            // 4. Tạo item mới với màu và số lượng
            const buyNowItem = {
                ...product,
                quantity: quantity,
                selectedColor: selectedColor,// Thêm màu đã chọn
                cartItemId: cartItemId
            };

            // 5. Thêm duy nhất item này vào giỏ hàng
            cartManager.items.push(buyNowItem);

            // 6. Lưu giỏ hàng và cập nhật icon
            cartManager.saveToStorage();
            cartManager.updateCartCount();

            // 7. Chuyển hướng sang trang thanh toán
            window.location.href = 'checkout.html';
        });
    });
}
// Hàm render với kiểm tra ẩn/hiện
function renderProducts(list) {
    console.log("=== BẮT ĐẦU RENDER VỚI KIỂM TRA ẨN ===");
    
    // Kiểm tra và lọc sản phẩm ẩn
    const visibleProducts = filterHiddenProducts(list);
    
    currentProductList = visibleProducts;
    currentPage = 1;
    const container = document.getElementById('productsContainer');
    
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const productsToShow = visibleProducts.slice(start, end);

    console.log(`🎯 Hiển thị: ${productsToShow.length} sản phẩm`);
    
    container.innerHTML = productsToShow.map(product => createProductCard(product)).join('');
    addClickEventsToCards();
    addClickEventsToHearts();
    addClickEventsToBuyNow();
    
    renderPagination();
    
    console.log("=== KẾT THÚC RENDER ===");
}
function renderCurrentPage() {
    const container = document.getElementById('productsContainer');
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const productsToShow = currentProductList.slice(start, end); // Dùng danh sách hiện tại

    container.innerHTML = productsToShow.map(product => createProductCard(product)).join('');

    addClickEventsToCards();
    addClickEventsToHearts();
    addClickEventsToBuyNow();
    renderPagination();
}

function renderPagination() {
    const pagination = document.getElementById("pagination");
    // *** THAY ĐỔI: Tính toán trang dựa trên danh sách hiện tại (currentProductList) ***
    const totalPages = Math.ceil(currentProductList.length / itemsPerPage);

    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.classList.add("page-btn");
        if (i === currentPage) btn.classList.add("active");

        btn.addEventListener("click", () => {
            currentPage = i;
            // *** THAY ĐỔI: Gọi renderCurrentPage() thay vì renderProducts1() ***
            renderCurrentPage();
        });

        pagination.appendChild(btn);
    }
}

// Render sản phẩm khi trang load
renderProducts(products);

/*filter*/
document.querySelectorAll(".dropdown-item").forEach(item => {
    item.addEventListener("click", () => {
        const type = item.dataset.type;
        const value = item.dataset.value;

        if (type === "category") {
            const filtered = products.filter(p => p.type === value);
            renderProducts(filtered);
        }

        if (type === "brand") {
            const filtered = products.filter(p => p.brand === value);
            renderProducts(filtered);
        }
        document.querySelectorAll(".dropdown-menu").forEach(d => {
            d.style.display = "none";
        });
        document.querySelectorAll(".delete-button").forEach(d => {
            d.style.display = "block";
        });

    });
});
//dropdown

function Delete() {
    renderProducts(products);
    document.querySelector(".delete-button").style.display = "none";
}


function toggleDropdown(button) {
    const dropdown = button.nextElementSibling; // Lấy menu tương ứng
    const isVisible = dropdown.style.display === "block";

    // Ẩn tất cả dropdown
    document.querySelectorAll(".dropdown-menu").forEach(d => {
        d.style.display = "none";
    });

    // Nếu dropdown này đang ẩn trước đó => bật lên
    if (!isVisible) {
        dropdown.style.display = "block";
    }
}

function addClickEventsToHearts() {
    const heartIcons = document.querySelectorAll('#productsContainer .card_heart');

    heartIcons.forEach(icon => {
        icon.addEventListener('click', (event) => {
            event.stopPropagation();

            const card = icon.closest('.card');
            const productId = card.dataset.productId;

            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

            if (favorites.includes(productId)) {
                favorites = favorites.filter(id => id !== productId);
                icon.classList.remove('liked');
            } else {
                favorites.push(productId);
                icon.classList.add('liked');
            }

            localStorage.setItem('favorites', JSON.stringify(favorites));
        });
    });
}

window.addEventListener("click", function (e) {
    if (!e.target.closest(".filter-container")) {
        document.querySelectorAll(".dropdown-menu").forEach(d => {
            d.style.display = "none";
        });
    }
});




/* Search */
function search(e) {
  e.preventDefault();
  const searchValue = document.getElementById("search-input").value.trim().toLowerCase();

  const infsearch = products.filter(p => 
    p.name.toLowerCase().includes(searchValue)
  );

  renderProducts(infsearch);
}



/*phan js cho bo loc tat ca*/

const openFilter = document.getElementById("Allfilter");
const closeFilter = document.getElementById("closeFilter");
const filterPanel = document.getElementById("filterPanel");
const overlay = document.getElementById("overlay");
const resetFilter = document.querySelector(".reset");
const viewFilter = document.querySelector(".apply");
let selectedColors = [];

viewFilter.onclick = () => {
    filterPanel.classList.remove("show");
    overlay.classList.remove("show");
}

resetFilter.onclick = () => {
    selectedColors = [];
    document.querySelectorAll(".filter-color span.selected").forEach(span => {
        span.classList.remove("selected");
    });
    renderProducts(products);
    updateButtonText(products);
}

openFilter.onclick = () => {
    filterPanel.classList.add("show");
    overlay.classList.add("show");
}

closeFilter.onclick = () => {
    filterPanel.classList.remove("show");
    overlay.classList.remove("show");
}

overlay.onclick = () => {
    overlay.classList.remove("show");
    historyPopup.classList.remove("show");
    filterPanel.classList.remove("show");

    // Thêm logic đóng popup chi tiết (nếu tồn tại)
    const detailPopup = document.getElementById("historyDetailPopup");
    if (detailPopup) {
        detailPopup.classList.remove("show");
    }
}

document.querySelectorAll(".filter-item").forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("active");
    });
});
//dropdown


const applyBtn = document.querySelector(".apply")

function updateButtonText(filtered) {
    applyBtn.textContent = `Xem các mục (${filtered.length})`;
}
updateButtonText(products);

const checkboxes = document.querySelectorAll("input[type='checkbox']");
checkboxes.forEach(cb => {
    cb.addEventListener("change", () => {
        applyFilters();
    });
});

document.querySelectorAll(".filter-color span").forEach(colorItem => {
    colorItem.addEventListener("click", (e) => {
        const color = colorItem.dataset.value;

        if (colorItem.classList.contains("selected")) {
            colorItem.classList.remove("selected");
            selectedColors = selectedColors.filter(c => c !== color);
        } else {
            colorItem.classList.add("selected");
            selectedColors.push(color);
        }

        e.stopPropagation();
        applyFilters();
    });
});

function applyFilters() {
    const selectedLoai = Array.from(document.querySelectorAll("input[data-type='loai']:checked")).map(c => c.dataset.value);

    const selectedHang = Array.from(document.querySelectorAll("input[data-type='hang']:checked")).map(c => c.dataset.value);

    let filtered = products;

    // Lọc loại
    if (selectedLoai.length > 0) {
        filtered = filtered.filter(p => selectedLoai.includes(p.type));
    }

    // Lọc hãng
    if (selectedHang.length > 0) {
        filtered = filtered.filter(p => selectedHang.includes(p.brand));
    }

    // Lọc màu
    if (selectedColors.length > 0) {
        filtered = filtered.filter(p => p.colors && p.colors.some(c => selectedColors.includes(c)));
    }

    const selectedFavorite = document.querySelector("input[data-type='yeu-thich']:checked");

    if (selectedFavorite) {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        filtered = filtered.filter(p => favorites.includes(String(p.id)));
    }

    renderProducts(filtered);
    updateButtonText(filtered);
}

document.querySelectorAll("#filterPanel input[type='checkbox']").forEach(cb => {
    cb.addEventListener("click", function(e) {
        e.stopPropagation();
    });
});

document.querySelectorAll("#filterPanel label").forEach(label => {
    label.addEventListener("click", function(e) {
        e.stopPropagation();
    });
});



// (Tìm hàm này)
function addClickEventsToCards() {
    const container = document.getElementById('productsContainer');
    container.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', (event) => {
            if (event.target.closest('.card_heart') ||
                event.target.closest('.card_action')) {
                return;
            }

            event.preventDefault();

            // Lấy ID sản phẩm
            const productId = card.dataset.productId;

            window.location.href = `playout.html?id=${productId}`;
        });
    });
}

//HistoryOrder
const btnHistoryOrder = document.getElementById("btnHistoryOrder");
const historyPopup = document.getElementById("historyPopup");

// Mở popup
btnHistoryOrder.onclick = () => {
    overlay.classList.add("show");
    historyPopup.classList.add("show");
};

function renderHistory() {
    const history = JSON.parse(localStorage.getItem("orderHistory")) || [];
    const tbody = document.getElementById("historybody");
    if (history.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center; padding: 12px;">
                    Chưa có đơn hàng nào.
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = history.map(order => `
        <tr>
            <td>${order.orderId}</td>
            <td>${order.date}</td>
            <td>${order.address}</td>
            <td>${order.status}</td>
            <td>${order.total.toLocaleString('en-US')} $</td>
            <td><a href="#" class="history-detail-icon" onclick="showHistoryDetail('${order.orderId}'); return false;"><i class="fas fa-list"></i></a></td>
        </tr>
    `).join('');
}
function showHistoryDetail(orderId) {
    const history = JSON.parse(localStorage.getItem("orderHistory")) || [];
    const order = history.find(o => o.orderId !== orderId);

    if (!order) {
        alert("Không tìm thấy đơn hàng!");
        return;
    }

    const detailBody = document.getElementById("historyDetailBody");
    const detailCaption = document.getElementById("historyDetailCaption");

    // Cập nhật tiêu đề popup
    detailCaption.textContent = `Chi tiết Đơn hàng: ${orderId}`;

    // Đổ dữ liệu item vào bảng (ĐÃ SỬA)
    detailBody.innerHTML = order.items.map(item => {
        // 🟢 SỬA: Lấy thông tin sản phẩm đầy đủ từ products
        const fullProduct = products.find(p => p.id == item.productId);
        
        return `
        <tr>
            <td>
                <div class="item-info">
                    <img src="${fullProduct ? fullProduct.image : item.image || 'default-image.jpg'}" 
                         alt="${item.name}" 
                         style="width: 50px; height: 50px; object-fit: cover;">
                    <span>${item.name}</span>
                </div>
            </td>
            <td>
                ${item.selectedColor || (fullProduct && fullProduct.colors && fullProduct.colors[0]) ?
            `<span class="item-color-dot" 
                           style="background-color: ${item.selectedColor || (fullProduct.colors[0])}; 
                                  width: 20px; height: 20px; 
                                  border-radius: 50%; 
                                  display: inline-block;
                                  border: 1px solid #ccc;">
                     </span>`
            : 'N/A'}
            </td>
            <td>${item.price ? item.price.toLocaleString('en-US') : '0'} $</td>
            <td>${item.quantity || 1}</td>
            <td>${((item.price || 0) * (item.quantity || 1)).toLocaleString('en-US')} $</td>
        </tr>
        `;
    }).join('');

    // Hiển thị popup chi tiết
    document.getElementById("historyPopup").classList.add("faded");
    document.getElementById("historyDetailPopup").classList.add("show");
}

document.addEventListener('DOMContentLoaded', () => {
    renderHistory();
    //đóng popup detail
    const closeDetailPopup = document.getElementById('closeDetailPopup');
    if (closeDetailPopup) {
        closeDetailPopup.onclick = () => {
            document.getElementById("historyDetailPopup").classList.remove("show");
            document.getElementById("historyPopup").classList.remove("faded");
        };
    }
    const closeHistoryPopup = document.getElementById('closeHistoryPopup');
    if (closeHistoryPopup) {
        closeHistoryPopup.onclick = () => {
            document.getElementById("historyPopup").classList.remove("show");
            overlay.classList.remove("show");
        };
    }
});




/* More info */

document.addEventListener("DOMContentLoaded", function () {
    var closeSupportButton = document.getElementById("closeSupportPopup");
    var supportPopup = document.getElementById("supportPopup");
    var aboutLink = document.getElementById("aboutLink");

    closeSupportButton.addEventListener("click", function () {
        supportPopup.style.display = "none";
        document.body.classList.remove("popup-open");
    });

    aboutLink.addEventListener("click", function () {
        // Hiển thị popup
        supportPopup.style.display = "block";
        document.body.classList.add("popup-open");

        // Điều chỉnh nội dung chi tiết của trang hỗ trợ
        var supportContent = document.getElementById("supportContent");
        supportContent.innerHTML = `
        <div class="about-popup">
            <div class="header-popup">
                <h1>Hỗ Trợ Khách Hàng - Bo PC</h1>
            </div>

            <div class="nav-popup">
                <a href="#faq">Câu hỏi thường gặp</a>
                <a href="#shipping">Vận chuyển</a>
                <a href="#returns">Đổi trả và hoàn tiền</a>
                <a href="#contact">Liên hệ chúng tôi</a>
            </div>        
        </div>

        <section id="faq">
            <h2 class="heading">Câu hỏi thường gặp</h2>
            <p class="desc">
                <strong>1. Làm thế nào để đặt hàng?</strong><br />
                Để đặt hàng, hãy thêm sản phẩm vào giỏ hàng và nhấp vào nút
                "Thanh toán".
            </p>
            <p class="desc">
                <strong>2. Làm thế nào để kiểm tra trạng thái đơn hàng?</strong
                ><br />
                Bạn có thể kiểm tra trạng thái đơn hàng trong tài khoản của bạn
                hoặc liên hệ với chúng tôi qua trang Liên hệ.
            </p>
            <p class="desc">
                <strong>3. Làm thế nào để thay đổi thông tin cá nhân?</strong
                ><br />
                Bạn có thể cập nhật thông tin cá nhân trong phần Tài khoản của
                bạn.
            </p>
            <!-- Thêm các câu hỏi thường gặp khác -->
        </section>

        <section id="shipping">
            <h2 class="heading">Thông tin Vận chuyển</h2>
            <p class="desc">
                Chúng tôi cung cấp các tùy chọn vận chuyển nhanh chóng và đáng
                tin cậy. Chi phí vận chuyển và thời gian giao hàng cụ thể sẽ
                hiển thị trong quá trình thanh toán.
            </p>
            <p class="desc">
                <strong>Phí Vận chuyển:</strong> Phí vận chuyển được tính dựa
                trên địa chỉ giao hàng của bạn.
            </p>
            <p class="desc">
                <strong>Thời Gian Giao Hàng:</strong> Thời gian giao hàng ước
                tính sẽ được hiển thị trong quá trình thanh toán.
            </p>
            <!-- Thêm thông tin về vận chuyển -->
        </section>

        <section id="returns">
            <h2 class="heading">Chính sách Đổi trả và Hoàn tiền</h2>
            <p class="desc">
                Chúng tôi chấp nhận đổi trả trong vòng 30 ngày kể từ ngày mua.
                Để đổi trả, vui lòng liên hệ với chúng tôi qua trang Liên hệ.
            </p>
            <p class="desc">
                <strong>Điều Kiện Đổi Trả:</strong> Sản phẩm phải còn nguyên
                vẹn, chưa sử dụng và có các nhãn mác gốc.
            </p>
            <p class="desc">
                <strong>Hoàn Tiền:</strong> Hoàn tiền sẽ được xử lý trong vòng
                7-10 ngày làm việc sau khi nhận được sản phẩm đổi trả.
            </p>
            <!-- Thêm hướng dẫn đổi trả và hoàn tiền -->
        </section>

        <section id="contact">
            <h2 class="heading">Liên hệ chúng tôi</h2>
            <p class="desc">
                Nếu bạn có bất kỳ câu hỏi hoặc cần hỗ trợ, hãy liên hệ với chúng
                tôi qua email:
                <a href="mailto:support@example.com">boPC@gmail.com</a>
            </p>
            <p class="desc">
                Hoặc gọi đến số điện thoại hỗ trợ của chúng tôi:
                <strong>(012)036-3636</strong>.
            </p>
            <p class="desc">
                Chúng tôi cũng có thể được liên hệ qua mạng xã hội:
                <a href="#">Facebook</a>, <a href="#">Twitter</a>.
            </p>
            <!-- Thêm thông tin liên hệ khác nếu cần -->
        </section>

        <div class="fixed-footer">
            <div class="footer-popup">
                <p class="title">&copy; 2025 BoPc company. All rights reserved.</p>
            </div>
        </div>
        `;
    });

    // Đóng popup khi người dùng nhấp chuột bên ngoài nó
    window.addEventListener("click", function (event) {
        if (event.target === supportPopup) {
            supportPopup.style.display = "none";
            document.body.classList.remove("popup-open");
        }
    });
});
