if (!process.env.production) {
  console.log('local environment, loading config settings');
  require('../config').load();
}

var client = require('twilio')(process.env.twilioSid, process.env.twilioToken);

exports.send = (appointment) => {
  console.log(`sending message to ${appointment.name}` );

  client.sendMessage({
    to: appointment.mobile,
    from: process.env.twilioFromNumber,
    body: `Hi ${appointment.name}\r\n` +
          `This is a reminder for your acupuncture appointment with Hye-Eun ` +
          `at ${appointment.clinic} tomorrow, ` +
          `${appointment.date} ${appointment.hour}:${appointment.minute}\r\n` +
          `If you cannot make it, please let Hye-Eun know ASAP to rearrange it. ` +
          `We look forward to seeing you then.`
  }, function (err, response){
    if (err) console.log(err);
    if (response) console.log(response);
  });
}

exports.sendSummary = (appointments) => {
  console.log('sending summary');

  var message = 'Hi Hye-Eun\r\n' +
    'We have sent notifications for tomorrow appointments to the the following patients\r\n';
  appointments.map(function (appointment) {
    message += `${appointment.name}: ${appointment.clinic} ${appointment.hour}:${appointment.minute}\r\n`
  });

  client.sendMessage({
    to: process.env.summaryCcNumbers,
    from: process.env.twilioFromNumber,
    body: message
  }, function (err, response) {
    if (err) console.log(err);
    if (response) console.log(response);
  })

}
