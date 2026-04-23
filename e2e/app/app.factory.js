const { ProductListingPage } = require('../pages/product-listing.page');
const { ProductDetailsPage } = require('../pages/product-details.page');
const { ShoppingCartPage } = require('../pages/shopping-cart.page');
const { CheckoutPage } = require('../pages/checkout.page');

class App {
  constructor(page) {
    this.page = page;
    this.productListingPage = new ProductListingPage(page);
    this.productDetailsPage = new ProductDetailsPage(page);
    this.shoppingCartPage = new ShoppingCartPage(page);
    this.checkoutPage = new CheckoutPage(page);
  }
}

module.exports = {
  App,
};
