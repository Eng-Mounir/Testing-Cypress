const fs = require("fs");
const path = require("path");

const root = process.cwd();
const files = [
  "package.json",
  "cypress.config.js",
  "cypress/support/e2e.js",
  "cypress/support/commands.js",
  "cypress/e2e/spec.cy.js",
  "cypress/e2e/01-authentication.cy.js",
  "cypress/e2e/02-products.cy.js",
  "cypress/e2e/03-cart.cy.js",
  "cypress/e2e/04-checkout.cy.js",
  "cypress/e2e/05-account.cy.js",
  "cypress/fixtures/example.json",
  "cypress/fixtures/users.json",
  "cypress/fixtures/products.json",
  "cypress/fixtures/checkout.json"
];

const outDir = path.join(root, "PDF_GUIDES_PER_FILE");
fs.mkdirSync(outDir, { recursive: true });

function safeRead(relPath) {
  const absPath = path.join(root, relPath);
  return fs.readFileSync(absPath, "utf8");
}

function mdEscape(text) {
  return String(text).replace(/\r\n/g, "\n");
}

function detectLang(filePath) {
  if (filePath.endsWith(".json")) return "json";
  if (filePath.endsWith(".js")) return "javascript";
  return "text";
}

function extractTestCases(src) {
  const lines = src.split("\n");
  const cases = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const itMatch = line.match(/\bit\(\s*["'`](.+?)["'`]/);
    if (!itMatch) continue;

    const title = itMatch[1];
    const tcMatch = title.match(/\[(TC-\d+)\]/i);
    const tcId = tcMatch ? tcMatch[1].toUpperCase() : `TC-AUTO-${cases.length + 1}`;

    let detail = "No additional comment found.";
    for (let j = i - 1; j >= 0 && j >= i - 8; j--) {
      const comment = lines[j].match(/\*\s*(TC-\d+\s*:\s*.+)$/i);
      if (comment) {
        detail = comment[1].trim();
        break;
      }
    }

    cases.push({ tcId, title, detail });
  }

  return cases;
}

function extractCommands(src) {
  const commands = [];
  const re = /Cypress\.Commands\.add\(\s*["'`](.+?)["'`]/g;
  let match;
  while ((match = re.exec(src)) !== null) {
    commands.push(match[1]);
  }
  return commands;
}

function extractFixtureKeys(src) {
  try {
    const obj = JSON.parse(src);
    return Object.keys(obj);
  } catch {
    return [];
  }
}

function genericFilePurpose(relPath) {
  if (relPath.includes("e2e/") && relPath.endsWith(".cy.js")) {
    return "This file contains end-to-end test scenarios executed by Cypress.";
  }
  if (relPath.includes("support/commands.js")) {
    return "This file defines reusable custom Cypress commands shared across test suites.";
  }
  if (relPath.includes("support/e2e.js")) {
    return "This file provides global hooks and runtime setup for every Cypress test.";
  }
  if (relPath.includes("fixtures/")) {
    return "This fixture file stores test data used by specs through cy.fixture(...).";
  }
  if (relPath === "cypress.config.js") {
    return "This file controls Cypress runtime behavior and project-level E2E settings.";
  }
  if (relPath === "package.json") {
    return "This file defines project scripts and dependencies for the Cypress framework.";
  }
  return "This file is part of the Cypress project setup.";
}

function makeDoc(relPath, source) {
  const title = `Detailed Guide - ${relPath}`;
  const lines = [];
  const language = detectLang(relPath);

  lines.push(`# ${title}`);
  lines.push("");
  lines.push(`Generated on: ${new Date().toISOString().slice(0, 10)}`);
  lines.push("");
  lines.push("## 1) File Overview");
  lines.push("");
  lines.push(`- File path: ${relPath}`);
  lines.push(`- Purpose: ${genericFilePurpose(relPath)}`);
  lines.push("");

  if (relPath.includes("e2e/") && relPath.endsWith(".cy.js")) {
    const cases = extractTestCases(source);
    lines.push("## 2) Test Cases In This File");
    lines.push("");
    if (!cases.length) {
      lines.push("No explicit test cases found.");
      lines.push("");
    } else {
      cases.forEach((tc, idx) => {
        lines.push(`### ${idx + 1}. ${tc.tcId}`);
        lines.push("");
        lines.push(`- Test name: ${tc.title}`);
        lines.push(`- Scenario note: ${tc.detail}`);
        lines.push("- Expected behavior: The assertions in this test should validate the scenario above against the live UI.");
        lines.push("- Reuse: This case can be reused as a regression test after UI or API updates.");
        lines.push("");
      });
    }
  }

  if (relPath.includes("support/commands.js")) {
    const commands = extractCommands(source);
    lines.push("## 2) Custom Commands In This File");
    lines.push("");
    commands.forEach((cmd, idx) => {
      lines.push(`${idx + 1}. ${cmd}`);
    });
    if (!commands.length) {
      lines.push("No Cypress.Commands.add(...) entries found.");
    }
    lines.push("");
    lines.push("## 3) How To Use Commands In Tests");
    lines.push("");
    lines.push("- Import is automatic via support file.");
    lines.push("- Use in spec files like: cy.login(email, password)");
    lines.push("- Keep commands focused on actions, and keep assertions mostly in spec files.");
    lines.push("");
  }

  if (relPath.includes("support/e2e.js")) {
    lines.push("## 2) Global Hooks Summary");
    lines.push("");
    lines.push("- before(): logs test suite start.");
    lines.push("- beforeEach(): clears state and opens base page.");
    lines.push("- afterEach(): logs test completion.");
    lines.push("- after(): logs suite completion.");
    lines.push("- uncaught:exception handler: avoids hard-failing on non-critical app exceptions.");
    lines.push("");
  }

  if (relPath.includes("fixtures/") && relPath.endsWith(".json")) {
    const keys = extractFixtureKeys(source);
    lines.push("## 2) Data Keys And Usage");
    lines.push("");
    if (keys.length) {
      keys.forEach((key, idx) => lines.push(`${idx + 1}. ${key}`));
    } else {
      lines.push("No top-level keys parsed.");
    }
    lines.push("");
    lines.push("## 3) Fixture Usage Pattern");
    lines.push("");
    lines.push("- Load fixture in tests: cy.fixture('fileName').as('aliasName')");
    lines.push("- Read with this.aliasName in function() test blocks.");
    lines.push("");
  }

  if (relPath === "package.json") {
    lines.push("## 2) Script Commands");
    lines.push("");
    lines.push("- test: run full Cypress suite in headless mode.");
    lines.push("- test:open: open Cypress GUI runner.");
    lines.push("- test:headed: run with visible browser.");
    lines.push("- test:chrome / test:firefox: run in specific browsers.");
    lines.push("- test:spec: run selected spec path.");
    lines.push("");
  }

  if (relPath === "cypress.config.js") {
    lines.push("## 2) Configuration Highlights");
    lines.push("");
    lines.push("- baseUrl points to practicesoftwaretesting.com.");
    lines.push("- specPattern includes all .cy.js files under cypress/e2e.");
    lines.push("- supportFile uses cypress/support/e2e.js.");
    lines.push("- timeouts and viewport are configured for stable runs.");
    lines.push("- video and screenshots are enabled for test evidence.");
    lines.push("");
  }

  lines.push("## Source Code");
  lines.push("");
  lines.push(`\`\`\`${language}`);
  lines.push(mdEscape(source));
  lines.push("```\n");

  return lines.join("\n");
}

const generated = [];
for (const relPath of files) {
  const source = safeRead(relPath);
  const md = makeDoc(relPath, source);
  const safeName = relPath.replace(/[\\/]/g, "__").replace(/[:]/g, "");
  const outPath = path.join(outDir, `${safeName}.md`);
  fs.writeFileSync(outPath, md, "utf8");
  generated.push(outPath);
}

const indexMd = [
  "# PDF Index - File By File",
  "",
  "This folder contains one markdown guide per project file.",
  "Each markdown is intended to be converted to a separate PDF.",
  "",
  "## Generated Files",
  "",
  ...generated.map((p, i) => `${i + 1}. ${path.relative(root, p).replace(/\\/g, "/")}`),
  ""
].join("\n");

fs.writeFileSync(path.join(outDir, "INDEX.md"), indexMd, "utf8");
console.log(`Generated ${generated.length} markdown guides in PDF_GUIDES_PER_FILE.`);
