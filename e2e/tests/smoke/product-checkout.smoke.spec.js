const { test, expect } = require('../../fixtures/test-base');
const { CHECKOUT_FLOW_DATA } = require('../../data/checkout-flow.data');

test.describe('Product Checkout Smoke', () => {
  test('Verify checkout from product listing to order success @smoke', async ({
    page,
    productListingPage,
    productDetailsPage,
    shoppingCartPage,
    checkoutPage,
  }) => {
    const { product, customer, payment } = CHECKOUT_FLOW_DATA;

    await test.step('Open product listing page', async () => {
      await productListingPage.goto();
      await expect(productListingPage.container).toBeVisible();
    });

    await test.step('Open selected product details', async () => {
      await productListingPage.openProductDetails(product.id);
      await expect(productDetailsPage.container).toBeVisible();
      await expect(productDetailsPage.name(product.id)).toHaveText(product.name);
    });

    await test.step('Add selected product quantity to cart', async () => {
      await productDetailsPage.setQuantity(product.id, product.quantity);
      await productDetailsPage.addToCart(product.id);
      await expect(page.getByTestId('cart-badge')).toHaveText(String(product.quantity));
    });

    await test.step('Navigate to cart and verify item details', async () => {
      await page.getByTestId('cart-link').click();
      await expect(shoppingCartPage.container).toBeVisible();
      await expect(shoppingCartPage.pageTitle).toHaveText('Shopping Cart');
      await expect(shoppingCartPage.cartItemName(product.id)).toHaveText(product.name);
      await expect(shoppingCartPage.cartItemQuantityInput(product.id)).toHaveValue(String(product.quantity));
    });

    await test.step('Proceed to checkout page', async () => {
      await shoppingCartPage.proceedToCheckout();
      await expect(checkoutPage.container).toBeVisible();
      await expect(checkoutPage.checkoutTitle).toHaveText('Checkout');
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
    });
  });
});
