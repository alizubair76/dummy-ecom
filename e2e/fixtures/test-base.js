const base = require('@playwright/test');
const { ProductListingPage } = require('../pages/product-listing.page');
const { ProductDetailsPage } = require('../pages/product-details.page');
const { ShoppingCartPage } = require('../pages/shopping-cart.page');
const { CheckoutPage } = require('../pages/checkout.page');

const test = base.test.extend({
  productListingPage: async ({ page }, use) => {
    const productListingPage = new ProductListingPage(page);
    await use(productListingPage);
  },
  productDetailsPage: async ({ page }, use) => {
    const productDetailsPage = new ProductDetailsPage(page);
    await use(productDetailsPage);
  },
  shoppingCartPage: async ({ page }, use) => {
    const shoppingCartPage = new ShoppingCartPage(page);
    await use(shoppingCartPage);
  },
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
});

module.exports = {
  test,
  expect: base.expect,
};
