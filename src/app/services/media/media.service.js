(function() {
  'use strict';

  angular
    .module('madkoffeeFrontend')
    .service('mediaService', mediaService);

  /** @ngInject */
  function mediaService($http, config, $q, $window, authService) {
    var self = this,
        auth = authService.getCredentials(),
        headers = _getHeaders(auth.username, auth.password);

    self.getImages = function() {
      return _responseDecorator('GET', config.apiUrl + 'media', null, null);
    };

    self.getImage = function(id) {
      return _responseDecorator('GET', config.apiUrl + 'media/' + id, null, null);
    };

    self.addImage = function (data) {
      return _responseDecorator('POST', config.apiUrl + 'media', data, headers);
    };

    self.editImage = function (id, data) {
      return _responseDecorator('PUT', config.apiUrl + 'media/'+id, data, headers);
    };

    self.deleteImage = function (id) {
      return _responseDecorator('DELETE', config.apiUrl + 'media/'+id, null, headers);
    };

    function _getHeaders(username, password) {
      headers = {
        'Authorization': 'Basic ' + $window.btoa(username+':'+password),
        'Content-Type': 'application/x-www-form-urlencoded'
      };

      return headers;
    }

    function _responseDecorator(method, url, data, headers) {
      var defer = $q.defer();

      $http({method: method, url: url, data: data, headers: headers}).then(function(response) {
        defer.resolve(response.data);
      }, function(err) {
        defer.reject(err);
      });

      return defer.promise;
    }
  }
})();
