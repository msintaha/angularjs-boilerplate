(function() {
  'use strict';

  angular
    .module('madkoffeeFrontend')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/controllers/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('publish',{
        url: '/publish',
        templateUrl: 'app/controllers/publish/publish.html',
        controller: 'PublishController',
        controllerAs: 'publish'
      })
      .state('login',{
        url: '/login',
        templateUrl: 'app/controllers/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      });

    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  }

})();
