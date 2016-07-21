'use strict';

module.exports = {
  app: {
    name: 'melody',
    version: '4.4.0',
    server: 'http://app-api.shop.alpha.elenet.me/',
  },
  beat: {
    default: {
      uri: 'http://app-api.shop.alpha.elenet.me/invoke',
      opts: {
        query: {
          appName: 'melody',
          appVersion: '4.4.0'
        },
        debug: {
          mock: false,
          disablePolling: true
        }
      }
    }
  },
  ubtFrom: 'melody-development'
};

