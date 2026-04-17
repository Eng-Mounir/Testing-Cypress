# Cypress Automation Framework for Practice Software Testing

A professional, comprehensive Cypress automation testing framework for [https://practicesoftwaretesting.com/](https://practicesoftwaretesting.com/) with 38+ test cases, custom commands, fixtures, and hooks.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Test Coverage](#test-coverage)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Running Tests](#running-tests)
- [Custom Commands](#custom-commands)
- [Fixtures](#fixtures)
- [Hooks](#hooks)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

This framework is designed with professional best practices including:

- ✅ **Custom Commands**: Reusable commands for login, search, cart operations, assertions, and more
- ✅ **Fixtures**: Test data for users, products, checkout, and payment information
- ✅ **Hooks**: Global setup/teardown with before/after hooks for test isolation
- ✅ **Comprehensive Coverage**: 38+ test cases across 5 test suites
- ✅ **Multiple Assertions**: Each test includes 3+ assertions for robust validation
- ✅ **Professional Architecture**: Clear folder structure and naming conventions

---

## 📊 Test Coverage

### Test Statistics
- **Total Test Cases**: 38
- **Test Suites**: 5
- **Custom Commands**: 30+
- **Assertions per Test**: 3+
- **Fixture Files**: 4

### Test Suites Breakdown

#### 1. **Authentication Tests** (6 tests - TC-001 to TC-006)
- Login with valid credentials
- Login with invalid email
- Login with invalid password
- Login with empty fields
- User registration
- Logout functionality

#### 2. **Product Browsing & Search** (8 tests - TC-007 to TC-014)
- Search for products
- No results handling
- Filter by category
- Filter by price range
- Sort by name
- Sort by price
- View product details
- Pagination navigation

#### 3. **Shopping Cart** (7 tests - TC-015 to TC-021)
- Add single product to cart
- Add multiple quantities
- View cart contents
- Update product quantity
- Remove product from cart
- Calculate total with multiple products
- Continue shopping

#### 4. **Checkout & Orders** (7 tests - TC-022 to TC-028)
- Proceed to checkout
- Fill shipping address
- Select existing address
- Complete payment
- Apply coupon code
- Invalid coupon rejection
- Checkout requires login

#### 5. **Account & User Profile** (10 tests - TC-029 to TC-038)
- View profile information
- Update profile
- View order history
- View order details
- View saved addresses
- Add new address
- Delete address
- View payment methods
- Change password
- View account settings

---

## 📁 Project Structure

```
testing3/
├── cypress/
│   ├── e2e/
│   │   ├── 01-authentication.cy.js      # Login, register, logout tests
│   │   ├── 02-products.cy.js            # Search, filter, sort tests
│   │   ├── 03-cart.cy.js                # Cart operations tests
│   │   ├── 04-checkout.cy.js            # Checkout and orders tests
│   │   └── 05-account.cy.js             # User profile and settings tests
│   ├── fixtures/
│   │   ├── users.json                   # User credentials and test data
│   │   ├── products.json                # Product catalog and filters
│   │   ├── checkout.json                # Addresses, payments, coupon codes
│   │   └── example.json                 # Placeholder
│   └── support/
│       ├── commands.js                  # 30+ custom commands
│       ├── e2e.js                       # Global hooks and setup
│       └── index.js                     # Support configuration
├── cypress.config.js                     # Cypress configuration
├── package.json                          # Project dependencies and scripts
└── README.md                             # This file
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Verify Installation
```bash
npm run test:open
```

This will open the Cypress Test Runner in interactive mode.

---

## 🧪 Running Tests

### Run all tests (headless)
```bash
npm run test
```

### Run tests in headed mode (see browser)
```bash
npm run test:headed
```

### Open Cypress Test Runner (interactive mode)
```bash
npm run test:open
```

### Run specific test file
```bash
npm run test:spec cypress/e2e/01-authentication.cy.js
```

### Run tests in Chrome browser
```bash
npm run test:chrome
```

### Run tests in Firefox browser
```bash
npm run test:firefox
```

---

## 🛠️ Custom Commands

All custom commands are defined in `cypress/support/commands.js`.

### Authentication Commands
```javascript
cy.login(email, password)              // Login user
cy.logout()                            // Logout user
cy.registerUser(userData)              // Register new user
```

### Product Commands
```javascript
cy.searchProduct(searchTerm)           // Search for product
cy.viewProductDetails(productName)     // View product page
cy.filterByCategory(category)          // Filter by category
cy.filterByPrice(minPrice, maxPrice)   // Filter by price range
cy.sortProducts(sortOption)            // Sort products
```

### Cart Commands
```javascript
cy.addToCart(quantity)                 // Add product to cart
cy.viewCart()                          // View shopping cart
cy.removeFromCart(productName)         // Remove item from cart
cy.updateCartQuantity(productName, qty) // Update quantity
```

### Checkout Commands
```javascript
cy.proceedToCheckout()                 // Proceed to checkout
cy.fillShippingAddress(address)        // Fill shipping info
cy.completePayment(paymentData)        // Complete payment
```

### Assertion Commands
```javascript
cy.verifyPageTitle(expectedTitle)      // Verify page title
cy.verifyElementVisible(selector)      // Verify element visible
cy.verifyErrorMessage(message)         // Verify error message
cy.verifySuccessMessage(message)       // Verify success message
cy.verifyProductInCart(productName)    // Verify product in cart
cy.verifyCartEmpty()                   // Verify empty cart
```

### Utility Commands
```javascript
cy.waitForLoad()                       // Wait for loading spinner
cy.clearSession()                      // Clear session storage
cy.getElementCount(selector)           // Get element count
```

---

## 📦 Fixtures

Fixtures contain test data used across test suites.

### users.json
```json
{
  "validUsers": [
    {
      "email": "test@practicesoftwaretesting.com",
      "password": "Test@123"
    }
  ],
  "invalidUsers": [
    {
      "email": "invalid@test.com",
      "password": "wrongpassword"
    }
  ],
  "newRegistration": {
    "firstName": "Automation",
    "lastName": "Tester",
    "email": "automation@test.com",
    "password": "AutoTest@123"
  }
}
```

### products.json
```json
{
  "products": [
    {
      "name": "Combination Pliers",
      "category": "Hand Tools",
      "price": 25.50
    }
  ],
  "productFilters": {
    "categories": ["Hand Tools", "Power Tools"],
    "sortOptions": ["name-asc", "price-asc"]
  }
}
```

### checkout.json
```json
{
  "shippingAddresses": [...],
  "paymentMethods": [...],
  "couponCodes": [...]
}
```

---

## 🔧 Hooks

Global hooks are configured in `cypress/support/e2e.js`.

### Before Hook
Runs once before all tests
```javascript
before(() => {
  cy.log('Starting Test Suite Execution');
});
```

### BeforeEach Hook
Runs before each test
```javascript
beforeEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.visit('/');
});
```

### AfterEach Hook
Runs after each test
```javascript
afterEach(() => {
  cy.log('Test execution completed');
});
```

### After Hook
Runs once after all tests
```javascript
after(() => {
  cy.log('All tests completed');
});
```

---

## ✅ Best Practices Implemented

### 1. **Clear Test Organization**
- Tests organized into separate files by feature
- Descriptive test names with TC numbers
- Logical grouping with describe blocks

### 2. **Reusable Commands**
- Custom commands for common actions
- Reduces code duplication
- Easier maintenance

### 3. **Test Data Management**
- Fixtures for centralized test data
- Easy to update test credentials
- Separation of concerns

### 4. **Comprehensive Assertions**
- Multiple assertions per test
- Validates different aspects
- Better test quality

### 5. **Hooks for Test Isolation**
- Clear setup and teardown
- Consistent test environment
- Prevents test pollution

### 6. **Professional Documentation**
- Clear comments in code
- README with usage examples
- Easy onboarding for new developers

### 7. **Error Handling**
- Proper wait times
- Element visibility checks
- Handles uncaught exceptions

---

## 🐛 Troubleshooting

### Issue: Tests fail with "Element not found"
**Solution**: 
- Use correct data attributes from the website
- Verify selectors match actual page elements
- Add longer wait times if needed
- Check that Cypress is targeting correct URL

### Issue: Login fails
**Solution**:
- Verify credentials in users.json fixture
- Check if website has changed login flow
- Review browser console for errors
- Ensure cookies are being set correctly

### Issue: Timeout errors
**Solution**:
- Increase timeout in cypress.config.js: `defaultCommandTimeout: 10000`
- Add explicit wait: `cy.wait(2000)`
- Use `cy.waitForLoad()` custom command

### Issue: Test data not clearing
**Solution**:
- Ensure beforeEach hook includes `cy.clearCookies()`
- Clear localStorage: `cy.clearLocalStorage()`
- Use logout command between tests

### Issue: Tests pass locally but fail in CI/CD
**Solution**:
- Check baseUrl in cypress.config.js
- Ensure proper waits for network requests
- Verify environment variables
- Check for race conditions in test code

---

## 📖 Example Test Case Structure

```javascript
describe("Feature Tests", () => {
  beforeEach(() => {
    cy.fixture("users").as("users");
  });

  it("[TC-001] Should complete action successfully", function () {
    // ARRANGE: Setup
    const user = this.users.validUsers[0];
    
    // ACT: Perform action
    cy.login(user.email, user.password);
    
    // ASSERT: Verify results (minimum 3 assertions)
    cy.url().should("include", "/dashboard");
    cy.get('[data-test="welcome"]').should("be.visible");
    cy.get('[data-test="nav-logout"]').should("be.visible");
  });
});
```

---

## 📞 Support & Contribution

For issues or improvements:
1. Check troubleshooting section
2. Review Cypress documentation: https://docs.cypress.io
3. Check element selectors using browser DevTools
4. Use `cy.log()` for debugging

---

## 🔐 Security Notes

⚠️ **Important**: 
- Do not commit actual credentials to repository
- Use environment variables for sensitive data
- Review test data in fixtures before running in CI/CD
- Consider using encrypted test data for production environments

---

## 📝 License

This project is for educational purposes. Refer to the practice website's terms of service before use.

---

**Framework Created**: March 24, 2026  
**Version**: 1.0.0  
**Status**: Production Ready ✅
#   o m a r - y a s s e r  
 