const path = require('path');
const express = require('express');
const transporter = require('./config');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.json());
app.use(express.static(buildPath));

app.post('/send', (req, res) => {
  try {
    const mailOptions = {
      from: req.body.email, 
      to: process.env.email, 
      subject: req.body.subject, 
      html: `
      <p>YOU HAVE A NEW E-MAIL!</p>
      <h3>Contact Details Below</h3>
      <ul>
        <li>Name: ${req.body.name}</li>
        <li>E-mail: ${req.body.email}</li>
        <li>Subject: ${req.body.subject}</li>
        <li>Message: ${req.body.message}</li>
      </ul>
      `
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        res.status(500).send({
          success: false,
          message: 'Something wrong, please try again!'
        });
      } else {
        res.send({
          success: true,
          message: 'Thanks for contact! :)'
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Something wrong, please try again!'
    });
  }
});

app.listen(3030, () => {
  console.log('server start on port 3030');
});