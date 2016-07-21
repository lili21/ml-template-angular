var _ = require('lodash');
var debug = {
  route: require('debug')('app:route'),
  attach: require('debug')('app:attach')
};

export function appConfig($urlRouterProvider, $locationProvider) {
  'ngInject';
  $urlRouterProvider
    .otherwise('/app');

  /** Enable HTML5 Mode. */
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}

export function redirect($rootScope, $state, $stateParams, Alert, analytics, $injector) {
  'ngInject';
  $rootScope.$on('$stateChangeStart', function() {
    debug.route('from state: %s', $state.current.name || 'root');
  });

  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    debug.route('to state: %s', $state.current.name);
    /**
     * Redirect functionality for ui-router
     * @param  {[type]} $state.current.redirect [description]
     * @return {[type]}                         [description]
     */
    if ($state.current.redirect) {
      if (_.isFunction($state.current.redirect)) {
        var o = $injector.invoke($state.current.redirect);
        $state.go(o.state, o.params);
        return;
      }

      $state.go($state.current.redirect);
    }

  });

  $rootScope.$on('$stateChangeError', (event, ...args) => {
    console.error(_.last(args), true);
    analytics.throw('stateChangeError', _.last(args));
  });
}
