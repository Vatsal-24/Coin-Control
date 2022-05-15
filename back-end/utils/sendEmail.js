const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config({ path: "./../config.env" });
const sendMail = async (message) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 2525,
    host: "smtp.ethereal.email",
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const emailOptions = {
    from: "vatsaldoshi11@gmail.com", // sender address
    to: "vatsaldoshi11@gmail.com", // list of receivers
    subject: `<b>Price triggered</b>`, // Subject line
    text: message, // plain text body
    html: "", // html body
  };

  // send mail with defined transport object
  await transporter.sendMail(emailOptions);
  console.log("Message sent!");
};
module.exports = sendMail;
