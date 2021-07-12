
const cron = require("node-cron");
const { birthdayEvents } = require('../APIs/utils');
const { create_log } = require('../APIs/addon');



// At morning 8:32 am IST (UTC Time 03:02 am)
cron.schedule("02 03 * * *", function () {
  birthdayEvents();
  create_log('App cron started');
});

// At evening 7:25 pm IST (UTC Time 01:30 pm)
cron.schedule("55 13 * * *", function () {
  create_log("App cron started");
  birthdayEvents();
});