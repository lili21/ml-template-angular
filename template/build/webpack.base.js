var path = require('path');
var webpack = require('webpack');

var config = {
  entry: {
    app: [ './client/bootstrap/app.js' ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: 'assets/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.html$/,
        loader: 'html?root=~'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['ng-annotate?add=true', 'babel-loader']
      },
      {
        test: /[\/]angular\.js$/,
        loader: 'exports?angular'
      },
      {
        test: require.resolve('jquery'),
        loader: 'expose?$!expose?jQuery'
      }
    ]
  },
  resolve: {
    root: [path.join(__dirname, '../node_modules')],
    extensions: ['', '.js'],
    modulesDirectories: ['client', 'client/assets', 'node_modules']
  },
  resolveLoader: {
    root: [path.join(__dirname, '../node_modules')]
  },
  sassLoader: {
    sourceMap: true,
    includePaths: ['node_modules'],
    indentedSyntax: true
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin()
  ]
};

module.exports = config;
