const base = require('@playwright/test');
const { ProductListingPage } = require('../pages/product-listing.page');

const test = base.test.extend({
  productListingPage: async ({ page }, use) => {
    const productListingPage = new ProductListingPage(page);
    await use(productListingPage);
  },
});

module.exports = {
  test,
  expect: base.expect,
};
