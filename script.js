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

/**
 * Saves the current cart state to LocalStorage.
 */
const saveCart = () => {
    localStorage.setItem('miniStoreCart', JSON.stringify(cart));
};

/**
 * Updates the item count displayed on the cart icon.
 */
const updateCartCount = () => {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalItems;
};

/**
 * Renders a single product card HTML, now including the image.
 * @param {object} product - The product data.
 */
const createProductCard = (product) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="images/${product.image}" alt="${product.name}" class="product-image">
        <h3>${product.name}</h3>
        <p>$${(product.price / 100).toFixed(2)}</p>
        <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    return card;
};

/**
 * Renders the products based on the filtered list.
 * @param {Array} productsToRender - The list of products to display.
 */
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

/**
 * Populates the category filter dropdown options.
 */
const populateCategoryFilter = () => {
    const categories = new Set(allProducts.map(p => p.category));
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
};

// --- Core Logic ---

/**
 * Fetches product data and initializes the application.
 */
const init = async () => {
    try {
        // Fetch products from the local JSON file
        const response = await fetch('products.json');
        allProducts = await response.json();

        // Initial setup
        renderProducts(allProducts);
        populateCategoryFilter();
        updateCartCount();

    } catch (error) {
        console.error('Error loading products:', error);
        productGrid.innerHTML = '<p>Could not load product data.</p>';
    }
};

/**
 * Filters and searches the product list based on current user inputs.
 */
const applyFilters = () => {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const selectedPriceRange = priceFilter.value;

    let filteredProducts = allProducts.filter(product => {
        // 1. Search Filter
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        
        // 2. Category Filter
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;

        // 3. Price Filter
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

/**
 * Adds a product to the cart or increments its quantity.
 * @param {number} productId - The ID of the product to add.
 */
const addToCart = (productId) => {
    const product = allProducts.find(p => p.id === productId);
    let cartItem = cart.find(item => item.id === productId);

    if (product) {
        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        
        saveCart();
        updateCartCount();
        alert('Added to cart!'); // Simple user feedback
    }
};

/**
 * Renders the full cart summary view (list of items and totals).
 */
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

    // Update totals
    summaryCount.textContent = totalItems;
    summaryPrice.textContent = (totalPrice / 100).toFixed(2);
};

/**
 * Removes a specific item from the cart.
 * @param {number} productId - The ID of the product to remove.
 */
const removeItemFromCart = (productId) => {
    // Remove all instances of the item
    cart = cart.filter(item => item.id !== productId); 
    saveCart();
    updateCartCount();
    renderCartSummary(); // Re-render the cart view
};

// --- Event Listeners ---

// Listener for Add to Cart buttons (delegated to the product grid)
productGrid.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart-btn')) {
        const productId = parseInt(e.target.dataset.id);
        addToCart(productId);
    }
});

// Listener for Filters and Search
searchInput.addEventListener('input', applyFilters);
categoryFilter.addEventListener('change', applyFilters);
priceFilter.addEventListener('change', applyFilters);

// Listener to show the cart summary
cartIcon.addEventListener('click', () => {
    renderCartSummary();
    cartSummary.style.display = 'block';
    // Hide the main product grid
    document.querySelector('.filters').style.display = 'none';
    productGrid.style.display = 'none';
});

// Listener to close the cart summary
closeCartButton.addEventListener('click', () => {
    cartSummary.style.display = 'none';
    // Show the main product grid again
    document.querySelector('.filters').style.display = 'flex';
    productGrid.style.display = 'grid';
});

// Listener for removing items from the cart summary (delegated)
cartItemsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item-btn')) {
        const productId = parseInt(e.target.dataset.id);
        removeItemFromCart(productId);
    }
});

// Listener for checkout
checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items before checking out.');
        return;
    }

    // 1. Get final totals
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // 2. Update success message UI
    finalCount.textContent = totalItems;
    finalPrice.textContent = (totalPrice / 100).toFixed(2);

    // 3. Clear cart state
    cart = [];
    saveCart();
    updateCartCount();

    // 4. Show success message
    cartSummary.style.display = 'none';
    checkoutSuccess.style.display = 'flex';
});

// Listener for starting new shopping after checkout
startNewShoppingButton.addEventListener('click', () => {
    checkoutSuccess.style.display = 'none';
    document.querySelector('.filters').style.display = 'flex';
    productGrid.style.display = 'grid';
    // Re-render products to reset any previous filters applied
    applyFilters(); 
});

// Start the application
init();