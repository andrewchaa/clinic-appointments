if (!process.env.production) {
  console.log('local environment, loading config settings');
  require('../config').load();
}

var client = require('twilio')(process.env.twilioSid, process.env.twilioToken);

exports.send = (appointment) => {
  console.log(appointment);

  client.sendMessage({
    to: appointment.mobile,
    from: '+441274451343',
    body: 'Hi ' + appointment.name  + '\r\n' +
      'You have an appointment with Hye-Eun at ' + appointment.clinic +
      ' tomorrow, ' + appointment.date + ' ' + appointment.hour + ':' + appointment.minute + '\r\n' +
      'If you cannot make it, please call Hye-Eun and rearrange it.'
  }, function (err, responseData){
    console.log(err);
  });

}
