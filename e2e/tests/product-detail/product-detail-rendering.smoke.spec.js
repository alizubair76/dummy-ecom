const { test, expect } = require('../../fixtures/test-base');

test.describe('Product Detail Rendering Smoke', () => {
  test('Verify product detail page load and rendering @smoke', async ({ app }) => {
    const { page, productListingPage, productDetailsPage } = app;
    let selectedProductId;
    let selectedProductName;

    await test.step('Open first product detail page from product listing', async () => {
      await productListingPage.goto();
      await expect(productListingPage.container).toBeVisible();

      const selectedProduct = await productListingPage.openFirstProductAndGetDetails();
      selectedProductId = selectedProduct.productId;
      selectedProductName = selectedProduct.productName;
    });

    await test.step('Verify valid detail page route and core product render', async () => {
      await expect(page).toHaveURL(new RegExp(`/product/${selectedProductId}$`));
      await expect(productDetailsPage.container).toBeVisible();
      await expect(productDetailsPage.backToProductsButton).toBeVisible();
      await expect(productDetailsPage.image(selectedProductId)).toBeVisible();
      await expect(productDetailsPage.name(selectedProductId)).toHaveText(selectedProductName);
      await expect(productDetailsPage.categoryBadge(selectedProductId)).toBeVisible();
      await expect(productDetailsPage.price(selectedProductId)).toHaveText(/^\$\d+(\.\d{2})$/);
    });

    await test.step('Verify description and specs section render', async () => {
      await expect(productDetailsPage.descriptionSection(selectedProductId)).toBeVisible();
      await expect(productDetailsPage.specsSection(selectedProductId)).toBeVisible();
      await expect(productDetailsPage.specId(selectedProductId)).toContainText(`Product ID: ${selectedProductId}`);
      await expect(productDetailsPage.specCategory(selectedProductId)).toContainText('Category:');
      await expect(productDetailsPage.specAvailability(selectedProductId)).toContainText('Availability:');
    });

    await test.step('Verify shipping and returns info render', async () => {
      await expect(productDetailsPage.shippingInfoBox(selectedProductId)).toBeVisible();
      await expect(productDetailsPage.returnsInfoBox(selectedProductId)).toBeVisible();
    });
  });
});
