const { test, expect } = require('../../fixtures/test-base');

test.describe('Product Detail Out-Of-Stock Smoke', () => {
  test('Verify out-of-stock product behavior @smoke', async ({ app }) => {
    const { productDetailsPage } = app;
    const outOfStockProductId = 5;

    await test.step('Open an out-of-stock product details page', async () => {
      await productDetailsPage.gotoByProductId(outOfStockProductId);
      await expect(productDetailsPage.container).toBeVisible();
    });

    await test.step('Verify out-of-stock visual indicators', async () => {
      await expect(productDetailsPage.outOfStockBanner(outOfStockProductId)).toBeVisible();
      await expect(productDetailsPage.outOfStockBadge(outOfStockProductId)).toHaveText('Out of Stock');
    });

    await test.step('Verify out-of-stock action controls', async () => {
      await expect(productDetailsPage.quantitySelector(outOfStockProductId)).toHaveCount(0);
      await expect(productDetailsPage.outOfStockButton(outOfStockProductId)).toBeVisible();
      await expect(productDetailsPage.outOfStockButton(outOfStockProductId)).toHaveText('Out of Stock');
    });

    await test.step('Verify out-of-stock action does not add item to cart', async () => {
      await expect(productDetailsPage.cartBadge()).toHaveCount(0);
      await productDetailsPage.clickOutOfStockButton(outOfStockProductId);
      await expect(productDetailsPage.cartBadge()).toHaveCount(0);
    });
  });
});
