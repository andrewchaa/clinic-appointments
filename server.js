'use strict';

var express = require('express');
var path = require('path');
var firebase = require('firebase');
var config = require('./serverConfig.json');
var moment = require('moment');
var notifier = require('./server/notifier');

var app = express();

firebase.initializeApp({
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  databaseURL: config.databaseURL,
  storageBucket: config.storageBucket
});

app.use(express.static(path.resolve(path.join(__dirname, '/app'))));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/app/index.html'));
});

app.get('/check-appointments', function (req, res) {

  var tomorrow = moment().add(1, 'days').format('DD/MM/YYYY');
  firebase.auth().signInWithEmailAndPassword(config.logInEmail, config.logInPassword)
    .then(function (result, error) {
      if (error) {
        console.log("Login Failed: " + error);
      } else {
        var userId = 'HeFltOAjsgRrXFYZB3g2Ref33oN2';
        var ref = firebase.database().ref('appointments/' + userId);
        ref.orderByChild('date').equalTo(tomorrow).once('value', function(snapshot) {
          var appointments = [];
          snapshot.forEach(function (data) {
            var appointment = data.val();
            notifier.send(appointment);
            appointments.push(appointment);
          })

          res.send(appointments);
        });
      }
    });
});

var server = app.listen(process.env.PORT || 8080, function () {
  console.log('App listening on port %s', server.address().port);
  console.log('Press Ctrl+C to quit.');
});
