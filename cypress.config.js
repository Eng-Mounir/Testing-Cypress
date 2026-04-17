const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,
  projectId: "practice_software_testing",
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 8000,
  requestTimeout: 10000,
  responseTimeout: 10000,
  pageLoadTimeout: 30000,
  video: true,
  screenshotOnRunFailure: true,
  
  e2e: {
    baseUrl: "https://practicesoftwaretesting.com", //dy ba2olo baseurl lw katab visit.("/login") ka2ny ba2kml 3ala baseurl dh 3ashan golbally
    specPattern: "cypress/e2e/**/*.cy.js", //hena ba2olo ybda2 y search 3ala ay files aw foldes ely fyhom testcases ely mehtag y3mlha test
    supportFile: "cypress/support/e2e.js", //points ly test cases abl matyshta8l 3ashan bet2olo hena fyh golbal hooks w custom comands abl maybda2 lazm yshofhom
    setupNodeEvents(on, config) {
      // implement node event listeners here (e.g. for plugins or custom tasks) for example 
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
