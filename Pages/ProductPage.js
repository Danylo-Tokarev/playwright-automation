const { expect } = require('@playwright/test');

class ProductPage {
  constructor(page) {
    this.page = page;
    this.addToCartBtn = page.locator('[data-test="add-to-cart"]');
    this.cartQuantity = page.locator('[data-test="cart-quantity"]');
  }

  async gotoProduct(productId){
    await this.page.goto(`/product/${productId}`);
  }

async addToCart() {
    await this.addToCartBtn.click();
}
}

module.exports = { ProductPage };