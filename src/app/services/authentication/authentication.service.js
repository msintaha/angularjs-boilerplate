(function() {
  'use strict';

  angular
    .module('madkoffeeFrontend')
    .service('authService', authService);

  /** @ngInject */
  function authService($http, $cookies) {
    var self = this;

    self.login = function(credentials) {
      var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 7);
      $cookies.put('username', credentials.username, [{'expires': expireDate}]);
      $cookies.put('password', credentials.password, [{'expires': expireDate}]);
    };

    self.logout = function() {
      $cookies.remove('username');
      $cookies.remove('password');
    };

    self.getCredentials = function() {
      var auth = {
        username: $cookies.get('username'),
        password: $cookies.get('password')
      };
      return auth;
    };
  }
})();
