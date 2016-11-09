(function() {
  'use strict';

  angular
    .module('madkoffeeFrontend')
    .directive('tags', tagsDirective);

  /** @ngInject */
  function tagsDirective() {
    var directive = {
      restrict: 'E',
      scope: {
        tagId: '='
      },
      templateUrl: 'app/components/tags/tags.html',
      controller: TagsController,
      controllerAs: 'tags',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function TagsController($log, tagService) {
      var vm = this;

      tagService.getTag(vm.tagId).then(function(data) {
        vm.hashtag = data.name;
      }).catch(function (err) {
        $log.debug(err);
      });
    }
  }
})();
