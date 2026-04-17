# Cypress Workshop - Simple Step-by-Step Guide

This guide covers:

- Session 02: Assertions
- Session 03: Hooks
- Session 04: Custom Commands Fundamentals
- Session 05: Fixtures

All examples are based on your current project and test files.

---

## 1. Session 02 - Assertions

Assertions are checks that confirm your app behavior is correct.

### Step 1: Check URL after an action

```javascript
cy.login(this.users.validUsers[0].email, this.users.validUsers[0].password);
cy.url().should("include", "/account");
```

Why: Confirms successful navigation after login.

### Step 2: Check element visibility

```javascript
cy.get('[data-test="page-title"]').should("be.visible");
```

Why: Confirms important UI elements are present.

### Step 3: Check text content

```javascript
cy.get('[data-test="page-title"]').should("contain", "My account");
```

Why: Confirms the correct page is shown, not just any page.

### Step 4: Check element existence or non-existence

```javascript
cy.get('[data-test="nav-menu"]').should("be.visible");
cy.get('[data-test="nav-menu"]').should("not.exist");
```

Why: Useful for login/logout and permission checks.

### Step 5: Numeric assertions (cart totals)

```javascript
cy.get('[data-test="cart-total"]').then(($el) => {
  const total = parseFloat($el.text().replace("$", ""));
  expect(total).to.be.greaterThan(0);
});
```

Why: Ensures values are valid numbers and not broken UI text.

### Step 6: Real arithmetic assertion (best practice)

```javascript
cy.get("body").then(($body) => {
  const parseMoney = (text) => Number(String(text).replace(/[^\d.-]/g, ""));

  const shownTotal = parseMoney($body.find('[data-test="cart-total"]').text());
  const subtotal = parseMoney($body.find('[data-test="cart-subtotal"]').text());
  const discount = $body.find('[data-test="cart-discount"]').length
    ? parseMoney($body.find('[data-test="cart-discount"]').text())
    : 0;

  const expectedTotal = Number((subtotal - discount).toFixed(2));
  expect(Math.abs(shownTotal - expectedTotal)).to.be.lessThan(0.02);
});
```

Why: Verifies actual business logic, not only visibility.

---

## 2. Session 03 - Hooks

Hooks run setup/cleanup code automatically.

Your project uses global hooks in `cypress/support/e2e.js`.

### Step 1: before() - run once before all tests

```javascript
before(() => {
  cy.log('Starting Test Suite Execution');
});
```

### Step 2: beforeEach() - run before every test

```javascript
beforeEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.visit('/');
  cy.get('body').should('be.visible');
});
```

Why: Creates a consistent start state for each test.

### Step 3: afterEach() - run after every test

```javascript
afterEach(() => {
  cy.log('Test execution completed');
});
```

### Step 4: after() - run once after all tests

```javascript
after(() => {
  cy.log('All tests completed');
});
```

### Step 5: Suite-level hooks with fixture loading

```javascript
beforeEach(() => {
  cy.fixture("users").as("users");
  cy.fixture("products").as("products");
});
```

Why: Makes test data easy to access in each test case.

---

## 3. Session 04 - Custom Commands Fundamentals

Custom commands remove duplicate steps and make tests cleaner.

Your project uses `cypress/support/commands.js`.

### Step 1: Create a login command

```javascript
Cypress.Commands.add("login", (email, password) => {
  cy.visit("/auth/login");
  cy.get('[data-test="email"]').clear().type(email);
  cy.get('[data-test="password"]').clear().type(password);
  cy.get('[data-test="login-submit"]').click();
});
```

### Step 2: Use the command in tests

```javascript
cy.login(this.users.validUsers[0].email, this.users.validUsers[0].password);
```

Why: Easier to read and maintain than repeating all steps.

### Step 3: Create domain-specific commands

```javascript
Cypress.Commands.add("searchProduct", (searchTerm) => {
  cy.visit("/");
  cy.get('input[data-test="search-query"]').clear().type(searchTerm);
  cy.get('button[data-test="search-submit"]').click();
});
```

### Step 4: Cart commands

```javascript
Cypress.Commands.add("addToCart", (quantity = 1) => {
  cy.get('input[data-test="quantity"]').click().type(`{selectAll}{backspace}${quantity}`);
  cy.get('button[data-test="add-to-cart"]').click();
});
```

### Step 5: Checkout commands

```javascript
Cypress.Commands.add("proceedToCheckout", () => {
  cy.get('[data-test="proceed-1"]').click();
});
```

### Step 6: Assertion helper commands

```javascript
Cypress.Commands.add("verifyProductInCart", (productName) => {
  cy.get('[data-test="product-title"]').contains(productName).should("be.visible");
});
```

Why: Reusable checks improve consistency.

---

## 4. Session 05 - Fixtures

Fixtures store test data in separate JSON files.

Your project fixture files:

- `cypress/fixtures/users.json`
- `cypress/fixtures/products.json`
- `cypress/fixtures/checkout.json`

### Step 1: Define data in JSON

Example from users fixture:

```json
{
  "validUsers": [
    {
      "email": "customer@practicesoftwaretesting.com",
      "password": "welcome01"
    }
  ]
}
```

### Step 2: Load fixture in beforeEach

```javascript
beforeEach(() => {
  cy.fixture("users").as("users");
});
```

### Step 3: Use fixture data in tests

```javascript
cy.login(this.users.validUsers[0].email, this.users.validUsers[0].password);
```

### Step 4: Data-driven examples

```javascript
const address = this.checkout.shippingAddresses[0];
cy.fillShippingAddress(address);
```

Why: You can test many scenarios by editing data only, without changing test logic.

---

## 5. Full Example (Combining All Sessions)

```javascript
describe("Checkout flow", () => {
  beforeEach(() => {
    cy.fixture("users").as("users");
    cy.fixture("products").as("products");
    cy.fixture("checkout").as("checkout");
  });

  it("should checkout with valid data", function () {
    cy.login(this.users.validUsers[0].email, this.users.validUsers[0].password);
    cy.searchProduct(this.products.products[0].name);
    cy.viewProductDetails(this.products.products[0].name);
    cy.addToCart(1);
    cy.viewCart();
    cy.proceedToCheckout();

    cy.get('[data-test="proceed-2"]').click();
    cy.fillShippingAddress(this.checkout.shippingAddresses[0]);
    cy.completePayment(this.checkout.paymentMethods[0]);

    cy.get("body").then(($body) => {
      const hasConfirmation = $body.find("#order-confirmation").length > 0;
      const hasSuccess = $body.find('[data-test="payment-success-message"]').length > 0;
      expect(hasConfirmation || hasSuccess).to.eq(true);
    });
  });
});
```

---

## 6. What You Already Did Correctly

- Assertions: yes, including strong cart total validation.
- Hooks: yes, global + suite-level fixture loading.
- Custom Commands: yes, reusable and domain-focused.
- Fixtures: yes, data separated from tests.

---

## 7. Next Improvement Checklist

- Replace hard `cy.wait(...)` calls with UI/API state waits where possible.
- Limit `uncaught:exception` ignores to known cases only.
- Keep command names business-focused (already good).
- Keep selector strategy on `data-test` attributes (already good).

---

## 8. File Map in Your Project

- `cypress/support/e2e.js` -> global hooks
- `cypress/support/commands.js` -> custom commands
- `cypress/fixtures/users.json` -> login/profile data
- `cypress/fixtures/products.json` -> product/cart data
- `cypress/fixtures/checkout.json` -> shipping/payment data
- `cypress/e2e/*.cy.js` -> test specs

---

End of workshop guide.
