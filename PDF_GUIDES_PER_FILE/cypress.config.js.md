# Detailed Guide - cypress.config.js

Generated on: 2026-03-23

## 1) File Overview

- File path: cypress.config.js
- Purpose: This file controls Cypress runtime behavior and project-level E2E settings.

## 2) Configuration Highlights

- baseUrl points to practicesoftwaretesting.com.
- specPattern includes all .cy.js files under cypress/e2e.
- supportFile uses cypress/support/e2e.js.
- timeouts and viewport are configured for stable runs.
- video and screenshots are enabled for test evidence.

## Source Code

```javascript
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,
  projectId: "practice_software_testing",
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 8000,
  requestTimeout: 10000,
  responseTimeout: 10000,
  pageLoadTimeout: 30000,
  video: true,
  screenshotOnRunFailure: true,
  
  e2e: {
    baseUrl: "https://practicesoftwaretesting.com",
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});

```
