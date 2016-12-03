(function() {
  'use strict';

  describe('User directive', function() {
    var scope, compile, $httpBackend, directiveElem;

    beforeEach(module('appFrontend'));
    beforeEach(inject(function(_$rootScope_, _$compile_, _$httpBackend_) {
      $httpBackend = _$httpBackend_;
      compile = _$compile_;
      scope = _$rootScope_.$new();
      $httpBackend.expectGET('http://madkoffee.com/wp-json/wp/v2/users/3').respond(200, [{"id": 3}]);
      directiveElem = _compileElem();
    }));

    function _compileElem() {
      var element = angular.element('<user user-id="3"></user>');
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

    it('should display user image', function() {
      var userImg = directiveElem.find('img');
      expect(userImg).toBeDefined();
    });
  });
})();
