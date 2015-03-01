angular.module('jig')
.directive('jigEdit', ['jig-util', function (jigUtil) {
  return {
    restrict: 'E',
    templateUrl: 'templates/jig-edit.html',
    scope: true,
    link: function ($scope, $element, $attrs) {
      var modelkey = $attrs.modelkey.valueOf();
      $scope.model = function() {
          return $scope.modelKeys[modelkey.split('.')
                                   .reverse()
                                   .slice(1)
                                   .reverse()
                                   .join('.')]
      }
    }
  }
}]);
