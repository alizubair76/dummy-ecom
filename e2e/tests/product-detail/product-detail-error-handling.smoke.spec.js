const { test, expect } = require('../../fixtures/test-base');

test.describe('Product Detail - Invalid Product / Error Handling @smoke', () => {
  const invalidProductId = 99999;

  test('Verify invalid product id shows Product Not Found @smoke', async ({ app }) => {
    const { page, productDetailsPage } = app;

    await test.step('Navigate to product detail page with invalid product id', async () => {
      await productDetailsPage.gotoByProductId(invalidProductId);
    });

    await test.step('Verify page is still accessible', async () => {
      await expect(page).toHaveURL(new RegExp(`/product/${invalidProductId}$`));
      await expect(productDetailsPage.container).toBeVisible();
    });

    await test.step('Verify not-found container is displayed', async () => {
      await expect(productDetailsPage.notFoundContainer()).toBeVisible();
    });

    await test.step('Verify "Product Not Found" title is displayed', async () => {
      const notFoundTitle = productDetailsPage.notFoundTitle();
      await expect(notFoundTitle).toBeVisible();
      await expect(notFoundTitle).toContainText('Product Not Found');
    });
  });

  test('Verify not-found state shows user-friendly message @smoke', async ({ app }) => {
    const { productDetailsPage } = app;

    await test.step('Navigate to product detail page with invalid product id', async () => {
      await productDetailsPage.gotoByProductId(invalidProductId);
    });

    await test.step('Verify not-found message container is visible', async () => {
      const notFoundMessage = productDetailsPage.notFoundMessage();
      await expect(notFoundMessage).toBeVisible();
    });

    await test.step('Verify message text is displayed', async () => {
      const notFoundMessage = productDetailsPage.notFoundMessage();
      await expect(notFoundMessage).toContainText("Sorry, the product you're looking for doesn't exist");
    });

    await test.step('Verify message is informative', async () => {
      const notFoundMessage = productDetailsPage.notFoundMessage();
      const messageText = await notFoundMessage.textContent();
      expect(messageText.length).toBeGreaterThan(10);
    });
  });

  test('Verify not-found state shows Back to Products button @smoke', async ({ app }) => {
    const { productDetailsPage } = app;

    await test.step('Navigate to product detail page with invalid product id', async () => {
      await productDetailsPage.gotoByProductId(invalidProductId);
    });

    await test.step('Verify Back to Products button is visible', async () => {
      const backButton = productDetailsPage.backToProductsButton;
      await expect(backButton).toBeVisible();
    });

    await test.step('Verify button text is correct', async () => {
      const backButton = productDetailsPage.backToProductsButton;
      await expect(backButton).toContainText('Back to Products');
    });

    await test.step('Verify button is enabled', async () => {
      const backButton = productDetailsPage.backToProductsButton;
      await expect(backButton).toBeEnabled();
    });
  });

  test('Verify clicking Back to Products from not-found state routes to home @smoke', async ({ app }) => {
    const { page, productDetailsPage } = app;

    await test.step('Navigate to product detail page with invalid product id', async () => {
      await productDetailsPage.gotoByProductId(invalidProductId);
      await expect(productDetailsPage.notFoundContainer()).toBeVisible();
    });

    await test.step('Click Back to Products button', async () => {
      await productDetailsPage.backToProductsFromNotFound();
    });

    await test.step('Verify navigation to home page', async () => {
      await expect(page).toHaveURL('/');
    });

    await test.step('Verify product listing page is loaded', async () => {
      const { productListingPage } = app;
      await expect(productListingPage.container).toBeVisible();
    });
  });

  test('Verify multiple invalid product ids show error state consistently @smoke', async ({ app }) => {
    const { page, productDetailsPage } = app;
    const invalidIds = [99999, 0, -1, 999, 50000];

    for (const productId of invalidIds) {
      await test.step(`Verify error state for invalid product id: ${productId}`, async () => {
        await productDetailsPage.gotoByProductId(productId);
        await expect(page).toHaveURL(new RegExp(`/product/${productId}$`));
        await expect(productDetailsPage.notFoundContainer()).toBeVisible();
        await expect(productDetailsPage.notFoundTitle()).toContainText('Product Not Found');
        await expect(productDetailsPage.backToProductsButton).toBeVisible();
      });
    }
  });
});
