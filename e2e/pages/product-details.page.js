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

  // Error handling methods
  notFoundContainer() {
    return this.page.getByTestId('product-not-found');
  }

  notFoundTitle() {
    return this.page.getByTestId('not-found-title');
  }

  notFoundMessage() {
    return this.page.getByTestId('not-found-message');
  }

  async backToProductsFromNotFound() {
    await this.backToProductsButton.click();
  }

  // Data integrity methods
  async getProductName(productId) {
    return await this.name(productId).textContent();
  }

  async getProductPrice(productId) {
    return await this.price(productId).textContent();
  }

  async getProductCategory(productId) {
    return await this.categoryBadge(productId).textContent();
  }

  async getProductDescription(productId) {
    return await this.descriptionSection(productId).textContent();
  }

  async getSpecId(productId) {
    return await this.specId(productId).textContent();
  }

  async getImageAltText(productId) {
    return await this.image(productId).getAttribute('alt');
  }

  async isInStock(productId) {
    return await this.inStockBadge(productId).isVisible();
  }

  async isOutOfStock(productId) {
    return await this.outOfStockBadge(productId).isVisible();
  }

  // Responsive testing methods
  async setMobileViewport() {
    await this.page.setViewportSize({ width: 375, height: 667 });
  }

  async setTabletViewport() {
    await this.page.setViewportSize({ width: 768, height: 1024 });
  }

  async setDesktopViewport() {
    await this.page.setViewportSize({ width: 1280, height: 720 });
  }

  async checkElementOverlap(selector1, selector2) {
    return await this.page.evaluate(({ sel1, sel2 }) => {
      const elem1 = document.querySelector(sel1);
      const elem2 = document.querySelector(sel2);
      
      if (!elem1 || !elem2) return false;
      
      const rect1 = elem1.getBoundingClientRect();
      const rect2 = elem2.getBoundingClientRect();
      
      return !(rect1.right < rect2.left || 
               rect1.left > rect2.right || 
               rect1.bottom < rect2.top || 
               rect1.top > rect2.bottom);
    }, { sel1: selector1, sel2: selector2 });
  }

  async checkElementClipping(selector) {
    return await this.page.evaluate((sel) => {
      const elem = document.querySelector(sel);
      if (!elem) return false;
      
      const rect = elem.getBoundingClientRect();
      const isClipped = rect.width === 0 || rect.height === 0 || 
                        rect.left < 0 || rect.top < 0 ||
                        rect.right > window.innerWidth || 
                        rect.bottom > window.innerHeight;
      
      return isClipped;
    }, selector);
  }

  async getAllInteractiveElements(productId) {
    return await this.page.$$('[data-testid*="btn"], [data-testid*="input"], a');
  }

  async getPageHeight() {
    return await this.page.evaluate(() => document.documentElement.scrollHeight);
  }

  async getPageWidth() {
    return await this.page.evaluate(() => document.documentElement.scrollWidth);
  }

  async isHorizontalScrollbarVisible() {
    return await this.page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
  }
}

module.exports = {
  ProductDetailsPage,
};
