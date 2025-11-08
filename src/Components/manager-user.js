// ===================== MẪU USER =====================
const user = [
  {
    id: 1,
    name: "Lê Đức Thọ",
    call: "0938123456",
    email: "leductho@gmail.com",
    address: "123 Nguyễn Trãi, Quận 5, TP.HCM",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    passworks:"2513648",
    lock: "0"
  },
  {
    id: 2,
    name: "Nguyễn Văn A",
    call: "0987654321",
    email: "nguyenvana@gmail.com",
    address: "45 Lê Lợi, Quận 1, TP.HCM",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    passworks:"26723623527",
    lock: "0"
  },
  {
    id: 3,
    name: "Trần Thị B",
    call: "0905123123",
    email: "tranthib@gmail.com",
    address: "12 Hai Bà Trưng, Quận 3, TP.HCM",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    passworks:"623623547",
    lock: "0"
  },
  {
    id: 4,
    name: "Phạm Minh Cường",
    call: "0912456789",
    email: "cuongpham@gmail.com",
    address: "67 Nguyễn Huệ, Quận 1, TP.HCM",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    passworks:"3523612547",
    lock: "0"
  },
  {
    id: 5,
    name: "Đặng Thị Hồng",
    call: "0978123456",
    email: "hongdang@gmail.com",
    address: "22 Pasteur, Quận 1, TP.HCM",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    passworks:"234262525",
    lock: "0"
  },
  {
    id: 6,
    name: "Vũ Đức Nam",
    call: "0932345678",
    email: "namvu@gmail.com",
    address: "55 Võ Văn Tần, Quận 3, TP.HCM",
    image: "https://randomuser.me/api/portraits/men/21.jpg",
    passworks:"3673462352",
    lock: "0"
  },
  {
    id: 7,
    name: "Bùi Thanh Hà",
    call: "0909456123",
    email: "thanhha@gmail.com",
    address: "101 Nguyễn Đình Chiểu, Quận 3, TP.HCM",
    image: "https://randomuser.me/api/portraits/women/47.jpg",
    passworks:"63583435247",
    lock: "0"
  },
  {
    id: 8,
    name: "Phan Văn Quang",
    call: "0945567890",
    email: "quangphan@gmail.com",
    address: "36 Hoàng Diệu, Quận 4, TP.HCM",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
    passworks:"8978974563",
    lock: "0"
  },
  {
    id: 9,
    name: "Ngô Thị Lan",
    call: "0988123123",
    email: "lanngo@gmail.com",
    address: "9 Nguyễn Văn Cừ, Quận 5, TP.HCM",
    image: "https://randomuser.me/api/portraits/women/38.jpg",
    passworks:"25326236",
    lock: "0"
  },
  {
    id: 10,
    name: "Trịnh Công Sơn",
    call: "0919123456",
    email: "sontrinh@gmail.com",
    address: "88 Lý Thường Kiệt, Quận 10, TP.HCM",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
    passworks:"25324235",
    lock: "0"
  }
];
localStorage.setItem("user", JSON.stringify(user));

// ===================== LẤY THÔNG TIN TỪ LOCAL =====================
function getuser(){
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user : [];
}
// ===================== LƯU DANH SÁCH USER =====================
function savedata(user){
  localStorage.setItem("user", JSON.stringify(user));
  alert("Đã lưu thông tin");
  renderUser();
}
// ===================== XÓA USER =====================
function remove(id){
  let user = getuser().filter(p => p.id !== id);
  savedata(user);
  alert("Đã xóa user");
  renderUser()
}
// ===================== RESET MẬT KHẨU =====================
function resetPassword(id) {
  const users = getuser();
  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    alert("Không tìm thấy người dùng!");
    return;
  }
  users[index].passworks = "1";
  localStorage.setItem("user", JSON.stringify(users));
  renderUser();
   alert(`Đã reset mật khẩu của tài khoản: ${users[index].name}`);
}

// ===================== KHÓA TÀI KHOẢN =====================
function block(id) {
  const users = getuser();
  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    alert("Không tìm thấy người dùng!");
    return;
  }
  users[index].lock = "1";
  localStorage.setItem("user", JSON.stringify(users));
  renderUser();
   alert(`Đã khóa tài khoản của: ${users[index].name}`);
}


// ===================== HIỂN THỊ USER =====================
function renderUser() {             //function dc sửa bởi AI, t ko bt giải thích
  const container = document.getElementById("usersContainer");
  const users = getuser();

  if (users.length === 0) {
    container.innerHTML = "<p>Chưa có người dùng nào.</p>";
    return;
  }

  // hiển thị theo dạng bảng
  container.innerHTML = `
    <div class="table_container show" id="user-info">
      <table>
        <thead id="user-head">
          <tr>
            <th><strong>Tên</strong></th>
            <th><strong>Số Điện Thoại</strong></th>
            <th><strong>Địa Chỉ</strong></th>
            <th><strong>Email</strong></th>
            <th><strong></strong></th>
          </tr>
        </thead>
        <tbody id="userbody">
          ${users.map(u => `
            <tr>
              <td>${u.name}</td>
              <td>${u.call}</td>
              <td>${u.address}</td>
              <td>${u.email}</td>
              <td>
                <button class="lock" onclick="block(${u.id})">Khóa TK</button>
                <button class="reset" onclick="resetPassword(${u.id})">Reset MK</button>
                <button class="delete" onclick="remove(${u.id})">Xóa TK</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}


document.addEventListener("DOMContentLoaded", renderUser);
