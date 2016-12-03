(function() {
  'use strict';

  angular
    .module('appFrontend')
    .directive('posts', postsDirective);

  /** @ngInject */
  function postsDirective() {
    var directive = {
      restrict: 'E',
      scope: {
        postNum: '='
      },
      templateUrl: 'app/components/posts/posts.html',
      controller: PostController,
      controllerAs: 'articles',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function PostController($log, postService, $sce, $scope,limitToFilter) {
      var vm = this;
      var excerpt;
      postService.getPosts(vm.postNum).then(function(data) {
        $log.debug(data);
        vm.posts = data;
      }).catch(function (err) {
        $log.debug(err);
      });

      $scope.trust = function(data){
        return $sce.trustAsHtml(limitToFilter(data,150));
      };
    }
  }
})();
