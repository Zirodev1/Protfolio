const express = require('express');
const path = require('path');
const app = express();
app.use(express.static('public'));
app.use(express.json());

require('dotenv').config();
const myEmail = process.env.EMAIL_USERNAME;
const password = process.env.EMAIL_PASSWORD;


const nodemailer = require("nodemailer")

// Enforce HTTPS
app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
  });

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/', (req, res) => {
    console.log(req.body);
    const { name, email, subject, inquiry, message } = req.body;
    console.log(`Received - Name: ${name}, Email: ${email}, Subject: ${subject}, Message: ${message}`);
    console.log("Received req.body: ", req.body)


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: myEmail,
            pass: password
        }
    });

    console.log(`Variables - Subject: ${subject}, Inquiry: ${inquiry}, Name: ${name}, Message: ${message}, Email: ${email}`);

    console.log("Before defining mailOptions");
    const mailOptions = {
        from: email,
        to: myEmail,
        subject: subject,
        text: `
            Inquiry: ${inquiry.toUpperCase()}
            Message from ${name}:
            ${message}
            From: ${email}
        `
    };
    
    console.log("After defining mailOptions");
    console.log("Mail options:", mailOptions);

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error);
            res.json({ status: 'failure' });
        }else {
            console.log('Email sent: ' + info.response)
            // After sending the email successfully
            res.json({ status: 'success' });
        }
    })
}) 