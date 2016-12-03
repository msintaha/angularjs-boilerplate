(function() {
  'use strict';

  angular
    .module('appFrontend')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController(authService) {
    var vm = this;
    $scope.credentials = {
       username: '',
       password: ''
    };
   $scope.login = function (credentials) {
     authService.login(credentials).then(function (user) {

     }, function () {
       $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
     });
   };
  }
})();
