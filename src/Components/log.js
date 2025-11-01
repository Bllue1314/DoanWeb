function showForm(type) {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  // ẩn hết form trước
  loginForm.classList.remove("active");
  registerForm.classList.remove("active");

  // mở form được chọn
  const selectedForm = type === "login" ? loginForm : registerForm;
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

function handleLogin(e) {
  e.preventDefault();
  alert("Đăng nhập thành công (demo)");
}

function handleRegister(e) {
  e.preventDefault();
  alert("Tạo tài khoản thành công (demo)");
}
