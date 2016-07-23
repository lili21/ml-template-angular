var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')
var config = require('./webpack.base')

var hots = ['webpack-hot-middleware/client?noInfo=true&reload=true']

config.entry.app = hots.concat(config.entry.app)

config.module.loaders = (config.module.loaders || []).concat([
  {
    test: /\.(sass|scss)$/,
    loaders: ['style', 'css?sourceMap', 'sass']
  }
])

config.plugins = (config.plugins || [])
  .concat([
    new webpack.DefinePlugin({
      __DEV__: true,
      __PRODUCTION__: false,
      'process.env.NODE_ENV': '"development"'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'client/bootstrap/index.html',
      inject: true
    })
  ])

config.devtool = '#eval-source-map'

module.exports = config
