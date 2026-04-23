# Product Detail Page - Test Scenarios

This document lists comprehensive test scenarios for the product detail page (`/product/:productId`).

## 1) Page Load and Rendering

- Verify product detail page loads successfully for a valid product id.
- Verify product image is displayed.
- Verify product name is displayed.
- Verify product category badge is displayed.
- Verify product price is displayed in currency format (e.g., `$79.99`).
- Verify product description section is displayed.
- Verify product specs section is displayed with:
  - Product ID
  - Category
  - Availability
- Verify shipping info box is displayed.
- Verify returns and exchanges info box is displayed.
- Verify back button is displayed.

## 2) Navigation Scenarios

- Verify user can navigate to product detail page from product listing card click.
- Verify clicking `Back to Products` navigates to `/`.
- Verify browser back button returns to previous page correctly.
- Verify direct URL navigation to `/product/:productId` opens the correct product.

## 3) In-Stock Product Behavior

- Verify `In Stock` badge is shown when product is available.
- Verify quantity selector is displayed for in-stock product.
- Verify `Add to Cart` button is enabled for in-stock product.
- Verify default quantity value is `1`.
- Verify clicking `+` increments quantity by 1.
- Verify clicking `-` decrements quantity by 1 (minimum 1).
- Verify decrement button is disabled when quantity is `1`.
- Verify manual quantity input accepts valid positive integer.
- Verify quantity input does not allow value `0` or negative to be persisted.

## 4) Out-of-Stock Product Behavior

- Verify out-of-stock banner is displayed on product image.
- Verify `Out of Stock` badge is displayed in stock status section.
- Verify quantity selector is not shown for out-of-stock product.
- Verify `Out of Stock` action button is displayed.
- Verify out-of-stock action button is not actionable for add-to-cart behavior.

## 5) Add to Cart Functional Scenarios

- Verify clicking `Add to Cart` adds one unit when quantity is `1`.
- Verify clicking `Add to Cart` adds selected quantity when quantity > `1`.
- Verify temporary success state (`Added to Cart`) appears after add action.
- Verify cart badge count in header updates after adding product.
- Verify product appears in cart page after add-to-cart.
- Verify line item quantity in cart matches selected quantity from product page.

## 6) Invalid Product / Error Handling

- Verify invalid product id (e.g., `/product/99999`) shows `Product Not Found`.
- Verify not-found state shows user-friendly message.
- Verify not-found state shows `Back to Products` button.
- Verify clicking `Back to Products` from not-found state routes to `/`.

## 7) Data Integrity and Content Accuracy

- Verify product detail content matches source data (`products.json`) for:
  - Name
  - Price
  - Category
  - Description
  - In-stock/out-of-stock status
- Verify product id shown in specs matches URL parameter.
- Verify image `alt` text matches product name.

## 8) Accessibility Scenarios

- Verify page has one clear heading for product title.
- Verify actionable controls are keyboard reachable (tab navigation).
- Verify quantity buttons are operable via keyboard.
- Verify `Add to Cart` is keyboard operable.
- Verify image contains meaningful `alt` text.
- Verify visible focus indicator appears on interactive elements.

## 9) Responsive and Cross-Browser Scenarios

- Verify layout is usable on mobile viewport.
- Verify layout is usable on tablet viewport.
- Verify layout is usable on desktop viewport.
- Verify no overlapping or clipped UI elements across viewport sizes.
- Verify behavior is consistent in Chromium, Firefox, and WebKit.

## 10) Non-Functional Smoke Checks

- Verify product detail page renders within acceptable load time.
- Verify no uncaught console errors on page load.
- Verify no broken image links for product image.
- Verify no visual regression in key UI blocks (header, product info, action area).

## Suggested Automation Priority

1. Valid product rendering (critical)
2. Add to cart with quantity flow (critical)
3. Out-of-stock behavior (high)
4. Invalid product id handling (high)
5. Back navigation (medium)
6. Accessibility keyboard checks (medium)
7. Responsive checks (medium)
