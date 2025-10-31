document.getElementById("showLogin").addEventListener("click", function() {
    document.getElementById("container").innerHTML = `
    <div class="login" id="loginForm">
        <form action="">
            <h1>Đăng Nhập</h1>
            <div class="input-box">
                <input type="text" required>
                <div class="labelline">Tên đăng nhập</div>
            </div>
            <div class="input-box">
                <input type="password" required>
                <div class="labelline">Mật khẩu</div>
            </div>
            <div class="remember-forgot">
                <label><input type="checkbox">Ghi nhớ tài khoản</label>
                <a href="#">Quên mật khẩu?</a>
            </div>
            <button type="submit" class="btn">Đăng Nhập</button>
            <div class="register-link">
                <p>Không có tài khoản? <a href="#" id ="switchToRegister">Đăng ký</a></p>
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

    document.getElementById("switchToRegister").addEventListener("click", function(e) {
        e.preventDefault(); // chặn reload
        document.getElementById("showRegister").click(); // gọi luôn sự kiện nút Đăng ký
    });

});

document.getElementById("showRegister").addEventListener("click", function() {
    document.getElementById("container").innerHTML = `
    <div class="login">
        <form action = "">
            <h1>Đăng Ký</h1>
            <div class="input-box">
                <input type = "text" required>
                <div class = "labelline">Tên đăng nhập</div>
            </div>
            <div class="input-box">
                <input type = "password" required>
                <div class = "labelline">Mật khẩu</div>
            </div>
            <div class="input-box">
                <input type = "password" required>
                <div class = "labelline">Nhập lại mật khẩu</div>
            </div>
            <div class="input-box">
                <input id = "email" required>
                <div class = "labelline">Email</div>
            </div>
            <div class="input-box">
                <input type = "number" required>
                <div class = "labelline">Số điện thoại</div>
            </div>
            <button type = "submit" class = "btn">Tạo tài khoản</button>
            <div class="register-link">
                <p>Đã có tài khoản?
                <a href = "#" id="switchToLogin">Đăng nhập</a></p>
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

    document.getElementById("switchToLogin").addEventListener("click", function(e) {
        e.preventDefault();
        document.getElementById("showLogin").click();
    });
});