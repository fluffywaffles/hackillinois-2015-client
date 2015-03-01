angular.module('jig')
.controller('jigger-controller', ['$rootScope', '$scope', 'jigger-factory',  'jigger-rigger', 'jig-util', function($rootScope, $scope, jiggerFactory, jiggerRigger, jigUtil) {
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

  $scope.dismiss = function(e) {
    var ael = angular.element(e.target);
    var editBtn = ael.parent().removeClass('anim-open').removeClass('anim')
                     .prev().removeClass('hide');
    editBtn.click(function(e) {
      var ael = angular.element(e.target);
      ael.next().addClass('anim').addClass('anim-open');
      ael.addClass('hide');
    });
  }

  $scope.modelKeys = {};

}]);
