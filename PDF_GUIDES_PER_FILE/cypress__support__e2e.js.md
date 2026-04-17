# Detailed Guide - cypress/support/e2e.js

Generated on: 2026-03-23

## 1) File Overview

- File path: cypress/support/e2e.js
- Purpose: This file provides global hooks and runtime setup for every Cypress test.

## 2) Global Hooks Summary

- before(): logs test suite start.
- beforeEach(): clears state and opens base page.
- afterEach(): logs test completion.
- after(): logs suite completion.
- uncaught:exception handler: avoids hard-failing on non-critical app exceptions.

## Source Code

```javascript
// ***********************************************************
// HOOKS & GLOBAL SETUP FOR PRACTICE SOFTWARE TESTING TESTS
// ***********************************************************

require('./commands');

// ============================================
// GLOBAL HOOKS
// ============================================

/**
 * Before ALL tests
 */
before(() => {
  cy.log('🚀 Starting Test Suite Execution');
});

/**
 * Before EACH test
 */
beforeEach(() => {
  // Clear cookies and session
  cy.clearCookies();
  cy.clearLocalStorage();
  
  // Visit home page
  cy.visit('/');
  
  // Wait for page to load
  cy.get('body').should('be.visible');
  
  cy.log('✅ Test setup completed');
});

/**
 * After EACH test
 */
afterEach(() => {
  cy.log('📋 Test execution completed');
  
  // Optional: Create a screenshot on failure
  // This is handled by Cypress configuration
});

/**
 * After ALL tests
 */
after(() => {
  cy.log('✅ All tests completed');
});

// ============================================
// GLOBAL CONFIGURATION
// ============================================

// Suppress axios XHR warnings
const app = window.top;

if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
  const style = app.document.createElement('style');
  style.innerHTML =
    '.command-name-request, .command-name-xhr { display: none }';
  style.setAttribute('data-hide-command-log-request', '');

  app.document.head.appendChild(style);
}

// Handle uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  // Return false to prevent Cypress from failing the test
  return false;
});
```
