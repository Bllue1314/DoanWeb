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
                        ${product.price}$
                    </div>
                    <div class="card_action" onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                        <button onclick="buyProduct('${product.name}')">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

let currentPage = 1;
const itemsPerPage = 9; // Mỗi trang 12 sản phẩm


// Render tất cả sản phẩm
function renderProducts(list) {
    const container = document.getElementById('productsContainer');

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    const productsToShow = list.slice(start, end);

    container.innerHTML = productsToShow.map(product => createProductCard(product)).join('');

    renderPagination();
}

function renderPagination() {
    const pagination = document.getElementById("pagination");
    const totalPages = Math.ceil(products.length / itemsPerPage);

    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.classList.add("page-btn");
        if (i === currentPage) btn.classList.add("active");

        btn.addEventListener("click", () => {
            currentPage = i;
            renderProducts();
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
    });
});
//dropdown

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

window.addEventListener("click", function(e) {
    if (!e.target.closest(".filter-container")) {
            document.querySelectorAll(".dropdown-menu").forEach(d => {
            d.style.display = "none";
            });
        }
});

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
    filterPanel.classList.remove("show");
    overlay.classList.remove("show");
}

document.querySelectorAll(".filter-item").forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("active");
    });
});


const applyBtn = document.querySelector(".apply") 

function updateButtonText(filtered) {
    applyBtn.textContent = `Xem các mục (${filtered.length})`;
}
updateButtonText(products);

document.querySelectorAll(".filter-color span").forEach(colorItem => {
    colorItem.addEventListener("click", (e) => {
        const color = colorItem.dataset.value;
        //Chon mau
        if (colorItem.classList.contains("selected")) {
            colorItem.classList.remove("selected");
            selectedColors = selectedColors.filter(c => c !== color);
        } else {
            colorItem.classList.add("selected");
            selectedColors.push(color);
        }
        e.stopPropagation();
        //Loc
        const filtered = products.filter(p => 
            p.colors.some(c => selectedColors.includes(c))
        );
        if (selectedColors.length === 0) {
            renderProducts(products);
            updateButtonText(products);
        } else {
            renderProducts(filtered);
            updateButtonText(filtered);
        }
    });
});

