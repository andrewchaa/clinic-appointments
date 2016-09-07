'use strict';

var express = require('express');
var path = require('path');
var firebase = require('firebase');
var databaseURL = "https://appointments-9ce53.firebaseio.com";

var app = express();

var config = {
    apiKey: "AIzaSyDljLinnIuEuSuJHJhfoqTglyp_UQH3Ofo",
    authDomain: "appointments-9ce53.firebaseapp.com",
    databaseURL: databaseURL,
    storageBucket: "appointments-9ce53.appspot.com",
  };
firebase.initializeApp(config);

app.use(express.static(path.resolve(path.join(__dirname, '/app'))));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/app/index.html'));
});

app.get('/check-appointments', function (req, res) {

  firebase.auth().signInWithEmailAndPassword("andrew.chaa@yahoo.co.uk", "")
    .then(function (result, error) {
      if (error) {
        console.log("Login Failed!");
        console.log(error);
      } else {
        var userId = 'HeFltOAjsgRrXFYZB3g2Ref33oN2';

        var ref = firebase.database().ref('appointments/' + userId);
        ref.orderByChild('date').equalTo('21/08/2016').on('child_added', function(snapshot) {
          console.log(snapshot.key);
          snapshot.forEach(function (data) {
            console.log(data.key);
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
