// Test class TechDB
function testTechDB() {
    console.log('=== Testing TechDB ===');
    
    // Test saveData và getData
    const testData = { test: 'data' };
    TechDB.saveData('test', testData);
    const retrieved = TechDB.getData('test');
    console.assert(JSON.stringify(retrieved) === JSON.stringify(testData), 'TechDB save/get test failed');
    
    console.log('TechDB tests completed');
}

// Test các class sản phẩm
function testProducts() {
    console.log('=== Testing Product Classes ===');
    
    // Test Mouse
    const mouse = new Mouse(1, 'Gaming Mouse', 'Gaming', 10, 'Premium', 'High DPI gaming mouse', 'mouse.jpg', 'Black');
    console.assert(mouse.color === 'Black', 'Mouse color property test failed');
    
    // Test Keyboard
    const keyboard = new Keyboard(2, 'Mechanical Keyboard', 'Gaming', 5, 'Premium', 'Cherry MX switches', 'keyboard.jpg', 'TKL');
    console.assert(keyboard.layout === 'TKL', 'Keyboard layout property test failed');
    
    // Test Monitor
    const monitor = new Monitor(3, 'Gaming Monitor', 'Gaming', 3, 'Premium', '144Hz refresh rate', 'monitor.jpg', '27inch');
    console.assert(monitor.size === '27inch', 'Monitor size property test failed');
    
    // Test Laptop
    const laptop = new Laptop(4, 'Gaming Laptop', 'Gaming', 2, 'Premium', 'RTX 3060', 'laptop.jpg', '2.3kg');
    console.assert(laptop.weight === '2.3kg', 'Laptop weight property test failed');
    
    // Test Desktop
    const desktop = new Desktop(5, 'Gaming PC', 'Gaming', 1, 'Premium', 'Custom build', 'desktop.jpg', 'ATX');
    console.assert(desktop.formFactor === 'ATX', 'Desktop formFactor property test failed');
    
    // Test Headphone
    const headphone = new Headphone(6, 'Gaming Headset', 'Gaming', 8, 'Premium', '7.1 surround', 'headphone.jpg', true);
    console.assert(headphone.isWireless === true, 'Headphone isWireless property test failed');
    
    console.log('Product class tests completed');
}

// Test Cart functionality
function testCart() {
    console.log('=== Testing Cart ===');
    
    // Create new cart
    const cart = new Cart();
    console.assert(cart.items.length === 0, 'New cart should be empty');
    
    // Add item
    const mouse = new Mouse(1, 'Test Mouse', 'Gaming', 1, 'Premium', 'Test description', 'test.jpg', 'Black');
    cart.addItem(mouse);
    console.assert(cart.items.length === 1, 'Cart should have 1 item after adding');
    
    // Remove item
    cart.removeItem(1);
    console.assert(cart.items.length === 0, 'Cart should be empty after removing item');
    
    // Clear cart
    cart.addItem(mouse);
    cart.clearCart();
    console.assert(cart.items.length === 0, 'Cart should be empty after clearing');
    
    console.log('Cart tests completed');
}

// Run all tests
function runAllTests() {
    console.log('Starting tests...');
    
    testTechDB();
    testProducts();
    testCart();
    
    console.log('All tests completed');
}

// Execute tests
runAllTests();

// Test specific scenarios
function testSpecificScenarios() {
    console.log('=== Testing Specific Scenarios ===');
    
    // Test adding multiple items to cart
    const cart = new Cart();
    const mouse = new Mouse(1, 'Gaming Mouse', 'Gaming', 10, 'Premium', 'Test mouse', 'mouse.jpg', 'Black');
    const keyboard = new Keyboard(2, 'Mechanical Keyboard', 'Gaming', 5, 'Premium', 'Test keyboard', 'keyboard.jpg', 'Full');
    
    cart.addItem(mouse);
    cart.addItem(keyboard);
    console.assert(cart.items.length === 2, 'Cart should have 2 items');
    
    // Test product display information
    const mouseInfo = mouse.displayInfo();
    console.assert(mouseInfo.includes('Black'), 'Mouse info should include color');
    
    const keyboardInfo = keyboard.displayInfo();
    console.assert(keyboardInfo.includes('Full'), 'Keyboard info should include layout');
    
    console.log('Specific scenario tests completed');
}

// Test error handling
function testErrorHandling() {
    console.log('=== Testing Error Handling ===');
    
    try {
        // Test invalid localStorage access
        localStorage.clear();
        const data = TechDB.getData('nonexistent');
        console.assert(Array.isArray(data) && data.length === 0, 'Should return empty array for nonexistent key');
        
        // Test invalid product creation
        const invalidMouse = new Mouse(null, '', '', -1, '', '', '', '');
        console.log('Invalid mouse created:', invalidMouse);
    } catch (error) {
        console.log('Error caught successfully:', error.message);
    }
    
    console.log('Error handling tests completed');
}

// Run additional tests
testSpecificScenarios();
testErrorHandling();