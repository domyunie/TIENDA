let cart = [];

const cartItemsList = document.getElementById('cart-items');
const totalPriceEl  = document.getElementById('total-price');
const cartCountEl   = document.getElementById('cart-count');

// Botones "Añadir al carrito"
document.querySelectorAll('.add-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const id    = e.target.getAttribute('data-id');
        const name  = e.target.getAttribute('data-name');
        const price = parseFloat(e.target.getAttribute('data-price'));
        addToCart(id, name, price);
    });
});

function addToCart(id, name, price) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    updateUI();
}

function updateUI() {
    cartItemsList.innerHTML = '';

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<li class="cart-empty">El carrito está vacío.</li>';
        totalPriceEl.textContent = '0.00';
        cartCountEl.textContent  = '0';
        return;
    }

    let total = 0;
    let count = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.name} <em style="color:#888">(x${item.quantity})</em></span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        cartItemsList.appendChild(li);
        total += item.price * item.quantity;
        count += item.quantity;
    });

    totalPriceEl.textContent = total.toFixed(2);
    cartCountEl.textContent  = count;
}

// Vaciar carrito
document.getElementById('clear-cart').addEventListener('click', () => {
    cart = [];
    updateUI();
});
