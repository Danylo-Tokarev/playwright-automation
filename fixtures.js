const base = require('@playwright/test');   // берём "обычный" Playwright

const test = base.test.extend({             // создаём СВОЙ test — такой же, но с доп. заготовщиком
  fruitsPage: async ({ page }, use) => {     // имя заготовщика: fruitsPage. Он берёт обычный page
    await page.goto('https://demo.playwright.dev/api-mocking');  // НАРЕЗКА: заранее зашли на страницу
    await use(page);                         // ПОДАЁМ готовую страницу тесту
  },
});
module.exports = { test, expect: base.expect };  // отдаём наш test наружу, чтобы тесты его взяли