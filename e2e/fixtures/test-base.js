const base = require('@playwright/test');
const { App } = require('../app/app.factory');

const test = base.test.extend({
  app: async ({ page }, use) => {
    const app = new App(page);
    await use(app);
  },
});

module.exports = {
  test,
  expect: base.expect,
};
