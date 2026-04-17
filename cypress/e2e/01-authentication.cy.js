// ============================================
// TEST SUITE: AUTHENTICATION & LOGIN
// ============================================

describe("Authentication Tests", () => {
  beforeEach(() => {
    cy.fixture("users").as("users");   //ba2olo abl kol test case load el users json file mn el fixtures w ysamhya k variable users 3ashan taht yb2a ysta5dmha this.users
  });

  /**
   * TC-001: Positive test - Login with valid credentials
   */
  it("[TC-001] Should login successfully with valid email and password", function () {
    cy.login(this.users.validUsers[0].email, this.users.validUsers[0].password); //dh hayb3tha ly function Cypress.Commands.add("login", (email, password) => { fy command 
    
    // Assertion 1: URL should contain account page
    cy.url().should("include", "/account");            //byt2akd b3d ma 3ml login yshoof el url fyh /account wla laa 3ashan b3d ma sucussefull login url byb2ahttps://practicesoftwaretesting.com/account lw fail /auth/login
    
    // Assertion 2: Account page title should be visible
    cy.get('[data-test="page-title"]').should("contain", "My account");  //3amlna assertion 2 3ashan yb2a proof zyada w at2akd f3ln eno sucessful login mn page title
    
    // Assertion 3: User menu should be present
    cy.get('[data-test="nav-menu"]').should("be.visible");  //The nav menu only appears when you are logged in. If you're logged out, it doesn't exist. So this is extra confirmation the login worked.
  });

  /**
   * TC-002: Negative test - Login with invalid email
   */
  it("[TC-002] Should display error message with invalid email", function () {
    cy.visit("/auth/login");                                                              //hena by3mlha manual 3ashan yshoof eh ely hsl bel invalid data masta5dmshy el .login
    cy.get('[data-test="email"]').clear().type(this.users.invalidUsers[0].email);
    cy.get('[data-test="password"]').clear().type(this.users.invalidUsers[0].password);
    cy.get('[data-test="login-submit"]').click();
    
    // Assertion 1: Error message should be visible
    cy.verifyErrorMessage(this.users.invalidUsers[0].expectedError);
    
    // Assertion 2: User should remain on login page
    cy.url().should("include", "/auth/login");
    
    // Assertion 3: Email input should still be visible
    cy.get('[data-test="email"]').should("be.visible");
  });

  /**
   * TC-003: Negative test - Login with invalid password           //note fy test case 2 w 3 esta5dm fy etnin invalid email w invalid pass 3ashan maysahalshy ly main shaerd real acc loocked 
   */
  it("[TC-003] Should display error message with invalid password", function () {  
    // Use a non-customer account to avoid locking the primary shared test account.
    cy.visit("/auth/login");
    cy.get('[data-test="email"]').clear().type(this.users.invalidUsers[1].email);
    cy.get('[data-test="password"]').clear().type(this.users.invalidUsers[1].password);
    cy.get('[data-test="login-submit"]').click();
    
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
   * TC-005: Test - Registration form required-field validation      hena byta2kd lw reg page ma7tynash ay haga fyha haytl3 el validation errors wla laa
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
    cy.logout();       //betysta5dm el command byta3 function logout dh Cypress.Commands.add("logout", () => {cy.get('[data-test="nav-menu"]').click();  cy.get('[data-test="nav-sign-out"]').click();cy.wait(1000);});
    
    // Assertion 1: User should be redirected away from account page
    cy.url().should("not.include", "/account");        //byta2k eno kda baa logout 3ashan url msh hayb2a fyh /account hayb2a fyh /auth/login
    
    // Assertion 2: User menu should not be visible
    cy.get('[data-test="nav-menu"]').should("not.exist");         //byta2kd eno mafsyh navlink mn foo2 3ashan page /account ra7yt
    
    // Assertion 3: Login link should be available
    cy.get('[data-test="nav-sign-in"]').should("be.visible");         //byta2kd en link el nav-sign-in ely byda5l el login page ba2a visible 3ashan kda ba2a logout
  });


  it("alo",function(){
    cy.get('a[data-test="nav-sign-in"]').invoke("attr", "href")
    cy.visit("/");

  })

  

});
