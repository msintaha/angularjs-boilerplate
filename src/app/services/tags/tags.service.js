(function() {
  'use strict';

  angular
    .module('madkoffeeFrontend')
    .service('tagService', tagService);

  /** @ngInject */
  function tagService($http, config, $q, $window, authService) {
    var self = this,
        auth = authService.getCredentials(),
        headers = _getHeaders(auth.username, auth.password);

    self.getTags = function() {
      return _responseDecorator('GET', config.apiUrl + 'tags', null, null);
    };

    self.getTag = function(id) {
      return _responseDecorator('GET', config.apiUrl + 'tags/' + id, null, null);
    };

    self.addTag = function (data) {
      return _responseDecorator('POST', config.apiUrl + 'tags', data, headers);
    };

    self.editTag = function (id, data) {
      return _responseDecorator('PUT', config.apiUrl + 'tags/'+id, data, headers);
    };

    self.deleteTag = function (id) {
      return _responseDecorator('DELETE', config.apiUrl + 'tags/'+id, null, headers);
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
