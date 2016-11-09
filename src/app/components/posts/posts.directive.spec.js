(function() {
  'use strict';

  describe('Post directive', function() {
    var scope, compile, $httpBackend, directiveElem;

    beforeEach(module('madkoffeeFrontend'));
    beforeEach(inject(function(_$rootScope_, _$compile_, _$httpBackend_) {
      $httpBackend = _$httpBackend_;
      compile = _$compile_;
      scope = _$rootScope_.$new();
      $httpBackend.expectGET('http://madkoffee.com/wp-json/wp/v2/posts?per_page=1').respond(200, [{"id": 1908}]);
      directiveElem = _compileElem();
    }));

    function _compileElem() {
      var element = angular.element('<posts post-num="1"></posts>');
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

    it('should display a list of posts', function() {
      var postList = directiveElem.find('article');
      expect(postList).toBeDefined();
    });

    it('should have read more button', function() {
      var html = '<a class="read-more" href="#">Read More...</a>';
      var text = 'Read More...';
      var elem = angular.element(html);
      expect(elem.text()).toBe(text);
    });
  });
})();
