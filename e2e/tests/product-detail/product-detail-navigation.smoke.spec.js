const { test, expect } = require('../../fixtures/test-base');

test.describe('Product Detail Navigation Smoke', () => {
  test('Verify product detail navigation scenarios @smoke', async ({ app }) => {
    const { page, productListingPage, productDetailsPage } = app;
    let selectedProductId;
    let selectedProductName;

    await test.step('Verify navigation from listing card to product details', async () => {
      await productListingPage.goto();
      await expect(productListingPage.container).toBeVisible();

      const selectedProduct = await productListingPage.openFirstProductAndGetDetails();
      selectedProductId = selectedProduct.productId;
      selectedProductName = selectedProduct.productName;

      await expect(productDetailsPage.container).toBeVisible();
      await expect(productDetailsPage.name(selectedProductId)).toHaveText(selectedProductName);
      await expect(page).toHaveURL(new RegExp(`/product/${selectedProductId}$`));
    });

    await test.step('Verify back to products button navigates to listing', async () => {
      await productDetailsPage.goBackToProducts();
      await expect(productListingPage.container).toBeVisible();
      await expect(page).toHaveURL(/\/$/);
    });

    await test.step('Verify browser back returns to previous page correctly', async () => {
      await productListingPage.openProductDetails(selectedProductId);
      await expect(productDetailsPage.container).toBeVisible();

      await productDetailsPage.goBackInBrowser();
      await expect(productListingPage.container).toBeVisible();
      await expect(page).toHaveURL(/\/$/);
    });

    await test.step('Verify direct URL navigation opens the correct product details', async () => {
      await productDetailsPage.gotoByProductId(selectedProductId);
      await expect(productDetailsPage.container).toBeVisible();
      await expect(productDetailsPage.name(selectedProductId)).toHaveText(selectedProductName);
      await expect(page).toHaveURL(new RegExp(`/product/${selectedProductId}$`));
    });
  });
});
