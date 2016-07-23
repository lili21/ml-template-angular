export default ['$stateProvider', $stateProvider => {
  $stateProvider
    .state('app', {
      url: '/app',
      template: '<div ui-view="wrapper" class="content">hello world</div>'
    })
}]
