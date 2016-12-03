(function() {
  'use strict';

  angular
    .module('appFrontend')
    .directive('user', userDirective);

  /** @ngInject */
  function userDirective() {
    var directive = {
      restrict: 'E',
      scope: {
        userId: '='
      },
      templateUrl: 'app/components/user/user.html',
      controller: UserController,
      controllerAs: 'user',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function UserController($log, userService) {
      var vm = this;

      userService.getUser(vm.userId).then(function(data) {
        vm.author = data.name;
        vm.authorImage = data.avatar_urls[96];
      }).catch(function (err) {
        $log.debug(err);
      });
    }
  }
})();
