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

    if (!username || !password || !email) {
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
        alert("Tên đăng nhập đã tồn tại!");
        return;
    }

// Thêm user mới
    users.push({ username, password, email, phone });
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

function handleForgetpw(e){
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector("input[type='email']").value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.email === email);

    if(user){
        alert("Your password is: " + user.password);
        closeAllForms();
    }
    else{
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
function showLogoutButton(username) {
    document.getElementById("logBtn").style.display = "none";

    const userSection = document.getElementById("userSection");
    userSection.style.display = "flex";

    const userBtn = document.getElementById("userName");
    userBtn.textContent = username;

    localStorage.setItem("loggedInUser", username);
}

// Xử lý đăng xuất
function logout() {
    localStorage.removeItem("loggedInUser");
    document.getElementById("userSection").style.display = "none";
    document.getElementById("logBtn").style.display = "flex";
}

// Xử lý xem thông tin
function viewProfile() {
    const menu = document.getElementById("userMenu");
    menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
    const username = localStorage.getItem("loggedInUser"); // username đang đăng nhập
    let email = "";

    if (username) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const currentUser = users.find(user => user.username === username);
        if (currentUser) {
            email = currentUser.email; // lấy email từ user
        }
    }

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

    const storedPassword = localStorage.getItem("password");
    const loggedInUser = localStorage.getItem("loggedInUser");

    //Xác thực mật khẩu hiện tại
    if (currentPassword !== storedPassword) {
        alert("Mật khẩu hiện tại không chính xác!");
        return;
    }

    //nếu không nhập mật khẩu mới thì giữ mật khẩu cũ
    const finalPassword = newPassword || storedPassword;

    // Cập nhật thông tin vào localStorage
    localStorage.setItem("loggedInUser", username);
    localStorage.setItem("password", finalPassword);

    // nếu bạn đang lưu danh sách users
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const index = users.findIndex(u => u.username === loggedInUser);
    if (index !== -1) {
        users[index] = { username, password: finalPassword, email };
        localStorage.setItem("users", JSON.stringify(users));
    }

    // Cập nhật giao diện
    document.getElementById("userName").textContent = username;
    alert("Cập nhật thông tin thành công!");
    closeProfile();
}

// Đóng popup
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
    }
});


