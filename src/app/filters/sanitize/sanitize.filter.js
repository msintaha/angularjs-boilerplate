(function () {
  'use strict';

  angular
    .module('madkoffeeFrontend')
    .filter('trusted', htmlSanitizer);

  /** @ngInject */
  function htmlSanitizer($sce) {
    return function(text) {
        return $sce.trustAsHtml(text);
    };
  }
})();
