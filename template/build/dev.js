var portscanner = require('portscanner');
var chalk = require('chalk');
var port = require('./config').port;

portscanner.checkPortStatus(port, '0.0.0.0', function (error, status) {
  if (error) {
    console.log(chalk.red(error));
    return;
  }

  if (status === 'open') {
    console.log(chalk.red(port + ' 端口号已被占用，你可以尝试修改build/config.js配置'));
  } else {
    checkDependencies();
  }
});

function checkDependencies () {
  require('check-dependencies')({}, function(result) {
    if (result.depsWereOk) {
      start();
    } else {
      console.log(chalk.red(result.error.join('\n')));
      return;
    }
  });
}

function start() {
  var webpack = require('webpack');
  var config = require('./webpack.dev');
  var compiler = webpack(config);
  var express = require('express');
  var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: config.publicPath,
    stats: {
      colors: true,
      chunks: false
    }
  });

  var hotMiddleware = require('webpack-hot-middleware')(compiler);
  var historyApiFallback = require('connect-history-api-fallback')();
  var app = express();

  app.use(historyApiFallback);
  app.use(devMiddleware);
  app.use(hotMiddleware);
  app.listen(port, function(err) {
    if (err) {
      console.login(chalk.red(err));
    } else {
      console.log(chalk.green('Listening at http://localhost:' + port + '\n'));
    }
  });
}
