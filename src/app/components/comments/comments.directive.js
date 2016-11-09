(function() {
  'use strict';

  angular
    .module('madkoffeeFrontend')
    .directive('comments', commentsDirective);

  /** @ngInject */
  function commentsDirective() {
    var directive = {
      restrict: 'E',
      scope: {
        postId: '='
      },
      templateUrl: 'app/components/comments/comments.html',
      controller: CommentController,
      controllerAs: 'comment',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function CommentController($log, commentService) {
      var vm = this;

      commentService.getPostComments(vm.postId).then(function(data) {
        vm.comments = data;
      }).catch(function (err) {
        $log.debug(err);
      });
    }
  }
})();
