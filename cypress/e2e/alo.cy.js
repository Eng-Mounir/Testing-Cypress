describe("Alo Shop E2E Test Suite", () => {
  it("should have a placeholder test", () => {
    cy.get('a[data]').invoke("attr","href");
    cy.visit("/login")
    cy.get('[data-test="contact-submit"]').type;
    )
  });               