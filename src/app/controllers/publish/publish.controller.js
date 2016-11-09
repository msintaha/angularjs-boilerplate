(function() {
  'use strict';

  angular
    .module('madkoffeeFrontend')
    .controller('PublishController', PublishController);

  /** @ngInject */
  function PublishController() {
    var vm = this;
    vm.someList = [
      'Hello',
      'World'
    ];
  }
})();
