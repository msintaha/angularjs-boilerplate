(function() {
  'use strict';

  angular
    .module('madkoffeeFrontend')
    .directive('media', mediaDirective);

  /** @ngInject */
  function mediaDirective() {
    var directive = {
      restrict: 'E',
      scope: {
        mediaId: '='
      },
      templateUrl: 'app/components/media/media.html',
      controller: MediaController,
      controllerAs: 'images',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function MediaController($log, mediaService) {
      var vm = this;

      mediaService.getImage(vm.mediaId).then(function(data) {
        $log.debug(data.source_url);
        vm.featuredimage = data.source_url;
      }).catch(function (err) {
        $log.debug(err);
      });
    }
  }
})();
