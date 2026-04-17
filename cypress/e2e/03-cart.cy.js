// ============================================
// TEST SUITE: SHOPPING CART
// ============================================

describe("Shopping Cart Tests", () => {
  beforeEach(() => {
    cy.fixture("users").as("users");
    cy.fixture("products").as("products");
  });

  /**
   * TC-015: Test - Add single product to cart
   */
  it("[TC-015] Should add product to cart successfully", function () {
    cy.searchProduct(this.products.products[0].name);
    cy.viewProductDetails(this.products.products[0].name);
    cy.addToCart(1);
    
    // Assertion 1: Cart counter should update
    cy.get('[data-test="cart-quantity"]').should("contain", "1");
    
    // Assertion 2: Add to cart button remains available
    cy.get('button[data-test="add-to-cart"]').should("be.visible");
    
    // Assertion 3: Product should remain on page
    cy.contains(this.products.products[0].name).should("be.visible");
  });

  /**
   * TC-016: Test - Add multiple quantities to cart
   */
  it("[TC-016] Should add multiple quantities of same product", function () {
    cy.searchProduct(this.products.products[0].name);
    cy.viewProductDetails(this.products.products[0].name);
    cy.addToCart(3);
    
    // Assertion 1: Cart count should show 3
    cy.get('[data-test="cart-quantity"]').should("contain", "3");
    
    // Assertion 2: Quantity input exists on product detail
    cy.get('input[data-test="quantity"]').should("be.visible");
    
    // Assertion 3: Add to cart control remains enabled
    cy.get('button[data-test="add-to-cart"]').should("not.be.disabled");
  });

  /**
   * TC-017: Test - View cart contents
   */
  it("[TC-017] Should display all products in cart", function () {
    // Add products to cart first
    cy.searchProduct(this.products.products[0].name);
    cy.viewProductDetails(this.products.products[0].name);
    cy.addToCart(2);
    
    // Navigate to cart
    cy.viewCart();
    
    // Assertion 1: Cart step is in checkout route
    cy.url().should("include", "/checkout");
    
    // Assertion 2: Product should be visible in cart
    cy.verifyProductInCart(this.products.products[0].name);
    
    // Assertion 3: Quantity should be at least what was added
    cy.contains("tr", this.products.products[0].name)
      .find('input[data-test="product-quantity"]')
      .invoke("val")
      .then((value) => {
        expect(Number(value)).to.be.gte(2);
      });
  });

  /**
   * TC-018: Test - Update product quantity in cart
   */
  it("[TC-018] Should update product quantity in cart", function () {
    cy.searchProduct(this.products.products[0].name);
    cy.viewProductDetails(this.products.products[0].name);
    cy.addToCart(1);
    cy.viewCart();
    
    cy.updateCartQuantity(this.products.products[0].name, 5);
    
    // Assertion 1: Cart should update
    cy.get('[data-test="cart-total"]').should("be.visible");
    
    // Assertion 2: Quantity input should show new value
    cy.contains("tr", this.products.products[0].name)
      .find('input[data-test="product-quantity"]')
      .should("have.value", "5");
    
    // Assertion 3: Total price should update
    cy.get('[data-test="cart-total"]').then(($el) => {
      const total = parseFloat($el.text().replace("$", ""));
      expect(total).to.be.greaterThan(0);
    });
  });

  /**
   * TC-019: Test - Remove product from cart
   */
  it("[TC-019] Should remove product from cart", function () {
    cy.searchProduct(this.products.products[0].name);
    cy.viewProductDetails(this.products.products[0].name);
    cy.addToCart(1);
    cy.viewCart();
    
    const productName = this.products.products[0].name;
    cy.removeFromCart(productName);

    // Assertion 1: Product should not be listed anymore
    cy.get("body").should("not.contain", productName);

    // Assertion 2: Cart table or empty state is shown           select al thhe body of the page 3ashan yt2akd f3ln en elemnt etshal
    cy.get("body").then(($body) => {
      const hasRow = $body.find('[data-test="product-title"]').length > 0; //lw true yb2a lesa fy product lw false yb2a hya empty 
      if (!hasRow) {
        cy.contains(/empty|nothing/i).should("be.visible");
      } else {
        cy.get('[data-test="cart-total"]').should("be.visible");
      }
    });

    // Assertion 3: Checkout route remains active
    cy.url().should("include", "/checkout");
  });

  /**
   * TC-020: Test - Calculate correct cart total
   */
  it("[TC-020] Should calculate correct cart total with multiple products", function () {
    // Add first product
    cy.searchProduct(this.products.products[0].name);
    cy.viewProductDetails(this.products.products[0].name);
    cy.addToCart(2);
    
    // Add second product
    cy.searchProduct(this.products.products[1].name);
    cy.viewProductDetails(this.products.products[1].name);
    cy.addToCart(1);
    
    cy.viewCart();
    
    // Assertion 1: Both products should be in cart
    cy.get('[data-test="product-title"]').should("contain", this.products.products[0].name);
    cy.get('[data-test="product-title"]').should("contain", this.products.products[1].name);
    
    // Assertion 2: Cart total should be visible
    cy.get('[data-test="cart-total"]').should("be.visible");

    // Assertion 3: Validate arithmetic for displayed total
    cy.get("body").then(($body) => {
      const parseMoney = (text) => Number(String(text).replace(/[^\d.-]/g, ""));

      const shownTotal = parseMoney($body.find('[data-test="cart-total"]').text());

      const hasSubtotal = $body.find('[data-test="cart-subtotal"]').length > 0;
      if (hasSubtotal) {
        const subtotal = parseMoney($body.find('[data-test="cart-subtotal"]').text());
        const discount = $body.find('[data-test="cart-discount"]').length
          ? parseMoney($body.find('[data-test="cart-discount"]').text())
          : 0;
        const ecoDiscount = $body.find('[data-test="cart-eco-discount"]').length
          ? parseMoney($body.find('[data-test="cart-eco-discount"]').text())
          : 0;

        const expectedTotal = Number((subtotal - discount - ecoDiscount).toFixed(2));
        expect(Math.abs(shownTotal - expectedTotal)).to.be.lessThan(0.02);
        return;
      }

      let rowSum = 0;
      $body.find("tbody tr").each((_, row) => {
        const $row = Cypress.$(row);
        const discountedLine = $row.find("#discount-total-price").text();
        const regularLine = $row.find('[data-test="line-price"]').text();
        const effectiveText = discountedLine || regularLine;
        if (effectiveText) {
          rowSum += parseMoney(effectiveText);
        }
      });

      const expectedFromRows = Number(rowSum.toFixed(2));
      expect(Math.abs(shownTotal - expectedFromRows)).to.be.lessThan(0.02);
    });
  });

  /**
   * TC-021: Test - Continue shopping from cart
   */
  it("[TC-021] Should return to products page from cart", function () {
    cy.searchProduct(this.products.products[0].name);
    cy.viewProductDetails(this.products.products[0].name);
    cy.addToCart(1);
    cy.viewCart();
    
    cy.get('[data-test="continue-shopping"]').click();
    
    // Assertion 1: Should be back on home listing route
    cy.url().should("match", /practicesoftwaretesting\.com\/$/);
    
    // Assertion 2: Products should be displayed
    cy.get('[data-test="search-query"]').should("be.visible");
    
    // Assertion 3: Cart count should still show added item
    cy.get('[data-test="cart-quantity"]').should("contain", "1");
  });
});
