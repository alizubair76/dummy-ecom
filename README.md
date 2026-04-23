# Dummy E-Commerce UI

A simple E-Commerce application built with React and Vite, featuring product listing, product details, shopping cart, and checkout.

## Features

✨ **Product Listing Page** - Browse all products with category filtering
📱 **Product Details Page** - View detailed product information  
🛒 **Shopping Cart** - Add items to cart, update quantities, and view order summary
💳 **Checkout Page** - User details form and payment information
� **Order History** - Track your orders and view order details
🔀 **Client-Side Routing** - Smooth navigation between pages
💾 **State Management** - Cart and order data using React Context & localStorage
🎨 **Modern UI** - Clean, responsive design with smooth animations
📱 **Fully Responsive** - Works on mobile, tablet, and desktop

## Pages

### 1. Product Listing Page (`/`)
- Displays all products in a grid layout
- Filter products by category
- Click on any product card to view details
- Shows product name, price, category, and availability

### 2. Product Details Page (`/product/:productId`)
- Full product information
- Large product image
- Quantity selector
- Add to Cart button (updates cart count)
- Stock status indicator
- Shipping and return information
- Back button to return to listing

### 3. Shopping Cart (`/cart`)
- View all items added to cart
- Update quantity for each item
- Remove items from cart
- View order summary with:
  - Subtotal price
  - Tax (10%)
  - Free shipping
  - Total with tax
- Proceed to checkout button
- Clear cart option

### 4. Checkout Page (`/checkout`)
- **Shipping Information Form**:
  - First Name, Last Name
  - Email Address
  - Phone Number
  - Street Address
  - City, State, ZIP Code

- **Payment Information Form**:
  - Card Number (with validation)
  - Cardholder Name
  - Expiry Date (MM/YY)
  - CVV (3-4 digits)

- **Order Summary Sidebar**:
  - Cart items preview with images
  - Subtotal, Tax, and Shipping breakdown
  - Total amount with tax
  - Security badge

- **Form Validation**:
  - Required field validation
  - Email format validation
  - Card number validation
  - Real-time error messages

- **Order Confirmation**:
  - Success page after order placement
  - Order details display
  - Confirmation email notice
  - Estimated delivery time
  - Back to home button

### 5. Order History Page (`/orders`)
- View all submitted orders with search functionality
- Search orders by customer email
- Order statistics:
  - Total orders count
  - Total revenue
  - Order status breakdown
- Click to expand order details:
  - Order number and date
  - Customer information
  - Items ordered with quantities and prices
  - Payment summary with tax and total
  - Order status with color-coded badges
  - Estimated delivery date

## Project Structure

```
dummy-ecom/
├── e2e/
│   ├── app/
│   │   └── app.factory.js              # App factory composed in test fixture
│   ├── data/
│   │   ├── checkout-flow.data.js       # Checkout test input data
│   │   └── product-listing.data.js     # Product listing expected values
│   ├── fixtures/
│   │   └── test-base.js                # Shared Playwright fixture (exposes { app })
│   ├── pages/
│   │   ├── checkout.page.js            # Checkout page object
│   │   ├── product-details.page.js     # Product details page object
│   │   ├── product-listing.page.js     # Product listing page object
│   │   └── shopping-cart.page.js       # Shopping cart page object
│   ├── tests/
│   │   ├── checkout/
│   │   │   └── product-checkout.smoke.spec.js
│   │   ├── product-detail/
│   │   │   ├── product-detail-rendering.smoke.spec.js
│   │   │   ├── product-detail-navigation.smoke.spec.js
│   │   │   └── product-detail-instock.smoke.spec.js
│   │   └── product-listing/
│   │       └── product-listing.smoke.spec.js
│   └── product-detail-page-scenarios.md # Product detail scenario catalogue
├── src/
│   ├── components/
│   │   ├── Header.jsx                 # Navigation header with cart and orders link
│   │   ├── Header.css
│   │   ├── ProductCard.jsx            # Product card component (clickable)
│   │   ├── ProductCard.css
│   │   ├── ProductListing.jsx         # Product listing page
│   │   ├── ProductListing.css
│   │   ├── ProductDetails.jsx         # Product details page
│   │   ├── ProductDetails.css
│   │   ├── ShoppingCart.jsx           # Shopping cart page
│   │   ├── ShoppingCart.css
│   │   ├── Checkout.jsx               # Checkout page with form and order submission
│   │   ├── Checkout.css
│   │   ├── OrderHistory.jsx           # Order history and tracking page
│   │   └── OrderHistory.css
│   ├── context/
│   │   └── CartContext.jsx            # Cart state management using Context API
│   ├── data/
│   │   └── products.json              # Mock product data
│   ├── services/
│   │   ├── orderService.js            # Order submission and management service
│   │   └── mockApiService.js          # Mock API helpers
│   ├── App.jsx                        # Main app component with routing
│   ├── App.css
│   ├── main.jsx                       # React entry point
│   └── index.css
├── public/                            # Static assets
├── index.html                         # HTML entry point
├── playwright.config.js               # Playwright configuration and web server
├── vite.config.js                    # Vite configuration
└── package.json                      # Project dependencies
```

## E2E Test Automation Structure

The E2E suite is organized by **UI functionality** instead of test type to keep related coverage together and make ownership clearer.

- `e2e/tests/product-listing/`
  - `product-listing.smoke.spec.js`: validates listing page rendering and category filtering.
- `e2e/tests/product-detail/`
  - `product-detail-rendering.smoke.spec.js`: validates product detail page load and core rendering blocks.
  - `product-detail-navigation.smoke.spec.js`: validates listing-to-detail, back-to-listing, browser back, and direct URL navigation flows.
  - `product-detail-instock.smoke.spec.js`: validates in-stock controls, quantity behavior, and input constraints.
- `e2e/tests/checkout/`
  - `product-checkout.smoke.spec.js`: validates complete checkout flow from listing to order confirmation.

### Framework Design

- `App Factory` (`e2e/app/app.factory.js`): initializes all page objects once and exposes a single `app` fixture object in tests.
- `Page Objects` (`e2e/pages/`): encapsulate locators and page interactions; tests avoid direct locator usage.
- `Fixture` (`e2e/fixtures/test-base.js`): initializes Playwright test with `app`.
- `Test Data` (`e2e/data/`): centralizes expected data and reusable inputs.

### Running E2E Tests

```bash
npm run test:e2e
```

Run only smoke-tagged coverage:

```bash
npm run test:e2e:smoke
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

The application will automatically open in your browser at `http://localhost:5173`

### Build

Create a production build:
```bash
npm run build
```

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## Technologies Used

- **React** - UI library
- **React Router** - Client-side routing
- **React Context API** - State management for shopping cart
- **Vite** - Build tool and dev server
- **CSS3** - Styling with flexbox and grid

## Product Data

Products are loaded from `src/data/products.json`. Each product includes:

```json
{
  "id": 1,
  "name": "Product Name",
  "price": 99.99,
  "image": "https://example.com/image.jpg",
  "description": "Product description",
  "category": "Category Name",
  "inStock": true
}
```

## Features

### Product Listing
- Display all products in a responsive grid
- Filter by category (All, Electronics, Accessories, Storage)
- Product count display
- View Details button on each product

### Product Details
- Large product image
- Full product information
- Stock status with indicator
- Quantity selector (min 1, max unlimited)
- Add to Cart button with success feedback
- Product specification details
- Shipping and return policy information

### Shopping Cart
- View all items in cart
- Update quantity for each item
- Remove individual items
- Clear entire cart
- Order summary with totals
- Continue shopping link
- Proceed to checkout button

## Cart Features

- **Add to Cart** - Click "Add to Cart" on product details page
- **Update Quantity** - Use +/- buttons or type quantity directly
- **Remove Item** - Click the X button next to any cart item
- **Clear Cart** - Remove all items at once
- **Cart Icon Badge** - Shows total number of items in cart (on header)
- **Real-time Updates** - Cart updates immediately when items are added/removed

## Order Submission & Management

### Order Service (`orderService.js`)
The application includes a comprehensive order management system that handles:

**Order Submission**
```javascript
// Submit an order with customer info and cart items
await orderService.submitOrder(customerInfo, cartItems, totalAmount);
```

**Features:**
- ✅ Form validation (email, card number, required fields)
- 🔒 Mock payment processing (1.5s delay to simulate network)
- 📦 Generates unique order numbers (format: ORD-TIMESTAMP-RANDOM)
- 💾 Stores orders in browser localStorage
- 📧 Captures customer contact information
- 🚚 Automatic estimated delivery date calculation
- 📋 Order status tracking (confirmed, shipped, delivered, cancelled)

**Order Data Storage**
Orders are stored in localStorage with the following structure:
```javascript
{
  id: "unique-id",
  orderNumber: "ORD-1234567890-123",
  customerInfo: {
    firstName, lastName, email, phone,
    address, city, state, zipCode
  },
  items: [/* cart items */],
  totalAmount: 99.99,
  tax: 9.99,
  subtotal: 90.00,
  shipping: 0,
  status: "confirmed",
  createdAt: "2025-04-22T12:22:00Z",
  estimatedDelivery: "2025-04-25T12:22:00Z",
  paymentStatus: "completed"
}
```

### Available Order Service Methods

- `submitOrder(customerInfo, cartItems, totalAmount)` - Submit new order
- `getOrders()` - Get all orders
- `getOrderById(orderId)` - Get specific order
- `getOrdersByEmail(email)` - Search orders by customer email
- `updateOrderStatus(orderId, newStatus)` - Update order status
- `cancelOrder(orderId)` - Cancel an order
- `getOrderStats()` - Get order statistics
- `clearAllOrders()` - Clear all orders (for testing)

## Navigation

- Product Listing ↔ Product Details (click product card)
- Product Listing ↔ Shopping Cart (click cart icon in header)
- Product Listing ↔ Order History (click orders icon in header)
- Checkout → Order History (after successful order)
- Back buttons available on detail, cart, and checkout pages

## Checkout Flow

1. **Review Cart** - View items and total
2. **Enter Shipping Details** - Address, phone, email
3. **Enter Payment Info** - Mock payment details
4. **Validate Form** - Real-time validation
5. **Submit Order** - Process order
6. **Confirmation** - View order number and details
7. **Order History** - Track order status anytime

## Responsive Design

The application is fully responsive with breakpoints for:
- 📱 Mobile (480px and below)
- 📱 Tablet (768px and below)
- 🖥️ Desktop (1200px and above)

Grid layouts adjust from:
- Desktop: Auto-fill columns (minmax 250px)
- Tablet: 2-3 columns
- Mobile: Single column

## Future Enhancements

You can add the following features:
- ❤️ Favorites/Wishlist
- 🔍 Product search
- ⭐ Product reviews and ratings
- 💬 Customer comments
- 📊 Product sorting (by price, name, etc.)
- 🔐 User authentication
- 💳 Checkout process with payment
- 📸 Product image gallery
- 📦 Order tracking
- 🎁 Coupon/discount codes
- 👥 User reviews and testimonials

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

ISC

## Author

Your Name

---

Happy coding! 🎉

