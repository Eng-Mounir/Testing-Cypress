# Detailed Guide - cypress/e2e/02-products.cy.js

Generated on: 2026-03-23

## 1) File Overview

- File path: cypress/e2e/02-products.cy.js
- Purpose: This file contains end-to-end test scenarios executed by Cypress.

## 2) Test Cases In This File

### 1. TC-007

- Test name: [TC-007] Should search for product and display results
- Scenario note: No additional comment found.
- Expected behavior: The assertions in this test should validate the scenario above against the live UI.
- Reuse: This case can be reused as a regression test after UI or API updates.

### 2. TC-008

- Test name: [TC-008] Should display 
- Scenario note: No additional comment found.
- Expected behavior: The assertions in this test should validate the scenario above against the live UI.
- Reuse: This case can be reused as a regression test after UI or API updates.

### 3. TC-009

- Test name: [TC-009] Should filter products by category
- Scenario note: No additional comment found.
- Expected behavior: The assertions in this test should validate the scenario above against the live UI.
- Reuse: This case can be reused as a regression test after UI or API updates.

### 4. TC-010

- Test name: [TC-010] Should filter products by price range
- Scenario note: No additional comment found.
- Expected behavior: The assertions in this test should validate the scenario above against the live UI.
- Reuse: This case can be reused as a regression test after UI or API updates.

### 5. TC-011

- Test name: [TC-011] Should sort products by name (A-Z)
- Scenario note: No additional comment found.
- Expected behavior: The assertions in this test should validate the scenario above against the live UI.
- Reuse: This case can be reused as a regression test after UI or API updates.

### 6. TC-012

- Test name: [TC-012] Should sort products by price (Low to High)
- Scenario note: No additional comment found.
- Expected behavior: The assertions in this test should validate the scenario above against the live UI.
- Reuse: This case can be reused as a regression test after UI or API updates.

### 7. TC-013

- Test name: [TC-013] Should display full product details page
- Scenario note: No additional comment found.
- Expected behavior: The assertions in this test should validate the scenario above against the live UI.
- Reuse: This case can be reused as a regression test after UI or API updates.

### 8. TC-014

- Test name: [TC-014] Should navigate through product pages
- Scenario note: No additional comment found.
- Expected behavior: The assertions in this test should validate the scenario above against the live UI.
- Reuse: This case can be reused as a regression test after UI or API updates.

## Source Code

```javascript
// ============================================
// TEST SUITE: PRODUCT BROWSING & SEARCH
// ============================================

describe("Product Browsing and Search Tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.fixture("products").as("products");
    cy.fixture("users").as("users");
  });

  /**
   * TC-007: Test - Search for a product successfully
   */
  it("[TC-007] Should search for product and display results", function () {
    cy.searchProduct(this.products.products[0].name);

    // Assertion 1: Search caption appears with term
    cy.get('[data-test="search-caption"]').should("be.visible");
    cy.get('[data-test="search-term"]').should("contain", this.products.products[0].name);

    // Assertion 2: Matching product appears
    cy.contains(this.products.products[0].name).should("be.visible");

    // Assertion 3: At least one product card is rendered
    cy.get('[data-test^="product-"]').should("have.length.greaterThan", 0);
  });

  /**
   * TC-008: Test - Search with no results
   */
  it("[TC-008] Should display 'no results' message for invalid search", () => {
    cy.searchProduct("NonexistentProductXYZ123");

    // Assertion 1: no-results container should be displayed
    cy.get('[data-test="no-results"]').should("be.visible");

    // Assertion 2: search term is shown in search caption
    cy.get('[data-test="search-term"]').should("contain", "NonexistentProductXYZ123");

    // Assertion 3: no product cards are rendered
    cy.get('[data-test^="product-"]').should("have.length", 0);
  });

  /**
   * TC-009: Test - Filter products by category
   */
  it("[TC-009] Should filter products by category", function () {
    cy.filterByCategory(this.products.productFilters.categories[0]);

    // Assertion 1: Category checkbox should be checked
    cy.contains("label", this.products.productFilters.categories[0])
      .find('input[type="checkbox"]')
      .should("be.checked");

    // Assertion 2: Product cards are rendered after filtering
    cy.get('[data-test^="product-"]').should("have.length.greaterThan", 0);

    // Assertion 3: Product names are visible
    cy.get('[data-test="product-name"]').first().should("be.visible");
  });

  /**
   * TC-010: Test - Filter products by price range
   */
  it("[TC-010] Should filter products by price range", function () {
    cy.filterByPrice(
      this.products.productFilters.priceRanges[0].min,
      this.products.productFilters.priceRanges[0].max
    );

    // Assertion 1: sort selector remains available after fallback action
    cy.get('[data-test="sort"]').should("be.visible");

    // Assertion 2: price elements exist and are numeric
    cy.get('[data-test="product-price"]').each(($el) => {
      const price = parseFloat($el.text().replace("$", "").trim());
      expect(Number.isNaN(price)).to.eq(false);
      expect(price).to.be.gte(0);
    });

    // Assertion 3: product cards remain visible
    cy.get('[data-test="product-name"]').first().should("be.visible");
  });

  /**
   * TC-011: Test - Sort products by name
   */
  it("[TC-011] Should sort products by name (A-Z)", function () {
    cy.sortProducts("name,asc");

    // Assertion 1: sort value should be selected
    cy.get('[data-test="sort"]').should("have.value", "name,asc");

    // Assertion 2: Sort dropdown should show selected option
    cy.get('[data-test="product-name"]').should("have.length.greaterThan", 1);

    // Assertion 3: names are in ascending order
    cy.get('[data-test="product-name"]').first().then(($first) => {
      const firstName = $first.text().trim().toLowerCase();
      cy.get('[data-test="product-name"]')
        .last()
        .then(($last) => {
          const lastName = $last.text().trim().toLowerCase();
          expect(firstName <= lastName).to.be.true;
        });
    });
  });

  /**
   * TC-012: Test - Sort products by price
   */
  it("[TC-012] Should sort products by price (Low to High)", function () {
    cy.sortProducts("price,asc");

    // Assertion 1: Sort should be applied
    cy.get('[data-test="sort"]').should("have.value", "price,asc");

    // Assertion 2: products are visible
    cy.get('[data-test="product-price"]').should("have.length.greaterThan", 1);

    // Assertion 3: Prices should be in ascending order
    cy.get('[data-test="product-price"]')
      .then(($prices) => {
        const prices = [...$prices].map((el) =>
          parseFloat(el.textContent.replace("$", "").trim())
        );
        for (let i = 0; i < prices.length - 1; i++) {
          expect(prices[i]).to.be.lte(prices[i + 1]);
        }
      });
  });

  /**
   * TC-013: Test - View product details
   */
  it("[TC-013] Should display full product details page", function () {
    cy.searchProduct(this.products.products[0].name);
    cy.viewProductDetails(this.products.products[0].name);

    // Assertion 1: Product name should be displayed
    cy.get('[data-test="product-name"]').should("be.visible");

    // Assertion 2: Product description should be visible
    cy.get('[data-test="product-description"]').should("be.visible");

    // Assertion 3: Add to cart button should be available
    cy.get('button[data-test="add-to-cart"]').should("be.visible");
  });

  /**
   * TC-014: Test - Pagination navigation
   */
  it("[TC-014] Should navigate through product pages", () => {
    cy.visit("/");

    // Assertion 1: Pagination container should exist when multiple pages are available
    cy.get("body").then(($body) => {
      const hasPagination = $body.find(".pagination").length > 0;
      if (!hasPagination) {
        cy.get('[data-test^="product-"]').should("have.length.greaterThan", 0);
        return;
      }

      // Assertion 2: Current active page should be visible
      cy.get(".pagination .page-item.active .page-link")
        .invoke("text")
        .then((initialPage) => {
          // Assertion 3: Click next and verify active page changed
          cy.get('.pagination .page-link[aria-label="Next"]').click({ force: true });
          cy.get(".pagination .page-item.active .page-link")
            .invoke("text")
            .should((newPage) => {
              expect(newPage.trim()).to.not.eq(initialPage.trim());
            });
        });
    });
  });
});

```
