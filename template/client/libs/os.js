import uuid from 'node-uuid';

var invokeMap = {};
var handlers = [];
var os = {
  init () {
    return Promise
      .all([
        this.invoke('RestaurantStore.getKsid'),
        this.invoke('RestaurantStore.isChain'),
        this.invoke('RestaurantStore.isMulti'),
        this.invoke('RestaurantStore.getCurrentRestaurant'),
        this.invoke('RestaurantStore.getChainRestaurantId')
      ])
      .then(results => {
        console.log(results);
        const [ ksid, isChain, isMulti, restaurant, chainRestaurantId ] = results;
        return {
          ksid,
          isChain,
          isMulti,
          chainRestaurantId,
          restaurantId: restaurant && restaurant.id,
        };
      });
  },
  invoke (method, ...params) {
    return new Promise((resolve, reject) => {
      const id = uuid.v4();
      window.parent.postMessage({
        id,
        type: 'os.request',
        method,
        params
      }, '*');
      invokeMap[id] = { resolve, reject };
    });
  },
  emit (eventName, data) {
    window.parent.postMessage({
      type: 'os.event',
      eventName,
      data
    }, '*');
  },
  on(eventName, handle) {
    handlers[eventName] = handlers[eventName]
      ? handlers[eventName].concat(handle)
      : [handle];

    return this;
  }
};

function receiveMessage(event) {
  const message = event.data;
  switch (message.type) {
    case 'os.response':
      message.error ? invokeMap[message.id].reject(message.error) : invokeMap[message.id].resolve(message.result);
      break;
    case 'os.event':
      const _handlers = handlers[message.eventName] || [];
      _handlers.forEach(handler => {
        handler(message.data);
      });
      break;
    default:
      console.log('app received:', message);
  }
};

window.__remove_before_listener && window.__remove_before_listener();
window.addEventListener('message', receiveMessage, true);
window.__remove_before_listener = window.removeEventListener.bind(window, 'message', receiveMessage, true);

export default os;
