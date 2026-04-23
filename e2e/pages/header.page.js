class HeaderPage {
  constructor(page) {
    this.page = page;
  }

  get cartBadge() {
    return this.page.getByTestId('cart-badge');
  }

  async goToCartFromHeader() {
    await this.page.getByTestId('cart-link').click();
  }
}

module.exports = {
  HeaderPage,
};
