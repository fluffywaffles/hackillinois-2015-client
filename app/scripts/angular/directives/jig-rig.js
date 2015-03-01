angular.module('jig')
.directive('jigRig', ['$compile', 'jig-util', function ($compile, jigUtil) {
  return {
    restrict: 'E',
    templateUrl: 'templates/jig-rig.html',
/*    compile: function($element, $attrs) {
      console.log($element.parent());
      console.log('compile', $element);
      console.log('compile', $attrs);
    },*/
    link: function($scope, $element, $attrs) {
      console.log('rig', $element, $scope);
      console.log($element.prev().prev());
      var parentJiggerable = $element.prev().prev();
      var modelKeyIndex = jigUtil.modelKeyIndex(parentJiggerable);

      console.log(modelKeyIndex);
      $scope.modelKeys[modelKeyIndex].forEach(function(modelKey) {
        $element.prepend($compile('<jig-edit modelKey=' + modelKey + '>')($scope));
      });
    }
  };
}]);
