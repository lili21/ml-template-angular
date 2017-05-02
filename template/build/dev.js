var portscanner = require('portscanner')
var chalk = require('chalk')
var port = require('./config').port

portscanner.checkPortStatus(port, '0.0.0.0', function (error, status) {
  if (error) {
    console.log(chalk.red(error))
    return
  }

  if (status === 'open') {
    console.log(chalk.red(port + ' 端口号已被占用，你可以尝试修改build/config.js配置'))
  } else {
    checkDependencies()
  }
})

function checkDependencies () {
  require('check-dependencies')({}, function (result) {
    if (result.depsWereOk) {
      start()
    } else {
      console.log(chalk.red(result.error.join('\n')))
      return
    }
  })
}

function start () {
  var opn = require('opn')
  var webpack = require('webpack')
  var config = require('./webpack.dev')
  var compiler = webpack(config)
  var express = require('express')
  var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: config.publicPath,
    quiet: true
  })

  var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {}
  })

  // force page reload when html-webpack-plugin template changes
  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
      hotMiddleware.publish({ action: 'reload' })
      cb()
    })
  })

  var historyApiFallback = require('connect-history-api-fallback')()
  var app = express()

  app.use(historyApiFallback)
  app.use(devMiddleware)
  app.use(hotMiddleware)

  var uri = 'http://localhost:' + port
  devMiddleware.waitUntilValid(() => {
    console.log('> Listening at ' + uri + '\n')
    opn(uri)
  })
  app.listen(port)
}
