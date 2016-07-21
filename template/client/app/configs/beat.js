import _ from 'lodash';
import { app as os } from '@napos/melody-os';

export function beatConfig(beatProvider, config, ksid) {
  'ngInject';

  if (ksid) {
    _.forEach(config.beat, function(endpoint, name) {
      var opts = endpoint.opts;

      if (opts.ncp === '1.0.0' || opts.ncp === undefined) {
        opts.query.ksid = ksid;
      } else if (opts.ncp === '2.0.0') {
        opts.metas.ksid = ksid;
      }
    });
  }

  beatProvider.init(config.beat);
}

export function beatErrorHandle(beat, config, analytics) {
  'ngInject';

  _.forEach(config.beat, (value, key) => {
    if (key === 'default') {
      beat.on('error', errorHandle);
    } else {
      beat[key].on('error', errorHandle);
    }
  });

  function errorHandle(error) {
    analytics.throw('beatError::' + error.type, error.message);
    if (
      error.code === 'LOGIN_REQUIRED' ||
      error.code === 'INVALID_SELF_DIST_RESTAURANT_D'
    ) {
      setTimeout(() => {
        os.emit('LOGIN_REQUIRED', error);
      }, 2000);
    }
  }
}
