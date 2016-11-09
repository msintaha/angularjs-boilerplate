(function() {
  'use strict';

  angular
    .module('madkoffeeFrontend')
    .service('postService', postService);

  /** @ngInject */
  function postService($http, config, $q, $window, authService) {
    var self = this,
        auth = authService.getCredentials(),
        headers = _getHeaders(auth.username, auth.password);

    self.getPosts = function(num) {
      return _responseDecorator('GET', config.apiUrl + 'posts?per_page=' + num, null, null);
    };

    self.getPost = function(id) {
      return _responseDecorator('GET', config.apiUrl + 'posts/' + id, null, null);
    };

    self.addPost = function (data) {
      return _responseDecorator('POST', config.apiUrl + 'posts', data, headers);
    };

    self.editPost = function (id, data) {
      return _responseDecorator('PUT', config.apiUrl + 'posts/'+id, data, headers);
    };

    self.deletePost = function (id) {
      return _responseDecorator('DELETE', config.apiUrl + 'posts/'+id, null, headers);
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
