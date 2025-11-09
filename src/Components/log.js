function showForm(type) {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const forgetpwForm = document.getElementById("forgetpwForm");

    // ẩn hết form trước
    loginForm.classList.remove("active");
    registerForm.classList.remove("active");
    forgetpwForm.classList.remove("active");

    // mở form được chọn
    const selectedForm = (type === "login") ? loginForm : ((type === "register") ? registerForm : forgetpwForm);
    selectedForm.classList.add("active");

    // click ra ngoài để tắt form
    selectedForm.onclick = e => {
        if (e.target === selectedForm) {
            selectedForm.classList.add("closing");
            setTimeout(() => {
                selectedForm.classList.remove("active", "closing");
            }, 400);
        }
    };

    // Khi input mất focus thì thêm class "touched"
    selectedForm.querySelectorAll(".input-box input").forEach(input => {
        input.addEventListener("blur", () => input.classList.add("touched"));
    });
    document.getElementById("phone").addEventListener("input", function() {
        const phone = this.value.trim();

        // Regex: bắt đầu bằng 0 + 9 số phía sau = tổng 10 số
        const isValid = /^0\d{9}$/.test(phone);

        // Nếu hợp lệ → xóa invalid, nếu sai → set invalid
        this.setCustomValidity(isValid ? "" : "Số điện thoại phải có 10 số và bắt đầu bằng 0");
    });

}

function switchForm(e, type) {
    e.preventDefault();
    showForm(type);
}

// Lưu tài khoản vào localStorage
function handleRegister(e) {
    e.preventDefault();

    // Lấy dữ liệu từ form
    const form = e.target;
    const username = form.querySelector("input[type='text']").value.trim();
    const password = form.querySelector("input[type='password']").value.trim();
    const confirmPassword = form.querySelectorAll("input[type='password']")[1].value.trim();
    const email = form.querySelector("input[type='email']").value.trim();
    const phone = form.querySelector("input[type='number']").value.trim();

    // Kiểm tra hợp lệ
    if (password !== confirmPassword) {
        alert("Mật khẩu nhập lại không khớp!");
        return;
    }

    if (!username || !password || !email || !phone) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    // Lấy danh sách user đã lưu
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Kiểm tra trùng tên
    if (users.some(user => user.username === username)) {
        alert("Tên đăng nhập đã tồn tại!");
        return;
    }
    if (users.some(user => user.email === email)) {
        alert("Email đã tồn tại!");
        return;
    }
    if (users.some(user => user.phone === phone)) {
        alert("Số điện thoại đã tồn tại!");
        return;
    }

    // Thêm user mới
    users.push({ username, password, email, address: null, phone });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công!");
    showForm("login");
}

// Đăng nhập bằng tài khoản đã lưu
function handleLogin(e) {
    e.preventDefault();

    const form = e.target;
    const username = form.querySelector("input[type='text']").value.trim();
    const password = form.querySelector("input[type='password']").value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        alert(`Xin chào, ${user.username}! Bạn đã đăng nhập thành công.`);
        closeAllForms();
        showLogoutButton(user.username);
    }
    else {
        alert("Sai tên đăng nhập hoặc mật khẩu!");
    }
}

function handleForgetpw(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector("input[type='email']").value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.email === email);

    if (user) {
        alert("Your password is: " + user.password);
        closeAllForms();
    }
    else {
        alert("Tài khoản không tồn tại!");
    }
}

// Ẩn form sau khi đăng nhập
function closeAllForms() {
    document.getElementById("loginForm").classList.remove("active");
    document.getElementById("registerForm").classList.remove("active");
    document.getElementById("forgetpwForm").classList.remove("active");
}

// Hiện user + menu
// Thay thế hàm này trong log.js
function showLogoutButton(username) {
    document.getElementById("logBtn").style.display = "none";

    const userSection = document.getElementById("userSection");
    userSection.style.display = "flex";

    const userBtn = document.getElementById("userName");
    userBtn.textContent = username;

    localStorage.setItem("loggedInUser", username);

    // THÊM MỚI: Hiển thị icon giỏ hàng
    document.getElementById('cartIcon').style.display = 'flex';
    document.getElementById('btnHistoryOrder').style.display = 'flex';
}
// Xử lý đăng xuất
function logout() {
    localStorage.removeItem("loggedInUser");
    document.getElementById("userSection").style.display = "none";
    document.getElementById("logBtn").style.display = "flex";
    document.getElementById('cartIcon').style.display = 'none';
    document.getElementById('btnHistoryOrder').style.display = 'none';
}

// Xử lý xem thông tin
function viewProfile() {
    const menu = document.getElementById("userMenu");
    menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
    const username = localStorage.getItem("loggedInUser"); // username đang đăng nhập
    let email = "";
    
    //lấy địa chỉ khách hàng từ localstorage
    let address = "";
    if (username) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const currentUser = users.find(user => user.username === username);
        if (currentUser) {
            email = currentUser.email; // lấy email từ user
            address = currentUser.address;
        }
    }
    document.getElementById("address").value=address||"";
    document.getElementById("profileUsername").value = username || "";
    document.getElementById("profileEmail").value = email || "";

    // Reset mật khẩu
    document.getElementById("profileCurrentPassword").value = "";
    document.getElementById("profileNewPassword").value = "";

    document.getElementById("profilePopup").style.display = "flex";
}


// Lưu thay đổi
function saveProfile(e) {
    e.preventDefault();

    const username = document.getElementById("profileUsername").value.trim();
    const email = document.getElementById("profileEmail").value.trim();
    const currentPassword = document.getElementById("profileCurrentPassword").value.trim();
    const newPassword = document.getElementById("profileNewPassword").value.trim();
    const newaddress = document.getElementById("address").value.trim();

    const loggedInUser = localStorage.getItem("loggedInUser");
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Tìm user hiện tại
    const index = users.findIndex(u => u.username === loggedInUser);

    if (index === -1) {
        alert("Không tìm thấy tài khoản!");
        return;
    }

    const storedPassword = users[index].password;

    // Xác thực mật khẩu hiện tại
    if (currentPassword !== storedPassword) {
        alert("Mật khẩu hiện tại không chính xác!");
        return;
    }

    // Nếu không nhập mật khẩu mới thì giữ mật khẩu cũ
    const finalPassword = newPassword || storedPassword;
    const phoneNumber = users[index].phone;

    // Cập nhật user
    users[index] = { 
        username: username, 
        password: finalPassword, 
        email: email,
        address: newaddress,
        phone: phoneNumber
    };

    // Lưu lại vào localStorage
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedInUser", username);

    // Cập nhật giao diện
    document.getElementById("userName").textContent = username;

    alert("Cập nhật thông tin thành công!");
    closeProfile();
}

function closeProfile() {
    document.getElementById("profilePopup").style.display = "none";
}


// Hiển thị menu khi bấm vào tên user
document.addEventListener("click", (event) => {
    const menu = document.getElementById("userMenu");
    const userBtn = document.getElementById("userName");

    if (userBtn.contains(event.target)) {
        // Bấm vào nút user thì toggle menu
        menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
    } else if (!menu.contains(event.target)) {
        // Bấm ra ngoài thì ẩn menu
        menu.style.display = "none";
    }
});



window.addEventListener("DOMContentLoaded", () => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
        showLogoutButton(user);
    } else {
        document.getElementById("userSection").style.display = "none";
        document.getElementById("logBtn").style.display = "flex";
        document.getElementById('cartIcon').style.display = 'none';
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
