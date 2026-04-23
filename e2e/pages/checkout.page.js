class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.container = page.getByTestId('checkout-container');
    this.checkoutTitle = page.getByTestId('checkout-page-title');
    this.placeOrderButton = page.getByTestId('place-order-btn');
    this.successTitle = page.getByTestId('success-title');
    this.orderNumber = page.getByTestId('order-number');
    this.customerEmail = page.getByTestId('order-customer-email');
  }

  async fillShippingInfo(customer) {
    await this.page.getByTestId('input-firstName').fill(customer.firstName);
    await this.page.getByTestId('input-lastName').fill(customer.lastName);
    await this.page.getByTestId('input-email').fill(customer.email);
    await this.page.getByTestId('input-phone').fill(customer.phone);
    await this.page.getByTestId('input-address').fill(customer.address);
    await this.page.getByTestId('input-city').fill(customer.city);
    await this.page.getByTestId('input-state').fill(customer.state);
    await this.page.getByTestId('input-zipCode').fill(customer.zipCode);
  }

  async fillPaymentInfo(payment) {
    await this.page.getByTestId('input-cardNumber').fill(payment.cardNumber);
    await this.page.getByTestId('input-cardName').fill(payment.cardName);
    await this.page.getByTestId('input-expiryDate').fill(payment.expiryDate);
    await this.page.getByTestId('input-cvv').fill(payment.cvv);
  }

  async placeOrder() {
    await this.placeOrderButton.click();
  }
}

module.exports = {
  CheckoutPage,
};
