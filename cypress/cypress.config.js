const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "i4hkps",
  e2e: {
    supportFile: false,
    specPattern: 'e2e/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
