const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://dev-y.cortexcloud.co",
    chromeWebSecurity: false,
    video: false,
    waitForAnimations: true,
    defaultCommandTimeout: 99000,
    specPattern: 'cypress/integration/**/*.cy.js',
  }
});
