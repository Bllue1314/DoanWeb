// Tạo cơ sở dữ liệu đơn giản sử dụng localStorage
class TechDB {
    static getData(key){
        return JSON.parse(localStorage.getItem(key)) || [];
    }


    static saveData(key, data){
        localStorage.setItem(key, JSON.stringify(data));
    }

}

// Lớp đồ công nghệ
class Tech {
    constructor(id, name, type, quantity, Label, description, imageUrl) {
        this.id = id;   
        this.name = name;
        this.type = type;
        this.quantity = quantity;
        this.Label = Label;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    // Phương thức để lấy thông tin về công nghệ
    static getAll() {
        return TechDB.getData('tech');
    }


    // Phương thức để hiển thị thông tin công nghệ
    displayInfo() {
        return `ID: ${this.id}, Name: ${this.name}, Type: ${this.type}, Quantity: ${this.quantity}, Description: ${this.description}, Image URL: ${this.imageUrl}`;
    }


}

// Lớp Chuột kế thừa từ Tech
class Mouse extends Tech {
    constructor(id, name, type, quantity, Label, description, imageUrl, color) {
        // Gọi constructor của lớp cha
        super(id, name, type, quantity, Label, description, imageUrl);
        this.color = color; 
    }

    // Override phương thức getAll để bổ sung thông tin màu sắc
    static getAll() {
        return TechDB.getData('mouse');
    }

    // Override phương thức displayInfo để hiển thị thêm màu sắc
    displayInfo() {
        return `${super.displayInfo()}, Color: ${this.color}`;
    }
}

// Lớp Bàn phím kế thừa từ Tech
class Keyboard extends Tech {
    constructor(id, name, type, quantity, Label, description, imageUrl, layout) {
        // Gọi constructor của lớp cha
        super(id, name, type, quantity, Label, description, imageUrl);
        this.layout = layout; // Thuộc tính layout mới
    }

    // Override phương thức getTechInfo để bổ sung thông tin layout
    static getAll() {
        return TechDB.getData('keyboard');
    }

    // Override phương thức displayInfo để hiển thị thêm layout
    displayInfo() {
        return `${super.displayInfo()}, Layout: ${this.layout}`;
    }
}
// Lớp Màn hình kế thừa từ Tech
class Monitor extends Tech {
    constructor(id, name, type, quantity, Label, description, imageUrl, size) {
        // Gọi constructor của lớp cha
        super(id, name, type, quantity, Label, description, imageUrl);
        this.size = size; // Thuộc tính kích thước mới
    }

    // Override phương thức getAll để bổ sung thông tin kích thước
    static getAll() {
        return TechDB.getData('monitor');
    }

    // Override phương thức displayInfo để hiển thị thêm kích thước
    displayInfo() {
        return `${super.displayInfo()}, Size: ${this.size}`;
    }
}

// Lớp Máy tính xách tay kế thừa từ Tech
class Laptop extends Tech {
    constructor(id, name, type, quantity, Label, description, imageUrl, weight) {
        // Gọi constructor của lớp cha
        super(id, name, type, quantity, Label, description, imageUrl);
        this.weight = weight; // Thuộc tính trọng lượng mới
    }

    // Override phương thức getAll để bổ sung thông tin trọng lượng
    static getAll() {
        return TechDB.getData('laptop');
    }

    // Override phương thức displayInfo để hiển thị thêm trọng lượng
    displayInfo() {
        return `${super.displayInfo()}, Weight: ${this.weight}`;
    }
}

// Lớp Máy tính để bàn kế thừa từ Tech
class Desktop extends Tech {
    constructor(id, name, type, quantity, Label, description, imageUrl, formFactor) {    
        // Gọi constructor của lớp cha
        super(id, name, type, quantity, Label, description, imageUrl);
        this.formFactor = formFactor; // Thuộc tính formFactor mới
    }

    // Override phương thức getAll để bổ sung thông tin formFactor
    static getAll() {
        return TechDB.getData('desktop');
    }

    // Override phương thức displayInfo để hiển thị thêm formFactor
    displayInfo() {
        return `${super.displayInfo()}, Form Factor: ${this.formFactor}`;
    }
}



