var config = require('../serverConfig.json');
var firebase = require('firebase');

firebase.initializeApp({
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  databaseURL: config.databaseURL,
  storageBucket: config.storageBucket
});

exports.list = (date, next) => {

  firebase.auth().signInWithEmailAndPassword(config.logInEmail, config.logInPassword)
    .then(function (result, error) {
      if (error) {
        console.log("Login Failed: " + error);
      } else {

        var appointments = [];
        var userId = 'HeFltOAjsgRrXFYZB3g2Ref33oN2';
        var ref = firebase.database().ref('appointments/' + userId);
        ref.orderByChild('date').equalTo(date).once('value', function(snapshot) {
          snapshot.forEach(function (data) {
            var appointment = data.val();
            appointments.push(appointment);
          });

          next(appointments);
        });
      }
    });

}
