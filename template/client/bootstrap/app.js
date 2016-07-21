// 需要在angular前引入jquery
// 同时利用expose-loader暴露jQuery的全局变量
// angular才会用jquery而不是自己的jqLite
import 'jquery';
import angular from 'angular';

export default angular.module('app', [
  'ngSanitize',
  'ui.router',
  'ngBeat',
  'ngAnalytics',

  'melody-common'
]);

require('angular-sanitize');

require('angular-ui-router');

require('@napos/napos-ng-beat');
require('@napos/napos-ng-analytics');
require('@napos/melody-common');

require('../styles/app.sass');
require('../app');
require('./bootstrap.js');

// 以后上CDN的时候需要用到
global.APP_LOADED = true;