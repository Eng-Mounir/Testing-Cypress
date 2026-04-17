# Detailed Guide - cypress/e2e/01-authentication.cy.js

Generated on: 2026-03-23

## 1) File Overview

- File path: cypress/e2e/01-authentication.cy.js
- Purpose: This file contains end-to-end test scenarios executed by Cypress.

## 2) Test Cases In This File

### 1. TC-001

- Test name: [TC-001] Should login successfully with valid email and password
- Scenario note: No additional comment found.
- Expected behavior: The assertions in this test should validate the scenario above against the live UI.
- Reuse: This case can be reused as a regression test after UI or API updates.

### 2. TC-002

- Test name: [TC-002] Should display error message with invalid email
- Scenario note: No additional comment found.
- Expected behavior: The assertions in this test should validate the scenario above against the live UI.
- Reuse: This case can be reused as a regression test after UI or API updates.

### 3. TC-003

- Test name: [TC-003] Should display error message with invalid password
- Scenario note: No additional comment found.
- Expected behavior: The assertions in this test should validate the scenario above against the live UI.
- Reuse: This case can be reused as a regression test after UI or API updates.

### 4. TC-004

- Test name: [TC-004] Should show validation error when fields are empty
- Scenario note: No additional comment found.
- Expected behavior: The assertions in this test should validate the scenario above against the live UI.
- Reuse: This case can be reused as a regression test after UI or API updates.

### 5. TC-005

- Test name: [TC-005] Should validate required fields on registration form
- Scenario note: No additional comment found.
- Expected behavior: The assertions in this test should validate the scenario above against the live UI.
- Reuse: This case can be reused as a regression test after UI or API updates.

### 6. TC-006

- Test name: [TC-006] Should logout successfully
- Scenario note: No additional comment found.
- Expected behavior: The assertions in this test should validate the scenario above against the live UI.
- Reuse: This case can be reused as a regression test after UI or API updates.

## Source Code

```javascript
// ============================================
// TEST SUITE: AUTHENTICATION & LOGIN
// ============================================

describe("Authentication Tests", () => {
  beforeEach(() => {
    cy.fixture("users").as("users");
  });

  /**
   * TC-001: Positive test - Login with valid credentials
   */
  it("[TC-001] Should login successfully with valid email and password", function () {
    cy.login(this.users.validUsers[0].email, this.users.validUsers[0].password);
    
    // Assertion 1: URL should contain account page
    cy.url().should("include", "/account");
    
    // Assertion 2: Account page title should be visible
    cy.get('[data-test="page-title"]').should("contain", "My account");
    
    // Assertion 3: User menu should be present
    cy.get('[data-test="nav-menu"]').should("be.visible");
  });

  /**
   * TC-002: Negative test - Login with invalid email
   */
  it("[TC-002] Should display error message with invalid email", function () {
    cy.login(
      this.users.invalidUsers[0].email,
      this.users.invalidUsers[0].password
    );
    
    // Assertion 1: Error message should be visible
    cy.verifyErrorMessage(this.users.invalidUsers[0].expectedError);
    
    // Assertion 2: User should remain on login page
    cy.url().should("include", "/auth/login");
    
    // Assertion 3: Email input should still be visible
    cy.get('[data-test="email"]').should("be.visible");
  });

  /**
   * TC-003: Negative test - Login with invalid password
   */
  it("[TC-003] Should display error message with invalid password", function () {
    cy.login(
      this.users.validUsers[0].email,
      this.users.invalidUsers[1].password
    );
    
    // Assertion 1: Error message should be displayed
    cy.contains("Invalid").should("be.visible");
    
    // Assertion 2: URL should stay on login page
    cy.url().should("include", "/auth/login");
    
    // Assertion 3: Password field should still be visible
    cy.get('[data-test="password"]').should("be.visible");
  });

  /**
   * TC-004: Negative test - Login with empty email and password
   */
  it("[TC-004] Should show validation error when fields are empty", function () {
    cy.visit("/auth/login");
    cy.get('[data-test="login-submit"]').click();
    
    // Assertion 1: Email validation message should appear
    cy.get('[data-test="email-error"]').should("be.visible");
    
    // Assertion 2: Password validation message should appear
    cy.get('[data-test="password-error"]').should("be.visible");
    
    // Assertion 3: User should remain on login page
    cy.url().should("include", "/auth/login");
  });

  /**
   * TC-005: Test - Registration form required-field validation
   */
  it("[TC-005] Should validate required fields on registration form", () => {
    cy.visit("/auth/register");
    cy.get('[data-test="register-submit"]').click();

    // Assertion 1: Required field error for first name should appear
    cy.get('[data-test="first-name-error"]').should("be.visible");

    // Assertion 2: Required field error for last name should appear
    cy.get('[data-test="last-name-error"]').should("be.visible");

    // Assertion 3: User remains on registration page
    cy.url().should("include", "/auth/register");
  });

  /**
   * TC-006: Test - Logout functionality
   */
  it("[TC-006] Should logout successfully", function () {
    cy.login(this.users.validUsers[0].email, this.users.validUsers[0].password);
    cy.logout();
    
    // Assertion 1: User should be redirected away from account page
    cy.url().should("not.include", "/account");
    
    // Assertion 2: User menu should not be visible
    cy.get('[data-test="nav-menu"]').should("not.exist");
    
    // Assertion 3: Login link should be available
    cy.get('[data-test="nav-sign-in"]').should("be.visible");
  });
});

```
