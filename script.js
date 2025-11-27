// --- Global State ---
let allProducts = [];
let cart = JSON.parse(localStorage.getItem('miniStoreCart')) || [];

// --- DOM Elements ---
const productGrid = document.getElementById('product-grid');
const cartCountElement = document.getElementById('cart-count');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const priceFilter = document.getElementById('price-filter');
const cartIcon = document.getElementById('cart-icon');
const cartSummary = document.getElementById('cart-summary');
const cartItemsContainer = document.getElementById('cart-items');
const summaryCount = document.getElementById('summary-count');
const summaryPrice = document.getElementById('summary-price');
const checkoutButton = document.getElementById('checkout-button');
const closeCartButton = document.getElementById('close-cart');
const checkoutSuccess = document.getElementById('checkout-success');
const finalCount = document.getElementById('final-count');
const finalPrice = document.getElementById('final-price');
const startNewShoppingButton = document.getElementById('start-new-shopping');

// --- Helper Functions ---
const saveCart = () => localStorage.setItem('miniStoreCart', JSON.stringify(cart));
const updateCartCount = () => {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalItems;
};

// --- Create Product Card ---
const createProductCard = (product) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    // ✅ Use the image path directly from products.json
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <h3>${product.name}</h3>
        <p>$${(product.price / 100).toFixed(2)}</p>
        <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    return card;
};

// --- Render Products ---
const renderProducts = (productsToRender) => {
    productGrid.innerHTML = '';
    if (productsToRender.length === 0) {
        productGrid.innerHTML = '<p>No products found matching your criteria.</p>';
        return;
    }
    productsToRender.forEach(product => {
        productGrid.appendChild(createProductCard(product));
    });
};

// --- Populate Category Filter ---
const populateCategoryFilter = () => {
    const categories = new Set(allProducts.map(p => p.category));
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
};

// --- Initialize ---
const init = async () => {
    try {
        const response = await fetch('products.json');
        allProducts = await response.json();
        renderProducts(allProducts);
        populateCategoryFilter();
        updateCartCount();
    } catch (error) {
        console.error('Error loading products:', error);
        productGrid.innerHTML = '<p>Could not load product data.</p>';
    }
};

// --- Filters ---
const applyFilters = () => {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const selectedPriceRange = priceFilter.value;

    const filteredProducts = allProducts.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;

        let matchesPrice = true;
        if (selectedPriceRange !== 'All') {
            const [min, max] = selectedPriceRange.split('-').map(Number);
            matchesPrice = product.price >= min && product.price <= max;
        }

        return matchesSearch && matchesCategory && matchesPrice;
    });

    renderProducts(filteredProducts);
};

// --- Cart Management ---
const addToCart = (productId) => {
    const product = allProducts.find(p => p.id === productId);
    let cartItem = cart.find(item => item.id === productId);

    if (product) {
        if (cartItem) cartItem.quantity++;
        else cart.push({ ...product, quantity: 1 });
        saveCart();
        updateCartCount();
        alert('Added to cart!');
    }
};

const renderCartSummary = () => {
    cartItemsContainer.innerHTML = '';
    let totalItems = 0;
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="cart-item-info">
                    ${item.name} (x${item.quantity}) - $${((item.price * item.quantity) / 100).toFixed(2)}
                </div>
                <button class="remove-item-btn" data-id="${item.id}">Remove</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            totalItems += item.quantity;
            totalPrice += item.price * item.quantity;
        });
    }

    summaryCount.textContent = totalItems;
    summaryPrice.textContent = (totalPrice / 100).toFixed(2);
};

const removeItemFromCart = (productId) => {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    renderCartSummary();
};

// --- Event Listeners ---
productGrid.addEventListener('click', e => {
    if (e.target.classList.contains('add-to-cart-btn')) {
        addToCart(parseInt(e.target.dataset.id));
    }
});

searchInput.addEventListener('input', applyFilters);
categoryFilter.addEventListener('change', applyFilters);
priceFilter.addEventListener('change', applyFilters);

cartIcon.addEventListener('click', () => {
    renderCartSummary();
    cartSummary.style.display = 'block';
    document.querySelector('.filters').style.display = 'none';
    productGrid.style.display = 'none';
});

closeCartButton.addEventListener('click', () => {
    cartSummary.style.display = 'none';
    document.querySelector('.filters').style.display = 'flex';
    productGrid.style.display = 'grid';
});

cartItemsContainer.addEventListener('click', e => {
    if (e.target.classList.contains('remove-item-btn')) {
        removeItemFromCart(parseInt(e.target.dataset.id));
    }
});

checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items before checking out.');
        return;
    }

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    finalCount.textContent = totalItems;
    finalPrice.textContent = (totalPrice / 100).toFixed(2);

    cart = [];
    saveCart();
    updateCartCount();

    cartSummary.style.display = 'none';
    checkoutSuccess.style.display = 'flex';
});

startNewShoppingButton.addEventListener('click', () => {
    checkoutSuccess.style.display = 'none';
    document.querySelector('.filters').style.display = 'flex';
    productGrid.style.display = 'grid';
    applyFilters();
});

// --- Start App ---
init();
