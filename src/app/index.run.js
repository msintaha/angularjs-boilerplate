(function() {
  'use strict';

  angular
    .module('madkoffeeFrontend')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
