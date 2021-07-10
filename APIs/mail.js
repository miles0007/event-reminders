
const nodemailer = require("nodemailer");

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "milesstonner@gmail.com",
    pass: "intotheverse",
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