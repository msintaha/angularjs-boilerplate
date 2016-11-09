(function() {
  'use strict';

  describe('Media directive', function() {
    var scope, compile, $httpBackend, directiveElem;

    beforeEach(module('madkoffeeFrontend'));
    beforeEach(inject(function(_$rootScope_, _$compile_, _$httpBackend_) {
      $httpBackend = _$httpBackend_;
      compile = _$compile_;
      scope = _$rootScope_.$new();
      $httpBackend.expectGET('http://madkoffee.com/wp-json/wp/v2/media/1927').respond(200, [{"id": 1927}]);
      directiveElem = _compileElem();
    }));

    function _compileElem() {
      var element = angular.element('<media media-id="1927"></media>');
      var compiledElement = compile(element)(scope);
      scope.$digest();
      return compiledElement;
    }

    it('should exist', function () {
      expect(directiveElem).not.toEqual(null);
    });

    it('should have applied the html template', function() {
      expect(directiveElem.html()).not.toEqual('');
    });

    it('should display featured image', function() {
      var featuredimage = directiveElem.find('img');
      expect(featuredimage).toBeDefined();
    });
  });
})();
