(function () {
  'use strict';

  angular
    .module('madkoffeeFrontend')
    .filter('uppercase', uppercaseFilter);

  /** @ngInject */
  function uppercaseFilter() {
    return function(str) {
      if (!angular.isString(str)) { return; }
      return str.toUpperCase();
    }
  }
})();
