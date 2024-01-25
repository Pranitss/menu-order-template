const menu = [
    { id: 1, name: "Coffee", price: 2.5 },
    { id: 2, name: "Tea", price: 2 },
    { id: 3, name: "Sandwich", price: 5 },
    // Add more menu items here
];

const cart = [];

function addToCart(itemId) {
    const item = menu.find(item => item.id === itemId);
    cart.push(item);
    renderCart();
}

function renderCart() {
    const cartList = document.getElementById('cart');
    cartList.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartList.appendChild(li);
    });
}

function checkout() {
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    alert(`Total: $${total.toFixed(2)}`);
    cart.length = 0; // Clear the cart
    renderCart();

    // Simulated backend request
    const items = cart.map(item => item.name);
    const params = new URLSearchParams({ customer: 'John', items: JSON.stringify(items), total });
    fetch(`/api/placeOrder?${params}`);
}

function renderMenu() {
    const menuList = document.getElementById('menu');
    menu.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        li.addEventListener('click', () => addToCart(item.id));
        menuList.appendChild(li);
    });
}

renderMenu();
