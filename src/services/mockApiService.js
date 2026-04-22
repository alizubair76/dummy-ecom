// Mock API service
// This file shows how to fetch products from a mock API
// You can use this with services like JSONPlaceholder, MockAPI, or JSON Server

export const mockApiService = {
  // Simulates an API call with delay
  async getProducts() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            name: "Wireless Headphones",
            price: 79.99,
            image: "https://via.placeholder.com/300x200?text=Wireless+Headphones",
            description: "High-quality wireless headphones with noise cancellation",
            category: "Electronics",
            inStock: true
          },
          // ... more products
        ]);
      }, 1000); // Simulate 1 second delay
    });
  },

  // Example: Using real API endpoint
  async getProductsFromAPI(apiUrl) {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Example: Using JSONPlaceholder or similar service
  async getProductsFromPublicAPI() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      // Transform the data to match your product schema
      return data.map(item => ({
        id: item.id,
        name: item.title,
        price: Math.random() * 200,
        image: `https://via.placeholder.com/300x200?text=Product+${item.id}`,
        description: item.body,
        category: 'Electronics',
        inStock: Math.random() > 0.2
      }));
    } catch (error) {
      console.error('Error fetching from public API:', error);
      throw error;
    }
  }
};

// Usage example in ProductListing.jsx:
/*
import { mockApiService } from '../services/mockApiService';

// In useEffect:
const data = await mockApiService.getProductsFromAPI('https://api.example.com/products');
setProducts(data);
*/
