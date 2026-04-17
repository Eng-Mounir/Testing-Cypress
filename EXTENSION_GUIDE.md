# Cypress Framework Extension Guide

This guide will help you extend the framework, add new tests, and maintain it as features change.

---

## 📝 Adding New Test Cases

### Step 1: Create or Update Test File

Use existing test files or create new ones following the naming pattern:
- `##-feature-name.cy.js`

Example for a new feature:
```bash
cypress/e2e/06-wishlists.cy.js
```

### Step 2: Write Test with Proper Structure

```javascript
describe("Feature Name Tests", () => {
  beforeEach(() => {
    cy.fixture("fixture-name").as("data");
  });

  it("[TC-XXX] Should describe what is being tested", function () {
    // ARRANGE - Setup
    const testData = this.data.someData;
    
    // ACT - Perform action(s)
    cy.visit("/feature-page");
    cy.get('selector').type(testData);
    
    // ASSERT - Verify results (minimum 3 assertions)
    cy.get('[data-test="result"]').should("be.visible");
    cy.url().should("include", "/success");
    cy.contains("Success").should("be.visible");
  });
});
```

### Step 3: Update Test Case Counter

Update the TC number from the next available number in [QUICK_REFERENCE.md](QUICK_REFERENCE.md).

---

## 🛠️ Adding Custom Commands

### Step 1: Add Command to commands.js

```javascript
/**
 * Command description
 * @param {type} paramName - Parameter description
 */
Cypress.Commands.add("customCommandName", (paramName) => {
  cy.get('selector').perform_action(paramName);
  cy.wait(1000);
});
```

### Step 2: Use in Tests

```javascript
cy.customCommandName("value");
```

### Best Practices for Commands

- **Single Responsibility**: One command, one clear purpose
- **Documentation**: Add JSDoc comments explaining parameters
- **Waits**: Include appropriate cy.wait() or cy.get() for load times
- **Error Handling**: Handle expected errors gracefully
- **Reusability**: Design for use across multiple tests

---

## 📦 Adding New Fixture Data

### Step 1: Create Fixture File

```bash
cypress/fixtures/feature-name.json
```

### Step 2: Structure Data

```json
{
  "category1": [
    {
      "id": 1,
      "property": "value"
    }
  ],
  "expectedResults": {
    "message": "Expected message"
  }
}
```

### Step 3: Use in Tests

```javascript
beforeEach(() => {
  cy.fixture("feature-name").as("data");
});

it("test", function () {
  const value = this.data.category1[0].property;
});
```

---

## 🔄 Modifying Selectors for Actual Website

The framework uses `data-test` attributes. Update selectors for actual site:

### Find Correct Selectors

1. Open browser DevTools (F12)
2. Inspect the element
3. Find the selector (id, class, name, etc.)

### Update Commands

```javascript
// Old
cy.get('[data-test="search-submit"]').click();

// New (actual site)
cy.get('button#search-btn').click();
// OR
cy.get('button.search-button').click();
// OR
cy.get('button[type="submit"]').click();
```

### Common Selector Strategies

```javascript
// By ID
cy.get('#elementId')

// By Class
cy.get('.className')

// By Attribute
cy.get('[name="fieldName"]')
cy.get('[data-test="identifier"]')
cy.get('[type="submit"]')

// By CSS Selector
cy.get('div.class > button')

// By XPath (less preferred)
cy.xpath('//button[contains(text(), "Click me")]')

// By Text Content
cy.contains('button', 'Button Text')
cy.contains('Expected Text')
```

---

## 🧪 Updating Tests for Real Website Changes

### Scenario: Website Layout Changed

1. **Identify Changed Elements**
   ```javascript
   // Old selector no longer works
   cy.get('[data-test="old-selector"]')  // Fails
   ```

2. **Find New Selector**
   - Inspect element in DevTools
   - Identify new class, ID, or attribute

3. **Update Command or Test**
   ```javascript
   // Update in commands.js
   cy.get('[data-test="new-selector"]').click();
   ```

4. **Test the Change**
   ```bash
   npm run test:open
   ```

### Scenario: New Field Added to Form

1. **Update Fixture**
   ```json
   {
     "formData": {
       "existingField": "value",
       "newField": "new value"
     }
   }
   ```

2. **Update Custom Command**
   ```javascript
   Cypress.Commands.add("fillForm", (userData) => {
     cy.get('input[name="existingField"]').type(userData.existingField);
     cy.get('input[name="newField"]').type(userData.newField);  // New
   });
   ```

3. **Update Tests if Needed**
   ```javascript
   it("should fill form with all fields", function () {
     cy.fillForm(this.data.formData);
     cy.contains("Success").should("be.visible");
   });
   ```

---

## 🐛 Debugging Tests

### Enable Detailed Logging

```javascript
it("should do something", () => {
  cy.log("Starting test");
  cy.visit("/page");
  cy.log("Page loaded");
  
  cy.get('selector').then(($el) => {
    cy.log("Element found:", $el.text());
  });
});
```

### Debug in Interactive Mode

```bash
npm run test:open
```

Then use:
- Click test to run
- Hover over command logs to see DOM state
- Use `.debug()` command: `cy.get('selector').debug().click()`

### Check Page State

```javascript
it("debug test", () => {
  cy.visit("/page");
  
  // Pause execution
  cy.pause();
  
  // Check browser console
  cy.window().then((win) => {
    console.log(win);
  });
});
```

---

## 📊 Running Tests with Options

### Generate Reports

```bash
# HTML Report
npm run test -- --reporter html

# JSON Report
npm run test -- --reporter json
```

### Run Specific Tests

```bash
# Run single file
npm run test:spec cypress/e2e/01-authentication.cy.js

# Run tests matching pattern
npm run test -- --spec "cypress/e2e/*auth*.js"
```

### Run with Specific Browser

```bash
# Chrome
npm run test:chrome

# Firefox
npm run test:firefox

# Edge
npm run test -- --browser edge
```

---

## 🔍 Best Practices for Maintenance

### 1. Keep Selectors Stable
- Use `data-test` attributes when possible
- Avoid brittle selectors (position-based, deep nesting)
- Choose IDs > Classes > Attributes > Text

### 2. Fixture Data Organization
- Keep test data close to test definitions
- Version your fixture data
- Document any special formatting

### 3. Command Documentation
- Use JSDoc for all commands
- Document parameters and expected behavior
- Include usage examples

### 4. Test Independence
- Each test should be independent
- Use hooks (beforeEach) for setup
- Don't rely on test execution order

### 5. Assertion Quality
```javascript
// ❌ Poor: Single vague assertion
cy.get('body').should('exist');

// ✅ Good: Multiple specific assertions
cy.url().should('include', '/dashboard');
cy.get('[data-test="welcome"]').should('be.visible');
cy.get('nav').should('contain', 'Logout');
```

### 6. Wait Strategies
```javascript
// ❌ Poor: Fixed waits
cy.wait(5000);

// ✅ Good: Wait for element
cy.get('[data-test="loader"]').should('not.be.visible');

// ✅ Good: Wait for specific condition
cy.url().should('include', '/success');
```

---

## 🚀 Scaling the Framework

### Add More Test Suites
```bash
cypress/e2e/06-wishlists.cy.js
cypress/e2e/07-reviews.cy.js
cypress/e2e/08-notifications.cy.js
```

### Create Helper Functions

```javascript
// cypress/support/helpers.js
const loginAsCustomer = (fixture) => {
  cy.fixture('users').then((users) => {
    cy.login(users.validUsers[0].email, users.validUsers[0].password);
  });
};

module.exports = { loginAsCustomer };
```

### Use Plugins

```javascript
// cypress.config.js
module.exports = defineConfig({
  pluginsFile: 'cypress/plugins/index.js',
  // ... other config
});
```

### Organize by Page Objects (Optional)

```bash
cypress/
├── e2e/
├── pageObjects/
│   ├── LoginPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
└── support/
```

---

## 🔐 Security Considerations

### Managing Sensitive Data

```javascript
// ❌ Don't hardcode credentials
cy.login("user@example.com", "password123");

// ✅ Use environment variables
cy.login(
  Cypress.env('USER_EMAIL'),
  Cypress.env('USER_PASSWORD')
);
```

### Set Environment Variables

```bash
# In cypress.config.js
env: {
  USER_EMAIL: process.env.CYPRESS_USER_EMAIL,
  USER_PASSWORD: process.env.CYPRESS_USER_PASSWORD
}
```

---

## 📈 Performance Optimization

### Reduce Test Execution Time

```javascript
// ❌ Slow: Unnecessary visits
cy.visit('/');
cy.visit('/products');
cy.visit('/cart');

// ✅ Fast: Navigate directly
cy.visit('/cart');
```

### Parallel Execution

Run tests in parallel (faster CI/CD):
```bash
npm run test -- --parallel --record
```

---

## 🎓 Testing Tips

### Before Writing a Test
1. Manually perform the action
2. Note the steps and expected results
3. Identify unique selectors
4. Plan assertions

### While Writing a Test
1. Use clear, descriptive names
2. Add comments for complex logic
3. Keep tests focused (one feature per test)
4. Use fixtures for test data

### After Writing a Test
1. Run it multiple times
2. Test both success and failure paths
3. Verify assertions are meaningful
4. Check for test dependencies

---

## 📞 Troubleshooting Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Element not found | Wrong selector | Inspect in DevTools, update selector |
| Timeout error | Element takes too long | Increase timeout or add waits |
| Flaky tests | Race conditions | Add proper waits/assertions |
| Log in fails | Wrong credentials | Check fixture data |
| Tests pass locally, fail in CI | Different environment | Check baseUrl, environment vars |

---

**Framework Version**: 1.0.0  
**Last Updated**: March 24, 2026
