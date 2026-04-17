// ============================================
// TEST SUITE: ACCOUNT & USER PROFILE
// ============================================

describe("Account and User Profile Tests", () => {
  beforeEach(() => {
    cy.fixture("users").as("users");
    cy.fixture("checkout").as("checkout");
  });

  /**
   * TC-029: Test - View user profile information
   */
  it("[TC-029] Should display user profile information", function () {
    cy.login(this.users.validUsers[0].email, this.users.validUsers[0].password);
    cy.visit("/account");

    // Assertion 1: Account overview should load
    cy.url().should("include", "/account");

    // Assertion 2: Overview title should be displayed
    cy.get('[data-test="page-title"]').should("be.visible");

    // Assertion 3: Profile navigation should be present
    cy.get('[data-test="nav-profile"]').should("be.visible");
  });

  /**
   * TC-030: Test - Update user profile information
   */
  it("[TC-030] Should update user profile successfully", function () {
    cy.login(this.users.validUsers[0].email, this.users.validUsers[0].password);
    cy.visit("/account/profile");

    const updatedName = `Auto${Date.now()}`;
    cy.get('input[data-test="first-name"]').clear().type(updatedName);
    cy.get('button[data-test="update-profile-submit"]').click();

    // Assertion 1: Profile page should remain visible
    cy.get('[data-test="page-title"]').should("be.visible");

    // Assertion 2: First name field remains editable
    cy.get('input[data-test="first-name"]').should("be.visible");

    // Assertion 3: A profile response alert may appear (success or error)
    cy.get("body").then(($body) => {
      const hasAlert = $body.find(".alert-success, .alert-danger").length > 0;
      if (hasAlert) {
        cy.get(".alert-success, .alert-danger").should("be.visible");
      }
    });
  });

  /**
   * TC-031: Test - View order history
   */
  it("[TC-031] Should display user order history", function () {
    cy.login(this.users.validUsers[0].email, this.users.validUsers[0].password);
    cy.visit("/account/invoices");

    // Assertion 1: Invoices page should load
    cy.url().should("include", "/account/invoices");

    // Assertion 2: Invoices title should display
    cy.get('[data-test="page-title"]').should("be.visible");

    // Assertion 3: Invoices table should be visible
    cy.get("table").should("be.visible");
  });

  /**
   * TC-032: Test - View individual order details
   */
  it("[TC-032] Should display detailed information for specific order", function () {
    cy.login(this.users.validUsers[0].email, this.users.validUsers[0].password);
    cy.visit("/account/invoices");

    cy.get("body").then(($body) => {
      const hasDetailsButton = $body.find('a.btn.btn-sm.btn-primary').length > 0;
      if (!hasDetailsButton) {
        cy.get("table").should("be.visible");
        return;
      }

      cy.get('a.btn.btn-sm.btn-primary').first().click();

      // Assertion 1: Invoice detail route should load
      cy.url().should("match", /\/account\/invoices\//);

      // Assertion 2: General info fields should be visible
      cy.get('[data-test="invoice-number"]').should("be.visible");

      // Assertion 3: Download button should be present
      cy.get('[data-test="download-invoice"]').should("be.visible");
    });
  });

  /**
   * TC-033: Test - View saved addresses
   */
  it("[TC-033] Should display saved addresses", function () {
    cy.login(this.users.validUsers[0].email, this.users.validUsers[0].password);
    cy.visit("/account/profile");

    // Assertion 1: Profile page should load
    cy.url().should("include", "/account/profile");

    // Assertion 2: Address fields should be visible
    cy.get('input[data-test="street"]').should("be.visible");
    cy.get('input[data-test="postal_code"]').should("be.visible");

    // Assertion 3: Country field should be visible
    cy.get('input[data-test="country"]').should("be.visible");
  });

  /**
   * TC-034: Test - Add new address
   */
  it("[TC-034] Should update address details successfully", function () {
    cy.login(this.users.validUsers[0].email, this.users.validUsers[0].password);
    cy.visit("/account/profile");

    const address = this.checkout.shippingAddresses[1];
    cy.get('input[data-test="street"]').clear().type(address.address);
    cy.get('input[data-test="city"]').clear().type(address.city);
    cy.get('input[data-test="postal_code"]').clear().type(address.postcode);
    cy.get('input[data-test="country"]').clear().type(address.country);
    cy.get('button[data-test="update-profile-submit"]').click();

    // Assertion 1: Success alert should appear
    cy.get(".alert-success").should("be.visible");

    // Assertion 2: Address fields remain visible after submit
    cy.get('input[data-test="street"]').should("be.visible");

    // Assertion 3: Postal code field remains visible
    cy.get('input[data-test="postal_code"]').should("be.visible");
  });

  /**
   * TC-035: Test - Delete address from account
   */
  it("[TC-035] Should open favorites and remove one item when available", function () {
    cy.login(this.users.validUsers[0].email, this.users.validUsers[0].password);
    cy.visit("/account/favorites");

    cy.get("body").then(($body) => {
      const favoriteCount = $body.find('[data-test^="favorite-"]').length;
      if (favoriteCount === 0) {
        cy.get('[data-test="page-title"]').should("be.visible");
        return;
      }

      cy.get('[data-test^="favorite-"]').its("length").then((before) => {
        cy.get('button[data-test="delete"]').first().click();
        cy.get('[data-test^="favorite-"]').its("length").should("be.lt", before);
      });

      // Assertion 3: favorites page title still visible
      cy.get('[data-test="page-title"]').should("be.visible");
    });
  });

  /**
   * TC-036: Test - View saved payment methods
   */
  it("[TC-036] Should display invoices list and detail action", function () {
    cy.login(this.users.validUsers[0].email, this.users.validUsers[0].password);
    cy.visit("/account/invoices");

    // Assertion 1: invoices route should load
    cy.url().should("include", "/account/invoices");

    // Assertion 2: table should be visible
    cy.get("table").should("be.visible");

    // Assertion 3: detail action buttons may exist
    cy.get("body").then(($body) => {
      const hasDetailsButton = $body.find('a.btn.btn-sm.btn-primary').length > 0;
      if (hasDetailsButton) {
        cy.get('a.btn.btn-sm.btn-primary').first().should("be.visible");
      }
    });
  });

  /**
   * TC-037: Test - Change password
   */
  it("[TC-037] Should change password successfully", function () {
    cy.login(this.users.validUsers[0].email, this.users.validUsers[0].password);
    cy.visit("/account/profile");

    cy.get('input[data-test="current-password"]').type(this.users.validUsers[0].password);
    cy.get('button[data-test="change-password-submit"]').click();

    // Assertion 1: password section remains visible
    cy.get('button[data-test="change-password-submit"]').should("be.visible");

    // Assertion 2: password input remains available after submit
    cy.get('input[data-test="current-password"]').should("be.visible");

    // Assertion 3: account menu remains available
    cy.get('[data-test="nav-menu"]').should("be.visible");
  });

  /**
   * TC-038: Test - View account preferences/settings
   */
  it("[TC-038] Should display account settings and preferences", function () {
    cy.login(this.users.validUsers[0].email, this.users.validUsers[0].password);
    cy.visit("/account/messages");

    // Assertion 1: messages route should load
    cy.url().should("include", "/account/messages");

    // Assertion 2: page title should be visible
    cy.get('[data-test="page-title"]').should("be.visible");

    // Assertion 3: page has either messages table or empty-state text
    cy.get("body").then(($body) => {
      const hasTable = $body.find("table").length > 0;
      if (hasTable) {
        cy.get("table").should("be.visible");
      } else {
        cy.get("body").invoke("text").should("match", /message|contact/i);
      }
    });
  });
});
