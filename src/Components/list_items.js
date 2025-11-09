// Danh sách sản phẩm - Bạn có thể thêm/sửa/xóa sản phẩm ở đây
const products = [
    {
        id: 1,
        name: "Logitech Pro X Gaming",
        brand: "Logitech",
        type: "tai-nghe",
        description: "The Logitech Pro X Gaming is designed for professional gamers",
        price: 99.99,
        image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400",
        colors: ["#000000", "#FFC0CB"]
    },
    {
        id: 2,
        name: "Razer BlackWidow V3",
        brand: "Razer",
        type: "ban-phim",
        description: "Mechanical gaming keyboard with RGB lighting",
        price: 139.99,
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=400",
        colors: ["#000000", "#00FF00"]
    },
    {
        id: 3,
        name: "SteelSeries Apex Pro",
        brand: "SteelSeries",
        type: "ban-phim",
        description: "Adjustable mechanical switches for ultimate control",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
        colors: ["#000000", "#FF0000"]
    },
    {
        id: 4,
        name: "Corsair K95 RGB",
        brand: "Corsair",
        type: "ban-phim",
        description: "Premium gaming keyboard with Cherry MX switches",
        price: 179.99,
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400",
        colors: ["#000000", "#FFD700"]
    },
    {
        id: 5,
        name: "HyperX Alloy FPS",
        brand: "HyperX",
        type: "ban-phim",
        description: "Compact mechanical keyboard for FPS games",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400",
        colors: ["#000000", "#FF4500"]
    },
    {
        id: 6,
        name: "Logitech G915",
        brand: "Logitech",
        type: "ban-phim",
        description: "Wireless mechanical gaming keyboard",
        price: 249.99,
        image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400",
        colors: ["#000000", "#FFFFFF"]
    },
    {
        id: 7,
        name: "Intel Core i7",
        brand: "Intel",
        type: "cpu",
        description: "High performance CPU for gaming and work",
        price: 499.99,
        image: "https://images.unsplash.com/photo-1757356747785-106e3c5f399a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aW50ZWwlMjBjb3JlJTIwaTl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
        colors: []
    },
    {
        id: 8,
        name: "Razer DeathAdder V2",
        brand: "Razer",
        type: "chuot",
        description: "High precision gaming mouse with ergonomic design",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1544966685-5bb6cc6cb6d6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        colors: ["#000000", "#FFFFFF"]
    }
];
localStorage.setItem('products', JSON.stringify(products));
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
                <div class="card_price">
                    ${product.price}$
                </div>
            </div>
        </div>
    `;
}

let currentPage = 1;
const itemsPerPage = 6; // Mỗi trang 6 sản phẩm
let currentProductList = products;

// Render tất cả sản phẩm
function renderProducts(list) {
    currentProductList = list; // *** CẬP NHẬT: Lưu lại danh sách đang xem
    currentPage = 1;
    const container = document.getElementById('productsContainer');

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    const productsToShow = list.slice(start, end);

    container.innerHTML = productsToShow.map(product => createProductCard(product)).join('');
    addClickEventsToCards();
    addClickEventsToHearts();
    renderPagination();

}

function renderCurrentPage() {
    const container = document.getElementById('productsContainer');
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const productsToShow = currentProductList.slice(start, end); // Dùng danh sách hiện tại

    container.innerHTML = productsToShow.map(product => createProductCard(product)).join('');

    addClickEventsToCards();
    addClickEventsToHearts();
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
    const order = history.find(o => o.orderId === orderId);

    if (!order) {
        alert("Không tìm thấy đơn hàng!");
        return;
    }

    const detailBody = document.getElementById("historyDetailBody");
    const detailCaption = document.getElementById("historyDetailCaption");

    // Cập nhật tiêu đề popup
    detailCaption.textContent = `Chi tiết Đơn hàng: ${orderId}`;

    // Đổ dữ liệu item vào bảng (đã sửa để hiện màu)
    detailBody.innerHTML = order.items.map(item => `
        <tr>
            <td>
                <div class="item-info">
                    <img src="${item.image}" alt="${item.name}">
                    <span>${item.name}</span>
                </div>
            </td>
            <td>
                ${item.selectedColor ?
            `<span class="item-color-dot" 
                           style="background-color: ${item.selectedColor}; 
                                  width: 20px; height: 20px; 
                                  border-radius: 50%; 
                                  display: inline-block;
                                  border: 1px solid #ccc;">
                     </span>`
            : 'N/A'}
            </td>
            <td>${item.price.toLocaleString('en-US')} $</td>
            <td>${item.quantity}</td>
            <td>${(item.price * item.quantity).toLocaleString('en-US')} $</td>
        </tr>
    `).join('');

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
