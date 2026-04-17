# Detailed Guide - cypress/fixtures/users.json

Generated on: 2026-03-23

## 1) File Overview

- File path: cypress/fixtures/users.json
- Purpose: This fixture file stores test data used by specs through cy.fixture(...).

## 2) Data Keys And Usage

1. validUsers
2. invalidUsers
3. newRegistration
4. invalidPassword
5. emptyFields

## 3) Fixture Usage Pattern

- Load fixture in tests: cy.fixture('fileName').as('aliasName')
- Read with this.aliasName in function() test blocks.

## Source Code

```json
{
  "validUsers": [
    {
      "id": 1,
      "email": "customer@practicesoftwaretesting.com",
      "password": "welcome01",
      "firstName": "Jane",
      "lastName": "Doe",
      "role": "customer"
    },
    {
      "id": 2,
      "email": "customer@example.com",
      "password": "Password@123",
      "firstName": "John",
      "lastName": "Doe",
      "role": "customer"
    }
  ],
  "invalidUsers": [
    {
      "email": "invaliduser@test.com",
      "password": "wrongpassword",
      "expectedError": "Invalid email or password"
    },
    {
      "email": "nonexistent@test.com",
      "password": "Test@123",
      "expectedError": "Invalid email or password"
    }
  ],
  "newRegistration": {
    "firstName": "Automation",
    "lastName": "Tester",
    "dob": "1993-08-17",
    "street": "Main Street 10",
    "postalCode": "12345",
    "city": "Amsterdam",
    "state": "Noord-Holland",
    "country": "Netherlands",
    "phone": "0612345678",
    "email": "automation.tester@test.com",
    "password": "AutoTest@123",
    "confirmPassword": "AutoTest@123"
  },
  "invalidPassword": {
    "email": "test@practicesoftwaretesting.com",
    "password": "invalid",
    "expectedError": "Invalid password"
  },
  "emptyFields": {
    "email": "",
    "password": "",
    "expectedError": "Email and password are required"
  }
}

```
