const cron = require("node-cron");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

let transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

// scheduled to run every 15 seconds
cron.schedule("*/15 * * * * *", async function () {
  // if there are requests to be sent, send an email with the request's address and request
  if (requests?.length > 0) {
    for (let i = 0; i < requests.length; i++) {
      await transporter.sendMail({
        from: "do_not_reply@northpole.com",
        to: "santa@northpole.com",
        subject: "Letter Recieved!",
        text: `A letter has been recieved from ${requests[i]?.username}\n\nRequest: ${requests[i]?.request}\n\nAddress: ${requests[i]?.address}`,
      });
      requests.splice(i, 1);
    }
  }
});
