# Detailed Guide - cypress/fixtures/example.json

Generated on: 2026-03-23

## 1) File Overview

- File path: cypress/fixtures/example.json
- Purpose: This fixture file stores test data used by specs through cy.fixture(...).

## 2) Data Keys And Usage

1. name
2. email
3. body

## 3) Fixture Usage Pattern

- Load fixture in tests: cy.fixture('fileName').as('aliasName')
- Read with this.aliasName in function() test blocks.

## Source Code

```json
{
  "name": "Using fixtures to represent data",
  "email": "hello@cypress.io",
  "body": "Fixtures are a great way to mock data for responses to routes"
}

```
