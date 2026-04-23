const { test, expect } = require('../../fixtures/test-base');
const { CHECKOUT_FLOW_DATA } = require('../../data/checkout-flow.data');

test.describe('Product Checkout Smoke', () => {
  test('Verify checkout from product listing to order success @smoke', async ({ app }) => {
    const { productListingPage, productDetailsPage, shoppingCartPage, checkoutPage } = app;
    const { quantity, customer, payment } = CHECKOUT_FLOW_DATA;
    let selectedProductId;
    let selectedProductName;

    await test.step('Open product listing page', async () => {
      await productListingPage.goto();
      await expect(productListingPage.container).toBeVisible();
    });

    await test.step('Open first product details from listing', async () => {
      const selectedProduct = await productListingPage.openFirstProductAndGetDetails();
      selectedProductId = selectedProduct.productId;
      selectedProductName = selectedProduct.productName;
      await expect(productDetailsPage.container).toBeVisible();
      await expect(productDetailsPage.name(selectedProductId)).toHaveText(selectedProductName);
    });

    await test.step('Add selected product quantity to cart', async () => {
      await productDetailsPage.setQuantity(selectedProductId, quantity);
      await productDetailsPage.addToCart(selectedProductId);
      await expect(productDetailsPage.cartBadge()).toHaveText(String(quantity));
    });

    await test.step('Navigate to cart and verify item details', async () => {
      await productDetailsPage.goToCartFromHeader();
      await expect(shoppingCartPage.container).toBeVisible();
      await expect(shoppingCartPage.pageTitle).toHaveText('Shopping Cart');
      await expect(shoppingCartPage.cartItemName(selectedProductId)).toHaveText(selectedProductName);
      await expect(shoppingCartPage.cartItemQuantityInput(selectedProductId)).toHaveValue(String(quantity));
    });

    await test.step('Proceed to checkout and verify selected product in order summary', async () => {
      await shoppingCartPage.proceedToCheckout();
      await expect(checkoutPage.container).toBeVisible();
      await expect(checkoutPage.checkoutTitle).toHaveText('Checkout');
      await expect(checkoutPage.summaryItemName(selectedProductId)).toHaveText(selectedProductName);
    });

    await test.step('Fill checkout form and place order', async () => {
      await checkoutPage.fillShippingInfo(customer);
      await checkoutPage.fillPaymentInfo(payment);
      await checkoutPage.placeOrder();
    });

    await test.step('Verify order success confirmation', async () => {
      await expect(checkoutPage.successTitle).toHaveText('Order Placed Successfully!');
      await expect(checkoutPage.orderNumber).toHaveText(/ORD-/);
      await expect(checkoutPage.customerEmail).toHaveText(customer.email);
      await expect(checkoutPage.orderItemName(0)).toContainText(selectedProductName);
    });
  });
});
