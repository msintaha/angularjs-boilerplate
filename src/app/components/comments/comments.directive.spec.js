(function() {
  'use strict';

  describe('Comments directive', function() {
    var scope, compile, directiveElem, $httpBackend;

    beforeEach(module('madkoffeeFrontend'));
    beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
      compile = _$compile_;
      scope = _$rootScope_.$new();
      $httpBackend = _$httpBackend_;

      $httpBackend.expectGET('http://madkoffee.com/wp-json/wp/v2/comments?post=2').respond(200, [{"id": 2, "post": 2}]);

      directiveElem = _compileElem();
    }));

    function _compileElem() {
      var element = angular.element('<comments post-id="2"></comments>');
      var compiledElement = compile(element)(scope);
      scope.$digest();
      return compiledElement;
    }

    it('should exist', function() {
      expect(directiveElem).not.toEqual(null);
    });

    it('should have applied the html template', function() {
      expect(directiveElem.html()).not.toEqual('');
    });

    it('should display a list of comments for a given post', function() {
      var commentList = directiveElem.find('ul');
      expect(commentList).toBeDefined();
    });
  });
})();
