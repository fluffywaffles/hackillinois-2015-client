angular.module('jig')
.controller('jigger-controller', ['$scope', 'jigger-factory', '$sce', '$compile', function($scope, jiggerFactory, $sce, $compile) {

  $scope.beginEditing = function(e) {
    var ael = angular.element(e.target);
    var rig = ael.next().addClass('anim anim-open');
    ael.addClass('hide');
    ael.off('click');
  };

  $scope.endEditing = function(e) {
    // TODO(jordan): modularize this ugly set of operations
    var ael = angular.element(e.target);
    var editBtn = ael.parent().removeClass('anim-open').removeClass('anim')
    .prev().removeClass('hide');
    editBtn.click($scope.beginEditing);
  };

  jiggerFactory.generateDoc('http://nuvc.nuisepic.com/')
  .done(function( data ) {
    console.log(data);
    $scope.$apply(function() {
      $scope.doc = data;
      $scope.doc.body = $sce.trustAsHtml($scope.doc.body);
    });

    var jiggerables = angular.element('#jigger-doc').find('*[jiggerable]');

    angular.forEach(jiggerables, function(jiggerable) {
      jiggerable = angular.element(jiggerable);
      jiggerable.html($compile(jiggerable)($scope));
    });

    $('.jigger-edit').click($scope.beginEditing);
  });

  $scope.modelKeys = {};
  $scope.compiled  = "loading...";

}]);
