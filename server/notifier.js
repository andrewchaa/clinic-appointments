var config = require('../serverConfig.json');
var client = require('twilio')(config.twilioSid, config.twilioToken);

exports.sendMessage = () => {
  console.log('test');

  // client.sendMessage({
  //   to:'+447590536154',
  //   from: '+441274451343',
  //   body: 'Hello there'
  // }, function (err, responseData){
  //   console.log(err);
  //   console.log(responseData);
  // });
  
}
