/**
 * NovaNest E-commerce - Main JavaScript
 * Handles common functionality across the website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const navbar = document.getElementById('navbar');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            navbar.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });
    }
    
    // Search Functionality
    const searchIcon = document.getElementById('search-icon');
    const searchContainer = document.getElementById('search-container');
    const closeSearch = document.getElementById('close-search');
    
    if (searchIcon && searchContainer && closeSearch) {
        searchIcon.addEventListener('click', function(e) {
            e.preventDefault();
            searchContainer.classList.add('active');
        });
        
        closeSearch.addEventListener('click', function() {
            searchContainer.classList.remove('active');
        });
    }
    
    // Update Cart Count
    updateCartCount();
    
    // Handle Form Submissions
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                // In a real application, this would send the email to a server
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                emailInput.value = '';
            }
        });
    }
    
    // Initialize any tooltips
    initTooltips();
});

/**
 * Updates the cart count in the header
 */
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const cart = getCart();
        const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = itemCount;
        
        // Store the count in localStorage for persistence
        localStorage.setItem('cartCount', itemCount);
    }
}

/**
 * Gets the cart from localStorage
 * @returns {Array} The cart items
 */
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

/**
 * Adds an item to the cart
 * @param {Object} product - The product to add
 * @param {number} quantity - The quantity to add
 */
function addToCart(product, quantity = 1) {
    const cart = getCart();
    
    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex > -1) {
        // Update quantity if product already in cart
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Add new item to cart
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count in header
    updateCartCount();
    
    // Show notification
    showNotification('Product added to cart!', 'success');
}

/**
 * Shows a notification to the user
 * @param {string} message - The message to display
 * @param {string} type - The type of notification (success, error, warning)
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <p>${message}</p>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Show notification with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Set up close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

/**
 * Formats a price with the South African Rand currency symbol
 * @param {number} price - The price to format
 * @returns {string} The formatted price
 */
function formatPrice(price) {
    return `R${price.toFixed(2)}`;
}

/**
 * Initializes tooltips
 */
function initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            
            const tooltipElement = document.createElement('div');
            tooltipElement.className = 'tooltip';
            tooltipElement.textContent = tooltipText;
            
            document.body.appendChild(tooltipElement);
            
            const rect = this.getBoundingClientRect();
            const tooltipRect = tooltipElement.getBoundingClientRect();
            
            tooltipElement.style.top = `${rect.top - tooltipRect.height - 10}px`;
            tooltipElement.style.left = `${rect.left + (rect.width / 2) - (tooltipRect.width / 2)}px`;
            
            tooltipElement.classList.add('show');
            
            this.addEventListener('mouseleave', function() {
                tooltipElement.remove();
            }, { once: true });
        });
    });
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: white;
        border-radius: 4px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 15px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        transform: translateY(100px);
        opacity: 0;
        transition: transform 0.3s ease, opacity 0.3s ease;
        z-index: 1000;
        max-width: 350px;
    }
    
    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }
    
    .notification.success {
        border-left: 4px solid #2ecc71;
    }
    
    .notification.error {
        border-left: 4px solid #e74c3c;
    }
    
    .notification.warning {
        border-left: 4px solid #f39c12;
    }
    
    .notification.info {
        border-left: 4px solid #3498db;
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        margin-left: 10px;
        color: #777;
    }
    
    .tooltip {
        position: fixed;
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 14px;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .tooltip.show {
        opacity: 1;
    }
`;

document.head.appendChild(notificationStyles);
