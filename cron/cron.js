
const cron = require("node-cron");
const { birthdayEvents } = require('../APIs/utils');
const { create_log } = require('../APIs/addon');



// At evening 19:02 IST (UTC Time 1:32 pm)
cron.schedule("02 13 * * *", function () {
  birthdayEvents();
  create_log('App cron started');
});

// At morning 7:02 IST (UTC Time 1:32 am)
cron.schedule("32 01 * * *", function () {
  create_log("App cron started");
  birthdayEvents();
});