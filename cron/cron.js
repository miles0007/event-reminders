
const cron = require("node-cron");
const { birthdayEvents } = require('../APIs/utils');

cron.schedule("35 7 * * *", function () {
  birthdayEvents();
});