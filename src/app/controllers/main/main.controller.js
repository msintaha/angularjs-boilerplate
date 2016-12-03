(function() {
  'use strict';

  angular
    .module('appFrontend')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController() {
    var vm = this;
    vm.someList = [
      'Hello',
      'World'
    ];
  }
})();
