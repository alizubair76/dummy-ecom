class ProductDetailsPage {
  constructor(page) {
    this.page = page;
    this.container = page.getByTestId('product-details-container');
    this.backToProductsButton = page.getByTestId('back-to-products-btn');
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

  inStockBadge(productId) {
    return this.page.getByTestId(`in-stock-badge-${productId}`);
  }

  outOfStockBanner(productId) {
    return this.page.getByTestId(`out-of-stock-banner-${productId}`);
  }

  outOfStockBadge(productId) {
    return this.page.getByTestId(`out-of-stock-badge-${productId}`);
  }

  outOfStockButton(productId) {
    return this.page.getByTestId(`out-of-stock-btn-${productId}`);
  }

  quantitySelector(productId) {
    return this.page.getByTestId(`quantity-selector-${productId}`);
  }

  quantityDecrementButton(productId) {
    return this.page.getByTestId(`qty-decrement-btn-${productId}`);
  }

  quantityIncrementButton(productId) {
    return this.page.getByTestId(`qty-increment-btn-${productId}`);
  }

  image(productId) {
    return this.page.getByTestId(`product-img-${productId}`);
  }

  categoryBadge(productId) {
    return this.page.getByTestId(`product-category-${productId}`);
  }

  price(productId) {
    return this.page.getByTestId(`product-price-${productId}`);
  }

  descriptionSection(productId) {
    return this.page.getByTestId(`product-description-section-${productId}`);
  }

  specsSection(productId) {
    return this.page.getByTestId(`product-specs-${productId}`);
  }

  specId(productId) {
    return this.page.getByTestId(`spec-id-${productId}`);
  }

  specCategory(productId) {
    return this.page.getByTestId(`spec-category-${productId}`);
  }

  specAvailability(productId) {
    return this.page.getByTestId(`spec-availability-${productId}`);
  }

  shippingInfoBox(productId) {
    return this.page.getByTestId(`shipping-info-box-${productId}`);
  }

  returnsInfoBox(productId) {
    return this.page.getByTestId(`returns-info-box-${productId}`);
  }

  async gotoByProductId(productId) {
    await this.page.goto(`/product/${productId}`);
  }

  async goBackToProducts() {
    await this.backToProductsButton.click();
  }

  async goBackInBrowser() {
    await this.page.goBack();
  }

  async setQuantity(productId, quantity) {
    await this.quantityInput(productId).fill(String(quantity));
  }

  async incrementQuantity(productId) {
    await this.quantityIncrementButton(productId).click();
  }

  async decrementQuantity(productId) {
    await this.quantityDecrementButton(productId).click();
  }

  async addToCart(productId) {
    await this.addToCartButton(productId).click();
  }

  async clickOutOfStockButton(productId) {
    await this.outOfStockButton(productId).click();
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
