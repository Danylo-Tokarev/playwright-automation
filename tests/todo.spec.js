const { test, expect } = require('@playwright/test');

test.describe('Todo tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');   // общий setup
  });

  async function addTodo(page, text) {
  await page.getByPlaceholder('What needs to be done?').fill(text);
  await page.getByPlaceholder('What needs to be done?').press('Enter');
}

  test('adds two todos', async ({ page }) => {
    await addTodo(page, 'Buy milk' )
    await addTodo(page, 'Walk the dog')

    await expect(page.getByTestId('todo-title')).toHaveCount(2);   // ← проверяет ТОЛЬКО добавление
  });

  test('completing a todo updates the counter', async ({ page }) => {
    await addTodo(page, 'Buy milk' )
    await addTodo(page, 'Walk the dog')

    await page.getByRole('listitem').filter({ hasText: 'Buy milk' }).getByRole('checkbox').check();

    await expect(page.getByText('1 item left')).toBeVisible();   // ← проверяет ТОЛЬКО выполнение
  });

});