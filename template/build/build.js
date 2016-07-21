var rimraf = require('rimraf');

rimraf('dist/', function(err) {
  if (!err) {
    build();
  }
});

function build() {
  var spinner = require('ora')('building for production ...');
  spinner.start();
  var fs = require('fs');
  var webpack = require('webpack');
  var webpackConfig = require('./webpack.prod');
  var compiler = webpack(webpackConfig);

  compiler.run(function(err, stats) {
    spinner.stop();
    if (err) throw err;
    fs.writeFile('dist/version.js', Date.now());
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n');
  });
}
