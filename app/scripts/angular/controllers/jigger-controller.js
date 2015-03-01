angular.module('jig')
.controller('jigger-controller', ['$scope', 'jigger-factory', function($scope, jiggerFactory) {
  // NOTE(jordan): must track: underlying body model, currently edited field, various others
  $scope.bodyModel = {
    'h1.0.text': 'Hello!',
    'p.0.text': 'This is some basic filler text...',
    'input[text].0.placeholder': 'put stuff here!'
  };

  $scope.dismiss = function(e) {
    // TODO(jordan): modularize this ugly set of operations
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
