const { test, expect } = require('@playwright/test');

test.describe('SauceDemo tests: ', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/inventory.html');
    });

 test('cart shows 1:', async ({ page }) => {

    await page.locator('[name="add-to-cart-sauce-labs-backpack"]').click();

    await expect(page.locator('[data-test="shopping-cart-link"]')).toHaveText('1');
 });
});