const { test, expect } = require('../../fixtures/test-base');

test.describe('Product Detail In-Stock Smoke', () => {
  test('Verify in-stock product behavior @smoke', async ({ app }) => {
    const { productDetailsPage } = app;
    const inStockProductId = 1;

    await test.step('Open an in-stock product details page', async () => {
      await productDetailsPage.gotoByProductId(inStockProductId);
      await expect(productDetailsPage.container).toBeVisible();
    });

    await test.step('Verify in-stock badge and action controls are visible', async () => {
      await expect(productDetailsPage.inStockBadge(inStockProductId)).toHaveText('✓ In Stock');
      await expect(productDetailsPage.quantitySelector(inStockProductId)).toBeVisible();
      await expect(productDetailsPage.addToCartButton(inStockProductId)).toBeEnabled();
    });

    await test.step('Verify default quantity and decrement disabled at minimum', async () => {
      await expect(productDetailsPage.quantityInput(inStockProductId)).toHaveValue('1');
      await expect(productDetailsPage.quantityDecrementButton(inStockProductId)).toBeDisabled();
    });

    await test.step('Verify quantity increment and decrement behavior', async () => {
      await productDetailsPage.incrementQuantity(inStockProductId);
      await expect(productDetailsPage.quantityInput(inStockProductId)).toHaveValue('2');

      await productDetailsPage.decrementQuantity(inStockProductId);
      await expect(productDetailsPage.quantityInput(inStockProductId)).toHaveValue('1');
      await expect(productDetailsPage.quantityDecrementButton(inStockProductId)).toBeDisabled();
    });

    await test.step('Verify manual quantity input accepts valid positive integer', async () => {
      await productDetailsPage.setQuantity(inStockProductId, 3);
      await expect(productDetailsPage.quantityInput(inStockProductId)).toHaveValue('3');
    });

    await test.step('Verify zero and negative quantity are not persisted', async () => {
      await productDetailsPage.setQuantity(inStockProductId, 0);
      await expect(productDetailsPage.quantityInput(inStockProductId)).not.toHaveValue('0');

      await productDetailsPage.setQuantity(inStockProductId, -1);
      await expect(productDetailsPage.quantityInput(inStockProductId)).not.toHaveValue('-1');
    });
  });
});
