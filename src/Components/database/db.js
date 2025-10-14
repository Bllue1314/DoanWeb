//Tạo database cho đồ công nghệ
class TechDB {
    static getData(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error(`Error getting data for key ${key}:`, error);
            return [];
        }
    }

    static saveData(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error(`Error saving data for key ${key}:`, error);
            return false;
        }
    }

    static removeData(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error(`Error removing data for key ${key}:`, error);
            return false;
        }
    }
}

class Tech {
    constructor(id, name, type, quantity, Label, description, imageUrl, price) {
        if (!id || !name) throw new Error('ID and name are required');
        this.id = id;
        this.name = name;
        this.type = type;
        this.quantity = Math.max(0, quantity);
        this.Label = Label;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price || 0;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    static getAll() {
        return TechDB.getData('tech');
    }

    static findById(id) {
        return this.getAll().find(item => item.id === id);
    }

    static search(query) {
        const items = this.getAll();
        query = query.toLowerCase();
        return items.filter(item => 
            item.name.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)
        );
    }

    update(data) {
        Object.assign(this, {...data, updatedAt: new Date()});
        return this;
    }

    displayInfo() {
        return {
            id: this.id,
            name: this.name,
            type: this.type,
            quantity: this.quantity,
            price: this.price,
            description: this.description,
            imageUrl: this.imageUrl,
            Label: this.Label,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

class Mouse extends Tech {
    constructor(id, name, type, quantity, Label, description, imageUrl, price, color) {
        super(id, name, type, quantity, Label, description, imageUrl, price);
        this.color = color;
    }

    static getAll() {
        return TechDB.getData('mouse');
    }

    displayInfo() {
        return {...super.displayInfo(), color: this.color};
    }
}

class Keyboard extends Tech {
    constructor(id, name, type, quantity, Label, description, imageUrl, price, layout) {
        super(id, name, type, quantity, Label, description, imageUrl, price);
        this.layout = layout;
    }

    static getAll() {
        return TechDB.getData('keyboard');
    }

    displayInfo() {
        return {...super.displayInfo(), layout: this.layout};
    }
}

class Monitor extends Tech {
    constructor(id, name, type, quantity, Label, description, imageUrl, price, size) {
        super(id, name, type, quantity, Label, description, imageUrl, price);
        this.size = size;
    }

    static getAll() {
        return TechDB.getData('monitor');
    }

    displayInfo() {
        return {...super.displayInfo(), size: this.size};
    }
}

class Cart {
    constructor(userId) {
        this.userId = userId;
        this.items = [];
        this.loadCart();
    }

    loadCart() {
        this.items = TechDB.getData(`cart_${this.userId}`) || [];
    }

    addItem(tech, quantity = 1) {
        if (quantity <= 0) throw new Error('Quantity must be positive');
        if (tech.quantity < quantity) throw new Error('Not enough stock');

        const existingItem = this.items.find(item => item.id === tech.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                ...tech.displayInfo(),
                quantity,
                addedAt: new Date()
            });
        }
        this.saveCart();
    }

    removeItem(techId) {
        this.items = this.items.filter(item => item.id !== techId);
        this.saveCart();
    }

    updateQuantity(techId, quantity) {
        const item = this.items.find(item => item.id === techId);
        if (item && quantity > 0) {
            item.quantity = quantity;
            this.saveCart();
            return true;
        }
        return false;
    }

    calculateTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    clearCart() {
        this.items = [];
        this.saveCart();
    }

    saveCart() {
        TechDB.saveData(`cart_${this.userId}`, this.items);
    }
}

class Order {
    constructor(userId, cartItems, shippingInfo) {
        this.id = `ORDER_${Date.now()}`;
        this.userId = userId;
        this.items = cartItems;
        this.shippingInfo = shippingInfo;
        this.status = 'pending';
        this.total = this.calculateTotal();
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    static getAll() {
        return TechDB.getData('orders');
    }

    static getUserOrders(userId) {
        return this.getAll().filter(order => order.userId === userId);
    }

    calculateTotal() {
        const subtotal = this.items.reduce((total, item) => 
            total + (item.price * item.quantity), 0);
        const shippingCost = 30000;
        return subtotal + shippingCost;
    }

    updateStatus(newStatus) {
        this.status = newStatus;
        this.updatedAt = new Date();
        this.save();
    }

    save() {
        const orders = Order.getAll();
        const index = orders.findIndex(o => o.id === this.id);
        if (index !== -1) {
            orders[index] = this;
        } else {
            orders.push(this);
        }
        TechDB.saveData('orders', orders);
    }
}


class User {
    constructor(id, username, email, password, role = 'user') {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.createdAt = new Date();
    }

    static getAll() {
        return TechDB.getData('users');
    }

    static findByEmail(email) {
        return this.getAll().find(user => user.email === email);
    }

    static authenticate(email, password) {
        const user = this.findByEmail(email);
        return user && user.password === password ? user : null;
    }
}

class Customer extends User {
    constructor(id, username, email, password, phone, address) {
        super(id, username, email, password, 'user');
        this.phone = phone;
        this.address = address;
        this.cart = new Cart(id);
    }

    placeOrder(shippingInfo) {
        if (this.cart.items.length === 0) throw new Error('Cart is empty');
        const order = new Order(this.id, this.cart.items, shippingInfo);
        order.save();
        this.cart.clearCart();
        return order;
    }
}

class Admin extends User {
    constructor(id, username, email, password, department) {
        super(id, username, email, password, 'admin');
        this.department = department;
    }

    updateProduct(category, productId, data) {
        const products = TechDB.getData(category);
        const index = products.findIndex(p => p.id === productId);
        if (index !== -1) {
            products[index] = {...products[index], ...data};
            TechDB.saveData(category, products);
            return true;
        }
        return false;
    }

    manageOrder(orderId, newStatus) {
        const orders = Order.getAll();
        const order = orders.find(o => o.id === orderId);
        if (order) {
            order.updateStatus(newStatus);
            return true;
        }
        return false;
    }
}


