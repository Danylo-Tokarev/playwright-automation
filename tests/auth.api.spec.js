const { test , expect } = require("@playwright/test");

test("return 200 with valid token", async ({ request }) => {
  const response = await request.get('https://httpbin.org/bearer',{ headers: { 'Authorization': 'Bearer ...' }});
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.authenticated).toBe(true);
});

test("return 401 without token", async ({ request }) => {
  const response = await request.get('https://httpbin.org/bearer');
  expect(response.status()).toBe(401);

});