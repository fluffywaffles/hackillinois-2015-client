angular.module('jig')
.directive('jigRig', function () {
  return {
    restrict: 'A',
    templateUrl: 'templates/jig-rig.html',
    transclude: true,
    scope: false,
    link: function($scope, $element, $attrs) {
      console.log($scope);
      console.log($element);
      console.log($attrs);
    }
  };
});
