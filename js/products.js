/**
 * NovaNest E-commerce - Products JavaScript
 * Handles product data and display functionality
 */

// Product Database
const products = [
    // Home Decor Products
    {
        id: 1,
        name: "Decorative Throw Pillows",
        price: 349.99,
        category: "home-decor",
        image: "images/Products/Decorative Throw Pillows.jpg",
        description: "Add a touch of elegance to your living space with our decorative throw pillows.",
        rating: 4.5,
        reviews: 28,
        featured: true,
        new: false,
        inStock: true,
        stock: 25
    },
    {
        id: 2,
        name: "Elegant Picture Frames",
        price: 279.99,
        category: "home-decor",
        image: "images/Products/Elegant Picture Frames.jpg",
        description: "Display your cherished memories in our elegant picture frames.",
        rating: 4.2,
        reviews: 15,
        featured: false,
        new: true,
        inStock: true,
        stock: 18
    },
    {
        id: 3,
        name: "Scented Candle Collection",
        price: 399.99,
        category: "home-decor",
        image: "images/Products/Scented Candle Collection.jpg",
        description: "Create a warm and inviting atmosphere with our premium scented candle collection.",
        rating: 4.8,
        reviews: 42,
        featured: true,
        new: false,
        inStock: true,
        stock: 32
    },
    {
        id: 4,
        name: "Contemporary Wall Art",
        price: 899.99,
        category: "home-decor",
        image: "images/Products/Contemporary Wall Art.jpg",
        description: "Transform your walls with our contemporary art pieces.",
        rating: 4.6,
        reviews: 19,
        featured: false,
        new: false,
        inStock: true,
        stock: 15
    },
    {
        id: 5,
        name: "Handwoven Area Rug",
        price: 1299.99,
        category: "home-decor",
        image: "images/Products/Handwoven Area Rug.jpg",
        description: "Add warmth and texture to your floors with our handwoven area rugs.",
        rating: 4.7,
        reviews: 31,
        featured: true,
        new: true,
        inStock: true,
        stock: 10
    },
    
    // Jewelry Products
    {
        id: 6,
        name: "Pendant Necklace Collection",
        price: 499.99,
        category: "jewelry",
        image: "images/Products/Pendant Necklace Collection.jpg",
        description: "Elegant pendant necklaces for any occasion.",
        rating: 4.9,
        reviews: 37,
        featured: true,
        new: false,
        inStock: true,
        stock: 22
    },
    {
        id: 7,
        name: "Sterling Silver Stud Earrings",
        price: 349.99,
        category: "jewelry",
        image: "images/Products/Sterling Silver Stud Earrings.jpg",
        description: "Classic sterling silver stud earrings that complement any outfit.",
        rating: 4.7,
        reviews: 24,
        featured: false,
        new: true,
        inStock: true,
        stock: 30
    },
    {
        id: 8,
        name: "Delicate Chain Bracelets",
        price: 299.99,
        category: "jewelry",
        image: "images/Products/Delicate Chain Bracelets.jpg",
        description: "Delicate chain bracelets that add a subtle sparkle to your wrist.",
        rating: 4.5,
        reviews: 18,
        featured: true,
        new: false,
        inStock: true,
        stock: 28
    },
    {
        id: 9,
        name: "DIY Jewelry Making Kit",
        price: 599.99,
        category: "jewelry",
        image: "images/Products/DIY Jewelry Making Kit.jpg",
        description: "Create your own unique jewelry pieces with our comprehensive DIY kit.",
        rating: 4.3,
        reviews: 12,
        featured: false,
        new: true,
        inStock: true,
        stock: 15
    },
    {
        id: 10,
        name: "Adjustable Ring Sizer Set",
        price: 249.99,
        category: "jewelry",
        image: "images/Products/Adjustable Ring Sizer Set.jpg",
        description: "Find your perfect ring size with our adjustable ring sizer set.",
        rating: 4.1,
        reviews: 9,
        featured: false,
        new: false,
        inStock: true,
        stock: 20
    },
    
    // Fashion Products
    {
        id: 11,
        name: "Premium Basic Apparel Set",
        price: 799.99,
        category: "fashion",
        image: "images/Products/Premium Basic Apparel Set.jpg",
        description: "High-quality basic apparel essentials for your wardrobe.",
        rating: 4.6,
        reviews: 32,
        featured: true,
        new: true,
        inStock: true,
        stock: 24
    },
    {
        id: 12,
        name: "Comfortable Casual Footwear",
        price: 899.99,
        category: "fashion",
        image: "images/Products/Comfortable Casual Footwear.jpg",
        description: "Stylish and comfortable footwear for everyday wear.",
        rating: 4.4,
        reviews: 27,
        featured: false,
        new: false,
        inStock: true,
        stock: 19
    },
    
    // Gaming Products
    {
        id: 13,
        name: "Gaming Accessories Bundle",
        price: 1499.99,
        category: "gaming",
        image: "images/Products/Gaming Accessories Bundle.jpg",
        description: "Complete gaming accessories bundle to enhance your gaming experience.",
        rating: 4.8,
        reviews: 45,
        featured: true,
        new: false,
        inStock: true,
        stock: 12
    },
    {
        id: 14,
        name: "PlayStation Store Gift Card",
        price: 299.99,
        category: "gaming",
        image: "images/Products/PlayStation Store Gift Card.jpg",
        description: "Digital gift card for the PlayStation Store.",
        rating: 4.9,
        reviews: 38,
        featured: false,
        new: false,
        inStock: true,
        stock: 50
    },
    {
        id: 15,
        name: "Xbox Game Pass Subscription",
        price: 199.99,
        category: "gaming",
        image: "images/Products/Xbox Game Pass Subscription.jpg",
        description: "Access to hundreds of high-quality games with Xbox Game Pass.",
        rating: 4.7,
        reviews: 41,
        featured: true,
        new: true,
        inStock: true,
        stock: 45
    },
    {
        id: 16,
        name: "Nintendo Switch MicroSD Card",
        price: 349.99,
        category: "gaming",
        image: "images/Products/Nintendo Switch MicroSD Card.jpg",
        description: "Expand your Nintendo Switch storage with our high-speed MicroSD card.",
        rating: 4.5,
        reviews: 29,
        featured: false,
        new: false,
        inStock: true,
        stock: 35
    },
    {
        id: 17,
        name: "Premium Console Controller",
        price: 899.99,
        category: "gaming",
        image: "images/Products/Premium Console Controller.jpg",
        description: "Professional-grade controller for precision gaming.",
        rating: 4.6,
        reviews: 33,
        featured: true,
        new: false,
        inStock: true,
        stock: 18
    },
    {
        id: 18,
        name: "Gaming Headset Pro",
        price: 1299.99,
        category: "gaming",
        image: "images/Products/Gaming Headset Pro.jpg",
        description: "Immersive gaming headset with surround sound and noise-canceling microphone.",
        rating: 4.8,
        reviews: 47,
        featured: false,
        new: true,
        inStock: true,
        stock: 15
    },
    
    // Computer & Office Products
    {
        id: 19,
        name: "Wireless Computer Mouse",
        price: 399.99,
        category: "computer-office",
        image: "images/Products/Wireless Computer Mouse.jpg",
        description: "Ergonomic wireless mouse for comfortable computing.",
        rating: 4.4,
        reviews: 26,
        featured: false,
        new: false,
        inStock: true,
        stock: 40
    },
    {
        id: 20,
        name: "Ergonomic Keyboard",
        price: 799.99,
        category: "computer-office",
        image: "images/Products/Ergonomic Keyboard.jpg",
        description: "Comfortable ergonomic keyboard designed for long typing sessions.",
        rating: 4.6,
        reviews: 31,
        featured: true,
        new: true,
        inStock: true,
        stock: 25
    },
    {
        id: 21,
        name: "USB Hub Multiport Adapter",
        price: 449.99,
        category: "computer-office",
        image: "images/Products/USB Hub Multiport Adapter.jpg",
        description: "Expand your connectivity options with our multiport USB adapter.",
        rating: 4.3,
        reviews: 22,
        featured: false,
        new: false,
        inStock: true,
        stock: 32
    },
    {
        id: 22,
        name: "Premium Office Supplies Set",
        price: 349.99,
        category: "computer-office",
        image: "images/Products/Premium Office Supplies Set.jpg",
        description: "Complete set of premium office supplies for your workspace.",
        rating: 4.2,
        reviews: 17,
        featured: false,
        new: true,
        inStock: true,
        stock: 28
    },
    {
        id: 23,
        name: "HD Webcam",
        price: 599.99,
        category: "computer-office",
        image: "images/Products/HD Webcam.jpg",
        description: "Crystal-clear HD webcam for video conferencing and content creation.",
        rating: 4.7,
        reviews: 34,
        featured: true,
        new: false,
        inStock: true,
        stock: 22
    },
    {
        id: 24,
        name: "Adjustable Laptop Stand",
        price: 299.99,
        category: "computer-office",
        image: "images/Products/Adjustable Laptop Stand.jpg",
        description: "Ergonomic adjustable laptop stand for comfortable working.",
        rating: 4.5,
        reviews: 28,
        featured: false,
        new: false,
        inStock: true,
        stock: 30
    },
    
    // Electronics Products
    {
        id: 25,
        name: "Portable Power Bank",
        price: 499.99,
        category: "electronics",
        image: "images/Products/Portable Power Bank.jpg",
        description: "High-capacity portable power bank for charging on the go.",
        rating: 4.6,
        reviews: 39,
        featured: true,
        new: false,
        inStock: true,
        stock: 45
    },
    {
        id: 26,
        name: "Waterproof Bluetooth Speaker",
        price: 699.99,
        category: "electronics",
        image: "images/Products/Waterproof Bluetooth Speaker.jpg",
        description: "Durable waterproof Bluetooth speaker with impressive sound quality.",
        rating: 4.7,
        reviews: 43,
        featured: false,
        new: true,
        inStock: true,
        stock: 20
    },
    {
        id: 27,
        name: "True Wireless Earbuds",
        price: 899.99,
        category: "electronics",
        image: "images/Products/True Wireless Earbuds.jpg",
        description: "Premium true wireless earbuds with noise cancellation.",
        rating: 4.8,
        reviews: 51,
        featured: true,
        new: false,
        inStock: true,
        stock: 25
    },
    {
        id: 28,
        name: "Smart Home Hub",
        price: 1299.99,
        category: "electronics",
        image: "images/Products/Smart Home Hub.jpg",
        description: "Central hub for controlling all your smart home devices.",
        rating: 4.5,
        reviews: 27,
        featured: false,
        new: true,
        inStock: true,
        stock: 15
    },
    {
        id: 29,
        name: "Smart Wi-Fi Plug",
        price: 249.99,
        category: "electronics",
        image: "images/Products/Smart Wi-Fi Plug.jpg",
        description: "Control your appliances remotely with our smart Wi-Fi plug.",
        rating: 4.3,
        reviews: 19,
        featured: false,
        new: false,
        inStock: true,
        stock: 40
    },
    {
        id: 30,
        name: "4K Streaming Media Player",
        price: 799.99,
        category: "electronics",
        image: "images/Products/4K Streaming Media Player.jpg",
        description: "Stream your favorite content in stunning 4K resolution.",
        rating: 4.6,
        reviews: 36,
        featured: true,
        new: true,
        inStock: true,
        stock: 18
    },
    
    // Sport & Fitness Products
    {
        id: 31,
        name: "Advanced Fitness Tracker",
        price: 899.99,
        category: "sport-fitness",
        image: "images/Products/Advanced Fitness Tracker.jpg",
        description: "Track your workouts, heart rate, and more with our advanced fitness tracker.",
        rating: 4.7,
        reviews: 44,
        featured: true,
        new: false,
        inStock: true,
        stock: 30
    },
    {
        id: 32,
        name: "Premium Resistance Bands Set",
        price: 399.99,
        category: "sport-fitness",
        image: "images/Products/Premium Resistance Bands Set.jpg",
        description: "Complete set of premium resistance bands for versatile workouts.",
        rating: 4.5,
        reviews: 29,
        featured: false,
        new: true,
        inStock: true,
        stock: 35
    },
    {
        id: 33,
        name: "Non-Slip Yoga Mat",
        price: 349.99,
        category: "sport-fitness",
        image: "images/Products/Non-Slip Yoga Mat.jpg",
        description: "Premium non-slip yoga mat for comfortable practice.",
        rating: 4.6,
        reviews: 32,
        featured: true,
        new: false,
        inStock: true,
        stock: 40
    },
    {
        id: 34,
        name: "Insulated Water Bottle",
        price: 249.99,
        category: "sport-fitness",
        image: "images/Products/Insulated Water Bottle.jpg",
        description: "Keep your drinks cold for hours with our insulated water bottle.",
        rating: 4.4,
        reviews: 25,
        featured: false,
        new: false,
        inStock: true,
        stock: 50
    },
    {
        id: 35,
        name: "Jump Rope with Counter",
        price: 199.99,
        category: "sport-fitness",
        image: "images/Products/Jump Rope with Counter.jpg",
        description: "Digital jump rope with built-in counter for tracking your workout.",
        rating: 4.3,
        reviews: 21,
        featured: false,
        new: true,
        inStock: true,
        stock: 45
    },
    {
        id: 36,
        name: "Adjustable Hand Weights Set",
        price: 599.99,
        category: "sport-fitness",
        image: "images/Products/Adjustable Hand Weights Set.jpg",
        description: "Versatile adjustable hand weights for strength training.",
        rating: 4.8,
        reviews: 37,
        featured: true,
        new: false,
        inStock: true,
        stock: 20
    },
    
    // Art Products
    {
        id: 38,
        name: "Abstract Canvas Painting",
        price: 1899.99,
        category: "art",
        image: "images/Products/Abstract Canvas Painting.jpg",
        description: "Modern abstract canvas painting with vibrant colors, perfect for contemporary home decor.",
        rating: 4.8,
        reviews: 32,
        featured: true,
        new: true,
        inStock: true,
        stock: 8
    },
    {
        id: 39,
        name: "Handcrafted Ceramic Vase",
        price: 799.99,
        category: "art",
        image: "images/Products/Handcrafted Ceramic Vase.jpg",
        description: "Unique handcrafted ceramic vase with intricate patterns, made by local artisans.",
        rating: 4.7,
        reviews: 19,
        featured: false,
        new: true,
        inStock: true,
        stock: 12
    },
    {
        id: 40,
        name: "Wooden Sculpture Collection",
        price: 2499.99,
        category: "art",
        image: "images/Products/Wooden Sculpture Collection.jpg",
        description: "Set of three hand-carved wooden sculptures showcasing African wildlife themes.",
        rating: 4.9,
        reviews: 24,
        featured: true,
        new: true,
        inStock: true,
        stock: 5
    },
    {
        id: 41,
        name: "Metal Wall Art",
        price: 1299.99,
        category: "art",
        image: "images/Products/Metal Wall Art.jpg",
        description: "Contemporary metal wall art with geometric patterns, adding dimension to any wall space.",
        rating: 4.6,
        reviews: 15,
        featured: false,
        new: true,
        inStock: true,
        stock: 10
    },
    {
        id: 42,
        name: "Glass Art Centerpiece",
        price: 1799.99,
        category: "art",
        image: "images/Products/Glass Art Centerpiece.jpg",
        description: "Stunning hand-blown glass art centerpiece with swirling colors, a perfect conversation starter.",
        rating: 4.8,
        reviews: 21,
        featured: true,
        new: true,
        inStock: true,
        stock: 7
    },
    {
        id: 43,
        name: "Limited Edition Print Set",
        price: 999.99,
        category: "art",
        image: "images/Products/Limited Edition Print Set.jpg",
        description: "Set of three limited edition prints by renowned South African artist, each signed and numbered.",
        rating: 4.7,
        reviews: 28,
        featured: false,
        new: true,
        inStock: true,
        stock: 15
    },
    {
        id: 44,
        name: "Textile Wall Hanging",
        price: 849.99,
        category: "art",
        image: "images/Products/Textile Wall Hanging.jpg",
        description: "Handwoven textile wall hanging with traditional patterns and natural dyes.",
        rating: 4.5,
        reviews: 17,
        featured: false,
        new: true,
        inStock: true,
        stock: 18
    },
    
    // New Fashion Products
    {
        id: 37,
        name: "Designer Sunglasses Collection",
        price: 1299.99,
        category: "fashion",
        image: "images/Products/Designer Sunglasses Collection.jpg",
        description: "Stylish designer sunglasses that offer both UV protection and fashion-forward aesthetics.",
        rating: 4.7,
        reviews: 29,
        featured: true,
        new: true,
        inStock: true,
        stock: 15
    },
    {
        id: 38,
        name: "Leather Crossbody Bag",
        price: 899.99,
        category: "fashion",
        image: "images/Products/Leather Crossbody Bag.jpg",
        description: "Elegant genuine leather crossbody bag with adjustable strap and multiple compartments.",
        rating: 4.9,
        reviews: 42,
        featured: true,
        new: false,
        inStock: true,
        stock: 20
    },
    {
        id: 39,
        name: "Premium Silk Scarf",
        price: 449.99,
        category: "fashion",
        image: "images/Products/Premium Silk Scarf.jpg",
        description: "Luxurious 100% silk scarf with vibrant patterns, perfect for adding elegance to any outfit.",
        rating: 4.6,
        reviews: 18,
        featured: false,
        new: true,
        inStock: true,
        stock: 25
    },
    {
        id: 40,
        name: "Minimalist Watch Collection",
        price: 1599.99,
        category: "fashion",
        image: "images/Products/Minimalist Watch Collection.jpg",
        description: "Sleek and sophisticated minimalist watches with premium materials and Japanese movement.",
        rating: 4.8,
        reviews: 33,
        featured: true,
        new: false,
        inStock: true,
        stock: 12
    },
    {
        id: 41,
        name: "Handcrafted Leather Wallet",
        price: 599.99,
        category: "fashion",
        image: "images/Products/Handcrafted Leather Wallet.jpg",
        description: "Artisan-crafted genuine leather wallet with RFID protection and multiple card slots.",
        rating: 4.5,
        reviews: 24,
        featured: false,
        new: true,
        inStock: true,
        stock: 30
    },
    
    // Training Outfits
    {
        id: 45,
        name: "Men's Performance Training Set",
        price: 899.99,
        category: "sport-fitness",
        image: "images/Products/Men's Performance Training Set.jpg",
        description: "High-performance men's training outfit with moisture-wicking fabric, perfect for intense workouts and sports activities.",
        rating: 4.7,
        reviews: 22,
        featured: true,
        new: true,
        inStock: true,
        stock: 22
    },
    {
        id: 46,
        name: "Women's Activewear Collection",
        price: 849.99,
        category: "sport-fitness",
        image: "images/Products/Women's Activewear Collection.jpg",
        description: "Stylish and functional women's training outfit featuring breathable fabrics and flexible design for maximum comfort during workouts.",
        rating: 4.8,
        reviews: 31,
        featured: true,
        new: true,
        inStock: true,
        stock: 28
    }
];


/**
 * Creates a product card HTML
 * @param {Object} product - The product to create a card for
 * @returns {string} HTML for the product card
 */
function createProductCard(product) {
    const inStockClass = product.inStock ? 'in-stock' : 'out-of-stock';
    const newBadge = product.new ? '<span class="badge new-badge">New</span>' : '';
    const featuredBadge = product.featured ? '<span class="badge featured-badge">Featured</span>' : '';
    const stockLevel = product.stock <= 5 ? 'low-stock' : (product.stock <= 15 ? 'medium-stock' : 'high-stock');
    
    return `
        <div class="product-card ${inStockClass}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-badges">
                    ${newBadge}
                    ${featuredBadge}
                </div>
                <div class="product-actions">
                    <button class="quick-view-btn" data-product-id="${product.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="wishlist-btn" data-product-id="${product.id}">
                        <i class="far fa-heart"></i>
                    </button>
                    <button class="add-to-cart-btn" data-product-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    ${createStarRating(product.rating)}
                    <span class="review-count">(${product.reviews})</span>
                </div>
                <p class="product-price">${formatPrice(product.price)}</p>
                <p class="product-stock ${stockLevel}">${product.stock} in stock</p>
            </div>
        </div>
    `;
}

/**
 * Creates star rating HTML
 * @param {number} rating - The rating value (0-5)
 * @returns {string} HTML for the star rating
 */
function createStarRating(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    // Add half star if needed
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

/**
 * Gets the readable category name
 * @param {string} categorySlug - The category slug
 * @returns {string} The readable category name
 */
function getCategoryName(categorySlug) {
    const categories = {
        'home-decor': 'Home Decor',
        'jewelry': 'Jewelry',
        'fashion': 'Fashion',
        'gaming': 'Gaming',
        'electronics': 'Electronics',
        'sport-fitness': 'Sport & Fitness'
    };
    
    return categories[categorySlug] || categorySlug;
}

document.addEventListener('DOMContentLoaded', function() {
    // Display featured products on homepage
    displayFeaturedProducts();
    
    // Display products on shop page
    displayShopProducts();
    
    // Display related products on product pages
    displayRelatedProducts();
    
    // Setup product action buttons (add to cart, wishlist, quick view)
    setupProductActions();
});

/**
 * Displays featured products on the homepage
 */
function displayFeaturedProducts() {
    const featuredProductsContainer = document.getElementById('featured-products');
    if (!featuredProductsContainer) return;
    
    const featuredProducts = products.filter(product => product.featured);
    
    let html = '';
    featuredProducts.forEach(product => {
        html += createProductCard(product);
    });
    
    featuredProductsContainer.innerHTML = html;
    
    // Setup product actions after rendering products
    setupProductActions();
}

/**
 * Displays products on the shop page with filtering and sorting
 */
function displayShopProducts() {
    const shopProductsContainer = document.getElementById('shop-products');
    if (!shopProductsContainer) return;
    
    // Get URL parameters for any pre-filtering
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    // Initially display all products or filtered by URL parameter
    let displayedProducts = [...products];
    
    if (categoryParam) {
        displayedProducts = products.filter(product => product.category === categoryParam);
        
        // Check the corresponding category filter
        const categoryCheckbox = document.getElementById(categoryParam);
        if (categoryCheckbox) {
            categoryCheckbox.checked = true;
            document.getElementById('all').checked = false;
        }
    }
    
    // Update product count
    const productCountElement = document.getElementById('product-count');
    if (productCountElement) {
        productCountElement.textContent = displayedProducts.length;
    }
    
    // Render products
    renderProducts(displayedProducts, shopProductsContainer);
    
    // Set up filter functionality
    setupFilters(shopProductsContainer);
    
    // Set up sorting functionality
    setupSorting(shopProductsContainer);
    
    // Set up pagination
    setupPagination(shopProductsContainer);
}

/**
 * Renders products to a container
 * @param {Array} productsToRender - Array of products to render
 * @param {HTMLElement} container - Container to render products in
 */
function renderProducts(productsToRender, container) {
    if (!container) return;
    
    let html = '';
    
    productsToRender.forEach(product => {
        html += createProductCard(product);
    });
    
    container.innerHTML = html;
    
    // Setup product actions after rendering products
    setupProductActions();
}

/**
 * Formats a price with the South African Rand currency symbol
 * @param {number} price - The price to format
 * @returns {string} The formatted price
 */
function formatPrice(price) {
    return `R ${price.toFixed(2)}`;
}

/**
 * Sets up event listeners for product action buttons (add to cart, wishlist, quick view)
 */
function setupProductActions() {
    // Use event delegation for product actions
    document.addEventListener('click', function(e) {
        // Add to cart button
        if (e.target.classList.contains('add-to-cart-btn') || 
            e.target.parentElement.classList.contains('add-to-cart-btn')) {
            
            e.preventDefault();
            const button = e.target.classList.contains('add-to-cart-btn') ? 
                e.target : e.target.parentElement;
            
            const productId = parseInt(button.getAttribute('data-product-id'));
            const product = products.find(p => p.id === productId);
            
            if (product) {
                addToCart(product, 1);
            }
        }
        
        // Wishlist button
        if (e.target.classList.contains('wishlist-btn') || 
            e.target.parentElement.classList.contains('wishlist-btn')) {
            
            e.preventDefault();
            const button = e.target.classList.contains('wishlist-btn') ? 
                e.target : e.target.parentElement;
            
            toggleWishlistItem(button);
        }
        
        // Quick view button
        if (e.target.classList.contains('quick-view-btn') || 
            e.target.parentElement.classList.contains('quick-view-btn')) {
            
            e.preventDefault();
            const button = e.target.classList.contains('quick-view-btn') ? 
                e.target : e.target.parentElement;
            
            const productId = parseInt(button.getAttribute('data-product-id'));
            const product = products.find(p => p.id === productId);
            
            if (product) {
                openQuickView(product);
            }
        }
    });
    
    // Update wishlist buttons on page load
    if (typeof updateWishlistButtons === 'function') {
        updateWishlistButtons();
    }
}
