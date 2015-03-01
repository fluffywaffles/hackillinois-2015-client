angular.module('jig')
.controller('jigger-controller', ['$scope', 'jigger-factory', '$sce', '$compile', function($scope, jiggerFactory, $sce, $compile) {
  jiggerFactory.generateDoc('http://nuvc.nuisepic.com/')
  .done(function( data ) {
    console.log(data);
    $scope.$apply(function() {
      $scope.doc = data;
      $scope.doc.body = $sce.trustAsHtml($scope.doc.body);
    });
    var doc = angular.element('#jigger-doc');
    doc.html($compile(doc.contents())($scope));
  });

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
