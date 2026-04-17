# Detailed Guide - package.json

Generated on: 2026-03-23

## 1) File Overview

- File path: package.json
- Purpose: This file defines project scripts and dependencies for the Cypress framework.

## 2) Script Commands

- test: run full Cypress suite in headless mode.
- test:open: open Cypress GUI runner.
- test:headed: run with visible browser.
- test:chrome / test:firefox: run in specific browsers.
- test:spec: run selected spec path.

## Source Code

```json
{
  "name": "testing3",
  "version": "1.0.0",
  "description": "test tesiting",
  "license": "ISC",
  "author": "",
  "type": "commonjs",
  "main": "index.js",
  "scripts": {
    "test": "cypress run",
    "test:open": "cypress open",
    "test:headed": "cypress run --headed",
    "test:chrome": "cypress run --browser chrome",
    "test:firefox": "cypress run --browser firefox",
    "test:spec": "cypress run --spec"
  },
  "dependencies": {
    "chai": "^6.2.2",
    "cypress": "^15.12.0",
    "mocha": "^11.7.5"
  }
}

```
