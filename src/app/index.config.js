(function() {
  'use strict';

  angular
    .module('madkoffeeFrontend')
    .config(config);

  /** @ngInject */
  function config($logProvider, $httpProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    $httpProvider.defaults.transformRequest.unshift(function (data, headersGetter) {
      var key, result = [];

      if (typeof data === 'string')
        return data;

      for (key in data) {
        if (data.hasOwnProperty(key))
          result.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
      }

      return result.join('&');
    });
  }

})();
