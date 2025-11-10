// Dữ liệu mẫu sản phẩm gaming và phụ kiện

// Danh sách sản phẩm mẫu (khai báo trước khi ghi vào localStorage)
const sampleProducts = [
  // Laptops - 5 sản phẩm
  {
    id: 1,
    name: "Asus ROG Zephyrus G14 (2024)",
    brand: "Asus",
    type: "laptop",
    price: 1899.99,
    colors: ["#FFFFFF", "#000000"],
    image: "../Assets/img/Asus-rog-zephyrus-g14.png",
    description: "Laptop gaming 14 inch mỏng nhẹ, màn hình OLED 3K 120Hz.",
    stock: 10,
    quantity: 10,
    isHidden: false
  },
  {
    id: 2,
    name: "Lenovo Legion Pro 5i (Gen 9)",
    brand: "Lenovo",
    type: "laptop",
    price: 2099.99,
    colors: ["#C0C0C0", "#000000"],
    image: "../Assets/img/lenovo-legion-pro-5.png",
    description: "Laptop gaming hiệu năng cao, chip AI, tản nhiệt ColdFront.",
    stock: 8,
    quantity: 8,
    isHidden: false
  },
  {
    id: 3,
    name: "MSI Katana 15 B13VFK",
    brand: "MSI",
    type: "laptop",
    price: 1399.99,
    colors: ["#000000"],
    image: "../Assets/img/MSI-Katana-15.png",
    description: "Laptop gaming tầm trung, tản nhiệt Cooler Boost 5.",
    stock: 15,
    quantity: 15,
    isHidden: false
  },
  {
    id: 4,
    name: "Acer Predator Helios 16",
    brand: "Acer",
    type: "laptop",
    price: 2399.99,
    colors: ["#000000"],
    image: "../Assets/img/Acer-Predator-Helios.png",
    description: "Laptop gaming cao cấp, màn hình Mini LED 250Hz, tản nhiệt 3D AeroBlade.",
    stock: 7,
    quantity: 7,
    isHidden: false
  },
  {
    id: 5,
    name: "Dell G16 7630",
    brand: "Dell",
    type: "laptop",
    price: 1599.99,
    colors: ["#000000", "#C0C0C0"],
    image: "../Assets/img/Dell-gaming-16.png",
    description: "Laptop gaming bền bỉ, màn hình 16:10, hiệu năng ổn định.",
    stock: 12,
    quantity: 12,
    isHidden: false
  },
  // Gear - Mouse (5 sản phẩm)
  {
    id: 6,
    name: "Logitech G Pro X Superlight 2",
    brand: "Logitech",
    type: "chuot",
    price: 159.99,
    colors: ["#000000", "#FFFFFF", "#FFC0CB"],
    image: "../Assets/img/logitech-g-pro-x-superlight-2.png",
    description: "Chuột gaming không dây siêu nhẹ, mắt đọc Hero 2, switch Lightforce.",
    stock: 50,
    quantity: 50,
    isHidden: false
  },
  {
    id: 7,
    name: "Razer DeathAdder V3 Pro",
    brand: "Razer",
    type: "chuot",
    price: 149.99,
    colors: ["#000000", "#FFFFFF"],
    image: "../Assets/img/Razer-deathadder-v3-pro.png",
    description: "Chuột gaming công thái học không dây, siêu nhẹ 63g.",
    stock: 45,
    quantity: 45,
    isHidden: false
  },
  {
    id: 8,
    name: "SteelSeries Aerox 5 Wireless",
    brand: "SteelSeries",
    type: "chuot",
    price: 139.99,
    colors: ["#000000"],
    image: "../Assets/img/Steelseries-aerox-5.png",
    description: "Chuột gaming không dây thiết kế lỗ, 9 nút, siêu nhẹ 74g.",
    stock: 30,
    quantity: 30,
    isHidden: false
  },
  {
    id: 9,name: "Pulsar X2V2 Wireless",
    brand: "Pulsar",
    type: "chuot",
    price: 99.99,
    colors: ["#000000", "#FFFFFF", "#FF0000"],
    image: "../Assets/img/Pulsal-x2.png",
    description: "Chuột gaming đối xứng siêu nhẹ, mắt đọc 3395, click quang học.",
    stock: 25,
    quantity: 25,
    isHidden: false
  },
  {
    id: 10,
    name: "Glorious Model O 2 Wireless",
    brand: "Glorious",
    type: "chuot",
    price: 99.99,
    colors: ["#000000", "#00FF00"],
    image: "../Assets/img/Glorious-model-O-wireless-2.png",
    description: "Chuột gaming không dây đối xứng, thiết kế lỗ, nhẹ 68g.",
    stock: 20,
    quantity: 20,
    isHidden: false
  },
  // Gear - Keyboard (5 sản phẩm)
  {
    id: 11,
    name: "Razer BlackWidow V4 Pro",
    brand: "Razer",
    type: "ban-phim",
    price: 229.99,
    colors: ["#000000"],
    image: "../Assets/img/Razer-blackwidow-v4-pro.png", // <-- CHƯA CÓ ẢNH
    description: "Bàn phím cơ gaming fullsize, Razer Green switch, LED RGB, Command Dial.",
    stock: 15,
    quantity: 15,
    isHidden: false
  },
  {
    id: 12,
    name: "Corsair K70 MAX RGB",
    brand: "Corsair",
    type: "ban-phim",
    price: 229.99,
    colors: ["#000000"],
    image: "../Assets/img/Cosair-k70-pro.png",
    description: "Bàn phím cơ gaming, switch từ tính MGX, Rapid Trigger.",
    stock: 10,
    quantity: 10,
    isHidden: false
  },
  {
    id: 13,
    name: "Logitech G913 TKL Lightspeed",
    brand: "Logitech",
    type: "ban-phim",
    price: 199.99,
    colors: ["#000000", "#FFFFFF"],
    image: "../Assets/img/Logitech-g913-tkl-lightspeed.png",
    description: "Bàn phím cơ không dây TKL low-profile, siêu mỏng.",
    stock: 18,
    quantity: 18,
    isHidden: false
  },
  {
    id: 14,
    name: "Akko 5075S (Cream Yellow)",
    brand: "Akko",
    type: "ban-phim",
    price: 99.99,
    colors: ["#C0C0C0", "#000000"],
    image: "../Assets/img/Akko-5075B-plus.png",
    description: "Bàn phím cơ 75% Hotswap, Gasket Mount, switch Akko CS.",
    stock: 30,
    quantity: 30,
    isHidden: false
  },
  {
    id: 15,
    name: "Keychron Q1 Pro",
    brand: "Keychron",
    type: "ban-phim",
    price: 199.99,
    colors: ["#000000", "#C0C0C0"],
    image: "../Assets/img/Keychron-Q1-pro.png",
    description: "Bàn phím cơ custom không dây 75%, vỏ nhôm CNC, Gasket Mount.",
    stock: 22,
    quantity: 22,
    isHidden: false
  },
  // Gear - tai-nghe (4 sản phẩm)
  {
    id: 16,
    name: "HyperX Cloud III Wireless",
    brand: "HyperX",
    type: "tai-nghe",
    price: 169.99,
    colors: ["#000000", "#FF0000"],
    image: "../Assets/img/HP-hyperX-cloud-III.png",
    description: "Tai nghe gaming không dây, pin 120 giờ, DTS Headphone:X.",
    stock: 25,
    quantity: 25,
    isHidden: false
  },
  {
    id: 17,
    name: "Razer BlackShark V2 Pro (2023)",
    brand: "Razer",
    type: "tai-nghe",
    price: 199.99,colors: ["#FFFFFF", "#000000"],
    image: "../Assets/img/Razer-black-shark-v2-pro.png", // <-- CHƯA CÓ ẢNH
    description: "Tai nghe E-sports không dây, mic HyperClear Super Wideband.",
    stock: 20,
    quantity: 20,
    isHidden: false
  },
  {
    id: 18,
    name: "Logitech G Pro X 2 Lightspeed",
    brand: "Logitech",
    type: "tai-nghe",
    price: 249.99,
    colors: ["#000000", "#FFFFFF"],
    image: "../Assets/img/Logitech-g-pro-x-2-lightspeed.png",
    description: "Tai nghe gaming không dây, màng loa Graphene 50mm, Blue VO!CE.",
    stock: 15,
    quantity: 15,
    isHidden: false
  },
  {
    id: 19,
    name: "SteelSeries Arctis Nova 7",
    brand: "SteelSeries",
    type: "tai-nghe",
    price: 179.99,
    colors: ["#000000"],
    image: "../Assets/img/Steelseries-arctis-nova-7.png", // <-- CHƯA CÓ ẢNH
    description: "Tai nghe gaming không dây, kết nối đa nền tảng, mic AI clear.",
    stock: 18,
    quantity: 18,
    isHidden: false
  },
  // Gear - Monitor (3 sản phẩm)
  {
    id: 20,
    name: "LG 27GR95QE-B UltraGear OLED",
    brand: "LG",
    type: "man-hinh",
    price: 899.99,
    colors: ["#000000"],
    image: "../Assets/img/LG 27GR95QE-B UltraGear 27 OLED 2K 240Hz.png",
    description: "Màn hình gaming 27 inch QHD, 240Hz, tấm nền OLED, 0.03ms.",
    stock: 10,
    quantity: 10,
    isHidden: false
  },
  {
    id: 21,
    name: "Asus ROG Swift PG32UCDM",
    brand: "Asus",
    type: "man-hinh",
    price: 1299.99,
    colors: ["#000000"],
    image: "../Assets/img/Asus-rog-swift-pg32ucdm-32-oled-4k.png",
    description: "Màn hình 32 inch 4K, 240Hz, tấm nền QD-OLED, HDR10.",
    stock: 5,
    quantity: 5,
    isHidden: false
  },
  {
    id: 22,
    name: "Gigabyte M27Q",
    brand: "Gigabyte",
    type: "man-hinh",
    price: 329.99,
    colors: ["#000000"],
    image: "../Assets/img/Gigabyte-m27q-27.png",
    description: "Màn hình gaming 27 inch QHD, 170Hz, IPS, KVM Switch.",
    stock: 20,
    quantity: 20,
    isHidden: false
  },
  // Gear - Components (CPU, VGA, RAM, SSD) (10 sản phẩm)
  {
    id: 23,
    name: "Intel Core i9-14900K",
    brand: "Intel",
    type: "cpu",
    price: 549.99,
    colors: ["#C0C0C0"],
    image: "../Assets/img/Intel-Core-i9-14900K.png",
    description: "CPU đầu bảng, 24 nhân 32 luồng, xung nhịp 6.0GHz, cho gaming/làm việc nặng.",
    stock: 15,
    quantity: 15,
    isHidden: false
  },
  {
    id: 24,
    name: "AMD Ryzen 7 7800X3D",
    brand: "AMD",
    type: "cpu",
    price: 399.99,
    colors: ["#C0C0C0"],
    image: "../Assets/img/AMD-Ryzen-7-7800X3D.png",
    description: "CPU gaming tốt nhất với 3D V-Cache, 8 nhân 16 luồng, socket AM5.",
    stock: 25,
    quantity: 25,
    isHidden: false
  },
  {
    id: 25,
    name: "Intel Core i5-14600K",
    brand: "Intel",
    type: "cpu",
    price: 319.99,
    colors: ["#808080"],
    image: "../Assets/img/Intel-Core-i5-14600K.png",description: "CPU tầm trung hiệu năng cao, 14 nhân 20 luồng, xung nhịp 5.3GHz.",
    stock: 30,
    quantity: 30,
    isHidden: false
  },
  {
    id: 26,
    name: "Gigabyte GeForce RTX 4090 GAMING OC 24G",
    brand: "Gigabyte",
    type: "vga",
    price: 1799.99,
    colors: ["#000000", "#808080"],
    image: "../Assets/img/GIGABYTE-GeForce-RTX-4090-GAMING-OC-24G .png",
    description: "Card đồ họa mạnh nhất, 24GB VRAM, tản nhiệt 3 quạt Windforce.",
    stock: 5,
    quantity: 5,
    isHidden: false
  },
  {
    id: 27,
    name: "Asus TUF Gaming RTX 4070 Ti SUPER OC 16G",
    brand: "Asus",
    type: "vga",
    price: 899.99,
    colors: ["#000000"],
    image: "../Assets/img/ASUS-TUF-Gaming-GeForce-RTX-4070-Ti-12GB.png",
    description: "Card đồ họa cao cấp 16GB VRAM, bền bỉ chuẩn quân đội.",
    stock: 12,
    quantity: 12,
    isHidden: false
  },
  {
    id: 28,
    name: "MSI RX 7900 XTX GAMING TRIO CLASSIC 24G",
    brand: "MSI",
    type: "vga",
    price: 999.99,
    colors: ["#000000", "#FF0000"],
    image: "../Assets/img/MSI-RX-7900-XTX-GAMING-TRIO-CLASSIC-24G.png",
    description: "Card đồ họa cao cấp AMD, 24GB VRAM, tản nhiệt Tri Frozr 2.",
    stock: 8,
    quantity: 8,
    isHidden: false
  },
  {
    id: 29,
    name: "Corsair Vengeance RGB 32GB DDR5 6000MHz",
    brand: "Corsair",
    type: "ram",
    price: 129.99,
    colors: ["#000000", "#FFFFFF"],
    image: "../Assets/img/Corsair-Vengeance-RGB-64GB-(2x32GB)-6000-DDR5.png",
    description: "Kit RAM DDR5 (2x16GB) bus 6000MHz, LED RGB, hỗ trợ iCUE.",
    stock: 40,
    quantity: 40,
    isHidden: false
  },
  {
    id: 30,
    name: "G.Skill Trident Z5 RGB 32GB DDR5 6400MHz",
    brand: "G.Skill",
    type: "ram",
    price: 139.99,
    colors: ["#000000", "#808080"],
    image: "../Assets/img/DDR5-G.Skill-Trident-Z5-RGB-2x16GB-6000mhz.png",
    description: "Kit RAM DDR5 (2x16GB) bus 6400MHz, thiết kế đẹp, hiệu năng cao.",
    stock: 35,
    quantity: 35,
    isHidden: false
  },
  {
    id: 31,
    name: "Samsung 990 Pro 2TB NVMe",
    brand: "Samsung",
    type: "ssd",
    price: 169.99,
    colors: ["#000000"],
    image: "../Assets/img/SSD Samsung 990 PRO 2TB M.2 PCIe Gen4 NVMe.png", // <-- CHƯA CÓ ẢNH
    description: "SSD NVMe Gen4 tốc độ cao nhất, 2TB, có tản nhiệt (tùy chọn).",
    stock: 50,
    quantity: 50,
    isHidden: false
  },
  {
    id: 32,
    name: "Kingston KC3000 1TB NVMe",
    brand: "Kingston",
    type: "ssd",
    price: 99.99,
    colors: ["#000000"],
    image: "../Assets/img/SSD Kingston KC3000 2TB M.2 PCIe gen 4 NVMe.png", // <-- CHƯA CÓ ẢNH
    description: "SSD NVMe Gen4 1TB, tốc độ đọc/ghi cao 7000/6000 MB/s.",
    stock: 40,
    quantity: 40,
    isHidden: false
  },
  // Gear - Phụ kiện khác (Ghế, Mousepad, Tản nhiệt) (4 sản phẩm)
  {
    id: 33,
    name: "Anda Seat Kaiser 3 (Large)",
    brand: "Anda",
    type: "ghe",price: 499.99,
    colors: ["#000000", "#800080"],
    image: "../Assets/img/kaiser-3.png",
    description: "Ghế gaming cao cấp, đệm 4D, gối đầu từ tính, da PVC.",
    stock: 15,
    quantity: 15,
    isHidden: false
  },
  {
    id: 34,
    name: "Corsair TC100 Relaxed (Fabric)",
    brand: "Corsair",
    type: "ghe",
    price: 249.99,
    colors: ["#000000", "#808080"],
    image: "../Assets/img/Corsair-TC100-Fabric-CF-9010052-WW.png",
    description: "Ghế gaming bọc vải, thiết kế thư giãn, form rộng.",
    stock: 20,
    quantity: 20,
    isHidden: false
  },
  {
    id: 35,
    name: "Razer Atlas (Tempered Glass)",
    brand: "Razer",
    type: "lot-chuot",
    price: 99.99,
    colors: ["#000000", "#FFFFFF"],
    image: "../Assets/img/razer-atlas.png",
    description: "Lót chuột gaming bằng kính cường lực, siêu mượt, chống trầy.",
    stock: 30,
    quantity: 30,
    isHidden: false
  },
  {
    id: 36,
    name: "NZXT Kraken 360 RGB",
    brand: "NZXT",
    type: "tan-nhiet",
    price: 179.99,
    colors: ["#FFFFFF", "#000000"],
    image: "../Assets/img/AIO NZXT Kraken 360 RGB.png",
    description: "Tản nhiệt nước AIO 360mm, màn hình LCD trên pump, quạt RGB.",
    stock: 18,
    quantity: 18,
    isHidden: false
  }
];

if (localStorage.getItem('products')) {
  localStorage.setItem('products', JSON.stringify(sampleProducts));
}

if (!localStorage.getItem('imports')) {
  localStorage.setItem('imports', JSON.stringify(sampleImports));
}

if (!localStorage.getItem('orders')) {
  localStorage.setItem('orders', JSON.stringify(sampleOrders));
}

if (!localStorage.getItem('prices')) {
  localStorage.setItem('prices', JSON.stringify(samplePrices));
}