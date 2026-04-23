class ProductDetailsPage {
  constructor(page) {
    this.page = page;
    this.container = page.getByTestId('product-details-container');
  }

  name(productId) {
    return this.page.getByTestId(`product-name-${productId}`);
  }

  quantityInput(productId) {
    return this.page.getByTestId(`qty-input-${productId}`);
  }

  addToCartButton(productId) {
    return this.page.getByTestId(`add-to-cart-btn-${productId}`);
  }

  async setQuantity(productId, quantity) {
    await this.quantityInput(productId).fill(String(quantity));
  }

  async addToCart(productId) {
    await this.addToCartButton(productId).click();
  }

  cartBadge() {
    return this.page.getByTestId('cart-badge');
  }

  async goToCartFromHeader() {
    await this.page.getByTestId('cart-link').click();
  }
}

module.exports = {
  ProductDetailsPage,
};
