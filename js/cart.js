/**
 * NovaNest E-commerce - Cart JavaScript
 * Handles shopping cart functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Load cart contents
    loadCartContents();
    
    // Set up event listeners
    setupCartEventListeners();
    
    // Display related products
    displayRelatedProducts();
});

/**
 * Loads cart contents from localStorage and displays them
 */
function loadCartContents() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartEmptyMessage = document.getElementById('cart-empty');
    const cartItemsSection = document.getElementById('cart-items-container');
    const cartSummaryContainer = document.getElementById('cart-summary');
    
    if (!cartItemsContainer || !cartEmptyMessage || !cartItemsSection) return;
    
    const cart = getCart();
    
    // Show empty cart message if cart is empty
    if (cart.length === 0) {
        cartEmptyMessage.classList.remove('hidden');
        cartItemsSection.classList.add('hidden');
        return;
    }
    
    // Hide empty cart message and show cart items
    cartEmptyMessage.classList.add('hidden');
    cartItemsSection.classList.remove('hidden');
    
    // Add gift message element if it doesn't exist
    if (cartSummaryContainer && !document.getElementById('gift-message')) {
        const giftMessageDiv = document.createElement('div');
        giftMessageDiv.id = 'gift-message';
        giftMessageDiv.className = 'gift-message';
        giftMessageDiv.style.margin = '15px 0';
        giftMessageDiv.style.padding = '10px';
        giftMessageDiv.style.backgroundColor = '#f8f9fa';
        giftMessageDiv.style.borderRadius = '4px';
        giftMessageDiv.style.color = '#e67e22';
        giftMessageDiv.style.fontWeight = 'bold';
        cartSummaryContainer.prepend(giftMessageDiv);
    }
    
    // Generate HTML for cart items
    let html = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        html += `
            <div class="cart-item" data-product-id="${item.id}">
                <div class="cart-row">
                    <div class="cart-col product-col">
                        <div class="cart-product">
                            <img src="${item.image}" alt="${item.name}">
                            <div class="cart-product-info">
                                <h3>${item.name}</h3>
                                <p class="product-category">${getCategoryName(item.category)}</p>
                            </div>
                        </div>
                    </div>
                    <div class="cart-col price-col">
                        <span>${formatPrice(item.price)}</span>
                    </div>
                    <div class="cart-col quantity-col">
                        <div class="quantity-control">
                            <button class="quantity-btn decrease" data-product-id="${item.id}">-</button>
                            <input type="number" value="${item.quantity}" min="1" max="99" class="quantity-input" data-product-id="${item.id}">
                            <button class="quantity-btn increase" data-product-id="${item.id}">+</button>
                        </div>
                    </div>
                    <div class="cart-col total-col">
                        <span>${formatPrice(itemTotal)}</span>
                    </div>
                    <div class="cart-col action-col">
                        <button class="remove-item" data-product-id="${item.id}">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    cartItemsContainer.innerHTML = html;
    
    // Update cart summary
    updateCartSummary(subtotal);
}

/**
 * Sets up event listeners for cart functionality
 */
function setupCartEventListeners() {
    const cartItemsContainer = document.getElementById('cart-items');
    const updateCartBtn = document.getElementById('update-cart');
    const checkoutBtn = document.getElementById('checkout-btn');
    const couponForm = document.getElementById('coupon-form');
    
    if (!cartItemsContainer) return;
    
    // Event delegation for quantity buttons and remove buttons
    cartItemsContainer.addEventListener('click', function(e) {
        // Decrease quantity button
        if (e.target.classList.contains('decrease')) {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            updateCartItemQuantity(productId, 'decrease');
        }
        
        // Increase quantity button
        if (e.target.classList.contains('increase')) {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            updateCartItemQuantity(productId, 'increase');
        }
        
        // Remove item button
        if (e.target.classList.contains('remove-item') || e.target.parentElement.classList.contains('remove-item')) {
            const button = e.target.classList.contains('remove-item') ? e.target : e.target.parentElement;
            const productId = parseInt(button.getAttribute('data-product-id'));
            removeCartItem(productId);
        }
    });
    
    // Quantity input change
    cartItemsContainer.addEventListener('change', function(e) {
        if (e.target.classList.contains('quantity-input')) {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            const quantity = parseInt(e.target.value);
            
            if (quantity < 1) {
                e.target.value = 1;
                updateCartItemQuantity(productId, 'set', 1);
            } else {
                updateCartItemQuantity(productId, 'set', quantity);
            }
        }
    });
    
    // Update cart button
    if (updateCartBtn) {
        updateCartBtn.addEventListener('click', function() {
            updateCart();
        });
    }
    
    // Checkout button
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            // Check if user is eligible for a free gift
            const isGiftEligible = localStorage.getItem('giftEligible') === 'true';
            
            if (isGiftEligible) {
                // Add the free gift to the order
                addFreeGiftToOrder();
            }
            
            // In a real application, this would redirect to checkout page
            showNotification('Proceeding to checkout...', 'info');
            setTimeout(() => {
                if (isGiftEligible) {
                    alert('Congratulations! A free gift has been added to your order! In a real application, you would be redirected to a checkout page.');
                } else {
                    alert('This is a demo website. In a real application, you would be redirected to a checkout page.');
                }
            }, 1000);
        });
    }
    
    // Coupon form
    if (couponForm) {
        couponForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const couponInput = document.getElementById('coupon-code');
            if (!couponInput || !couponInput.value) return;
            
            const couponCode = couponInput.value.trim().toUpperCase();
            
            // Demo coupon codes
            const validCoupons = {
                'WELCOME10': 10,
                'SAVE20': 20,
                'NOVANEST30': 30
            };
            
            if (validCoupons[couponCode]) {
                applyCoupon(couponCode, validCoupons[couponCode]);
                showNotification(`Coupon applied! ${validCoupons[couponCode]}% discount`, 'success');
            } else {
                showNotification('Invalid coupon code', 'error');
            }
            
            couponInput.value = '';
        });
    }
}

/**
 * Updates the quantity of an item in the cart
 * @param {number} productId - ID of the product to update
 * @param {string} action - Action to perform (increase, decrease, set)
 * @param {number} quantity - Quantity to set (only used if action is 'set')
 */
function updateCartItemQuantity(productId, action, quantity = null) {
    const cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex === -1) return;
    
    switch (action) {
        case 'increase':
            cart[itemIndex].quantity += 1;
            break;
        case 'decrease':
            if (cart[itemIndex].quantity > 1) {
                cart[itemIndex].quantity -= 1;
            }
            break;
        case 'set':
            cart[itemIndex].quantity = quantity;
            break;
    }
    
    // Update cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update quantity input value
    const quantityInput = document.querySelector(`.quantity-input[data-product-id="${productId}"]`);
    if (quantityInput) {
        quantityInput.value = cart[itemIndex].quantity;
    }
    
    // Update item total
    const itemTotal = cart[itemIndex].price * cart[itemIndex].quantity;
    const totalElement = quantityInput.closest('.cart-row').querySelector('.total-col span');
    if (totalElement) {
        totalElement.textContent = formatPrice(itemTotal);
    }
    
    // Update cart summary
    const subtotal = calculateSubtotal(cart);
    updateCartSummary(subtotal);
    
    // Update cart count in header
    updateCartCount();
}

/**
 * Removes an item from the cart
 * @param {number} productId - ID of the product to remove
 */
function removeCartItem(productId) {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== productId);
    
    // Update cart in localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Remove item from DOM
    const cartItem = document.querySelector(`.cart-item[data-product-id="${productId}"]`);
    if (cartItem) {
        cartItem.remove();
    }
    
    // Show empty cart message if cart is now empty
    if (updatedCart.length === 0) {
        const cartEmptyMessage = document.getElementById('cart-empty');
        const cartItemsSection = document.getElementById('cart-items-container');
        
        if (cartEmptyMessage && cartItemsSection) {
            cartEmptyMessage.classList.remove('hidden');
            cartItemsSection.classList.add('hidden');
        }
    }
    
    // Update cart summary
    const subtotal = calculateSubtotal(updatedCart);
    updateCartSummary(subtotal);
    
    // Update cart count in header
    updateCartCount();
    
    // Show notification
    showNotification('Item removed from cart', 'info');
}

/**
 * Updates the entire cart based on current quantities
 */
function updateCart() {
    const quantityInputs = document.querySelectorAll('.quantity-input');
    const cart = getCart();
    
    quantityInputs.forEach(input => {
        const productId = parseInt(input.getAttribute('data-product-id'));
        const quantity = parseInt(input.value);
        
        const itemIndex = cart.findIndex(item => item.id === productId);
        if (itemIndex !== -1) {
            cart[itemIndex].quantity = quantity < 1 ? 1 : quantity;
        }
    });
    
    // Update cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Reload cart contents
    loadCartContents();
    
    // Update cart count in header
    updateCartCount();
    
    // Show notification
    showNotification('Cart updated', 'success');
}

/**
 * Applies a coupon code to the cart
 * @param {string} code - The coupon code
 * @param {number} discountPercentage - The discount percentage
 */
function applyCoupon(code, discountPercentage) {
    // Store coupon in localStorage
    localStorage.setItem('coupon', JSON.stringify({
        code: code,
        discount: discountPercentage
    }));
    
    // Update cart summary
    const cart = getCart();
    const subtotal = calculateSubtotal(cart);
    updateCartSummary(subtotal);
}

/**
 * Calculates the subtotal of the cart
 * @param {Array} cart - The cart items
 * @returns {number} The subtotal
 */
function calculateSubtotal(cart) {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

/**
 * Updates the cart summary
 * @param {number} subtotal - The cart subtotal
 */
function updateCartSummary(subtotal) {
    const subtotalElement = document.getElementById('cart-subtotal');
    const shippingElement = document.getElementById('cart-shipping');
    const discountElement = document.getElementById('cart-discount');
    const discountRow = document.getElementById('discount-row');
    const totalElement = document.getElementById('cart-total');
    const giftMessageElement = document.getElementById('gift-message');
    
    if (!subtotalElement || !shippingElement || !totalElement) return;
    
    // Calculate shipping (free over R1000)
    const shipping = subtotal > 1000 ? 0 : 150;
    
    // Apply coupon if exists
    const couponJson = localStorage.getItem('coupon');
    let discount = 0;
    
    if (couponJson) {
        const coupon = JSON.parse(couponJson);
        discount = (subtotal * coupon.discount) / 100;
        
        if (discountElement && discountRow) {
            discountElement.textContent = `-${formatPrice(discount)}`;
            discountRow.classList.remove('hidden');
        }
    } else if (discountRow) {
        discountRow.classList.add('hidden');
    }
    
    // Calculate total
    const total = subtotal + shipping - discount;
    
    // Update elements
    subtotalElement.textContent = formatPrice(subtotal);
    shippingElement.textContent = shipping === 0 ? 'Free' : formatPrice(shipping);
    totalElement.textContent = formatPrice(total);
    
    // Check if cart qualifies for free gift
    const cart = getCart();
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Show gift message if 4 or more items
    if (giftMessageElement) {
        if (totalItems >= 4) {
            giftMessageElement.textContent = '🎁 Congratulations! You qualify for a FREE gift with your order!';
            giftMessageElement.classList.remove('hidden');
            // Store gift eligibility in localStorage
            localStorage.setItem('giftEligible', 'true');
        } else {
            giftMessageElement.textContent = `🎁 Add ${4 - totalItems} more item${4 - totalItems === 1 ? '' : 's'} to receive a FREE gift!`;
            giftMessageElement.classList.remove('hidden');
            // Remove gift eligibility from localStorage
            localStorage.removeItem('giftEligible');
        }
    }
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

/**
 * Adds a free gift to the order when customer purchases 4 or more items
 */
function addFreeGiftToOrder() {
    // Create a gift item
    const giftItem = {
        id: 999, // Use a unique ID that won't conflict with regular products
        name: 'Surprise Gift Box',
        price: 0, // Free item
        image: 'images/Products/DIY Jewelry Making Kit.jpg', // Use an existing product image
        quantity: 1,
        category: 'gifts',
        isGift: true // Mark as a gift item
    };
    
    // Get the current cart
    const cart = getCart();
    
    // Check if gift is already in cart
    const giftIndex = cart.findIndex(item => item.isGift === true);
    
    if (giftIndex === -1) {
        // Add gift to cart if not already present
        cart.push(giftItem);
        
        // Update cart in localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Show notification
        showNotification('A free gift has been added to your order!', 'success');
    }
}
