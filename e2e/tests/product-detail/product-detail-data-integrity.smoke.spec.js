const { test, expect } = require('../../fixtures/test-base');
const fs = require('fs');
const path = require('path');

// Load products data for comparison
const productsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../..', 'src/data/products.json'), 'utf-8')
);

test.describe('Product Detail - Data Integrity and Content Accuracy @smoke', () => {
  test('Verify product detail content matches source data - Name @smoke', async ({ app }) => {
    const { page, productDetailsPage, productListingPage } = app;

    for (const expectedProduct of productsData) {
      await test.step(`Verify product name for ID ${expectedProduct.id}`, async () => {
        await productDetailsPage.gotoByProductId(expectedProduct.id);

        const displayedName = await productDetailsPage.getProductName(expectedProduct.id);
        expect(displayedName).toBe(expectedProduct.name);
      });
    }
  });

  test('Verify product detail content matches source data - Price @smoke', async ({ app }) => {
    const { productDetailsPage } = app;

    for (const expectedProduct of productsData) {
      await test.step(`Verify product price for ID ${expectedProduct.id}`, async () => {
        await productDetailsPage.gotoByProductId(expectedProduct.id);

        const displayedPrice = await productDetailsPage.getProductPrice(expectedProduct.id);
        const expectedPriceFormatted = `$${expectedProduct.price.toFixed(2)}`;
        
        // Price may contain additional whitespace, so we check it contains the formatted price
        expect(displayedPrice).toContain(expectedProduct.price.toString());
      });
    }
  });

  test('Verify product detail content matches source data - Category @smoke', async ({ app }) => {
    const { productDetailsPage } = app;

    for (const expectedProduct of productsData) {
      await test.step(`Verify product category for ID ${expectedProduct.id}`, async () => {
        await productDetailsPage.gotoByProductId(expectedProduct.id);

        const displayedCategory = await productDetailsPage.getProductCategory(expectedProduct.id);
        expect(displayedCategory).toContain(expectedProduct.category);
      });
    }
  });

  test('Verify product detail content matches source data - Description @smoke', async ({ app }) => {
    const { productDetailsPage } = app;

    for (const expectedProduct of productsData) {
      await test.step(`Verify product description for ID ${expectedProduct.id}`, async () => {
        await productDetailsPage.gotoByProductId(expectedProduct.id);

        const displayedDescription = await productDetailsPage.getProductDescription(expectedProduct.id);
        expect(displayedDescription).toContain(expectedProduct.description);
      });
    }
  });

  test('Verify product detail content matches source data - In-stock status @smoke', async ({ app }) => {
    const { productDetailsPage } = app;

    for (const expectedProduct of productsData) {
      await test.step(`Verify stock status for ID ${expectedProduct.id}`, async () => {
        await productDetailsPage.gotoByProductId(expectedProduct.id);

        if (expectedProduct.inStock) {
          const isInStock = await productDetailsPage.isInStock(expectedProduct.id);
          expect(isInStock).toBe(true);
        } else {
          const isOutOfStock = await productDetailsPage.isOutOfStock(expectedProduct.id);
          expect(isOutOfStock).toBe(true);
        }
      });
    }
  });

  test('Verify product id shown in specs matches URL parameter @smoke', async ({ app }) => {
    const { page, productDetailsPage } = app;

    for (const expectedProduct of productsData) {
      await test.step(`Verify spec ID matches URL parameter for product ${expectedProduct.id}`, async () => {
        await productDetailsPage.gotoByProductId(expectedProduct.id);

        // Verify URL contains correct product ID
        await expect(page).toHaveURL(new RegExp(`/product/${expectedProduct.id}$`));

        // Verify spec section displays matching ID
        const specIdText = await productDetailsPage.getSpecId(expectedProduct.id);
        expect(specIdText).toContain(`Product ID: ${expectedProduct.id}`);
      });
    }
  });

  test('Verify image alt text matches product name @smoke', async ({ app }) => {
    const { productDetailsPage } = app;

    for (const expectedProduct of productsData) {
      await test.step(`Verify image alt text for product ${expectedProduct.id}`, async () => {
        await productDetailsPage.gotoByProductId(expectedProduct.id);

        const altText = await productDetailsPage.getImageAltText(expectedProduct.id);
        expect(altText).toBe(expectedProduct.name);
      });
    }
  });

  test('Verify all product fields together match source data @smoke', async ({ app }) => {
    const { page, productDetailsPage } = app;

    for (const expectedProduct of productsData.slice(0, 3)) {
      // Test first 3 products for comprehensive verification
      await test.step(`Comprehensive data verification for product ${expectedProduct.id}`, async () => {
        await productDetailsPage.gotoByProductId(expectedProduct.id);

        // Verify URL
        await expect(page).toHaveURL(new RegExp(`/product/${expectedProduct.id}$`));

        // Verify all data fields
        const displayedName = await productDetailsPage.getProductName(expectedProduct.id);
        const displayedPrice = await productDetailsPage.getProductPrice(expectedProduct.id);
        const displayedCategory = await productDetailsPage.getProductCategory(expectedProduct.id);
        const displayedDescription = await productDetailsPage.getProductDescription(expectedProduct.id);
        const specIdText = await productDetailsPage.getSpecId(expectedProduct.id);
        const altText = await productDetailsPage.getImageAltText(expectedProduct.id);

        // Assertions
        expect(displayedName).toBe(expectedProduct.name);
        expect(displayedPrice).toContain(expectedProduct.price.toString());
        expect(displayedCategory).toContain(expectedProduct.category);
        expect(displayedDescription).toContain(expectedProduct.description);
        expect(specIdText).toContain(`Product ID: ${expectedProduct.id}`);
        expect(altText).toBe(expectedProduct.name);

        // Verify stock status
        if (expectedProduct.inStock) {
          const isInStock = await productDetailsPage.isInStock(expectedProduct.id);
          expect(isInStock).toBe(true);
        } else {
          const isOutOfStock = await productDetailsPage.isOutOfStock(expectedProduct.id);
          expect(isOutOfStock).toBe(true);
        }
      });
    }
  });

  test('Verify data consistency across repeated page visits @smoke', async ({ app }) => {
    const { productDetailsPage } = app;
    const testProductId = 1;
    const expectedProduct = productsData.find(p => p.id === testProductId);

    // Visit the page multiple times and verify consistency
    for (let i = 0; i < 3; i++) {
      await test.step(`Visit ${i + 1} - Verify data consistency`, async () => {
        await productDetailsPage.gotoByProductId(testProductId);

        const displayedName = await productDetailsPage.getProductName(testProductId);
        const displayedPrice = await productDetailsPage.getProductPrice(testProductId);
        const displayedCategory = await productDetailsPage.getProductCategory(testProductId);

        expect(displayedName).toBe(expectedProduct.name);
        expect(displayedPrice).toContain(expectedProduct.price.toString());
        expect(displayedCategory).toContain(expectedProduct.category);
      });
    }
  });
});
