const { test, expect } = require('@playwright/test');

test('user endpoint works', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users/2');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.id).toBe(2);

    expect(body.email).toBeTruthy();
});

test('Incorrect endpoint id', async ({ request }) => {
        const response = await request.get('https://jsonplaceholder.typicode.com/users/9999');
    expect(response.status()).toBe(404);
});

test 
