(function() {
  'use strict';

  describe('Media Service', function() {
    var mediaService, $httpBackend, $window, headers, authService, fetchedVal, credentials;

    beforeEach(module('madkoffeeFrontend'));
    beforeEach(inject(function(_mediaService_, _$httpBackend_, _$window_, _authService_) {
      mediaService = _mediaService_;
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
      expect(mediaService).not.toEqual(null);
    });

    describe('.getImages', function() {
      it('should get an array of images', function() {
        $httpBackend.expectGET("http://madkoffee.com/wp-json/wp/v2/media").respond(200, [{"id": 1927}, {"id": 1926}]);
        mediaService.getImages().then(function(data) {
          expect(data.length).toBeGreaterThan(1);
          expect(data[0]).toEqual({id: 1927});
        });
        $httpBackend.flush();
      });
    });

    describe('.getImage', function() {
      it('should get an image object', function() {
        $httpBackend.expectGET("http://madkoffee.com/wp-json/wp/v2/media/1927").respond(200, [{"id": 1927}]);
        mediaService.getImage(1927).then(function(data) {
          expect(data.length).toEqual(1);
          expect(data[0]).toEqual({id: 1927});
        });
        $httpBackend.flush();
      });
    });

    describe('.addImage', function() {
      it('should create a media object', function() {
        var url = 'http://madkoffee.com/wp-json/wp/v2/media',
            data = _encoder({'caption': 'test'});
        $httpBackend.expectPOST(url, data, headers).respond(201, [{'caption': 'test'}]);
        mediaService.addImage(data).then(function(data) {
          expect(data.length).toEqual(1);
          expect(data[0]).toEqual({'caption': 'test'});
        });
       $httpBackend.flush();
      });
    });

    describe('.editImage', function() {
      it('should edit a media object', function() {
        var url = 'http://madkoffee.com/wp-json/wp/v2/media/1927',
            data = _encoder({'caption': 'blah'});
        $httpBackend.expectPUT(url, data, headers).respond(200, [{'caption': 'blah'}]);
        mediaService.editImage(1927, data).then(function(data) {
          expect(data.length).toEqual(1);
          expect(data[0]).toEqual({'caption': 'blah'});
        });
       $httpBackend.flush();
      });
    });

    describe('.deleteImage', function() {
      it('should delete a media object', function() {
        var url = 'http://madkoffee.com/wp-json/wp/v2/media/1927';
        $httpBackend.expectDELETE(url, headers).respond(200);
        mediaService.deleteImage(1927).then(function(data) {
          expect(data).toBeUndefined();
        });
       $httpBackend.flush();
      });
    });
  });
})();
