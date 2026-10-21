const { test, expect } = require('@playwright/test');

test('successful login', async ({ page }) => {
  test.setTimeout(60000);   // общий таймаут теста 60 сек

  await page.goto('https://the-internet.herokuapp.com/login', { timeout: 60000 });  // ждём загрузку до 60 сек

  await page.getByLabel('Username').fill('tomsmith1');
  await page.getByLabel('Password').fill('SuperSecretPassword1!');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.locator('#flash')).toContainText('Your username is invalid!');

  await expect(page).not.toHaveURL(/secure/);
});