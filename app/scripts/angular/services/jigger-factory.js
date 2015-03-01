angular.module('jig')
.factory('jigger-factory', ['$http','localStorageService', function($http, localStorageService) {
  var root = {};

  root.appRootURI = 'http://jig.herokuapp.com/';

  root.generateDoc = function(url) {
    // NOTE(jordan): angular doesn't use x-www-form-urlencoded by default; jquery does
    if (localStorageService.get(url)) {
      return  { done: function(f) { f(localStorageService.get(url)) } };
    } else {
      return $.ajax({
        type: 'POST',
        url: root.appRootURI + 'jigger/',
        data: {url: url}});
    }
  };

  return root;
}]);
