class ProductListingPage {
  constructor(page) {
    this.page = page;
    this.container = page.getByTestId('product-listing-container');
    this.pageTitle = page.getByTestId('page-title');
    this.productsCount = page.getByTestId('products-count');
    this.productsGrid = page.getByTestId('products-grid');
    this.productCards = page.locator('.product-card-link');
  }

  async goto() {
    await this.page.goto('/');
  }

  categoryButton(categoryName) {
    return this.page.getByTestId(`category-btn-${categoryName}`);
  }

  async filterByCategory(categoryName) {
    await this.categoryButton(categoryName).click();
  }

  productCard(productId) {
    return this.page.getByTestId(`product-card-${productId}`);
  }

  async openProductDetails(productId) {
    await this.productCard(productId).click();
  }
}

module.exports = {
  ProductListingPage,
};
