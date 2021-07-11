
const nodemailer = require("nodemailer");

let mailTransporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com", // hostname
  secureConnection: false, // TLS requires secureConnection to be false
  port: 587, // port for secure SMTP
  // tls: {
  //   ciphers: "SSLv3",
  // },
  auth: {
    user: "cyborgv.2@hotmail.com",
    pass: "Creates@nbot",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = (mailDetails) => {
  mailTransporter.sendMail(mailDetails, (err, data) => {
    if (err) {
      console.log("Error Occurs", err);
    } else {
      console.log("Email Sent Successfully.", data.response);
    }
  });
};

module.exports = sendEmail;