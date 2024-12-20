const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'uefcks',
  e2e: {
    baseUrl: "https://sit-y.cortexcloud.co",
    chromeWebSecurity: false,
    video: true,
    waitForAnimations: true,
    defaultCommandTimeout: 99000,
    //specPattern: 'cypress/e2e/**/*.cy.js',
    specPattern: 'cypress/mock-data-demo/**/*.cy.js',
  }
});
