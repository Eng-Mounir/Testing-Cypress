# Detailed Guide - cypress/fixtures/checkout.json

Generated on: 2026-03-23

## 1) File Overview

- File path: cypress/fixtures/checkout.json
- Purpose: This fixture file stores test data used by specs through cy.fixture(...).

## 2) Data Keys And Usage

1. shippingAddresses
2. paymentMethods
3. orders
4. couponCodes

## 3) Fixture Usage Pattern

- Load fixture in tests: cy.fixture('fileName').as('aliasName')
- Read with this.aliasName in function() test blocks.

## Source Code

```json
{
  "shippingAddresses": [
    {
      "id": 1,
      "address": "123 Main Street",
      "city": "New York",
      "postcode": "10001",
      "country": "United States",
      "isDefault": true
    },
    {
      "id": 2,
      "address": "456 Oak Avenue",
      "city": "Los Angeles",
      "postcode": "90001",
      "country": "United States",
      "isDefault": false
    }
  ],
  "paymentMethods": [
    {
      "id": 1,
      "type": "credit_card",
      "cardNumber": "4532123456789010",
      "expiry": "12/25",
      "cvc": "123",
      "cardholderName": "Test User",
      "isDefault": true
    },
    {
      "id": 2,
      "type": "credit_card",
      "cardNumber": "5425233010103010",
      "expiry": "06/26",
      "cvc": "456",
      "cardholderName": "Test User",
      "isDefault": false
    }
  ],
  "orders": [
    {
      "id": "ORD-001",
      "status": "completed",
      "total": 150.49,
      "createdDate": "2025-01-15",
      "items": 3
    },
    {
      "id": "ORD-002",
      "status": "processing",
      "total": 99.99,
      "createdDate": "2025-03-20",
      "items": 2
    }
  ],
  "couponCodes": [
    {
      "code": "SAVE10",
      "discount": 10,
      "discountType": "percentage",
      "minOrder": 50,
      "expiryDate": "2025-12-31"
    },
    {
      "code": "FLAT20",
      "discount": 20,
      "discountType": "fixed",
      "minOrder": 100,
      "expiryDate": "2025-12-31"
    }
  ]
}

```
