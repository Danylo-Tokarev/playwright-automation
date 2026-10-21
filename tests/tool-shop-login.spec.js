const { test, expect } = require('@playwright/test');
const { ToolShopLoginPage } = require('../Pages/ToolShopLoginPage');

test.describe('ToolShop login', () => {
  let loginPage;                          

  test.beforeEach(async ({ page }) => {
    loginPage = new ToolShopLoginPage(page);  
    await loginPage.goto();          
  });

  test('valid login redirects to dashboard', async ({ page }) => {
       await loginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
    await expect(page).toHaveURL(/admin\/dashboard/);
  });

  test('invalid login shows error', async ({ page }) => {
    await loginPage.login('admin@practicesoftwaretesting.com', 'welcome011');
    await expect(loginPage.loginError).toBeVisible();
    await expect(loginPage.loginError).toHaveText('Invalid email or password');
  });
});