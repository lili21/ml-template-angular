var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var config = require('./webpack.base');

config.output.filename = '[name].[chunkhash:6].js';
config.output.chunkFilename = '[id].[chunkhash:6].js';

config.module.loaders = (config.module.loaders || []).concat([
  {
    test: /\.(sass|scss)$/,
    loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass')
  }
]);

config.plugins = (config.plugins || []).concat([
  new webpack.DefinePlugin({
    __DEV__: false,
    __PRODUCTION__: true,
    'process.env.NODE_ENV': '"production"'
  }),

  new HtmlWebpackPlugin({
    filename: 'index.html.etpl',
    template: 'client/bootstrap/index.html.etpl.ejs',
    // 需要自己控制inject的位置，方便以后添加CDN的代码
    inject: false,
    // 保证vendor在app前加载
    chunksSortMode: 'dependency'
  }),

  // require node_modules内的模块都会打包到vendor中
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: function(module) {
      return (
        module.resource &&
        module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
      );
    }
  }),

  // webpack 的commonschunkplugin有一些问题，即使代码不变，chuankhash还是会变，所以需要做一下处理
  // https://github.com/webpack/webpack/issues/1315
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    chunks: ['vendor']
  }),

  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),

  new ExtractTextPlugin('[name].[contenthash:6].css')
]);

// config.devtool = '#source-map';

module.exports = config;
