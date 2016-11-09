(function() {
  'use strict';

  angular
    .module('madkoffeeFrontend')
    .service('userService', userService);

  /** @ngInject */
  function userService($http, config, $q, $window, authService) {
    var self = this,
        auth = authService.getCredentials(),
        headers = _getHeaders(auth.username, auth.password);

    self.getUsers = function() {
      return _responseDecorator('GET', config.apiUrl + 'users', null, null);
    };

    self.getUser = function(id) {
      return _responseDecorator('GET', config.apiUrl + 'users/' + id, null, null);
    };

    self.addUser = function (data) {
      return _responseDecorator('POST', config.apiUrl + 'users', data, headers);
    };

    self.editUser = function (id, data) {
      return _responseDecorator('PUT', config.apiUrl + 'users/'+id, data, headers);
    };

    self.deleteUser = function (id) {
      return _responseDecorator('DELETE', config.apiUrl + 'users/'+id, null, headers);
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
