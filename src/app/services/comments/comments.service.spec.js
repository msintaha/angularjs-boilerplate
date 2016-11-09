(function() {
  'use strict';

  describe('Comment Service', function() {
    var commentService, $httpBackend, $window, headers, authService, fetchedVal, credentials;

    beforeEach(module('madkoffeeFrontend'));
    beforeEach(inject(function(_commentService_, _$httpBackend_, _$window_, _authService_) {
      commentService = _commentService_;
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
      expect(commentService).not.toEqual(null);
    });

    describe('.getComments', function() {
      it('should return an array of all the comments', function() {
        $httpBackend.expectGET('http://madkoffee.com/wp-json/wp/v2/comments').respond(200, [{"id": 1}]);
        commentService.getComments().then(function(data) {
          expect(data.length).toBeGreaterThan(0);
          expect(data[0]).toEqual({id: 1});
        });
        $httpBackend.flush();
      });
    });

    describe('.getComment', function() {
      it('should return a single comment', function() {
        $httpBackend.expectGET('http://madkoffee.com/wp-json/wp/v2/comments/1').respond(200, [{"id": 1}]);
        commentService.getComment(1).then(function(data) {
          expect(data.length).toBeGreaterThan(0);
          expect(data[0]).toEqual({id: 1});
        });
        $httpBackend.flush();
      });
    });

    describe('.getPostComments', function() {
      it('should return comments for a given post', function() {
        $httpBackend.expectGET('http://madkoffee.com/wp-json/wp/v2/comments?post=1').respond(200, [{"id": 1, "post": 1}]);
        commentService.getPostComments(1).then(function(data) {
          expect(data.length).toBeGreaterThan(0);
          expect(data[0]).toEqual({id: 1, post: 1});
        });
        $httpBackend.flush();
      });
    });

    describe('.addComment', function() {
      it('should create a comment', function() {
        var url = 'http://madkoffee.com/wp-json/wp/v2/comments',
            data = _encoder({'content': 'test'});
        $httpBackend.expectPOST(url, data, headers).respond(201, [{'content':{'rendered': '<p>test</p>\n'}}]);
        commentService.addComment(data).then(function(data) {
          expect(data.length).toEqual(1);
          expect(data[0]).toEqual({content:{rendered: '<p>test</p>\n'}});
        });
       $httpBackend.flush();
      });
    });

    describe('.editComment', function() {
      it('should edit a comment', function() {
        var url = 'http://madkoffee.com/wp-json/wp/v2/comments/4',
            data = _encoder({'content': {rendered:'<p>Test</p>'}});
        $httpBackend.expectPUT(url, data, headers).respond(200, [{'content':{'rendered':'<p>Test</p>\n'}}]);
        commentService.editComment(4, data).then(function(data) {
          expect(data.length).toEqual(1);
          expect(data[0]).toEqual({content: {rendered: '<p>Test</p>\n'}});
        });
       $httpBackend.flush();
      });
    });

    describe('.deleteComment', function() {
      it('should delete a comment', function() {
        var url = 'http://madkoffee.com/wp-json/wp/v2/comments/4';
        $httpBackend.expectDELETE(url, headers).respond(200);
        commentService.deleteComment(4).then(function(data) {
          expect(data).toBeUndefined();
        });
       $httpBackend.flush();
      });
    });
  });
})();
