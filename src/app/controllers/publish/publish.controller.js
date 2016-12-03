(function() {
  'use strict';

  angular
    .module('appFrontend')
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
