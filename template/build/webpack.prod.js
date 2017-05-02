var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')

var config = require('./webpack.base')

config.output.filename = '[name].[chunkhash:6].js'
config.output.chunkFilename = '[name].[chunkhash:6].js'
config.output.publicPath = '/'

config.module.rules = (config.module.rules || []).concat([
  {
    test: /\.(sass|scss)$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
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
    })
  }
])

config.plugins = (config.plugins || []).concat([
  new webpack.DefinePlugin({
    __DEV__: false,
    __PRODUCTION__: true,
    'process.env.NODE_ENV': '"production"'
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'client/bootstrap/index.html.etpl',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    },
    chunksSortMode: 'dependency'
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: function (module) {
      // this assumes your vendor imports exist in the node_modules directory
      return module.context && module.context.indexOf('node_modules') !== -1
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest'
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true
  }),
  new UglifyJSPlugin({
    compress: {
      warnings: false
    },
    sourceMap: true
  }),
  new ExtractTextPlugin({
    filename: '[name].[contenthash:6].css',
    allChunks: true
  }),
  new OptimizeCSSPlugin({
    cssProcessorOptions: {
      safe: true
    }
  })
])

if (process.env.npm_config_report) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  config.plugins.push(new BundleAnalyzerPlugin())
} else {}

config.devtool = false

module.exports = config
