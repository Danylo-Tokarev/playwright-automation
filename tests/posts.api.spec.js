const { test, expect } = require('@playwright/test');

test('create post', async ({ request }) => {
  const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
    data: { title: 'foo', body: 'bar', userId: 1 },
  });
  expect(response.status()).toBe(201);

  const body = await response.json();
  expect(body.title).toBe('foo');  
  expect(body.id).toBeTruthy();
});

test('put', async ({ request }) => {
    const response = await request.put('https://jsonplaceholder.typicode.com/posts/1',
         { data: { id: 1, title: 'updated', body: 'new body', userId: 1} });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.title).toBe('updated');
});

test('patch', async ({ request }) => {
    const response = await request.patch('https://jsonplaceholder.typicode.com/posts/1',
         { data: { title: 'patched'} });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.title).toBe('patched');
});

test('delete', async ({ request }) => {
    const response = await request.delete('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.status()).toBe(200);
});