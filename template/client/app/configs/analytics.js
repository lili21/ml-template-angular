export function analyticsConfig (analyticsProvider, env, config) {
  'ngInject';
  analyticsProvider.init({}, env === 'development', config.ubtFrom);
}

export function analyticsInit (analytics, isChain, restaurantId, chainRestaurantId) {
  'ngInject';
  const rid = isChain ? chainRestaurantId : restaurantId;
  analytics.identifyRestaurant({id: rid});
}
