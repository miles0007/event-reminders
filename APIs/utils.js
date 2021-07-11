
const con = require("../database/mysql");
const ejs = require('ejs');
const path = require('path');
const util = require('util');
const { create_log, promiseQuery }= require('./addon');
const sendEmail = require("./mail");


async function birthdayEvents() {
    let bdays = null;
    try {
        bdays = await getBirthdays();
        if (bdays !== null && bdays[0].length > 0) {
          create_log("Returned Birthday Events: "+JSON.stringify(bdays[0]))
          const HTML = await renderHTML(bdays[0])
          await sendEmail({
            from: "cyborgv.2@hotmail.com",
            to: "kavinkarthik025@gmail.com",
            subject: "BirthDay Events",
            text: "I was an automated email scheduled at every day at 12 Noon",
            html: HTML
          });
        } else if (bdays !== null) {
          console.log("No birthday");
        } else {
          console.log("Some thing went wrong");
        }
    } catch(e) {
        create_log('ERROR on birthdayEvents: '+JSON.stringify(e));
        console.log('err occured',e)
    }
}


function getBirthdays() {
    return new Promise((resolve, reject) => {
        con.query('CALL Birthday_Events()', (err, data) => {
            if (err) {
                reject(err)
            }
            resolve(data);
            return;
        })
    })

}

function renderHTML(events) {
    const ejTemplatePromise = util.promisify(ejs.renderFile)
    const templatePath = path.join(__dirname, '../', "templates/email.ejs");
    const year = new Date().getFullYear();
    console.log("Events: ",events);
    return ejTemplatePromise(templatePath, {events, year})
}

// birthdayEvents()

module.exports = { birthdayEvents, renderHTML }