# Cypress Test Cases Quick Reference

## Test Summary
- ✅ **Total Test Cases**: 38
- ✅ **Test Suites**: 5
- ✅ **Assertions per Test**: 3+
- ✅ **Custom Commands**: 30+
- ✅ **Fixture Files**: 4

---

## Test Case Index with Assertions

### 🔐 Authentication Tests (01-authentication.cy.js)

| TC | Test Name | Assertions | Status |
|----|-----------|----|--------|
| TC-001 | Login with valid credentials | 3 | ✅ |
| TC-002 | Login with invalid email | 3 | ✅ |
| TC-003 | Login with invalid password | 3 | ✅ |
| TC-004 | Empty login fields validation | 3 | ✅ |
| TC-005 | User registration successful | 3 | ✅ |
| TC-006 | Logout functionality | 3 | ✅ |

### 🛍️ Product Browsing Tests (02-products.cy.js)

| TC | Test Name | Assertions | Status |
|----|-----------|-----------|--------|
| TC-007 | Search product display results | 3 | ✅ |
| TC-008 | Search no results handling | 3 | ✅ |
| TC-009 | Filter by category | 3 | ✅ |
| TC-010 | Filter by price range | 3 | ✅ |
| TC-011 | Sort by name (A-Z) | 3 | ✅ |
| TC-012 | Sort by price (Low-High) | 3 | ✅ |
| TC-013 | View product details | 3 | ✅ |
| TC-014 | Pagination navigation | 3 | ✅ |

### 🛒 Shopping Cart Tests (03-cart.cy.js)

| TC | Test Name | Assertions | Status |
|----|-----------|-----------|--------|
| TC-015 | Add single product to cart | 3 | ✅ |
| TC-016 | Add multiple quantities | 3 | ✅ |
| TC-017 | View cart contents | 3 | ✅ |
| TC-018 | Update cart quantity | 3 | ✅ |
| TC-019 | Remove product from cart | 3 | ✅ |
| TC-020 | Calculate total with multiple | 3 | ✅ |
| TC-021 | Continue shopping from cart | 3 | ✅ |

### 💳 Checkout & Orders Tests (04-checkout.cy.js)

| TC | Test Name | Assertions | Status |
|----|-----------|-----------|--------|
| TC-022 | Proceed to checkout | 3 | ✅ |
| TC-023 | Fill shipping address | 3 | ✅ |
| TC-024 | Select saved address | 3 | ✅ |
| TC-025 | Complete payment | 3 | ✅ |
| TC-026 | Apply valid coupon | 3 | ✅ |
| TC-027 | Reject invalid coupon | 3 | ✅ |
| TC-028 | Checkout requires login | 3 | ✅ |

### 👤 Account & Profile Tests (05-account.cy.js)

| TC | Test Name | Assertions | Status |
|----|-----------|-----------|--------|
| TC-029 | View user profile | 3 | ✅ |
| TC-030 | Update profile | 3 | ✅ |
| TC-031 | View order history | 3 | ✅ |
| TC-032 | View order details | 3 | ✅ |
| TC-033 | View saved addresses | 3 | ✅ |
| TC-034 | Add new address | 3 | ✅ |
| TC-035 | Delete address | 3 | ✅ |
| TC-036 | View payment methods | 3 | ✅ |
| TC-037 | Change password | 3 | ✅ |
| TC-038 | Account settings | 3 | ✅ |

---

## Custom Commands by Category

### Authentication Commands
```javascript
cy.login(email, password)
cy.logout()
cy.registerUser(userData)
```

### Product Commands
```javascript
cy.searchProduct(searchTerm)
cy.viewProductDetails(productName)
cy.filterByCategory(category)
cy.filterByPrice(minPrice, maxPrice)
cy.sortProducts(sortOption)
```

### Cart Commands
```javascript
cy.addToCart(quantity)
cy.viewCart()
cy.removeFromCart(productName)
cy.updateCartQuantity(productName, newQuantity)
```

### Checkout Commands
```javascript
cy.proceedToCheckout()
cy.fillShippingAddress(address)
cy.completePayment(paymentData)
```

### Assertion Commands
```javascript
cy.verifyPageTitle(expectedTitle)
cy.verifyElementVisible(selector)
cy.verifyErrorMessage(errorMessage)
cy.verifySuccessMessage(successMessage)
cy.verifyProductInCart(productName)
cy.verifyCartEmpty()
```

### Utility Commands
```javascript
cy.waitForLoad()
cy.clearSession()
cy.getElementCount(selector)
```

---

## Running Tests by Suite

```bash
# Run all tests
npm run test

# Authentication tests only
npm run test:spec cypress/e2e/01-authentication.cy.js

# Product tests only
npm run test:spec cypress/e2e/02-products.cy.js

# Cart tests only
npm run test:spec cypress/e2e/03-cart.cy.js

# Checkout tests only
npm run test:spec cypress/e2e/04-checkout.cy.js

# Account tests only
npm run test:spec cypress/e2e/05-account.cy.js

# Run in headed mode
npm run test:headed

# Run in interactive mode
npm run test:open
```

---

## Fixture Data Structure

### users.json
- validUsers[]: Valid login credentials
- invalidUsers[]: Invalid login attempts
- newRegistration: Registration test data
- invalidPassword: Invalid password test
- emptyFields: Empty field validation

### products.json
- products[]: Product catalog
- productFilters: Category and price filters
- sortOptions: Available sorting methods

### checkout.json
- shippingAddresses[]: Saved address data
- paymentMethods[]: Payment card info
- orders[]: Order history data
- couponCodes[]: Valid coupon codes

---

## Assertion Types Used

### Navigation Assertions
- `cy.url().should("include", path)`
- `cy.url().should("eq", url)`
- `cy.url().should("not.include", path)`

### Visibility Assertions
- `cy.get(selector).should("be.visible")`
- `cy.get(selector).should("not.be.visible")`
- `cy.get(selector).should("not.exist")`

### Text Assertions
- `cy.contains(text).should("be.visible")`
- `cy.get(selector).should("contain", text)`
- `cy.get(selector).should("have.value", value)`

### Count Assertions
- `cy.get(selector).should("have.length", count)`
- `cy.get(selector).should("have.length.greaterThan", count)`
- `cy.get(selector).should("have.class", className)`

### Attribute Assertions
- `cy.get(selector).should("have.attr", "required")`
- `cy.get(selector).should("not.be.disabled")`

---

## Hooks Implemented

### Global Setup (beforeEach)
- Clear cookies
- Clear local storage
- Visit home page
- Wait for page load

### Global Teardown (after)
- Log test completion
- Cleanup resources

---

## Key Features

✅ Professional Architecture
✅ Modular Test Design
✅ Reusable Commands
✅ Centralized Test Data
✅ Comprehensive Assertions
✅ Global Hooks
✅ Error Handling
✅ Clear Documentation
✅ Easy Maintenance
✅ Scalable Structure

---

**Last Updated**: March 24, 2026
