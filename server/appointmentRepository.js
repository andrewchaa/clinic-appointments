if (!process.env.production) {
  console.log('local environment, loading config settings');
  require('../config').load();
}

var firebase = require('firebase');

firebase.initializeApp({
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  storageBucket: process.env.storageBucket
});

exports.list = (date, next) => {

  firebase.auth().signInWithEmailAndPassword(process.env.logInEmail, process.env.logInPassword)
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
