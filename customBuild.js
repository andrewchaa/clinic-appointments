const rimraf = require('rimraf');
const fs = require('fs');
const fse = require('fs-extra');

rimraf('app', function (error) {
  if (error) console.log(error);

  fs.rename('build', 'app', function (err) {
    if (err) console.log(err);

    fse.copy('bootstrap', 'app/bootstrap', function (err) { if (err) console.log(err); });
    fse.copy('dist', 'app/dist', function (err) { if (err) console.log(err); });
    fse.copy('plugins', 'app/plugins', function (err) { if (err) console.log(err); });

  })

});
