const { test, expect } = require('@playwright/test');
const { ToolShopLoginPage } = require('../Pages/ToolShopLoginPage');

const invalidLogins = [
  // --- field validation (client-side) ---
  { desc: 'empty email and password',        email: '',                                  password: '',              expectedError: 'Email is required' },
  { desc: 'empty email, valid password',     email: '',                                  password: 'SomePass123',   expectedError: 'Email is required' },
  { desc: 'valid email, empty password',     email: 'user@example.com',                  password: '',              expectedError: 'Password is required' },
  { desc: 'invalid email format (no @)',      email: 'notanemail',                        password: 'SomePass123',   expectedError: 'Email format is invalid' },
  { desc: 'invalid email format (no domain)', email: 'user@',                             password: 'SomePass123',   expectedError: 'Email format is invalid' },

  // --- authentication failure (server-side) ---
  { desc: 'valid email, wrong password',      email: 'admin@practicesoftwaretesting.com', password: 'WrongPass123',  expectedError: 'Invalid email or password' },
  { desc: 'non-existent user',                email: 'nouser@example.com',                password: 'SomePass123',   expectedError: 'Invalid email or password' },
  { desc: 'wrong email, wrong password',      email: 'random@test.io',                    password: 'Qwerty123',     expectedError: 'Invalid email or password' },
  { desc: 'correct password, wrong email',    email: 'admin2@practicesoftwaretesting.com',password: 'welcome01',     expectedError: 'Invalid email or password' },
  { desc: 'sql-injection-like input',         email: "' OR '1'='1",                       password: "' OR '1'='1",   expectedError: 'Email format is invalid' },
];

test.describe('ToolShop login', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new ToolShopLoginPage(page);
    await loginPage.goto();
  });

  for (const data of invalidLogins) {
    test(`login fails: ${data.desc}`, async ({ page }) => {
      await loginPage.login(data.email, data.password);
      await expect(page.getByText(data.expectedError)).toBeVisible();
    });
  }
});