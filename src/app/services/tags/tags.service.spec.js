(function() {
  'use strict';

  describe('Tag Service', function() {
    var tagService, $httpBackend, $window, headers, authService, fetchedVal, credentials;

    beforeEach(module('madkoffeeFrontend'));
    beforeEach(inject(function(_tagService_, _$httpBackend_, _$window_, _authService_) {
      tagService = _tagService_;
      $httpBackend = _$httpBackend_;
      $window = _$window_;
      authService = _authService_;
      credentials = {
        username : 'mifta',
        password : 'nothingmuch'
      };
      authService.login(credentials);
      spyOn(authService, 'getCredentials').and.returnValue(credentials);
      fetchedVal = authService.getCredentials();
      headers = {
            'Authorization': 'Basic ' + $window.btoa(credentials.username+':'+credentials.password),
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json, text/plain, */*'
          };
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    function _encoder(obj) {
      var str = [];
      for(var p in obj) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }

      return str.join('&');
    }

    it("verify if the spy was called", function() {
      expect(authService.getCredentials).toHaveBeenCalled();
    });

    it("return proper value from the spy", function() {
      expect(fetchedVal).toEqual(credentials);
    });

    it('should be registered', function() {
      expect(tagService).not.toEqual(null);
    });

    describe('.getTags', function() {
      it('should get an array of tags', function() {
        $httpBackend.expectGET("http://madkoffee.com/wp-json/wp/v2/tags").respond(200, [{"id": 116}]);
        tagService.getTags(1).then(function(data) {
          expect(data.length).toEqual(1);
          expect(data[0]).toEqual({id: 116});
        });
        $httpBackend.flush();
      });
    });

    describe('.getTag', function() {
      it('should get a tag object', function() {
        $httpBackend.expectGET("http://madkoffee.com/wp-json/wp/v2/tags/116").respond(200, [{"id": 116}]);
        tagService.getTag(116).then(function(data) {
          expect(data.length).toEqual(1);
          expect(data[0]).toEqual({id: 116});
        });
        $httpBackend.flush();
      });
    });

    describe('.addTag', function() {
      it('should create a new tag', function() {
        var url = 'http://madkoffee.com/wp-json/wp/v2/tags',
            data = _encoder({'name': 'testname'});
        $httpBackend.expectPOST(url, data, headers).respond(201, [{'name': 'testname'}]);
        tagService.addTag(data).then(function(data) {
          expect(data.length).toEqual(1);
          expect(data[0]).toEqual({'name': 'testname'});
        });
       $httpBackend.flush();
      });
    });

    describe('.editTag', function() {
      it('should edit a tag', function() {
        var url = 'http://madkoffee.com/wp-json/wp/v2/tags/47',
            data = _encoder({'name': 'sad'});
        $httpBackend.expectPUT(url, data, headers).respond(200, [{'name': 'sad'}]);
        tagService.editTag(47, data).then(function(data) {
          expect(data.length).toEqual(1);
          expect(data[0]).toEqual({'name': 'sad'});
        });
       $httpBackend.flush();
      });
    });

    describe('.deleteTag', function() {
      it('should delete a tag', function() {
        var url = 'http://madkoffee.com/wp-json/wp/v2/tags/47';
        $httpBackend.expectDELETE(url, headers).respond(200);
        tagService.deleteTag(47).then(function(data) {
          expect(data).toBeUndefined();
        });
       $httpBackend.flush();
      });
    });
  });
})();
