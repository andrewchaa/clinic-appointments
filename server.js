'use strict';

var express = require('express');
var path = require('path');
var moment = require('moment');
var notifier = require('./server/notifier');
var repository = require('./server/appointmentRepository');

var app = express();

app.use(express.static(path.resolve(path.join(__dirname, '/app'))));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/app/index.html'));
});

app.get('/check-appointments', function (req, res) {

  var tomorrow = moment().add(1, 'days').format('DD/MM/YYYY');
  var appointments = [];
  repository.list(tomorrow, function (appointments) {
    appointments.map(function(appointment) {
      notifier.send(appointment);
    })

    res.send(appointments);
  });


});

var server = app.listen(process.env.PORT || 8080, function () {
  console.log('App listening on port %s', server.address().port);
  console.log('Press Ctrl+C to quit.');
});
