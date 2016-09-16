if (!process.env.production) {
  console.log('local environment, loading config settings');
  require('../config').load();
}

const client = require('twilio')(process.env.twilioSid, process.env.twilioToken);
const responseHandler = function (err, response) {
  if (err) console.log(err);
  if (response) console.log(response);
}

exports.send = (appointment) => {
  console.log(`sending message to ${appointment.name}` );

  client.sendMessage({
    to: appointment.mobile,
    from: process.env.twilioFromNumber,
    body: `Hi ${appointment.name}\r\n\r\n` +
          `This is a reminder for your acupuncture appointment with Hye-Eun ` +
          `at ${appointment.clinic} tomorrow, ` +
          `${appointment.date} ${appointment.hour}:${appointment.minute}\r\n` +
          `If you cannot make it, please let Hye-Eun know ASAP to rearrange it. ` +
          `We look forward to seeing you then.`
  }, responseHandler);
}

exports.sendSummary = (appointments) => {
  var message = 'Hi Hye-Eun\r\n' +
    'We have sent notifications for tomorrow appointments to the the following patients\r\n\r\n';
  appointments.map(function (appointment) {
    message += `${appointment.name}: ${appointment.clinic} ${appointment.hour}:${appointment.minute}\r\n`
  });

  if (appointments.length === 0) {
    console.log('No appointments. Not sending any summary')
    return;
  }

  console.log(`sending summary to ${process.env.summaryCcNumbers}`);
  client.sendMessage({
    to: process.env.summaryCcNumbers, from: process.env.twilioFromNumber, body: message
    }, responseHandler
  );

  console.log(`sending summary to ${process.env.summaryToNumbers}`);
  client.sendMessage({
    to: process.env.summaryToNumbers, from: process.env.twilioFromNumber, body: message
    }, responseHandler
  );
}
