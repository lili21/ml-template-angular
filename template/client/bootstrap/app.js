// import 'babel-polyfill'
import angular from 'angular'

export default angular.module('app', [
  'ngSanitize',
  'ui.router'
])

require('angular-sanitize')

require('angular-ui-router')

require('../styles/app.sass')
require('../app')
require('./bootstrap.js')

