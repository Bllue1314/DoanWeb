// Dữ liệu mẫu sản phẩm gaming và phụ kiện

// Danh sách sản phẩm mẫu (khai báo trước khi ghi vào localStorage)
const sampleProducts = [
  // Laptops - Dell
  {
    id: 1,
    name: "Dell XPS 13",
    brand: "Dell",
    category: "laptop",
    price: 1299.99,
    colors: ["#000000", "#FFFFFF", "#C0C0C0"],
    image: "https://via.placeholder.com/300x200?text=Dell+XPS+13",
    description: "Laptop cao cấp màn hình 13 inch, mỏng nhẹ.",
      stock: 15,
      quantity: 15,
    specifications: { cpu: "Intel Core i7", ram: "16GB", storage: "512GB SSD", display: "13.4 inch FHD" }
  },
  {
    id: 2,
    name: "Dell Inspiron 15",
    brand: "Dell",
    category: "laptop",
    price: 799.99,
    colors: ["#000000", "#2F4F4F"],
    image: "https://via.placeholder.com/300x200?text=Dell+Inspiron+15",
    description: "Laptop phổ thông cho công việc văn phòng.",
      stock: 22,
      quantity: 22,
    specifications: { cpu: "Intel Core i5", ram: "8GB", storage: "256GB SSD", display: "15.6 inch FHD" }
  },
  // HP
  {
    id: 3,
    name: "HP Spectre x360",
    brand: "HP",
    category: "laptop",
    price: 1399.99,
    colors: ["#000000", "#B22222"],
    image: "https://via.placeholder.com/300x200?text=HP+Spectre+x360",
    description: "Laptop 2-in-1 màn hình cảm ứng, thiết kế sang trọng.",
      stock: 10,
      quantity: 10,
    specifications: { cpu: "Intel Core i7", ram: "16GB", storage: "1TB SSD", display: "13.3 inch 4K" }
  },
  {
    id: 4,
    name: "HP Pavilion 14",
    brand: "HP",
    category: "laptop",
    price: 649.99,
    colors: ["#FFFFFF", "#000080"],
    image: "https://via.placeholder.com/300x200?text=HP+Pavilion+14",
    description: "Laptop tầm trung, hiệu năng tốt cho học tập.",
      stock: 18,
      quantity: 18,
    specifications: { cpu: "Intel Core i5", ram: "8GB", storage: "512GB SSD", display: "14 inch FHD" }
  },
  // Asus
  {
    id: 5,
    name: "Asus ZenBook 14",
    brand: "Asus",
    category: "laptop",
    price: 1099.99,
    colors: ["#000000", "#D3D3D3"],
    image: "https://via.placeholder.com/300x200?text=Asus+ZenBook+14",
    description: "Laptop mỏng nhẹ, pin lâu.",
      stock: 12,
      quantity: 12,
    specifications: { cpu: "Intel Core i7", ram: "16GB", storage: "512GB SSD", display: "14 inch FHD" }
  },
  {
    id: 6,
    name: "Asus ROG Strix",
    brand: "Asus",
    category: "laptop",
    price: 1799.99,
    colors: ["#000000", "#FF0000"],
    image: "https://via.placeholder.com/300x200?text=Asus+ROG+Strix",
    description: "Laptop gaming hiệu năng cao.",
      stock: 7,
      quantity: 7,
    specifications: { cpu: "Intel Core i9", ram: "32GB", storage: "1TB SSD", display: "15.6 inch 240Hz" }
  },
  // Acer
  {
    id: 7,
    name: "Acer Swift 3",
    brand: "Acer",
    category: "laptop",
    price: 699.99,
    colors: ["#000000", "#A9A9A9"],
    image: "https://via.placeholder.com/300x200?text=Acer+Swift+3",
    description: "Laptop mỏng, phù hợp di chuyển.",
      stock: 20,
      quantity: 20,
    specifications: { cpu: "AMD Ryzen 5", ram: "8GB", storage: "512GB SSD", display: "14 inch FHD" }
  },
  {
    id: 8,
    name: "Acer Predator Helios",
    brand: "Acer",
    category: "laptop",
    price: 1499.99,
    colors: ["#000000"],
    image: "https://via.placeholder.com/300x200?text=Acer+Predator+Helios",
    description: "Laptop gaming chuyên nghiệp.",
      stock: 5,
      quantity: 5,
    specifications: { cpu: "Intel Core i7", ram: "16GB", storage: "1TB SSD", display: "15.6 inch 144Hz" }
  },
  // Lenovo
  {
    id: 9,
    name: "Lenovo ThinkPad X1",
    brand: "Lenovo",
    category: "laptop",
    price: 1599.99,
    colors: ["#000000"],
    image: "https://via.placeholder.com/300x200?text=Lenovo+ThinkPad+X1",
    description: "Laptop doanh nhân bền bỉ.",
      stock: 9,
      quantity: 9,
    specifications: { cpu: "Intel Core i7", ram: "16GB", storage: "512GB SSD", display: "14 inch FHD" }
  },
  {
    id: 10,
    name: "Lenovo IdeaPad 3",
    brand: "Lenovo",
    category: "laptop",
    price: 499.99,
    colors: ["#FFFFFF", "#000000"],
    image: "https://via.placeholder.com/300x200?text=Lenovo+IdeaPad+3",
    description: "Laptop giá rẻ cho học sinh sinh viên.",
      stock: 30,
      quantity: 30,
    specifications: { cpu: "Intel Core i3", ram: "8GB", storage: "256GB SSD", display: "15.6 inch FHD" }
  },
  // MSI
  {
    id: 11,
    name: "MSI GP66",
    brand: "MSI",
    category: "laptop",
    price: 1899.99,
    colors: ["#000000"],
    image: "https://via.placeholder.com/300x200?text=MSI+GP66",
    description: "Laptop gaming mạnh mẽ, tản nhiệt tốt.",
      stock: 6,
      quantity: 6,
    specifications: { cpu: "Intel Core i9", ram: "32GB", storage: "1TB SSD", display: "15.6 inch 240Hz" }
  },
  // Accessories - Mouse
  {
    id: 12,
    name: "Logitech MX Master 3",
    brand: "Logitech",
    category: "mouse",
    price: 99.99,
    colors: ["#000000", "#B0C4DE"],
    image: "https://via.placeholder.com/300x200?text=Logitech+MX+Master+3",
    description: "Chuột cao cấp cho công việc văn phòng.",
      stock: 45,
      quantity: 45,
    specifications: { connectivity: "Wireless", dpi: "4000" }
  },
  {
    id: 13,
    name: "Razer DeathAdder V2",
    brand: "Razer",
    category: "mouse",
    price: 69.99,
    colors: ["#000000", "#00FF00"],
    image: "https://via.placeholder.com/300x200?text=Razer+DeathAdder+V2",
    description: "Chuột gaming chính xác cao.",
      stock: 40,
      quantity: 40,
    specifications: { dpi: "20000", switches: "Optical" }
  },
  // Keyboard
  {
    id: 14,
    name: "Keychron K2",
    brand: "Keychron",
    category: "keyboard",
    price: 79.99,
    colors: ["#FFFFFF", "#000000"],
    image: "https://via.placeholder.com/300x200?text=Keychron+K2",
    description: "Bàn phím cơ không dây compact.",
      stock: 25,
      quantity: 25,
    specifications: { switches: "Gateron Red", layout: "75%" }
  },
  // Headset
  {
    id: 15,
    name: "HyperX Cloud II",
    brand: "HyperX",
    category: "headset",
    price: 99.99,
    // corrected color value: '#RED' is not a valid hex; use '#FF0000'
    colors: ["#000000", "#FF0000"],
    image: "https://via.placeholder.com/300x200?text=HyperX+Cloud+II",
    description: "Tai nghe gaming thoải mái, mic tốt.",
      stock: 35,
      quantity: 35,
    specifications: { connectivity: "Wired", mic: "Detachable" }
  },
  // Monitor
  {
    id: 16,
    name: "Dell UltraSharp 27",
    brand: "Dell",
    category: "monitor",
    price: 329.99,
    colors: ["#000000"],
    image: "https://via.placeholder.com/300x200?text=Dell+UltraSharp+27",
    description: "Màn hình 27 inch cho đồ họa và văn phòng.",
      stock: 12,
      quantity: 12,
    specifications: { size: "27 inch", resolution: "2560x1440" }
  },
  // RAM
  {
    id: 17,
    name: "Corsair Vengeance 16GB",
    brand: "Corsair",
    category: "ram",
    price: 89.99,
    colors: ["#000000", "#FF0000"],
    image: "https://via.placeholder.com/300x200?text=Corsair+Vengeance+16GB",
    description: "RAM hiệu năng cao cho chơi game và render.",
      stock: 60,
      quantity: 60,
    specifications: { speed: "3200MHz", type: "DDR4" }
  },
  // Storage
  {
    id: 18,
    name: "Samsung 970 EVO Plus 1TB",
    brand: "Samsung",
    category: "ssd",
    price: 149.99,
    colors: ["#000000"],
    image: "https://via.placeholder.com/300x200?text=Samsung+970+EVO+Plus+1TB",
    description: "SSD NVMe hiệu năng cao.",
      stock: 50,
      quantity: 50,
    specifications: { type: "NVMe", capacity: "1TB" }
  },
  // CPU
  {
    id: 19,
    name: "Intel Core i7-12700K",
    brand: "Intel",
    category: "cpu",
    price: 349.99,
    colors: ["#C0C0C0"],
    image: "https://via.placeholder.com/300x200?text=Intel+i7-12700K",
    description: "CPU mạnh mẽ cho gaming và dựng phim.",
      stock: 14,
      quantity: 14,
    specifications: { cores: "12", threads: "20" }
  },
  // HDD
  {
    id: 20,
    name: "Seagate Barracuda 2TB",
    brand: "Seagate",
    category: "hdd",
    price: 59.99,
    colors: ["#000000"],
    image: "https://via.placeholder.com/300x200?text=Seagate+2TB",
    description: "Ổ cứng lưu trữ dung lượng lớn.",
      stock: 40,
      quantity: 40,
    specifications: { capacity: "2TB", rpm: "7200" }
  }
];

// Chuẩn hóa từng sản phẩm: đảm bảo có các thuộc tính isHidden, stock và quantity
sampleProducts.forEach(p => {
  if (typeof p.isHidden === 'undefined') p.isHidden = false;
  if (typeof p.stock === 'undefined' && typeof p.quantity !== 'undefined') p.stock = p.quantity;
  if (typeof p.quantity === 'undefined' && typeof p.stock !== 'undefined') p.quantity = p.stock;
  // ensure numeric fields
  p.stock = Number(p.stock || 0);
  p.quantity = Number(p.quantity || p.stock || 0);
});

// Dữ liệu mẫu phiếu nhập
const sampleImports = [
  {
    id: 1,
    date: '2025-11-01',
    productId: 1,
    quantity: 10,
    price: 25000000,
    status: 'completed',
    total: 250000000
  },
  {
    id: 2,
    date: '2025-11-05',
    productId: 2,
    quantity: 5,
    price: 18000000,
    status: 'pending',
    total: 90000000
  },
  {
    id: 3,
    date: '2025-11-07',
    productId: 3,
    quantity: 3,
    price: 30000000,
    status: 'completed',
    total: 90000000
  }
];

// Dữ liệu mẫu đơn hàng
const sampleOrders = [
  {
    id: 1,
    date: '2025-11-02',
    userId: 1,
    status: 'delivered',
    items: [
      {
        productId: 1,
        quantity: 1,
        price: 28990000
      },
      {
        productId: 5,
        quantity: 1,
        price: 4990000
      }
    ],
    total: 33980000
  },
  {
    id: 2,
    date: '2025-11-06',
    userId: 3,
    status: 'processing',
    items: [
      {
        productId: 2,
        quantity: 1,
        price: 20990000
      }
    ],
    total: 20990000
  },
  {
    id: 3,
    date: '2025-11-08',
    userId: 2,
    status: 'new',
    items: [
      {
        productId: 4,
        quantity: 1,
        price: 32990000
      },
      {
        productId: 5,
        quantity: 2,
        price: 4990000
      }
    ],
    total: 42970000
  }
];

// Dữ liệu mẫu giá bán
const samplePrices = {
  categories: {
    'Điện thoại': 25,
    'Laptop': 20,
    'Phụ kiện': 35
  },
  products: {
    1: 30, // iPhone 13 Pro có tỷ lệ lợi nhuận riêng
    5: 40  // AirPods Pro có tỷ lệ lợi nhuận riêng
  }
};

// Lưu vào localStorage nếu chưa có
if (!localStorage.getItem('products')) {
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