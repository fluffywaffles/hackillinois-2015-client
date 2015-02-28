angular.module('jig')
.controller('jigger-controller', ['$scope', 'jigger-factory',  'jigger-rigger', function($scope, jiggerFactory, jiggerRigger) {
  // NOTE(jordan): must track: underlying body model, currently edited field, various others
  $scope.bodyModel = {
    'h1.0.text': 'Hello!',
    'p.0.text': 'This is some basic filler text...',
    'input[text].0.placeholder': 'put stuff here!'
  };

  $scope.bodyModelUpdater = function(key) {
    console.log('please?');
    return function(val) {
      $scope.$apply(function() {
        $scope.bodyModel[key] = val;
      });
    }
  }

  setTimeout(function() {
    jiggerRigger.rig(angular.element('*[jig-placeholder],*[jig-text]'))
  }, 200);
}]);
