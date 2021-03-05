const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.email, // Your email address here
    pass: process.env.password // Your e-mail password here
  }
});

module.exports = transporter;