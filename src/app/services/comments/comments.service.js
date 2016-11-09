(function() {
  'use strict';

  angular
    .module('madkoffeeFrontend')
    .service('commentService', commentService);

  /** @ngInject */
  function commentService($http, $q, config, $window, authService) {
    var self = this,
        auth = authService.getCredentials(),
        headers = _getHeaders(auth.username, auth.password);

    self.getComments = function() {
      return _responseDecorator('GET', config.apiUrl + 'comments', null, null);
    };

    self.getComment = function(id) {
      return _responseDecorator('GET', config.apiUrl + 'comments/' + id, null, null);
    };

    self.getPostComments = function(postId) {
      return _responseDecorator('GET', config.apiUrl + 'comments?post=' + postId, null, null);
    };

    self.addComment = function (data) {
      return _responseDecorator('POST', config.apiUrl + 'comments', data, headers);
    };

    self.editComment = function (id, data) {
      return _responseDecorator('PUT', config.apiUrl + 'comments/' + id, data, headers);
    };

    self.deleteComment = function (id) {
      return _responseDecorator('DELETE', config.apiUrl + 'comments/' + id, null, headers);
    };

    function _getHeaders(username, password) {
      headers = {
        'Authorization': 'Basic ' + $window.btoa(username + ':' + password),
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
