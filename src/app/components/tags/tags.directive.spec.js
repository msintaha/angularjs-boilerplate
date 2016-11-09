(function() {
  'use strict';

  describe('Tag directive', function() {
    var scope, compile, $httpBackend, directiveElem;

    beforeEach(module('madkoffeeFrontend'));
    beforeEach(inject(function(_$rootScope_, _$compile_, _$httpBackend_) {
      $httpBackend = _$httpBackend_;
      compile = _$compile_;
      scope = _$rootScope_.$new();
      $httpBackend.expectGET('http://madkoffee.com/wp-json/wp/v2/tags/40').respond(200, [{"id": 40}]);
      directiveElem = _compileElem();
    }));

    function _compileElem() {
      var element = angular.element('<tags tag-id="40"></tags>');
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

    it('should display a list of tags', function() {
      var tagList = directiveElem.find('li');
      expect(tagList).toBeDefined();
    });
  });
})();
