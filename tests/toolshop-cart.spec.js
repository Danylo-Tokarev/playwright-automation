const { test, expect } = require('@playwright/test');
const { ProductPage } = require('../Pages/ProductPage');
 
test.describe('ToolShop cart', () => {
  let productPage;
 
  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    await productPage.openFirstProduct();
  });
 
  test('add product to cart updates quantity', async () => {
    await productPage.addToCart();
    await expect(productPage.cartQuantity).toHaveText('1');
  });
});
 