const rimraf = require('rimraf');
const fs = require('fs');

rimraf('app', function (error) {
  if (error) {
    console.log(error);
  }

  fs.rename('build', 'app', function (err) {
    if (err) {
      console.log(err);
    }
  })

});
