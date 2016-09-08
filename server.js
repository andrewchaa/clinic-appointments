'use strict';

var express = require('express');
var path = require('path');
var firebase = require('firebase');
var config = require('./serverConfig.json');

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

  firebase.auth().signInWithEmailAndPassword(config.logInEmail, config.logInPassword)
    .then(function (result, error) {
      if (error) {
        console.log("Login Failed: " + error);
      } else {
        var userId = 'HeFltOAjsgRrXFYZB3g2Ref33oN2';
        var ref = firebase.database().ref('appointments/' + userId);
        ref.orderByChild('date').equalTo('07/09/2016').once('value', function(snapshot) {
          console.log(snapshot.key);
          snapshot.forEach(function (data) {
            console.log(data.val());
          })
        });

      }
    });


  // var ref = firebase.database().ref('appointments/' + props.userId);
  // ref.orderByChild('date').equalTo('21/08/2016').on('child_added', function(snapshot) {
  //   console.log(snapshot.key);
  // });


  res.send('hello');
});

var server = app.listen(process.env.PORT || 8080, function () {
  console.log('App listening on port %s', server.address().port);
  console.log('Press Ctrl+C to quit.');
});
