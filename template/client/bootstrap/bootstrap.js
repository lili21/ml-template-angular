'use strict';

import angular from 'angular';
import config from 'config'; // client/config/index.js
import { app as os } from '@napos/melody-os';
import app from './app';

require('debug').enable(debug);

/** Bootstrap */

const env = window.localStorage.env || 'development';
const debug = window.localStorage.debug || 'beat.req, beat.res, beat.error, app.*';
// const ksid = window.localStorage.ksid || '';
const _config = global.CONFIG || config.get(env);

app
  .constant('env', env)
  .constant('config', _config);

console.log('__DEV__: ' + __DEV__);
console.log('iframe: ' + (window.parent !== window));

if (window.parent === window) {
  const {
    ksid,
    isChain,
    isMulti,
    restaurantId,
    chainRestaurantId
  } = window.localStorage;
  app
    .constant('ksid', ksid)
    .constant('isChain', isChain === 'true')
    .constant('isMulti', isMulti === 'true')
    .constant('restaurantId', restaurantId)
    .constant('chainRestaurantId', chainRestaurantId);

  angular.bootstrap(document, ['app']);
} else {
  os.init()
    .then(result => {
      app
        .constant('ksid', result.ksid)
        .constant('isChain', result.isChain)
        .constant('isMulti', result.isMulti)
        .constant('restaurantId', result.restaurantId)
        // 连锁店进入单店模式的时候，需要的id值不同
        .constant('chainRestaurantId', result.chainRestaurantId);

      angular.bootstrap(document, ['app']);
    })
    .catch(e => {
      console.error(e);
    });
}

