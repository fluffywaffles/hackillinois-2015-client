angular.module('jig')
.controller('jigger-controller', ['$rootScope', '$scope', 'jigger-factory',  'jigger-rigger', function($rootScope, $scope, jiggerFactory, jiggerRigger) {
  // NOTE(jordan): must track: underlying body model, currently edited field, various others
  $rootScope.bodyModel = {
    'h1.0.text': 'Hello!',
    'p.0.text': 'This is some basic filler text...',
    'input[text].0.placeholder': 'put stuff here!'
  };

  $rootScope.bodyModelUpdater = function(key) {
    return function(e) {
      $rootScope.$apply(function () {
        $rootScope.bodyModel[key] = e.target.value;
      });
    }
  }

  // NOTE(jordan): wait a few millis for the template to render
  setTimeout(function() {
    jiggerRigger.rig(angular.element('*[jig-placeholder],*[jig-text]'))
  }, 200);
}]);
