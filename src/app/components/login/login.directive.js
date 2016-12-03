(function() {
  'use strict';

  angular
    .module('appFrontend')
    .directive('login', loginDirective);

  /** @ngInject */
  function loginDirective() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/login/login.html',
      controller: LoginController,
      controllerAs: 'login',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function LoginController($log, authService) {
      var vm = this;
      var excerpt;
      authService.login(credentials).then(function(data) {
        $log.debug(data);
      }).catch(function (err) {
        $log.debug(err);
      });

    }
  }
})();
