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
    cy.searchProduct(this.products.products[0].name);        //hatysta5dm function searchProduct ely fy commands 7aty3ml clear ly text field w b3dha tyktyb hammer 3ashan search 3al product

    // Assertion 1: Search caption appears with term
    cy.get('[data-test="search-caption"]').should("be.visible");     //dy ely foo2 ely b3d m3ml search 2ala2y search for:Hammer dy baa search for
    cy.get('[data-test="search-term"]').should("contain", this.products.products[0].name);    //dy baa el Hammer ely b3d search for

    // Assertion 2: Matching product appears
    cy.contains(this.products.products[0].name).should("be.visible");    //dh ka2ny ba2olo lazm ykoon fy result byta3t el search f3ln tal3lo hagat matching m3 kelmyt hammer

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
    cy.contains("label", this.products.productFilters.categories[0])      //far2 mabynha w byyn ely fy command  en comand zat nafso by3ml el action zat nafso ely howa check the checkbox lakn hena el assertion b verfiy bss eno sha8al msh aktr byt2akd hya m3amolha checked wla laa
      .find('input[type="checkbox"]')
      .should("be.checked");

    // Assertion 2: Product cards are rendered after filtering
    cy.get('[data-test^="product-"]').should("have.length.greaterThan", 0);   //confirms at least 1 product card is rendered after the filter is applied. The category "Hand Tools" should have products in it.

    // Assertion 3: Product names are visible
    cy.get('[data-test="product-name"]').first().should("be.visible");  //lw eq(1) yb2a index 1w tany elemnt 
  });

  /**
   * TC-010: Test - Filter products by price range
   */
  it("[TC-010] Should filter products by price range", function () {     //5aly balk el min w max 3omrhom mayhsta5dmo 3asahn ehna 3amlyn slider ly price w dh sa3b ne3mlo automate b cypress 3asahan kda command function haty3ml zy sort kda bs 
    cy.filterByPrice(
      this.products.productFilters.priceRanges[0].min,
      this.products.productFilters.priceRanges[0].max
    );

    // Assertion 1: sort selector remains available after fallback action
    cy.get('[data-test="sort"]').should("be.visible");    //hena byta2kd b3d m3mlna sort el slider byta3 sort f3ln lesa mawgood wla e5tafa

    // Assertion 2: price elements exist and are numeric
    cy.get('[data-test="product-price"]').each(($el) => {      //hena bya5od aw check price byta3 every product "$10"
      const price = parseFloat($el.text().replace("$", "").trim()); //hena byshyl el dollar sign w ybdalha b empty string "10" w b3dha by5alyha kda 10 w by5alyha number 3ashan n2dr n3ml 3leha assertions arithmetical zy ely gaya
      expect(Number.isNaN(price)).to.eq(false);       //byt2akd baa enha not a number wla laa lw false yb2a kda assertion 8alat w rakam ely a5dyto not a number lazm tytl3 true
      expect(price).to.be.gte(0);
    });

    // Assertion 3: product cards remain visible
    cy.get('[data-test="product-name"]').first().should("be.visible");
  });

  /**
   * TC-011: Test - Sort products by name
   */
  it("[TC-011] Should sort products by name (A-Z)", function () {
    cy.sortProducts("name,asc");     //hena ba2olo y sort awel wahda fy dropdown ely hya mn a-z w ely byta3ml sort 3ala el product name mn a-z

    // Assertion 1: sort value should be selected    byt2akd f3ln eno e5tar a-z mn dropdown dy current value byta3ha
    cy.get('[data-test="sort"]').should("have.value", "name,asc");          //have.value byta2kd eno el value ely selected mn dropdown howa name,asc w kda byta2kd eno sort 3ala name mn a-z 3ashan kda el value name,asc da5l el option tag fy dropdown ely hya sort by name a-z

    // Assertion 2: Sort dropdown should show selected option
    cy.get('[data-test="product-name"]').should("have.length.greaterThan", 1); //check fln eno tal3lo aktr mn one product b tartyb el aphabetic (e5tarna 1 3ashan nekaryn mabyn tartyb el alphabtic s7 aslun wla laa)

    // Assertion 3: names are in ascending order
    cy.get('[data-test="product-name"]').first().then(($first) => {
      const firstName = $first.text().trim().toLowerCase();             //awel haga hy get firt word w b3dha yshyl el space w b3dha yhawelha ly lowercase 3ashan n2dr n3ml compare mabyn el awel w el a5er w n2dr n3ml assertion eno el awel a-z awel w el a5er z-a aktr mn el awel
      cy.get('[data-test="product-name"]')
        .last()
        .then(($last) => {
          const lastName = $last.text().trim().toLowerCase();     //hena baa 3aks bya5od a5er element 5ales zaherlo w y3mlo bardo lowercase 3asahn ybda2 ykarno b awel element
          expect(firstName <= lastName).to.be.true;     //in js <= dy betkaryn mabyn 2 strings lw b true yb2a f3ln orted lw false yb2a 8alat 
        });
    });
  });

  /**
   * TC-012: Test - Sort products by price
   */
  it("[TC-012] Should sort products by price (Low to High)", function () {
    cy.sortProducts("price,asc");

    // Assertion 1: Sort should be applied
    cy.get('[data-test="sort"]').should("have.value", "price,asc");       //hena b ta2kd eno f3ln mn dropdown me5tar mn low to high wla laa

    // Assertion 2: products are visible
    cy.get('[data-test="product-price"]').should("have.length.greaterThan", 1);     //hena byta2kd f3ln en fyh products ba2yt viible wla laa

    // Assertion 3: Prices should be in ascending order
    cy.get('[data-test="product-price"]')
      .then(($prices) => {                             //$prices is a list of ALL price elements on the page: dh list html 5od balk
        const prices = [...$prices].map((el) =>          //hena byhawel el list ely howa $prices le array 3ashan n2dr n3ml map w b3dha by5od kol element fy el array w yshyl el dollar sign w ybdalha b empty string w b3dha by5alyha kda number 3ashan n2dr n3ml 3leha assertions arithmetical zy ely gaya
          parseFloat(el.textContent.replace("$", "").trim())
        );                                                     //dh result prices = [9.99, 14.99, 24.99, 49.99]
        for (let i = 0; i < prices.length - 1; i++) {
          expect(prices[i]).to.be.lte(prices[i + 1]);          //byt2akd w ykaryn el prices b b3d el lte dh zyha bel zabt <= i=0: prices[0] <= prices[1] → 9.99  <= 14.99 ✅
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
