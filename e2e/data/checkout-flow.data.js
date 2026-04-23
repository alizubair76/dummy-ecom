const CHECKOUT_FLOW_DATA = {
  product: {
    id: 1,
    name: 'Wireless Headphones',
    quantity: 2,
  },
  customer: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
  },
  payment: {
    cardNumber: '4242424242424242',
    cardName: 'John Doe',
    expiryDate: '12/30',
    cvv: '123',
  },
};

module.exports = {
  CHECKOUT_FLOW_DATA,
};
