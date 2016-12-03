(function() {
  'use strict';

  describe('Uppercase Filter', function() {
    beforeEach(module('appFrontend'));

    it('should convert input string to uppercase', inject(function(uppercaseFilter) {
      var str = 'hello';
      expect(uppercaseFilter(str)).toEqual('HELLO');
    }));

    it('should return for non-strings', inject(function(uppercaseFilter) {
      var str = 123;
      expect(uppercaseFilter(str)).toBeUndefined();
    }));
  });
})();
