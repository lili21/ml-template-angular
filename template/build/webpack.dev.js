var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FrindlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var config = require('./webpack.base')

config.entry.app = ['./build/hot-client'].concat(config.entry.app)

config.output.publicPath = '/'

config.module.rules = (config.module.rules || []).concat([
  {
    test: /\.(sass|scss)$/,
    use: [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
          includePaths: ['node_modules'],
          indentedSyntax: true
        }
      }
    ]
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
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'client/bootstrap/index.html',
      inject: true
    }),
    new FrindlyErrorsPlugin()
  ])

config.devtool = '#cheap-module-eval-source-map'

module.exports = config
