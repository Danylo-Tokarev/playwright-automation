class ProductsPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator('[data-test="search-query"]');
    this.searchBtn = page.locator('[data-test="search-submit"]');
    this.productNames = page.locator('[data-test="product-name"]');
    this.emptySearch = page.locator('[data-test="no-results"]');
  }
  async goto() {
    await this.page.goto('/');
  }
async search(item) {
    await this.searchInput.fill(item);
    await this.searchBtn.click();
}

}

module.exports = { ProductsPage };