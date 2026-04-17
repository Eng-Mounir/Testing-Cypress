// ***********************************************************
// HOOKS & GLOBAL SETUP FOR PRACTICE SOFTWARE TESTING TESTS
// ***********************************************************
// This file is processed and loaded automatically before your test files.
// You can put global configuration and behavior that modifies Cypress here.
// You can also add global "before" and "after" hooks here.
require('./commands'); //hena ba2olo ba2olo awel haga y load custome commands w hooks dh mn 8yyro cy.login w cy.visit msh hayshta8lo

// ============================================
// GLOBAL HOOKS
// ============================================

/**
 * runs ONCE before all tests start
 */
before(() => {
  cy.log('🚀 Starting Test Suite Execution');
});

/**
 * runs before EVERY single test
 */
beforeEach(() => {
  // Clear cookies and session Without this, if TC-001 logs in, TC-002 would start already logged in, which would mess up the test.
  cy.clearCookies();
  cy.clearLocalStorage();
  
  // Visit home page
  cy.visit('/');
  
  // Wait for page to load
  cy.get('body').should('be.visible');
  
  cy.log('✅ Test setup completed');
});

/**
 *  runs after EVERY single test
 */
afterEach(() => {
  cy.log('📋 Test execution completed');
  
  // Optional: Create a screenshot on failure
  // This is handled by Cypress configuration
});

/**
 * runs ONCE after all tests finish
 */
after(() => {
  cy.log('✅ All tests completed');
});

// ============================================
// GLOBAL CONFIGURATION
// ============================================

// Suppress axios XHR warnings This is just cosmetic. When your tests run, Cypress shows every network request in its log panel, which gets very noisy and hard to read. This code hides those network request logs so you only see the important test steps.
// It works by injecting a small CSS rule that hides those log entries visually.
const app = window.top;

if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
  const style = app.document.createElement('style');
  style.innerHTML =
    '.command-name-request, .command-name-xhr { display: none }';
  style.setAttribute('data-hide-command-log-request', '');

  app.document.head.appendChild(style);
}

// Handle uncaught exceptions dh lw website zat nafso 3aml error laama ba3at javascript awel mara y3ny moshkla mn website zat nafso msh el test case byta3ty
Cypress.on('uncaught:exception', (err, runnable) => {
  // Return false to prevent Cypress from failing the test
  return false;
});