class ShoppingCartPage {
  constructor(page) {
    this.page = page;
    this.container = page.getByTestId('shopping-cart-container');
    this.pageTitle = page.getByTestId('cart-page-title');
    this.checkoutButton = page.getByTestId('checkout-btn');
  }

  cartItemName(productId) {
    return this.page.getByTestId(`cart-item-name-${productId}`);
  }

  cartItemQuantityInput(productId) {
    return this.page.getByTestId(`qty-input-${productId}`);
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}

module.exports = {
  ShoppingCartPage,
};
