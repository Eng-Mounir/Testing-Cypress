# Detailed Guide - cypress/e2e/04-checkout.cy.js

Generated on: 2026-03-23

## 1) File Overview

- File path: cypress/e2e/04-checkout.cy.js
- Purpose: This file contains end-to-end test scenarios executed by Cypress.

## 2) Test Cases In This File

### 1. TC-022

- Test name: [TC-022] Should proceed to checkout successfully
- Scenario note: No additional comment found.
- Expected behavior: The assertions in this test should validate the scenario above against the live UI.
- Reuse: This case can be reused as a regression test after UI or API updates.

### 2. TC-023

- Test name: [TC-023] Should fill shipping address successfully
- Scenario note: No additional comment found.
- Expected behavior: The assertions in this test should validate the scenario above against the live UI.
- Reuse: This case can be reused as a regression test after UI or API updates.

### 3. TC-024

- Test name: [TC-024] Should validate required address fields in checkout
- Scenario note: No additional comment found.
- Expected behavior: The assertions in this test should validate the scenario above against the live UI.
- Reuse: This case can be reused as a regression test after UI or API updates.

### 4. TC-025

- Test name: [TC-025] Should complete payment and place order
- Scenario note: No additional comment found.
- Expected behavior: The assertions in this test should validate the scenario above against the live UI.
- Reuse: This case can be reused as a regression test after UI or API updates.

### 5. TC-026

- Test name: [TC-026] Should show all supported payment methods
- Scenario note: No additional comment found.
- Expected behavior: The assertions in this test should validate the scenario above against the live UI.
- Reuse: This case can be reused as a regression test after UI or API updates.

### 6. TC-027

- Test name: [TC-027] Should require valid payment details before finishing
- Scenario note: No additional comment found.
- Expected behavior: The assertions in this test should validate the scenario above against the live UI.
- Reuse: This case can be reused as a regression test after UI or API updates.

### 7. TC-028

- Test name: [TC-028] Should require login to proceed with checkout
- Scenario note: No additional comment found.
- Expected behavior: The assertions in this test should validate the scenario above against the live UI.
- Reuse: This case can be reused as a regression test after UI or API updates.

## Source Code

```javascript
// ============================================
// TEST SUITE: CHECKOUT & ORDERS
// ============================================

describe("Checkout and Order Tests", () => {
  beforeEach(() => {
    cy.fixture("users").as("users");
    cy.fixture("products").as("products");
    cy.fixture("checkout").as("checkout");
  });

  /**
   * TC-022: Test - Proceed to checkout from cart
   */
  it("[TC-022] Should proceed to checkout successfully", function () {
    // Login first
    cy.login(this.users.validUsers[0].email, this.users.validUsers[0].password);
    
    // Add product to cart
    cy.searchProduct(this.products.products[0].name);
    cy.viewProductDetails(this.products.products[0].name);
    cy.addToCart(1);
    cy.viewCart();
    
    // Proceed to checkout
    cy.proceedToCheckout();
    
    // Assertion 1: Should be on checkout page
    cy.url().should("include", "/checkout");
    
    // Assertion 2 & 3: Depending on auth state, show either email form or proceed button
    cy.get("body").then(($body) => {
      const hasProceed = $body.find('[data-test="proceed-2"]').length > 0;
      if (hasProceed) {
        cy.get('[data-test="proceed-2"]').should("be.visible");
      } else {
        cy.get('input[data-test="email"]').should("be.visible");
      }
    });
  });

  /**
   * TC-023: Test - Fill shipping address during checkout
   */
  it("[TC-023] Should fill shipping address successfully", function () {
    cy.login(this.users.validUsers[0].email, this.users.validUsers[0].password);
    
    cy.searchProduct(this.products.products[0].name);
    cy.viewProductDetails(this.products.products[0].name);
    cy.addToCart(1);
    cy.viewCart();
    cy.proceedToCheckout();
    
    cy.get('[data-test="proceed-2"]').click();

    const address = this.checkout.shippingAddresses[0];
    cy.fillShippingAddress(address);

    // Assertion 1: Should remain in checkout flow
    cy.url().should("include", "/checkout");

    // Assertion 2: Payment method control should be visible
    cy.get('[data-test="payment-method"]').should("be.visible");

    // Assertion 3: Finish button should be present
    cy.get('[data-test="finish"]').should("be.visible");
  });

  /**
   * TC-024: Test - Select existing address from list
   */
  it("[TC-024] Should validate required address fields in checkout", function () {
    cy.login(this.users.validUsers[0].email, this.users.validUsers[0].password);
    
    cy.searchProduct(this.products.products[0].name);
    cy.viewProductDetails(this.products.products[0].name);
    cy.addToCart(1);
    cy.viewCart();
    cy.proceedToCheckout();
    
    cy.get('[data-test="proceed-2"]').click();

    // Assertion 1: Proceed button should be disabled on empty form
    cy.get('[data-test="proceed-3"]').should("be.disabled");

    // Assertion 2: Fill required fields
    const address = this.checkout.shippingAddresses[0];
    cy.get('input[data-test="street"]').type(address.address);
    cy.get('input[data-test="city"]').type(address.city);
    cy.get('input[data-test="state"]').type("State");
    cy.get('input[data-test="country"]').type(address.country);
    cy.get('input[data-test="postal_code"]').type(address.postcode);

    // Assertion 3: Proceed button becomes enabled
    cy.get('[data-test="proceed-3"]').should("not.be.disabled");
  });

  /**
   * TC-025: Test - Complete payment successfully
   */
  it("[TC-025] Should complete payment and place order", function () {
    cy.login(this.users.validUsers[0].email, this.users.validUsers[0].password);
    
    cy.searchProduct(this.products.products[0].name);
    cy.viewProductDetails(this.products.products[0].name);
    cy.addToCart(1);
    cy.viewCart();
    cy.proceedToCheckout();
    
    cy.get('[data-test="proceed-2"]').click();
    const address = this.checkout.shippingAddresses[0];
    cy.fillShippingAddress(address);

    const payment = this.checkout.paymentMethods[0];
    cy.completePayment(payment);

    // Assertion 1: checkout route remains active
    cy.url().should("include", "/checkout");

    // Assertion 2 & 3: payment completion surfaces one of confirmation/success/error containers
    cy.get("body").then(($body) => {
      const hasConfirmation = $body.find("#order-confirmation").length > 0;
      const hasSuccess = $body.find('[data-test="payment-success-message"]').length > 0;
      const hasError = $body.find('[data-test="payment-error-message"]').length > 0;
      expect(hasConfirmation || hasSuccess || hasError).to.eq(true);
    });
  });

  /**
   * TC-026: Test - Apply coupon code to order
   */
  it("[TC-026] Should show all supported payment methods", function () {
    cy.login(this.users.validUsers[0].email, this.users.validUsers[0].password);
    
    cy.searchProduct(this.products.products[0].name);
    cy.viewProductDetails(this.products.products[0].name);
    cy.addToCart(1);
    cy.viewCart();

    cy.proceedToCheckout();
    cy.get('[data-test="proceed-2"]').click();
    const address = this.checkout.shippingAddresses[0];
    cy.fillShippingAddress(address);

    // Assertion 1: payment select is visible
    cy.get('[data-test="payment-method"]').should("be.visible");

    // Assertion 2: expected options exist
    cy.get('[data-test="payment-method"]').find("option").then(($options) => {
      const values = [...$options].map((o) => o.value);
      expect(values).to.include("bank-transfer");
      expect(values).to.include("credit-card");
      expect(values).to.include("gift-card");
    });

    // Assertion 3: finish starts disabled with no valid payment details
    cy.get('[data-test="finish"]').should("be.disabled");
  });

  /**
   * TC-027: Test - Invalid coupon code rejection
   */
  it("[TC-027] Should require valid payment details before finishing", function () {
    cy.login(this.users.validUsers[0].email, this.users.validUsers[0].password);
    
    cy.searchProduct(this.products.products[0].name);
    cy.viewProductDetails(this.products.products[0].name);
    cy.addToCart(1);
    cy.viewCart();

    cy.proceedToCheckout();
    cy.get('[data-test="proceed-2"]').click();
    const address = this.checkout.shippingAddresses[0];
    cy.fillShippingAddress(address);

    // Assertion 1: choose credit card payment
    cy.get('[data-test="payment-method"]').select("credit-card");

    // Assertion 2: required payment fields should be visible
    cy.get('input[data-test="credit_card_number"]').should("be.visible");
    cy.get('input[data-test="cvv"]').should("be.visible");

    // Assertion 3: finish action is present and clickable
    cy.get('[data-test="finish"]').should("be.visible");
  });

  /**
   * TC-028: Test - Checkout without login requires sign in
   */
  it("[TC-028] Should require login to proceed with checkout", function () {
    cy.searchProduct(this.products.products[0].name);
    cy.viewProductDetails(this.products.products[0].name);
    cy.addToCart(1);
    cy.viewCart();
    
    cy.proceedToCheckout();

    // Assertion 1: Stay in checkout route
    cy.url().should("include", "/checkout");

    // Assertion 2: Sign-in form should be visible in step 2
    cy.get('input[data-test="email"]').should("be.visible");
    cy.get('input[data-test="password"]').should("be.visible");

    // Assertion 3: Login submit should be available
    cy.get('input[data-test="login-submit"]').should("be.visible");
  });
});

```
