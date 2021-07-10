

const express = require('express')
const crons = require('./cron/cron')


const app = express();
const appRoutes = require('./routers.js');

app.set('view engine', 'ejs');
app.use(express.json())
app.use("/", appRoutes)

app.listen(process.env.PORT || 8080, () =>
  console.log("Listening on port: 8080")
);


module.exports = express;