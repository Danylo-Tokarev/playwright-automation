const { test, expect } = require('../fixtures');

test('fruits are visible', async ({ fruitsPage }) => {
    await expect(fruitsPage.getByText('Strawberry')).toBeVisible();
});