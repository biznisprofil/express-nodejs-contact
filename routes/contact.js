var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer'); // include nodemailer

/* GET contact page. */
router.get('/', function(req, res, next) {
  res.render('contact', {
    title: 'Contact'
  });
});

// NodeJS bachand handler
router.post('/send', function(req, res, next) { // Function Post for sending Data
  var transporter = nodemailer.createTransport({ // Nodemailer API
    service: "Gmail", // Your service and Username and pasword
    auth: {
      user: "your.email@gmail.com", 
      pass: "application-specific-password"
    }
  });
  var mailOptions = {                          // Body for contact form
    from: "Your Name <your.email@hotmail.com>",
    to: "your.email@gmail.com",
    subject: 'Website submission',
    text: 'You have a new submission with the following details ... Name: ' + req.body.name + ' Telephone: ' + req.body.phone + ' Email: ' + req.body.email + ' Message: ' + req.body.message,
    html: '<p>You got a new submission with the following details ... </p><ul><li>Name: ' + req.body.name + '</li><li>Phone: ' + req.body.phone + '</li><li>Email: ' + req.body.email + '</li><li>Message: ' + req.body.message + '</li></ul>'
  };

  transporter.sendMail(mailOptions, function(error, info) { // Options for error and for succes
    if (error) {
      console.log(error);
      res.redirect('/');
    } else {
      console.log('Message sent: ' + info.response);
      res.redirect('/');
    }
  });
});

module.exports = router;
