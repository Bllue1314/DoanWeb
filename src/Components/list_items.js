// Danh sách sản phẩm - Bạn có thể thêm/sửa/xóa sản phẩm ở đây
const products = [
  {
    id: 1,
    name: "Logitech Pro X Gaming",
    brand: "Logitech",
    description: "The Logitech Pro X Gaming is designed for professional gamers",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400",
    colors: ["#000000", "#FFC0CB"]
  },
  {
    id: 2,
    name: "Razer BlackWidow V3",
    brand: "Razer",
    description: "Mechanical gaming keyboard with RGB lighting",
    price: 139.99,
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=400",
    colors: ["#000000", "#00FF00"]
  },
  {
    id: 3,
    name: "SteelSeries Apex Pro",
    brand: "SteelSeries",
    description: "Adjustable mechanical switches for ultimate control",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
    colors: ["#000000", "#FF0000"]
  },
  {
    id: 4,
    name: "Corsair K95 RGB",
    brand: "Corsair",
    description: "Premium gaming keyboard with Cherry MX switches",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400",
    colors: ["#000000", "#FFD700"]
  },
  {
    id: 5,
    name: "HyperX Alloy FPS",
    brand: "HyperX",
    description: "Compact mechanical keyboard for FPS games",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400",
    colors: ["#000000", "#FF4500"]
  },
  {
    id: 6,
    name: "Logitech G915",
    brand: "Logitech",
    description: "Wireless mechanical gaming keyboard",
    price: 249.99,
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
                    <div class="card_action" onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">
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

// Render sản phẩm khi trang load
renderProducts();

document.getElementById("showLogin").addEventListener("click", function() {
    document.getElementById("container").innerHTML = `
    <div class="login" id="loginForm">
        <form action="">
            <h1>Login</h1>
            <div class="input-box">
                <input type="text" required>
                <div class="labelline">Enter your name</div>
            </div>
            <div class="input-box">
                <input type="password" required>
                <div class="labelline">Password</div>
            </div>
            <div class="remember-forgot">
                <label><input type="checkbox">Remember me</label>
                <a href="#">Forgot password?</a>
            </div>
            <button type="submit" class="btn">Login</button>
            <div class="register-link">
                <p>Don't have an account? <a href="#">Register</a></p>
            </div>
        </form>
    </div>`;

    const login = document.querySelector('.login');
    login.classList.add('active');

    login.addEventListener('click', (e) => {
        if (e.target === login) {
            login.classList.add("closing");

            setTimeout(() => {
                login.classList.remove('active', 'closing');
            }, 400);
        }
    });
    document.querySelectorAll(".input-box input").forEach(input => {
        input.addEventListener("blur", () => {
            input.classList.add("touched");
        });
    });
});

document.getElementById("showRegister").addEventListener("click", function() {
    document.getElementById("container").innerHTML = `
    <div class="login">
        <form action = "">
            <h1>Register</h1>
            <div class="input-box">
                <input type = "text" required>
                <div class = "labelline">Enter your name</div>
            </div>
            <div class="input-box">
                <input type = "password" required>
                <div class = "labelline">Password</div>
            </div>
            <div class="input-box">
                <input type = "password" required>
                <div class = "labelline">Password confirm</div>
            </div>
            <div class="input-box">
                <input id = "email" required>
                <div class = "labelline">Email</div>
            </div>
            <div class="input-box">
                <input type = "number" required>
                <div class = "labelline">Phone number</div>
            </div>
            <div class="remember-forgot">
                <label><input type = "checkbox">Remember me
            </div>
            <button type = "submit" class = "btn">Create an account</button>
            <div class="register-link">
                <p>Already have an account?
                <a href = "#">Login</a></p>
            </div>
        </form>
    </div>`;

    const login = document.querySelector('.login');
    login.classList.add('active');

    login.addEventListener('click', (e) => {
        if (e.target === login) {
            login.classList.add("closing");

            setTimeout(() => {
                login.classList.remove('active', 'closing');
            }, 400);
        }
    });
    document.querySelectorAll(".input-box input").forEach(input => {
        input.addEventListener("blur", () => {
            input.classList.add("touched");
        });
    });
});

function toggleDropdown(button) {
        const dropdown = button.nextElementSibling; // Lấy menu tương ứng
        const isVisible = dropdown.style.display === "block";

        // Ẩn tất cả dropdown trước
        document.querySelectorAll(".dropdown-menu").forEach(d => {
            d.style.display = "none";
        });

        // Nếu dropdown này đang ẩn trước đó → bật lên
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