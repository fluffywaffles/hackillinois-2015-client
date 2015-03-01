angular.module('jig')
.factory('jigger-factory', ['$http', function($http) {
  var root = {};

  root.appRootURI = 'http://jig.herokuapp.com/';

  root.requestDoc = function(docId) {
    return $.get(root.appRootURI + docId);
  };

  root.generateDoc = function(url) {
    // NOTE(jordan): angular doesn't use x-www-form-urlencoded by default; jquery does
    return $.ajax({
      type: 'POST',
      url: root.appRootURI + 'jigger/',
      data: {url: url}});
  };

  return root;
}]);
