angular.module('jig')
.controller('jigger-controller', ['$scope', 'jigger-factory', '$sce', '$compile', '$localStorage', function($scope, jiggerFactory, $sce, $compile, $localStorage) {

  $scope.beginEditing = function(e) {
    var ael = angular.element(e.target);
    var rig = ael.next('jig-rig');
    rig = rig.length > 0 ? rig : ael.parent().next('jig-rig');
    rig.addClass('anim anim-open');
    ael.addClass('hide');
    ael.off('click');
  };

  $scope.endEditing = function(e) {
    // TODO(jordan): modularize this ugly set of operations
    var ael = angular.element(e.target);
    var editBtn = ael.parent().removeClass('anim-open').removeClass('anim')
    .prev('.jigger-edit').removeClass('hide');
    editBtn.click($scope.beginEditing);

    console.warn('Update localstorage');
    $localStorage[$scope.currentUrl] = $scope.doc.model;
    //console.warn($localStorage[$scope.currentUrl]);
  };

  //http://swirlycheetah.com/native-bind-once-in-angularjs-1-3/
  $scope.currentUrl = 'http://bettermotherfuckingwebsite.com';//'http://swirlycheetah.com/native-bind-once-in-angularjs-1-3/';

  jiggerFactory.generateDoc($scope.currentUrl)
  .done(function( data ) {

    $scope.doc = data;
    $scope.doc.body = $sce.trustAsHtml($scope.doc.body);

    //console.warn($localStorage[$scope.currentUrl]);
    if($localStorage[$scope.currentUrl])
      $scope.doc.model = $localStorage[$scope.currentUrl];
    else
      $localStorage[$scope.currentUrl] = $scope.doc.model;

    $scope.$apply();

    $compile(angular.element('#jigger-doc').contents())($scope);

    $('.jigger-edit').click($scope.beginEditing);
  });

  $scope.modelKeys = {};
  $scope.compiled  = "loading...";


}]);
