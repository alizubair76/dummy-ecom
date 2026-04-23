# Dummy E-Commerce UI

A simple E-Commerce web application demonstrating product browsing, shopping, and checkout experience. Built with **React**, **Vite**, and **React Router** with comprehensive end-to-end test automation using **Playwright**.

## ✨ Key Features

- 🏪 **Product Listing** - Browse all products with category filtering
- 📱 **Product Details** - View comprehensive product information and specifications
- 🛒 **Shopping Cart** - Add items, update quantities, manage cart with real-time total calculations
- 💳 **Checkout** - Complete order form with validation and secure payment details
- 📦 **Order History** - Track submitted orders, search by email, and view detailed order information
- 🔀 **Client-Side Routing** - Fast, smooth navigation between pages without page reloads
- 💾 **Persistent Storage** - Cart and order data stored using React Context API and browser localStorage
- 🎨 **Modern UI** - Clean, professional design with smooth animations and transitions
- 📱 **Fully Responsive** - Optimized for mobile (375px), tablet (768px), and desktop (1280px+) viewports
- 🧪 **Comprehensive Testing** - 30+ automated E2E test scenarios covering all user workflows
- 🌍 **Cross-Browser Support** - Tested on Chromium, Firefox, and WebKit browsers

## 📖 Pages Overview

### 1. Product Listing Page (`/`)
The main shopping hub where users discover products.

**Key Features:**
- ✅ Grid layout displaying all products with product cards
- ✅ Category filtering (All, Electronics, Accessories, Storage)
- ✅ Product count display ("Showing X products")
- ✅ Click any product to view detailed information
- ✅ Quick view: product name, price, category, and availability status

### 2. Product Details Page (`/product/:productId`)
Complete product information page with purchase options.

**Key Features:**
- ✅ High-quality product image display
- ✅ Full product specifications (name, category, price, SKU)
- ✅ Stock status indicator (In Stock / Out of Stock)
- ✅ Quantity selector with +/- buttons (min quantity: 1)
- ✅ "Add to Cart" button (disabled if out of stock)
- ✅ Product description and detailed specifications
- ✅ Shipping information and return policy
- ✅ Success notification when added to cart
- ✅ "Back to Products" navigation button

### 3. Shopping Cart Page (`/cart`)
Review and manage items before checkout.

**Key Features:**
- ✅ List of all cart items with product details and images
- ✅ Quantity adjustment per item (+/- buttons)
- ✅ Remove individual items from cart
- ✅ Order summary showing:
  - Subtotal (sum of all items)
  - Tax calculation (10% of subtotal)
  - Shipping (Free)
  - **Total (with tax and shipping)**
- ✅ "Clear Cart" option to remove all items at once
- ✅ "Continue Shopping" link to return to products
- ✅ "Proceed to Checkout" button to place order
- ✅ Real-time total updates as quantities change

### 4. Checkout Page (`/checkout`)
Complete order placement experience with form validation.

**Shipping Information Section:**
- First Name, Last Name (required)
- Email Address (required, with email validation)
- Phone Number (required)
- Street Address (required)
- City, State, ZIP Code (required)

**Payment Information Section:**
- Card Number (required, 13-19 digits)
- Cardholder Name (required)
- Expiry Date (MM/YY format, required)
- CVV (3-4 digits, required)

**Order Summary Sidebar:**
- Cart items preview (with thumbnails)
- Subtotal, tax, and shipping breakdown
- Total amount with tax
- Security badge

**Features:**
- ✅ Real-time form validation with error messages
- ✅ Prevents submission with invalid data
- ✅ Mock payment processing (1.5s delay simulating network)
- ✅ Order confirmation page upon success
- ✅ Unique order number generation (format: ORD-TIMESTAMP-RANDOM)

**Order Confirmation Page:**
- Order number and submission timestamp
- Estimated delivery date
- Order details summary
- "Back to Home" button to return to shopping

### 5. Order History Page (`/orders`)
Track and search all submitted orders.

**Key Features:**
- ✅ Search orders by customer email
- ✅ Order statistics dashboard:
  - Total orders submitted
  - Total revenue
  - Order status breakdown (confirmed, shipped, delivered)
- ✅ Order cards showing:
  - Order number and date
  - Customer email
  - Order total
  - Status badge (color-coded)
- ✅ Expandable order details revealing:
  - Complete shipping address
  - Ordered items with quantities and prices
  - Payment summary
  - Estimated delivery date
  - Order status timeline

## 📁 Project Structure

```
dummy-ecom/
├── e2e/                                    # End-to-End Testing Suite
│   ├── app/
│   │   └── app.factory.js                  # App factory - initializes all page objects
│   ├── data/
│   │   ├── checkout-flow.data.js           # Checkout test input data
│   │   └── product-listing.data.js         # Expected values for testing
│   ├── fixtures/
│   │   └── test-base.js                    # Shared Playwright fixture
│   ├── pages/                              # Page Object Model (POM)
│   │   ├── header.page.js                  # Header navigation selectors
│   │   ├── product-details.page.js         # Product details page selectors
│   │   ├── product-listing.page.js         # Product listing page selectors
│   │   ├── shopping-cart.page.js           # Shopping cart page selectors
│   │   └── checkout.page.js                # Checkout page selectors
│   ├── tests/
│   │   ├── product-listing/
│   │   │   └── product-listing.smoke.spec.js
│   │   ├── product-detail/                 # 8 comprehensive test files
│   │   │   ├── product-detail-rendering.smoke.spec.js          # Page load & rendering
│   │   │   ├── product-detail-navigation.smoke.spec.js         # Navigation flows
│   │   │   ├── product-detail-instock.smoke.spec.js            # In-stock behaviors
│   │   │   ├── product-detail-outofstock.smoke.spec.js         # Out-of-stock handling
│   │   │   ├── product-detail-add-to-cart.smoke.spec.js        # Add to cart flows
│   │   │   ├── product-detail-error-handling.smoke.spec.js     # Invalid product ID handling
│   │   │   ├── product-detail-data-integrity.smoke.spec.js     # Data accuracy verification
│   │   │   └── product-detail-responsive-crossbrowser.smoke.spec.js # Responsive & cross-browser
│   │   └── checkout/
│   │       └── product-checkout.smoke.spec.js
│   └── scenarios/
│       └── product-detail-page-scenarios.md # Test scenario documentation
├── src/
│   ├── components/
│   │   ├── Header.jsx & Header.css                # Navigation header
│   │   ├── ProductCard.jsx & ProductCard.css      # Product card component
│   │   ├── ProductListing.jsx & ProductListing.css
│   │   ├── ProductDetails.jsx & ProductDetails.css
│   │   ├── ShoppingCart.jsx & ShoppingCart.css
│   │   ├── Checkout.jsx & Checkout.css
│   │   └── OrderHistory.jsx & OrderHistory.css
│   ├── context/
│   │   └── CartContext.jsx                 # Global cart state (React Context)
│   ├── data/
│   │   └── products.json                   # Mock product database (8 products)
│   ├── services/
│   │   ├── orderService.js                 # Order management & localStorage
│   │   └── mockApiService.js               # Mock API helpers
│   ├── App.jsx                             # Main app with routing
│   ├── main.jsx                            # React entry point
│   └── index.css
├── public/                                 # Static assets
├── index.html                              # HTML entry point
├── playwright.config.js                    # Playwright config (3 browsers)
├── vite.config.js                          # Vite config
└── package.json                            # Dependencies
```

## 🧪 E2E Test Automation

### Overview
Comprehensive Playwright test suite covering 30+ test scenarios organized by **UI functionality** for clarity and maintainability. Tests ensure quality across product browsing, shopping cart management, checkout flows, order tracking, and cross-browser/responsive behaviors.

### Test Coverage Breakdown

#### **Product Listing Page Tests** (`product-listing/`)
- ✅ Page renders correctly with all products
- ✅ Category filtering works (All, Electronics, Accessories, Storage)
- ✅ Product count updates based on filter

#### **Product Details Page Tests** (`product-detail/`)
Organized into 8 specialized test files:

1. **Rendering** (`product-detail-rendering.smoke.spec.js`)
   - Page loads successfully with valid product ID
   - All product information displays correctly
   - Images, prices, descriptions, and specs render
   - Shipping and returns info boxes visible

2. **Navigation** (`product-detail-navigation.smoke.spec.js`)
   - Click product card from listing to view details
   - "Back to Products" button navigates to listing
   - Browser back button works correctly
   - Direct URL navigation to `/product/:productId` works

3. **In-Stock Behavior** (`product-detail-instock.smoke.spec.js`)
   - In-stock badge displays for available products
   - Quantity selector shows and works correctly
   - "Add to Cart" button is enabled
   - Default quantity is 1
   - +/- buttons increment/decrement correctly
   - Minimum quantity is enforced (no going below 1)

4. **Out-of-Stock Behavior** (`product-detail-outofstock.smoke.spec.js`)
   - Out-of-stock banner displays on product image
   - "Out of Stock" badge shows in status section
   - Quantity selector is hidden
   - "Out of Stock" button appears but is not clickable

5. **Add to Cart Functional Scenarios** (`product-detail-add-to-cart.smoke.spec.js`)
   - Clicking "Add to Cart" adds 1 unit with quantity = 1
   - Clicking "Add to Cart" adds selected quantity when > 1
   - Success state ("Added to Cart") appears temporarily
   - Cart badge in header updates with new count
   - Product appears in cart page with correct details
   - Line item quantity in cart matches selected quantity

6. **Invalid Product / Error Handling** (`product-detail-error-handling.smoke.spec.js`)
   - Invalid product IDs (e.g., 99999) show "Product Not Found"
   - User-friendly error message displays
   - "Back to Products" button appears in error state
   - Clicking "Back to Products" returns to listing
   - Error state is consistent across multiple invalid IDs
   - Keyboard navigation works in error state

7. **Data Integrity & Content Accuracy** (`product-detail-data-integrity.smoke.spec.js`)
   - Product name matches `products.json` data
   - Product price matches source data
   - Product category matches source data
   - Product description matches source data
   - In-stock/out-of-stock status matches data
   - Product ID in specs matches URL parameter
   - Image alt text matches product name
   - Data consistency verified across repeated visits

8. **Responsive & Cross-Browser** (`product-detail-responsive-crossbrowser.smoke.spec.js`)
   - Mobile viewport (375x667) layout is usable
   - Tablet viewport (768x1024) layout is usable
   - Desktop viewport (1280x720) layout is usable
   - No overlapping or clipped UI elements across viewports
   - No unwanted horizontal scrolling
   - Touch-friendly button sizes (min 44x44px)
   - Text is readable across all viewports
   - Images scale properly on different devices
   - **Cross-browser consistency** (Chromium, Firefox, WebKit):
     - Core functionality works on all browsers
     - Form interactions work consistently
     - Styling renders consistently

#### **Checkout Flow Tests** (`checkout/`)
- ✅ Complete checkout flow from cart to confirmation
- ✅ Form validation (email, card number, required fields)
- ✅ Order submission succeeds
- ✅ Order confirmation displays correctly
- ✅ Cart clears after order submission

### Running Tests

**Run all tests:**
```bash
npm run test:e2e
```

**Run only smoke tests (quick validation):**
```bash
npm run test:e2e:smoke
```

**Run tests for specific page:**
```bash
# Product listing tests
npx playwright test product-listing.smoke.spec.js

# All product detail tests
npx playwright test product-detail/

# Specific test file
npx playwright test product-detail/product-detail-add-to-cart.smoke.spec.js
```

**Run tests on specific browser:**
```bash
# Firefox only
npx playwright test --project=firefox

# WebKit only
npx playwright test --project=webkit

# All browsers
npx playwright test  # Runs Chromium, Firefox, WebKit
```

**Run tests in headed mode (see browser):**
```bash
npx playwright test --headed
```

**Run tests in debug mode (interactive):**
```bash
npx playwright test --debug
```

**Run with specific test name pattern:**
```bash
npx playwright test -g "Add to Cart"
```

**View test results:**
```bash
npx playwright show-report
```

### Test Framework Architecture

- **Page Object Model (POM)**: Encapsulates selectors and interactions
- **App Factory**: Initializes all page objects for test reuse
- **Shared Fixture**: Provides `app` object with all page objects to tests
- **Test Data**: Centralized expected values and test inputs
- **Tag System**: Tests tagged with `@smoke` for quick runs

### Test Data & Attributes
All UI elements include `data-testid` attributes following kebab-case convention:
- Product cards: `data-testid="product-card-{id}"`
- Buttons: `data-testid="add-to-cart-btn-{id}"`
- Form inputs: `data-testid="input-{fieldName}"`
- Form errors: `data-testid="error-{fieldName}"`

This enables robust, maintainable selectors that are resilient to UI changes.

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** v14 or higher (download from [nodejs.org](https://nodejs.org))
- **npm** (comes with Node.js) or **yarn**
- **Git** (optional, for cloning repository)

### Installation

1. **Clone or download the repository:**
```bash
git clone <repository-url>
cd dummy-ecom
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm run dev
```

The application will automatically open in your browser at `http://localhost:5173`

### Development Server

The dev server includes:
- ✅ Auto-reload on file changes (Hot Module Replacement)
- ✅ Fast build times with Vite
- ✅ Error overlay for debugging

### Build for Production

1. **Create optimized production build:**
```bash
npm run build
```

This creates a `dist/` folder with minified, optimized code.

2. **Preview production build locally:**
```bash
npm run preview
```

This serves the production build at `http://localhost:4173` for testing before deployment.

## 🛠️ Technologies Used

### Frontend Stack
| Technology | Purpose | Version |
|-----------|---------|---------|
| **React** | UI library for building components | ^19.2.5 |
| **React Router** | Client-side routing for multi-page experience | ^7.14.2 |
| **React Context API** | Global state management for shopping cart | Built-in |
| **Vite** | Fast build tool and dev server | ^8.0.9 |
| **CSS3** | Styling with Flexbox and Grid | Built-in |

### Testing Stack
| Technology | Purpose |
|-----------|---------|
| **Playwright** | E2E test automation framework |
| **Page Object Model** | Test architecture pattern |
| **Node.js** | Test runtime environment |

### Development Tools
- **npm** - Package manager
- **Git** - Version control
- **VS Code** - Recommended code editor

## 📊 Data Structure

### Product Data (`src/data/products.json`)
All products are stored in a JSON file with the following structure:

```json
{
  "id": 1,
  "name": "Wireless Headphones",
  "price": 79.99,
  "image": "https://via.placeholder.com/300x200?text=Wireless+Headphones",
  "description": "High-quality wireless headphones with noise cancellation",
  "category": "Electronics",
  "inStock": true
}
```

**Available Categories:**
- Electronics (e.g., headphones, webcams)
- Accessories (e.g., cables, chargers, keyboard)
- Storage (e.g., portable SSDs)

**Sample Products in Database:**
1. Wireless Headphones - $79.99 (Electronics, In Stock)
2. USB-C Cable - $12.99 (Accessories, In Stock)
3. 4K Webcam - $129.99 (Electronics, In Stock)
4. Mechanical Keyboard - $149.99 (Accessories, In Stock)
5. Laptop Stand - $39.99 (Accessories, **Out of Stock**)
6. Portable SSD - $199.99 (Storage, In Stock)
7. Phone Charger - $24.99 (Accessories, In Stock)
8. Monitor Arm - $89.99 (Accessories, In Stock)

To add more products, simply add new objects to the JSON array in `src/data/products.json`.

### Cart Data (React Context)
Cart state is managed globally using React Context API:
```javascript
{
  cartItems: [
    {
      id: 1,
      name: "Product Name",
      price: 99.99,
      quantity: 2,
      // ... other product fields
    }
  ]
}
```

Cart persists across page navigation but **not** across browser sessions (stored in memory).

### Order Data (localStorage)
Orders are persisted in browser localStorage with structure:
```json
{
  "id": "unique-uuid",
  "orderNumber": "ORD-1234567890-123",
  "customerInfo": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "123-456-7890",
    "address": "123 Main St",
    "city": "Springfield",
    "state": "IL",
    "zipCode": "62701"
  },
  "items": [
    {
      "id": 1,
      "name": "Wireless Headphones",
      "price": 79.99,
      "quantity": 2
    }
  ],
  "subtotal": 159.98,
  "tax": 15.99,
  "shipping": 0,
  "totalAmount": 175.97,
  "status": "confirmed",
  "paymentStatus": "completed",
  "createdAt": "2025-04-23T10:30:00Z",
  "estimatedDelivery": "2025-04-26T10:30:00Z"
}
```

**Order Statuses:**
- `confirmed` - Order received and confirmed
- `shipped` - Order is being shipped
- `delivered` - Order delivered
- `cancelled` - Order cancelled

## 🎯 Core Feature Workflows

### Shopping Workflow

**1. Browse Products**
- Visit the homepage to see all products
- Use category filter to narrow down choices
- Click "View Details" to see full product information

**2. Select & Add to Cart**
- On product detail page, adjust quantity (1+)
- Click "Add to Cart" 
- See success message confirming addition
- Cart badge in header updates automatically

**3. Review Cart**
- Click cart icon in header to view cart
- See all items with images, prices, and subtotals
- Adjust quantities or remove items as needed
- View calculated total (subtotal + tax + shipping)

**4. Checkout**
- Click "Proceed to Checkout"
- Enter shipping address
- Enter payment information
- Review order summary sidebar
- Click "Place Order" to submit

**5. Confirmation & Order History**
- See order confirmation with order number
- Later, visit "Order History" to track status
- Search for orders by email address

### Cart Management

| Action | How | Effect |
|--------|-----|--------|
| **Add Item** | Click "Add to Cart" on product page | Item added with selected quantity |
| **Update Qty** | Click +/- buttons on cart item | Quantity updates, total recalculates |
| **Remove Item** | Click X button next to cart item | Item removed from cart |
| **Clear Cart** | Click "Clear Cart" button | All items removed, cart emptied |
| **View Cart** | Click cart icon in header | Navigate to `/cart` page |

### Order Management

| Action | How | Effect |
|--------|-----|--------|
| **Submit Order** | Complete checkout form and click "Place Order" | Order saved to localStorage |
| **View Orders** | Click "Orders" in header | Navigate to `/orders` page |
| **Search Orders** | Enter email and click "Search" | Filter orders by customer email |
| **View Details** | Click order card to expand | See items, address, payment, status |

## 📦 Order Management System

### Order Submission
When you submit an order during checkout, the following happens:

1. ✅ Form validation ensures all fields are filled and valid
2. ✅ Payment processing simulates network delay (1.5 seconds)
3. ✅ Unique order number is generated (format: `ORD-TIMESTAMP-RANDOM`)
4. ✅ Order is saved to browser localStorage
5. ✅ Automatic estimated delivery date is calculated (3 days from now)
6. ✅ Confirmation page displays with order details
7. ✅ Cart is automatically cleared

### Order Service API

The `orderService.js` provides methods to manage orders:

```javascript
// Submit a new order
await orderService.submitOrder(customerInfo, cartItems, totalAmount);

// Retrieve all orders
const allOrders = orderService.getOrders();

// Get specific order by ID
const order = orderService.getOrderById(orderId);

// Search orders by customer email
const userOrders = orderService.getOrdersByEmail('john@example.com');

// Update order status
await orderService.updateOrderStatus(orderId, 'shipped');

// Cancel an order
await orderService.cancelOrder(orderId);

// Get order statistics
const stats = orderService.getOrderStats();
// Returns: { totalOrders, totalRevenue, byStatus: {...} }

// Clear all orders (testing only)
orderService.clearAllOrders();
```

### Validation Rules

**Shipping Information:**
- ✅ All fields required (first name, last name, email, phone, address, city, state, zip)
- ✅ Email must match pattern: `user@domain.com`
- ✅ Phone must be valid format

**Payment Information:**
- ✅ Card number: 13-19 digits required
- ✅ Cardholder name: Required
- ✅ Expiry date: MM/YY format required
- ✅ CVV: 3-4 digits required

**Error Handling:**
- Real-time validation as user types
- Error messages display below invalid fields
- Form submission blocked until all errors resolved
- Invalid product ID shows "Product Not Found" page

## 🗺️ Application Navigation

### Navigation Routes

| Page | URL | Access | Purpose |
|------|-----|--------|---------|
| **Product Listing** | `/` | Direct or click logo | Browse all products |
| **Product Details** | `/product/:productId` | Click product card | View product info & add to cart |
| **Shopping Cart** | `/cart` | Click cart icon header | Review and manage cart items |
| **Checkout** | `/checkout` | Click "Proceed to Checkout" | Place order with payment |
| **Order Confirmation** | `/checkout/success` | After order placed | View order confirmation |
| **Order History** | `/orders` | Click "Orders" in header | Track and search orders |

### Header Navigation Components

```
┌─────────────────────────────────────────────────────────┐
│  TechHub  🛒(Cart)  📦(Orders)                          │
└─────────────────────────────────────────────────────────┘
```

- **Logo** - Clicking TechHub takes you to product listing
- **Cart Icon** - Shows badge with item count (only if cart not empty)
- **Orders Icon** - Takes you to order history page

### How to Navigate Between Pages

| From | To | How |
|------|-----|------|
| Listing | Details | Click any product card |
| Details | Listing | Click "Back to Products" button |
| Details | Cart | Add product and click header cart icon |
| Cart | Listing | Click product link or header logo |
| Cart | Checkout | Click "Proceed to Checkout" |
| Checkout | Cart | Click "Back" button |
| Confirmation | Listing | Click "Back to Home" |
| Orders | Any Page | Click TechHub logo or use header |

### Browser Navigation

- **Browser Back Button** - Works on all pages, returns to previous page
- **Browser Forward Button** - Works as expected after using back
- **Direct URL Entry** - Can navigate directly to any page (e.g., `http://localhost:5173/product/1`)

### Mobile Navigation

On mobile devices:
- Header navigation remains at top
- Touch-friendly button sizes (minimum 44x44px)
- Dropdown menus (if any) expand below header
- Back buttons are easily reachable

## 📱 Responsive Design

The application is fully responsive and optimized for all devices:

### Viewport Breakpoints

| Device | Width | Layout | Features |
|--------|-------|--------|----------|
| **Mobile** | 375px - 480px | Single column | Stack layout, large touch targets |
| **Tablet** | 481px - 1024px | 2-3 columns | Balanced spacing, readable fonts |
| **Desktop** | 1025px+ | 3-4 columns | Optimized spacing, hover effects |

### Responsive Behaviors

**Product Grid:**
- Mobile: 1 column (full width)
- Tablet: 2 columns
- Desktop: 3-4 columns (auto-fill)

**Product Images:**
- Scale proportionally on all sizes
- Maintain aspect ratio
- No overflow or clipping

**Forms (Checkout):**
- Mobile: Full width inputs, stacked layout
- Tablet: 2-column layout
- Desktop: Side-by-side shipping & payment

**Buttons & Touch Targets:**
- Minimum 44x44px on mobile
- Easily tappable spacing
- No accidental clicks on adjacent elements

### Tested Viewports

- ✅ iPhone SE (375x667)
- ✅ iPad (768x1024)
- ✅ Desktop HD (1280x720)
- ✅ Desktop Full HD (1920x1080)

### Design Features

- 🎨 Gradient backgrounds for visual appeal
- ✨ Smooth animations and transitions
- 🎯 High contrast for readability
- ♿ Accessible color schemes
- 📝 Readable font sizes (minimum 12px)

## 🌍 Browser Support

The application is tested and works on all modern browsers:

| Browser | Version | Status |
|---------|---------|--------|
| **Chrome** | Latest | ✅ Fully Supported |
| **Firefox** | Latest | ✅ Fully Supported |
| **Safari** | Latest | ✅ Fully Supported |
| **Edge** | Latest | ✅ Fully Supported |

### Cross-Browser Testing

All features are automatically tested across Chromium, Firefox, and WebKit browsers using Playwright to ensure consistent behavior:
- ✅ Navigation works consistently
- ✅ Forms validate the same way
- ✅ Styling renders identically
- ✅ Interactions respond the same

## 💡 Future Enhancements

You can expand this application with:
- ❤️ Favorites/Wishlist functionality
- 🔍 Product search and filtering
- ⭐ Product reviews and ratings
- 💬 Customer comments and Q&A
- 📊 Product sorting (by price, name, popularity)
- 🔐 User authentication and accounts
- 💳 Real payment gateway integration
- 📸 Product image gallery with zoom
- 📦 Real-time order tracking
- 🎁 Coupon/discount code system
- 👥 Customer testimonials and social proof
- 📱 Mobile app version
- 🔔 Push notifications for orders
- 🌐 Multiple language support
- 💬 Live chat support

## ❓ FAQ & Troubleshooting

### Common Issues & Solutions

**Q: Application won't start**
- A: Make sure Node.js is installed and `npm install` completed successfully
- Check that port 5173 is not in use by another application

**Q: Cart data disappears after page refresh**
- A: This is expected - cart uses React Context (in-memory storage)
- Order data persists in localStorage and survives refresh

**Q: Tests won't run**
- A: Ensure Playwright is installed: `npm install`
- Make sure development server isn't running on port 4173
- Check: `npm run test:e2e`

**Q: How do I add more products?**
- A: Edit `src/data/products.json` and add new product objects
- Use the same structure as existing products

**Q: Can I use real payment processing?**
- A: Currently uses mock payment (no real charges)
- To add real payments, integrate Stripe or similar service

**Q: How do I deploy this?**
- A: Run `npm run build` to create production build
- Deploy the `dist/` folder to hosting (Netlify, Vercel, etc.)

## 📞 Support & Contribution

This is a demo project designed for learning and testing purposes. For issues or improvements:
1. Check the test scenarios in `e2e/scenarios/`
2. Review test coverage in `e2e/tests/`
3. Refer to component documentation in code comments

## License

ISC

## Author

Your Name

---

Happy coding! 🎉

