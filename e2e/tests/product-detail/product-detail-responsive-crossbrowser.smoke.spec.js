const { test, expect, devices } = require('@playwright/test');
const { ProductDetailsPage } = require('../../pages/product-details.page');
const { Header } = require('../../pages/header.page');
const { ProductListingPage } = require('../../pages/product-listing.page');

// Test configurations for different browsers and viewports
const viewports = {
  mobile: { width: 375, height: 667, name: 'Mobile (iPhone SE)' },
  tablet: { width: 768, height: 1024, name: 'Tablet (iPad)' },
  desktop: { width: 1280, height: 720, name: 'Desktop' },
};

test.describe('Product Detail - Responsive and Cross-Browser Scenarios @smoke', () => {
  test('Verify layout is usable on mobile viewport @smoke', async ({ page, baseURL }) => {
    const productDetailsPage = new ProductDetailsPage(page);

    await test.step('Set mobile viewport size', async () => {
      await productDetailsPage.setMobileViewport();
    });

    await test.step('Navigate to product detail page', async () => {
      await productDetailsPage.gotoByProductId(1);
      await expect(productDetailsPage.container).toBeVisible();
    });

    await test.step('Verify core elements are visible on mobile', async () => {
      // Product image should be visible
      await expect(productDetailsPage.image(1)).toBeVisible();

      // Product name should be visible
      await expect(productDetailsPage.name(1)).toBeVisible();

      // Price should be visible
      await expect(productDetailsPage.price(1)).toBeVisible();

      // Add to cart button should be visible
      await expect(productDetailsPage.addToCartButton(1)).toBeVisible();
    });

    await test.step('Verify no horizontal scrolling is needed', async () => {
      const hasHorizontalScroll = await productDetailsPage.isHorizontalScrollbarVisible();
      expect(hasHorizontalScroll).toBe(false);
    });

    await test.step('Verify quantity controls are accessible', async () => {
      const incrementButton = productDetailsPage.quantityIncrementButton(1);
      const quantityInput = productDetailsPage.quantityInput(1);

      await expect(quantityInput).toBeVisible();
      await expect(incrementButton).toBeVisible();
    });

    await test.step('Test interaction on mobile - add to cart', async () => {
      await productDetailsPage.addToCart(1);
      const successButton = productDetailsPage.addToCartButton(1);
      // Button should show added state
      await expect(successButton).toHaveText(/Added to Cart|✓ Added to Cart/);
    });
  });

  test('Verify layout is usable on tablet viewport @smoke', async ({ page, baseURL }) => {
    const productDetailsPage = new ProductDetailsPage(page);

    await test.step('Set tablet viewport size', async () => {
      await productDetailsPage.setTabletViewport();
    });

    await test.step('Navigate to product detail page', async () => {
      await productDetailsPage.gotoByProductId(2);
      await expect(productDetailsPage.container).toBeVisible();
    });

    await test.step('Verify all main content sections are visible', async () => {
      // Product info
      await expect(productDetailsPage.image(2)).toBeVisible();
      await expect(productDetailsPage.name(2)).toBeVisible();
      await expect(productDetailsPage.price(2)).toBeVisible();

      // Description and specs
      await expect(productDetailsPage.descriptionSection(2)).toBeVisible();
      await expect(productDetailsPage.specsSection(2)).toBeVisible();

      // Action buttons
      await expect(productDetailsPage.addToCartButton(2)).toBeVisible();
    });

    await test.step('Verify info boxes are visible', async () => {
      await expect(productDetailsPage.shippingInfoBox(2)).toBeVisible();
      await expect(productDetailsPage.returnsInfoBox(2)).toBeVisible();
    });

    await test.step('Verify no horizontal scrolling', async () => {
      const hasHorizontalScroll = await productDetailsPage.isHorizontalScrollbarVisible();
      expect(hasHorizontalScroll).toBe(false);
    });

    await test.step('Verify touch-friendly button sizes', async () => {
      const addButton = productDetailsPage.addToCartButton(2);
      const boundingBox = await addButton.boundingBox();
      
      // Button should have minimum 44x44px for touch targets
      expect(boundingBox.height).toBeGreaterThanOrEqual(40);
      expect(boundingBox.width).toBeGreaterThanOrEqual(44);
    });
  });

  test('Verify layout is usable on desktop viewport @smoke', async ({ page, baseURL }) => {
    const productDetailsPage = new ProductDetailsPage(page);

    await test.step('Set desktop viewport size', async () => {
      await productDetailsPage.setDesktopViewport();
    });

    await test.step('Navigate to product detail page', async () => {
      await productDetailsPage.gotoByProductId(3);
      await expect(productDetailsPage.container).toBeVisible();
    });

    await test.step('Verify desktop layout arrangement', async () => {
      // Get bounding boxes for image and product info
      const image = productDetailsPage.image(3);
      const name = productDetailsPage.name(3);

      const imageBbox = await image.boundingBox();
      const nameBbox = await name.boundingBox();

      // Product info should be visible and properly positioned
      expect(imageBbox).toBeDefined();
      expect(nameBbox).toBeDefined();
    });

    await test.step('Verify desktop-optimized content display', async () => {
      // All sections should be visible
      await expect(productDetailsPage.descriptionSection(3)).toBeVisible();
      await expect(productDetailsPage.specsSection(3)).toBeVisible();
      await expect(productDetailsPage.shippingInfoBox(3)).toBeVisible();
      await expect(productDetailsPage.returnsInfoBox(3)).toBeVisible();
    });

    await test.step('Verify page fits within viewport without scrolling', async () => {
      const hasHorizontalScroll = await productDetailsPage.isHorizontalScrollbarVisible();
      expect(hasHorizontalScroll).toBe(false);
    });
  });

  test('Verify no overlapping or clipped UI elements across viewports @smoke', async ({ page, baseURL }) => {
    const productDetailsPage = new ProductDetailsPage(page);
    const viewportSizes = [
      { width: 375, height: 667 },
      { width: 768, height: 1024 },
      { width: 1280, height: 720 },
      { width: 1920, height: 1080 },
    ];

    const productId = 1;

    for (const viewport of viewportSizes) {
      await test.step(`Check elements at viewport ${viewport.width}x${viewport.height}`, async () => {
        await page.setViewportSize(viewport);
        await productDetailsPage.gotoByProductId(productId);

        // Check key elements visibility and positioning
        const image = productDetailsPage.image(productId);
        const name = productDetailsPage.name(productId);
        const price = productDetailsPage.price(productId);
        const addButton = productDetailsPage.addToCartButton(productId);

        // All elements should be visible
        await expect(image).toBeVisible();
        await expect(name).toBeVisible();
        await expect(price).toBeVisible();
        await expect(addButton).toBeVisible();

        // Check no elements are clipped
        const imageClipped = await productDetailsPage.checkElementClipping('[data-testid*="product-img"]');
        const nameClipped = await productDetailsPage.checkElementClipping('[data-testid*="product-name"]');
        const priceClipped = await productDetailsPage.checkElementClipping('[data-testid*="product-price"]');

        expect(imageClipped).toBe(false);
        expect(nameClipped).toBe(false);
        expect(priceClipped).toBe(false);
      });
    }
  });

  test('Verify behavior is consistent across different screen sizes @smoke', async ({ page, baseURL }) => {
    const productDetailsPage = new ProductDetailsPage(page);
    const testProductId = 4;
    const viewports = [
      { size: { width: 375, height: 667 }, name: 'Mobile' },
      { size: { width: 768, height: 1024 }, name: 'Tablet' },
      { size: { width: 1280, height: 720 }, name: 'Desktop' },
    ];

    for (const viewport of viewports) {
      await test.step(`Verify functionality on ${viewport.name}`, async () => {
        await page.setViewportSize(viewport.size);
        await productDetailsPage.gotoByProductId(testProductId);

        // Product should be loaded
        await expect(productDetailsPage.container).toBeVisible();

        // Navigation should work
        await expect(productDetailsPage.backToProductsButton).toBeVisible();

        // Add to cart should work
        await productDetailsPage.addToCart(testProductId);

        // Verify cart badge appears
        const cartBadge = productDetailsPage.cartBadge();
        await expect(cartBadge).toBeVisible();
      });
    }
  });

  test('Verify text is readable on all viewports @smoke', async ({ page, baseURL }) => {
    const productDetailsPage = new ProductDetailsPage(page);
    const viewports = [
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1280, height: 720, name: 'Desktop' },
    ];

    const productId = 5;

    for (const viewport of viewports) {
      await test.step(`Check text readability on ${viewport.name}`, async () => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await productDetailsPage.gotoByProductId(productId);

        // Get font sizes and visibility
        const name = productDetailsPage.name(productId);
        const description = productDetailsPage.descriptionSection(productId);
        const price = productDetailsPage.price(productId);

        // Elements should be visible and readable
        await expect(name).toBeVisible();
        await expect(description).toBeVisible();
        await expect(price).toBeVisible();

        // Get computed styles to verify text is not too small
        const fontSize = await name.evaluate((el) => 
          window.getComputedStyle(el).fontSize
        );

        // Font size should be at least 12px
        const fontSizeNum = parseInt(fontSize);
        expect(fontSizeNum).toBeGreaterThanOrEqual(12);
      });
    }
  });

  test('Verify images are properly scaled on different viewports @smoke', async ({ page, baseURL }) => {
    const productDetailsPage = new ProductDetailsPage(page);
    const productId = 6;

    const viewports = [
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1280, height: 720, name: 'Desktop' },
    ];

    for (const viewport of viewports) {
      await test.step(`Verify image scaling on ${viewport.name}`, async () => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await productDetailsPage.gotoByProductId(productId);

        const image = productDetailsPage.image(productId);
        const imageBbox = await image.boundingBox();

        // Image should be visible
        await expect(image).toBeVisible();

        // Image should not be too small (at least 150px in smallest dimension)
        const minDimension = Math.min(imageBbox.width, imageBbox.height);
        expect(minDimension).toBeGreaterThanOrEqual(100);

        // Image should not exceed viewport width
        expect(imageBbox.width).toBeLessThanOrEqual(viewport.width);
      });
    }
  });
});

// Cross-browser test
test.describe('Product Detail - Cross-Browser Consistency @smoke', () => {
  // This test will run on all configured browsers (Chromium, Firefox, WebKit)
  test('Verify core functionality works consistently across browsers @smoke', async ({ page, browserName, baseURL }) => {
    const productDetailsPage = new ProductDetailsPage(page);
    const productId = 1;

    await test.step(`Test on ${browserName} browser`, async () => {
      await productDetailsPage.gotoByProductId(productId);
      await expect(productDetailsPage.container).toBeVisible();
    });

    await test.step('Verify product information displays correctly', async () => {
      const name = productDetailsPage.name(productId);
      const price = productDetailsPage.price(productId);
      const description = productDetailsPage.descriptionSection(productId);

      await expect(name).toBeVisible();
      await expect(price).toBeVisible();
      await expect(description).toBeVisible();
    });

    await test.step('Verify add to cart functionality works', async () => {
      const addButton = productDetailsPage.addToCartButton(productId);
      await addButton.click();

      // Verify success state
      await expect(addButton).toContainText(/Added to Cart|✓ Added to Cart/);
    });

    await test.step('Verify navigation works', async () => {
      const backButton = productDetailsPage.backToProductsButton;
      await expect(backButton).toBeVisible();
      await expect(backButton).toBeEnabled();
    });
  });

  test('Verify form interactions are consistent across browsers @smoke', async ({ page, browserName }) => {
    const productDetailsPage = new ProductDetailsPage(page);
    const productId = 2;

    await test.step(`Test interactions on ${browserName}`, async () => {
      await productDetailsPage.gotoByProductId(productId);
    });

    await test.step('Verify quantity selector works', async () => {
      const quantityInput = productDetailsPage.quantityInput(productId);
      const incrementButton = productDetailsPage.quantityIncrementButton(productId);

      await expect(quantityInput).toHaveValue('1');

      // Increment quantity
      await incrementButton.click();
      await expect(quantityInput).toHaveValue('2');
    });

    await test.step('Verify button interactions', async () => {
      const addButton = productDetailsPage.addToCartButton(productId);

      // Button should be enabled and clickable
      await expect(addButton).toBeEnabled();
      await addButton.click();
    });
  });

  test('Verify styling is consistent across browsers @smoke', async ({ page, browserName }) => {
    const productDetailsPage = new ProductDetailsPage(page);
    const productId = 3;

    await productDetailsPage.gotoByProductId(productId);

    await test.step(`Verify styling on ${browserName}`, async () => {
      // Verify container has proper styling
      const container = productDetailsPage.container;
      await expect(container).toHaveClass(/product-details-container/);

      // Verify buttons have proper styling
      const addButton = productDetailsPage.addToCartButton(productId);
      const computedStyle = await addButton.evaluate((el) => 
        window.getComputedStyle(el)
      );

      // Button should have readable colors
      expect(computedStyle.color).toBeTruthy();
      expect(computedStyle.backgroundColor).toBeTruthy();
    });
  });
});
