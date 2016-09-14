if (!process.env.production) {
  console.log('local environment, loading config settings');
  require('../config').load();
}

var client = require('twilio')(process.env.twilioSid, process.env.twilioToken);

exports.send = (appointment) => {
  console.log(appointment);

  client.sendMessage({
    to: appointment.mobile,
    from: process.env.twilioFromNumber,
    body: `Hi ${appointment.name}\r\n` +
          `This is a reminder for your acupuncture appointment with Hye-Eun ` +
          `at ${appointment.clinic} tomorrow, ` +
          `${appointment.date} ${appointment.hour}:${appointment.minute}\r\n` +
          `If you cannot make it, please let Hye-Eun know ASAP to rearrange it. ` +
          `We look forward to seeing you then.`
  }, function (err, responseData){
    if (err) {
      console.log(err);
    }

    if (responseData) {
      console.log(responseData);
    }
  });
  // client.sendMessage({
  //   to: appointment.mobile,
  //   from: '+441274451343',
  //   body: 'Hi ' + appointment.name  + '\r\n' +
  //     'You have an appointment with Hye-Eun at ' + appointment.clinic +
  //     ' tomorrow, ' + appointment.date + ' ' + appointment.hour + ':' + appointment.minute + '\r\n' +
  //     'If you cannot make it, please call Hye-Eun and rearrange it.'
  // }, function (err, responseData){
  //   console.log(err);
  // });

}
