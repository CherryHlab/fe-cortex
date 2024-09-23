const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://dev-x.cortexcloud.co",
    chromeWebSecurity: false,
    videoUploadOnPasses: false,
    video: false,
    waitForAnimations: true,
    defaultCommandTimeout: 99000
  }
});
