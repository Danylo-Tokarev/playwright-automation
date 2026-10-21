class LoginPage {
  constructor(page){
    this.page = page;
    
    this.username = page.locator('[name="username"]');
    this.password = page.locator('[id="password"]');
    this.button = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');

  }





  

async goto() {
  await this.page.goto('https://the-internet.herokuapp.com/login');
}

async login(user, pass) {
  await this.username.fill(user);
  await this.password.fill(pass);
  await this.button.click();

}
}
module.exports = { LoginPage };