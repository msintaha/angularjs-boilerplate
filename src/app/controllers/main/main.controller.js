(function() {
  'use strict';

  angular
    .module('madkoffeeFrontend')
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
