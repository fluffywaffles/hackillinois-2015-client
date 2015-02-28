angular.module('jig')
.directive('jigText', ['$compile', function ($compile) {
  return {
    transclude: true,
    template: '<ng-transclude>',
    link: function($scope, $element, $attrs) {
      $element.append($compile('<jig-rig>')($scope));
      $element.append($compile('<jig-edit>')($scope));
    }
  };
}]);
