const { test, expect } = require('../../fixtures/test-base');

test.describe('Product Detail - Add to Cart Functional Scenarios @smoke', () => {
  let selectedProductId;
  let selectedProductPrice;

  test.beforeEach(async ({ app }) => {
    const { page, productListingPage, productDetailsPage } = app;

    // Navigate to product listing and open first product
    await productListingPage.goto();
    await expect(productListingPage.container).toBeVisible();

    const selectedProduct = await productListingPage.openFirstProductAndGetDetails();
    selectedProductId = selectedProduct.productId;
    selectedProductPrice = selectedProduct.productPrice;

    // Verify we're on product detail page
    await expect(page).toHaveURL(new RegExp(`/product/${selectedProductId}$`));
    await expect(productDetailsPage.container).toBeVisible();
  });

  test('Verify clicking Add to Cart adds one unit when quantity is 1 @smoke', async ({ app }) => {
    const { page, shoppingCartPage, productDetailsPage } = app;

    await test.step('Verify default quantity is 1', async () => {
      const quantityInput = productDetailsPage.quantityInput(selectedProductId);
      await expect(quantityInput).toHaveValue('1');
    });

    await test.step('Click Add to Cart button', async () => {
      const addToCartButton = productDetailsPage.addToCartButton(selectedProductId);
      await expect(addToCartButton).toBeEnabled();
      await addToCartButton.click();
    });

    await test.step('Verify success state appears', async () => {
      const successButton = productDetailsPage.addToCartButton(selectedProductId);
      await expect(successButton).toContainText(/Added to Cart|✓ Added to Cart/);
    });

    await test.step('Verify product appears in cart with correct quantity', async () => {
      await productDetailsPage.goToCartFromHeader();
      await expect(shoppingCartPage.container).toBeVisible();

      // Verify product is in cart
      const cartItem = shoppingCartPage.cartItemName(selectedProductId);
      await expect(cartItem).toBeVisible();

      // Verify quantity is 1
      const quantityDisplay = shoppingCartPage.cartItemQuantityInput(selectedProductId);
      await expect(quantityDisplay).toHaveValue('1');
    });
  });

  test('Verify clicking Add to Cart adds selected quantity when quantity > 1 @smoke', async ({ app }) => {
    const { page, shoppingCartPage, productDetailsPage } = app;
    const selectedQuantity = 3;

    await test.step('Set quantity to 3', async () => {
      const quantityInput = productDetailsPage.quantityInput(selectedProductId);
      
      // Click increment button 2 times (from 1 to 3)
      const quantityIncrementButton = productDetailsPage.quantityIncrementButton(selectedProductId);
      await quantityIncrementButton.click();
      await quantityIncrementButton.click();

      await expect(quantityInput).toHaveValue(String(selectedQuantity));
    });

    await test.step('Click Add to Cart button', async () => {
      const addToCartButton = productDetailsPage.addToCartButton(selectedProductId);
      await expect(addToCartButton).toBeEnabled();
      await addToCartButton.click();
    });

    await test.step('Verify success state appears', async () => {
      const successButton = productDetailsPage.addToCartButton(selectedProductId);
      await expect(successButton).toContainText(/Added to Cart|✓ Added to Cart/);
    });

    await test.step('Verify product in cart has correct quantity', async () => {
      await productDetailsPage.goToCartFromHeader();
      await expect(shoppingCartPage.container).toBeVisible();

      // Verify product quantity is 3
      const quantityDisplay = shoppingCartPage.cartItemQuantityInput(selectedProductId);
      await expect(quantityDisplay).toHaveValue(String(selectedQuantity));
    });
  });

  test('Verify temporary success state disappears after Add to Cart @smoke', async ({ app }) => {
    const { productDetailsPage } = app;

    await test.step('Click Add to Cart button', async () => {
      const addToCartButton = productDetailsPage.addToCartButton(selectedProductId);
      await addToCartButton.click();
    });

    await test.step('Verify success state initially shows', async () => {
      const successButton = productDetailsPage.addToCartButton(selectedProductId);
      await expect(successButton).toContainText(/Added to Cart|✓ Added to Cart/);
    });

    await test.step('Verify success state disappears after 2 seconds', async () => {
      const addToCartButton = productDetailsPage.addToCartButton(selectedProductId);

      // Verify button text returns to "Add to Cart"
      await expect(addToCartButton).toContainText('Add to Cart');
      await expect(addToCartButton).not.toContainText('✓ Added to Cart');
    });
  });

  test('Verify cart badge count updates after adding product @smoke', async ({ app }) => {
    const { page, header } = app;

    await test.step('Add product to cart', async () => {
      const { productDetailsPage } = app;
      const addToCartButton = productDetailsPage.addToCartButton(selectedProductId);
      await addToCartButton.click();
    });

    await test.step('Verify cart badge appears with count 1', async () => {
      const cartBadge = header.cartBadge;
      await expect(cartBadge).toBeVisible();
      await expect(cartBadge).toHaveText('1');
    });

    await test.step('Add product again with quantity 2', async () => {
      const { productDetailsPage } = app;
      const quantityIncrementButton = productDetailsPage.quantityIncrementButton(selectedProductId);
      await quantityIncrementButton.click();
      await quantityIncrementButton.click();

      const addToCartButton = productDetailsPage.addToCartButton(selectedProductId);
      await addToCartButton.click();
    });

    await test.step('Verify cart badge updates to 4 (1 + 3)', async () => {
      const cartBadge = header.cartBadge;
      await expect(cartBadge).toBeVisible();
      await expect(cartBadge).toHaveText('4');
    });
  });

  test('Verify product appears in cart page after add-to-cart @smoke', async ({ app }) => {
    const { page, shoppingCartPage, productDetailsPage } = app;
    const addQuantity = 2;

    await test.step('Set quantity and add to cart', async () => {
      const quantityIncrementButton = productDetailsPage.quantityIncrementButton(selectedProductId);
      await quantityIncrementButton.click();

      const addToCartButton = productDetailsPage.addToCartButton(selectedProductId);
      await addToCartButton.click();
    });

    await test.step('Navigate to cart page', async () => {
      await productDetailsPage.goToCartFromHeader();
      await expect(shoppingCartPage.container).toBeVisible();
    });

    await test.step('Verify product details match in cart', async () => {
      // Verify product name is displayed
      const itemName = shoppingCartPage.cartItemName(selectedProductId);
      await expect(itemName).toBeVisible();

      // Verify quantity matches
      const quantityInput = shoppingCartPage.cartItemQuantityInput(selectedProductId);
      await expect(quantityInput).toHaveValue(String(addQuantity));

      // Verify price is displayed
      const itemPrice = shoppingCartPage.getCartItemLineTotal();
      await expect(itemPrice).toBeVisible();
      await expect(itemPrice).toContainText('$');
    });
  });

  test('Verify line item quantity in cart matches selected quantity from product page @smoke', async ({ app }) => {
    const { page, shoppingCartPage, productDetailsPage } = app;
    const selectedQuantity = 5;

    await test.step('Set quantity to 5 on product page', async () => {
      const quantityInput = productDetailsPage.quantityInput(selectedProductId);
      
      // Click increment button 4 times (from 1 to 5)
      const quantityIncrementButton = productDetailsPage.quantityIncrementButton(selectedProductId);
      for (let i = 0; i < 4; i++) {
        await quantityIncrementButton.click();
      }

      await expect(quantityInput).toHaveValue(String(selectedQuantity));
    });

    await test.step('Add product to cart', async () => {
      const addToCartButton = productDetailsPage.addToCartButton(selectedProductId);
      await addToCartButton.click();
    });

    await test.step('Navigate to cart and verify quantity matches', async () => {
      await productDetailsPage.goToCartFromHeader();
      await expect(shoppingCartPage.container).toBeVisible();

      const quantityInput = shoppingCartPage.cartItemQuantityInput(selectedProductId);
      await expect(quantityInput).toHaveValue(String(selectedQuantity));

      // Verify cart total reflects correct quantity
      const cartItemTotal = shoppingCartPage.getCartItemLineTotal();
      await expect(cartItemTotal).toBeVisible();
    });
  });
});
