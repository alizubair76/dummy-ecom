const { test, expect } = require('../../fixtures/test-base');
const { PRODUCT_LISTING_DATA } = require('../../data/product-listing.data');

test.describe('Product Listing Smoke', () => {
  test('shows products and supports category filtering @smoke', async ({ app }) => {
    const { productListingPage } = app;

    await test.step('Navigate to product listing page', async () => {
      await productListingPage.goto();
    });

    await test.step('Verify initial product listing content', async () => {
      await expect(productListingPage.container).toBeVisible();
      await expect(productListingPage.pageTitle).toHaveText(PRODUCT_LISTING_DATA.title);
      await expect(productListingPage.productsGrid).toBeVisible();
      await expect(productListingPage.productsCount).toHaveText(
        `Showing ${PRODUCT_LISTING_DATA.totalProducts} products`
      );
      await expect(productListingPage.productCards).toHaveCount(PRODUCT_LISTING_DATA.totalProducts);
    });

    await test.step('Filter products by Electronics category', async () => {
      await productListingPage.filterByCategory(PRODUCT_LISTING_DATA.categories.electronics);
    });

    await test.step('Verify filtered Electronics results', async () => {
      await expect(productListingPage.productsCount).toHaveText(
        `Showing ${PRODUCT_LISTING_DATA.electronicsProducts} products`
      );
      await expect(productListingPage.productCards).toHaveCount(PRODUCT_LISTING_DATA.electronicsProducts);
    });
  });
});
