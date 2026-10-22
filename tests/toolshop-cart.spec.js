const { test, expect } = require('@playwright/test');
const { ProductPage } = require('../Pages/ProductPage');

test.describe('ToolShop cart', () => {
  let productPage;
  const IN_STOCK_PRODUCT = '01M5HYKEV330ZJYRKTSGFAP7C6';

  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    await productPage.gotoProduct(IN_STOCK_PRODUCT);
  });

  test('add product to cart updates quantity', async () => {
    await productPage.addToCart();
    await expect(productPage.cartQuantity).toHaveText('1');
  });
});