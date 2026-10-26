# Playwright Automation — Toolshop

[![Playwright Tests](https://github.com/Danylo-Tokarev/playwright-automation/actions/workflows/playwright.yml/badge.svg)](https://github.com/Danylo-Tokarev/playwright-automation/actions/workflows/playwright.yml)

End-to-end UI test automation for the **[Toolshop](https://practicesoftwaretesting.com)** demo application
(Practice Software Testing), built with **Playwright + JavaScript** using the **Page Object Model**.
The suite runs **cross-browser** (Chromium, Firefox, WebKit) and in **CI on every push and pull request**.

---

## Tech stack

- **Playwright** (`@playwright/test` ^1.64) — test runner & browser automation
- **JavaScript** (Node.js, CommonJS modules)
- **Page Object Model** — reusable, maintainable page classes
- **dotenv** — environment-based configuration (`baseURL`, credentials)
- **GitHub Actions** — CI pipeline with HTML report as an artifact

---

## What's covered

**15 test cases × 3 browsers** (Chromium / Firefox / WebKit) across 4 spec files:

| Area | Scenarios |
|------|-----------|
| **Authentication** | Valid login → redirect to admin dashboard (credentials from env); invalid login → `Invalid email or password` |
| **Negative login (data-driven)** | 10 cases from a single dataset: empty fields (`Email is required` / `Password is required`), invalid email format and injection-like input (`Email format is invalid`), wrong / non-existent credentials (`Invalid email or password`) |
| **Product search** | Matching query (`Pliers`) returns products; unknown query → `There are no products found.` |
| **Shopping cart** | Open first product → add to cart → cart quantity updates to `1` |

---

## Key practices demonstrated

- **Page Object Model** — locators and actions encapsulated in `Pages/` classes, specs stay readable
- **Data-driven testing** — one array of objects generates 10 login tests via a loop
- **Web-first assertions** — auto-waiting (`expect(locator).toBeVisible()`, `getByText`, `toHaveText`) instead of hard waits
- **Cross-browser execution** — Chromium, Firefox, WebKit
- **Environment-based config** — `baseURL` and credentials via `.env` locally and GitHub Secrets in CI; no secrets in the repo
- **Flaky-test handling** — a flaky login case was diagnosed via the trace viewer (parallel load on a shared public demo environment) and stabilized with an explicit `waitFor` plus tuned timeouts in `playwright.config.js`
- **CI integration** — tests run automatically on push / PR; the HTML report is uploaded as a build artifact

---

## Project structure

```
playwright-automation/
├── Pages/
│   ├── ToolShopLoginPage.js     # login: email, password, submit, error
│   ├── ProductsPage.js          # catalog search: query, submit, results, no-results
│   └── ProductPage.js           # product details + add to cart
├── tests/
│   ├── tool-shop-login.spec.js  # valid login + invalid-login error
│   ├── Login-test.spec.js       # data-driven negative login (10 cases)
│   ├── toolshop-search.spec.js  # search: positive + no-results
│   └── toolshop-cart.spec.js    # add product to cart
├── .github/workflows/
│   └── playwright.yml           # CI (push / PR → main, master)
├── playwright.config.js         # projects, baseURL, timeouts, parallelism
├── .env                         # local config (gitignored)
└── package.json
```

---

## Getting started

### Prerequisites
- Node.js (LTS) and npm

### Install
```bash
npm ci                     # or: npm install
npx playwright install     # download browser binaries
```

### Configure environment
Create a `.env` file in the project root:
```env
BASE_URL=https://practicesoftwaretesting.com
USER_EMAIL=admin@practicesoftwaretesting.com
USER_PASSWORD=welcome01
```
> `.env` is gitignored. The valid-login test reads `USER_EMAIL` / `USER_PASSWORD`.
> In CI the credentials come from **GitHub Secrets** and `BASE_URL` is set in the workflow.

---

## Running the tests

```bash
# all tests, all browsers
npx playwright test

# a single spec
npx playwright test tests/Login-test.spec.js

# a single browser
npx playwright test --project=chromium

# headed (watch it run)
npx playwright test --headed

# open the HTML report after a run
npx playwright show-report
```

---

## Configuration highlights (`playwright.config.js`)

- `fullyParallel: true` — tests run in parallel
- `retries: 2` on CI, `0` locally; `workers: 1` on CI for stability against the shared demo environment
- `timeout: 60s`, `navigationTimeout: 45s`, `actionTimeout: 15s`
- `reporter: 'html'`, `trace: 'on-first-retry'`
- Projects: `chromium`, `firefox`, `webkit` (plus an `api` project reserved for future `*.api.spec.js` tests)

---

## Reports & debugging

- **HTML report** — per-test/per-browser results (`npx playwright show-report`)
- **Trace viewer** — traces are captured on first retry; open a failed run's trace to inspect every step, DOM snapshot and network call

---

## CI/CD

Workflow: `.github/workflows/playwright.yml`. On every push and pull request to `main` / `master`:
checkout → setup Node (LTS) → `npm ci` → `npx playwright install --with-deps` → `npx playwright test` →
upload the `playwright-report/` as an artifact (30-day retention). Credentials are injected from GitHub Secrets.

---

## Roadmap

- [ ] Dedicated **API test suite** (`*.api.spec.js`: CRUD, status codes, response/schema validation, negative cases)
- [ ] **TypeScript** migration (types + interfaces for test data)
- [ ] **Allure** reporting
- [ ] Run tests in **Docker**

---

## Author

**Danylo Tokarev** — Junior QA Automation Engineer
GitHub: [Danylo-Tokarev](https://github.com/Danylo-Tokarev)
