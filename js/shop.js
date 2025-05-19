/**
 * NovaNest E-commerce - Shop Page JavaScript
 * Handles shop page specific functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Quick view functionality
    setupQuickView();
    
    // Wishlist functionality
    setupWishlist();
    
    // Filter mobile toggle
    setupMobileFilters();
});

/**
 * Sets up quick view functionality
 */
function setupQuickView() {
    // Event delegation for quick view buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('quick-view-btn') || 
            e.target.parentElement.classList.contains('quick-view-btn')) {
            
            const button = e.target.classList.contains('quick-view-btn') ? 
                e.target : e.target.parentElement;
            
            const productId = parseInt(button.getAttribute('data-product-id'));
            openQuickView(productId);
        }
        
        // Close quick view
        if (e.target.classList.contains('close-quick-view') ||
            e.target.parentElement.classList.contains('close-quick-view') ||
            e.target.classList.contains('quick-view-overlay')) {
            
            closeQuickView();
        }
    });
}

/**
 * Opens the quick view modal for a product
 * @param {number} productId - ID of the product to view
 */
function openQuickView(productId) {
    // Find product in the products array
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Create quick view modal
    const quickViewModal = document.createElement('div');
    quickViewModal.className = 'quick-view-modal';
    quickViewModal.innerHTML = `
        <div class="quick-view-overlay"></div>
        <div class="quick-view-content">
            <button class="close-quick-view">
                <i class="fas fa-times"></i>
            </button>
            <div class="quick-view-grid">
                <div class="quick-view-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="quick-view-details">
                    <h2>${product.name}</h2>
                    <div class="product-rating">
                        ${createStarRating(product.rating)}
                        <span class="review-count">(${product.reviews} reviews)</span>
                    </div>
                    <p class="product-price">${formatPrice(product.price)}</p>
                    <div class="product-description">
                        <p>${product.description}</p>
                    </div>
                    <div class="product-meta">
                        <p><strong>Category:</strong> ${getCategoryName(product.category)}</p>
                        <p><strong>Availability:</strong> ${product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}</p>
                    </div>
                    <div class="product-actions">
                        <div class="quantity-control">
                            <button class="quantity-btn decrease">-</button>
                            <input type="number" value="1" min="1" max="${product.stock}" class="quantity-input">
                            <button class="quantity-btn increase">+</button>
                        </div>
                        <button class="btn add-to-cart-btn" data-product-id="${product.id}">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                        <button class="btn-outline wishlist-btn" data-product-id="${product.id}">
                            <i class="far fa-heart"></i> Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add to DOM
    document.body.appendChild(quickViewModal);
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
    
    // Add animation class
    setTimeout(() => {
        quickViewModal.classList.add('active');
    }, 10);
    
    // Set up quantity controls
    const quantityInput = quickViewModal.querySelector('.quantity-input');
    const decreaseBtn = quickViewModal.querySelector('.decrease');
    const increaseBtn = quickViewModal.querySelector('.increase');
    
    decreaseBtn.addEventListener('click', function() {
        let value = parseInt(quantityInput.value);
        if (value > 1) {
            quantityInput.value = value - 1;
        }
    });
    
    increaseBtn.addEventListener('click', function() {
        let value = parseInt(quantityInput.value);
        if (value < product.stock) {
            quantityInput.value = value + 1;
        }
    });
    
    // Set up add to cart button
    const addToCartBtn = quickViewModal.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', function() {
        const quantity = parseInt(quantityInput.value);
        addToCart(product, quantity);
        closeQuickView();
    });
}

/**
 * Closes the quick view modal
 */
function closeQuickView() {
    const quickViewModal = document.querySelector('.quick-view-modal');
    if (!quickViewModal) return;
    
    // Remove animation class
    quickViewModal.classList.remove('active');
    
    // Remove modal after animation
    setTimeout(() => {
        quickViewModal.remove();
        document.body.style.overflow = '';
    }, 300);
}

/**
 * Sets up wishlist functionality
 */
function setupWishlist() {
    // Event delegation for wishlist buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('wishlist-btn') || 
            e.target.parentElement.classList.contains('wishlist-btn')) {
            
            const button = e.target.classList.contains('wishlist-btn') ? 
                e.target : e.target.parentElement;
            
            const productId = parseInt(button.getAttribute('data-product-id'));
            toggleWishlist(productId, button);
        }
    });
    
    // Update wishlist buttons on page load
    updateWishlistButtons();
}

/**
 * Toggles a product in the wishlist
 * @param {number} productId - ID of the product to toggle
 * @param {HTMLElement} button - The wishlist button element
 */
function toggleWishlist(productId, button) {
    const wishlist = getWishlist();
    
    // Check if product is already in wishlist
    const index = wishlist.indexOf(productId);
    
    if (index === -1) {
        // Add to wishlist
        wishlist.push(productId);
        showNotification('Product added to wishlist!', 'success');
        
        // Update button
        if (button) {
            const icon = button.querySelector('i');
            if (icon) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            }
        }
    } else {
        // Remove from wishlist
        wishlist.splice(index, 1);
        showNotification('Product removed from wishlist', 'info');
        
        // Update button
        if (button) {
            const icon = button.querySelector('i');
            if (icon) {
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        }
    }
    
    // Save wishlist to localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

/**
 * Gets the wishlist from localStorage
 * @returns {Array} The wishlist product IDs
 */
function getWishlist() {
    const wishlist = localStorage.getItem('wishlist');
    return wishlist ? JSON.parse(wishlist) : [];
}

/**
 * Updates all wishlist buttons based on localStorage
 */
function updateWishlistButtons() {
    const wishlist = getWishlist();
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    
    wishlistButtons.forEach(button => {
        const productId = parseInt(button.getAttribute('data-product-id'));
        const icon = button.querySelector('i');
        
        if (wishlist.includes(productId) && icon) {
            icon.classList.remove('far');
            icon.classList.add('fas');
        }
    });
}

/**
 * Sets up mobile filters toggle
 */
function setupMobileFilters() {
    const filterToggleBtn = document.createElement('button');
    filterToggleBtn.className = 'filter-toggle-btn';
    filterToggleBtn.innerHTML = '<i class="fas fa-filter"></i> Filters';
    
    const shopContent = document.querySelector('.shop-content');
    if (shopContent) {
        shopContent.prepend(filterToggleBtn);
    }
    
    filterToggleBtn.addEventListener('click', function() {
        const sidebar = document.querySelector('.shop-sidebar');
        if (sidebar) {
            sidebar.classList.toggle('active');
            
            // Change button text
            if (sidebar.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-times"></i> Close';
            } else {
                this.innerHTML = '<i class="fas fa-filter"></i> Filters';
            }
        }
    });
}

/**
 * Creates HTML for star ratings
 * @param {number} rating - The product rating
 * @returns {string} HTML for the star rating
 */
function createStarRating(rating) {
    let starsHtml = '';
    
    // Full stars
    const fullStars = Math.floor(rating);
    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<i class="fas fa-star"></i>';
    }
    
    // Half star
    if (rating % 1 >= 0.5) {
        starsHtml += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<i class="far fa-star"></i>';
    }
    
    return starsHtml;
}

/**
 * Gets the display name for a category
 * @param {string} categorySlug - The category slug
 * @returns {string} The category display name
 */
function getCategoryName(categorySlug) {
    const categories = {
        'home-decor': 'Home Decor',
        'jewelry': 'Jewelry',
        'fashion': 'Fashion',
        'art': 'Art',
        'gifts': 'Gifts',
        'gaming': 'Gaming',
        'computer-office': 'Computer & Office',
        'electronics': 'Electronics',
        'sport-fitness': 'Sport & Fitness'
    };
    
    return categories[categorySlug] || categorySlug;
}

// Add CSS for quick view modal
const quickViewStyles = document.createElement('style');
quickViewStyles.textContent = `
    .quick-view-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1100;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
    }
    
    .quick-view-modal.active {
        opacity: 1;
        visibility: visible;
    }
    
    .quick-view-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
    }
    
    .quick-view-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.9);
        width: 90%;
        max-width: 1000px;
        max-height: 90vh;
        overflow-y: auto;
        background-color: white;
        border-radius: 8px;
        padding: 30px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        transition: transform 0.3s ease;
    }
    
    .quick-view-modal.active .quick-view-content {
        transform: translate(-50%, -50%) scale(1);
    }
    
    .close-quick-view {
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        color: #777;
        z-index: 1;
    }
    
    .quick-view-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
    }
    
    .quick-view-image {
        height: 400px;
        overflow: hidden;
        border-radius: 8px;
    }
    
    .quick-view-image img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 8px;
    }
    
    .quick-view-details h2 {
        margin-bottom: 10px;
    }
    
    .product-rating {
        margin-bottom: 15px;
    }
    
    .product-price {
        font-size: 24px;
        font-weight: 700;
        color: var(--primary-color);
        margin-bottom: 20px;
    }
    
    .product-description {
        margin-bottom: 20px;
    }
    
    .product-meta {
        margin-bottom: 20px;
    }
    
    .product-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        align-items: center;
    }
    
    .quantity-control {
        display: flex;
        align-items: center;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        overflow: hidden;
    }
    
    .quantity-btn {
        background-color: var(--bg-light);
        border: none;
        width: 40px;
        height: 40px;
        font-size: 16px;
        cursor: pointer;
    }
    
    .quantity-input {
        width: 60px;
        height: 40px;
        text-align: center;
        border: none;
        border-left: 1px solid var(--border-color);
        border-right: 1px solid var(--border-color);
    }
    
    @media (max-width: 768px) {
        .quick-view-grid {
            grid-template-columns: 1fr;
        }
        
        .product-actions {
            flex-direction: column;
            align-items: flex-start;
        }
        
        .product-actions .btn,
        .product-actions .btn-outline {
            width: 100%;
        }
    }
    
    /* Mobile filter toggle */
    .filter-toggle-btn {
        display: none;
        margin-bottom: 20px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
    }
    
    @media (max-width: 992px) {
        .filter-toggle-btn {
            display: block;
        }
        
        .shop-sidebar {
            position: fixed;
            top: 0;
            left: -100%;
            width: 300px;
            height: 100vh;
            background-color: white;
            z-index: 1000;
            padding: 20px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
            overflow-y: auto;
            transition: left 0.3s ease;
        }
        
        .shop-sidebar.active {
            left: 0;
        }
    }
`;

document.head.appendChild(quickViewStyles);
