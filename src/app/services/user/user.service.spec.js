(function() {
  'use strict';

  describe('User Service', function() {
    var userService, $httpBackend, $window, headers, authService, fetchedVal, credentials;

    beforeEach(module('madkoffeeFrontend'));
    beforeEach(inject(function(_userService_, _$httpBackend_, _$window_, _authService_) {
      userService = _userService_;
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
      expect(userService).not.toEqual(null);
    });

    describe('.getUsers', function() {
      it('should get an array of users', function () {
         $httpBackend.expectGET("http://madkoffee.com/wp-json/wp/v2/users").respond(200, [{"id":36},{"id":36}]);
         userService.getUsers().then(function(data) {
           expect(data.length).toBeGreaterThan(1);
           expect(data[0]).toEqual({id: 36});
         });
         $httpBackend.flush();
      });
    });

    describe('.getUser', function() {
      it('should get a user object', function () {
         $httpBackend.expectGET("http://madkoffee.com/wp-json/wp/v2/users/3").respond(200, [{"id":3}]);
         userService.getUser(3).then(function(data) {
           expect(data.length).toEqual(1);
           expect(data[0]).toEqual({id: 3});
         });
         $httpBackend.flush();
      });
    });

    describe('.addUser', function() {
      it('should create a new user', function() {
        var url = 'http://madkoffee.com/wp-json/wp/v2/users',
            data = _encoder({'name': 'testname'});
        $httpBackend.expectPOST(url, data, headers).respond(201, [{'name': 'testname'}]);
        userService.addUser(data).then(function(data) {
          expect(data.length).toEqual(1);
          expect(data[0]).toEqual({'name': 'testname'});
        });
       $httpBackend.flush();
      });
    });

    describe('.editUser', function() {
      it('should edit user information', function() {
        var url = 'http://madkoffee.com/wp-json/wp/v2/users/3',
            data = _encoder({'name': 'mono'});
        $httpBackend.expectPUT(url, data, headers).respond(200, [{'name': 'mono'}]);
        userService.editUser(3, data).then(function(data) {
          expect(data.length).toEqual(1);
          expect(data[0]).toEqual({'name': 'mono'});
        });
       $httpBackend.flush();
      });
    });

    describe('.deleteUser', function() {
      it('should delete a user', function() {
        var url = 'http://madkoffee.com/wp-json/wp/v2/users/3';
        $httpBackend.expectDELETE(url, headers).respond(200);
        userService.deleteUser(3).then(function(data) {
          expect(data).toBeUndefined();
        });
       $httpBackend.flush();
      });
    });
  });
})();
