const { expect } = require('@playwright/test');

class ProductPage {
  constructor(page) {
    this.page = page;
    this.addToCartBtn = page.locator('[data-test="add-to-cart"]');
    this.cartQuantity = page.locator('[data-test="cart-quantity"]');
    this.productLinks = page.locator('a[data-test^="product-"]');
  }

    async openFirstProduct() {
  await this.page.goto('/');
  await this.productLinks.first().click();
  await expect(this.addToCartBtn).toBeVisible();
    }
async addToCart() {
    await this.addToCartBtn.click();
}
}

module.exports = { ProductPage };