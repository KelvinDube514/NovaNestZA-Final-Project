# NovaNest E-Commerce Website

NovaNest is a modern, responsive e-commerce website focused on showcasing premium South African craftsmanship to both local and international audiences. This project includes a multi-page design, interactive features, and a clean, mobile-friendly layout.

## Features
- **Multi-page site:** Home, Shop, About, Contact, Cart
- **Responsive design:** Works on desktop, tablet, and mobile
- **Modern UI:** Clean, South African-inspired visuals
- **Product image slider:** Highlight latest products on the homepage
- **Shopping cart:** Add, update, and remove items (cart stored in browser)
- **Product filters and sorting:** Shop by category, price, and rating
- **Form validation:** Newsletter and contact forms
- **South African focus:** Local currency (ZAR), local products, and cultural themes
- **Free gift incentive:** Automatically adds a free gift when purchasing 4 or more items

## Project Structure
```
NovaNest/
├── index.html         # Home page
├── shop.html          # Shop page
├── about.html         # About page
├── contact.html       # Contact page
├── cart.html          # Shopping cart page
├── css/
│   ├── style.css      # Main styles
│   └── slider.css     # Slider-specific styles
├── js/
│   ├── script.js      # Main JS (navigation, UI, cart logic)
│   ├── slider.js      # Image and testimonial sliders
│   ├── products.js    # Product database and display
│   ├── cart.js        # Cart logic
│   ├── shop.js        # Shop page (filters, quick view, wishlist)
│   └── contact.js     # Contact form and FAQ
├── images/
│   ├── ...            # Images for products, banners, team, etc.
└── README.md          # Project documentation
```

## How to Use
1. **Clone or download** this repository to your computer.
2. **Open `index.html`** in your browser to view the homepage.
3. **Browse the site:** Use the navigation bar to explore products, learn about NovaNest, or contact us.
4. **Shop:** Add products to your cart, apply coupons, and simulate checkout (demo only, no real payments).
5. **Get free gifts:** Add 4 or more items to your cart to automatically qualify for a free Surprise Gift Box at checkout.

## Customization
- **Add images:** Place your images in the `images/` and `images/products/` directories. Update product image paths in `js/products.js` as needed.
- **Update product data:** Edit `js/products.js` to change product details, prices, and categories.
- **Change styles:** Modify `css/style.css` and `css/slider.css` for custom branding and colors.

## Live Demo
To deploy online, use services like Netlify, Vercel, or GitHub Pages. No build step is required—just upload the files.

## Credits
- Icons: [Font Awesome](https://fontawesome.com/)
- Fonts: [Google Fonts](https://fonts.google.com/)
- Images: Replace with your own product and branding images.

---

**NovaNest** – Bringing the best of South African craftsmanship to your doorstep!
