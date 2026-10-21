const { test , expect } = require("@playwright/test");

   test('check for visible text', async ({ page }) => {
    await page.route('**/*.jpg', route => route.abort());
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page.getByText('Products')).toBeVisible()
   });

   test('fulfill our bananus', async ({ page }) =>{
       await page.route('*/**/api/v1/fruits', async route => {
     await route.fulfill({ status: 404 });
   });
        await page.goto('https://demo.playwright.dev/api-mocking');
   await expect(page.getByText('Strawberry')).toBeVisible();
   })   