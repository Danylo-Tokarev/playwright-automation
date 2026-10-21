const { test, expect } = require('@playwright/test');
const { ProductsPage } = require('../Pages/ProductsPage');

test.describe('ToolShop search', () => {
  let productsPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    await productsPage.goto();
  });

  test('search returns matching products', async ({ page }) => {
    await productsPage.search('Pliers');
    await expect(productsPage.productNames.first()).toContainText('Pliers');
  });
  test('search with no results shows message', async ({ page }) => {
    await productsPage.search('zzzzzz');
    await expect(productsPage.emptySearch).toBeVisible();
    await expect(productsPage.emptySearch).toHaveText('There are no products found.');
});
});