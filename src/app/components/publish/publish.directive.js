(function() {
  'use strict';

  angular
    .module('madkoffeeFrontend')
    .directive('publish', publishDirective);

  /** @ngInject */
  function publishDirective() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/publish/publish.html',
      controller: PublishController,
      controllerAs: 'publish',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function PublishController() {

    }
  }
})();
