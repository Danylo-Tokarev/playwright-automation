const { expect } = require('@playwright/test');

class ToolShopLoginPage {
  constructor(page) {
    this.page = page;
    this.email = page.locator('[data-test="email"]');
    this.password = page.locator('[data-test="password"]');
    this.loginBtn = page.locator('[data-test="login-submit"]');
    this.loginError = page.locator('[data-test="login-error"]');
  }

  async goto () {
    await this.page.goto('/auth/login');
  }

  async login (useremail,password) {
   await this.email.fill(useremail);
   await this.password.fill(password);
   await this.loginBtn.click();
  }


}

module.exports = { ToolShopLoginPage };