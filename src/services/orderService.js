// Order Service for handling order submissions and management
export const orderService = {
  // Store orders in localStorage (mock database)
  orders: [],

  /**
   * Submit a new order
   */
  async submitOrder(customerInfo, cartItems, totalAmount) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // Validate inputs
          if (!customerInfo || !cartItems || cartItems.length === 0) {
            reject(new Error('Invalid order data'));
            return;
          }

          // Generate order ID and number
          const orderId = Math.random().toString(36).substring(2, 15);
          const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

          // Create order object
          const order = {
            id: orderId,
            orderNumber,
            customerInfo,
            items: cartItems,
            totalAmount,
            tax: totalAmount * 0.1,
            shipping: 0, // Free shipping
            subtotal: totalAmount,
            status: 'confirmed',
            createdAt: new Date().toISOString(),
            estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            paymentStatus: 'completed'
          };

          // Save to localStorage
          this.saveOrder(order);

          // Resolve with order confirmation
          resolve({
            success: true,
            order,
            confirmationEmail: customerInfo.email,
            message: 'Order placed successfully!'
          });
        } catch (error) {
          reject(new Error('Failed to submit order: ' + error.message));
        }
      }, 1500); // Simulate network delay
    });
  },

  /**
   * Save order to localStorage
   */
  saveOrder(order) {
    try {
      const orders = this.getOrders();
      orders.push(order);
      localStorage.setItem('techHub_orders', JSON.stringify(orders));
    } catch (error) {
      console.error('Error saving order:', error);
    }
  },

  /**
   * Get all orders from localStorage
   */
  getOrders() {
    try {
      const orders = localStorage.getItem('techHub_orders');
      return orders ? JSON.parse(orders) : [];
    } catch (error) {
      console.error('Error retrieving orders:', error);
      return [];
    }
  },

  /**
   * Get order by ID
   */
  getOrderById(orderId) {
    try {
      const orders = this.getOrders();
      return orders.find(order => order.id === orderId);
    } catch (error) {
      console.error('Error retrieving order:', error);
      return null;
    }
  },

  /**
   * Get orders by email
   */
  getOrdersByEmail(email) {
    try {
      const orders = this.getOrders();
      return orders.filter(order => order.customerInfo.email === email);
    } catch (error) {
      console.error('Error retrieving orders:', error);
      return [];
    }
  },

  /**
   * Update order status
   */
  updateOrderStatus(orderId, newStatus) {
    try {
      const orders = this.getOrders();
      const order = orders.find(o => o.id === orderId);
      if (order) {
        order.status = newStatus;
        localStorage.setItem('techHub_orders', JSON.stringify(orders));
        return order;
      }
      return null;
    } catch (error) {
      console.error('Error updating order:', error);
      return null;
    }
  },

  /**
   * Cancel order
   */
  cancelOrder(orderId) {
    return this.updateOrderStatus(orderId, 'cancelled');
  },

  /**
   * Clear all orders (for testing)
   */
  clearAllOrders() {
    try {
      localStorage.removeItem('techHub_orders');
      return true;
    } catch (error) {
      console.error('Error clearing orders:', error);
      return false;
    }
  },

  /**
   * Get order statistics
   */
  getOrderStats() {
    try {
      const orders = this.getOrders();
      return {
        totalOrders: orders.length,
        totalRevenue: orders.reduce((sum, order) => sum + order.subtotal, 0),
        confirmedOrders: orders.filter(o => o.status === 'confirmed').length,
        shippedOrders: orders.filter(o => o.status === 'shipped').length,
        deliveredOrders: orders.filter(o => o.status === 'delivered').length,
        cancelledOrders: orders.filter(o => o.status === 'cancelled').length
      };
    } catch (error) {
      console.error('Error getting order stats:', error);
      return null;
    }
  }
};

export default orderService;
