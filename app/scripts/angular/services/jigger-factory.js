angular.module('jig')
.factory('jigger-factory', ['$http', function($http) {
  var root = {};

  root.appRootURI = 'jig.herokuapp.com/jigger/';

  root.requestDoc = function(docId) {
    return $http.get(root.appRootURI + docId);
  };

  root.generateDoc = function(url) {
    return $http.post(root.appRootURI, url);
  };

  return root;
}]);
