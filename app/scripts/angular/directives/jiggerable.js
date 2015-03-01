angular.module('jig')
.directive('jiggerable', ['$compile', 'jig-util','$sce', function ($compile, jigUtil, $sce) {
  return {
    restrict: 'A',
    transclude: true,
    scope: true,
    template: '<ng-transclude ng-bind="textContent()"></ng-transclude>',
    link: function ($scope, $element, $attrs) {
      var tagIndex = jigUtil.modelKeyIndex($element, $scope.doc.body.valueOf());
      $scope.modelKeys[tagIndex] = [];

      $scope.htmlContent = function () {
        console.log($scope.doc.model[tagIndex + '.text']);
        return $sce.trustAsHtml($scope.doc.model[tagIndex + '.text']);
      }

      $scope.textContent = function () {
        return $scope.doc.model[tagIndex + '.text'];
      };

      angular.forEach(Object.keys($attrs).filter(function (attr) {
        return attr.indexOf('jig') == 0 && attr != 'jiggerable';
      }), function (jigAttr) {
        jigAttr = $attrs[jigAttr];
        $scope.modelKeys[tagIndex].push(jigAttr);
      });

      $element.addClass('jigger-rigged');

      $element.after($compile('<jig-rig>')($scope));

      var editBtn = angular.element('<i></i>')
                           .addClass('fa fa-pencil jigger-edit');
      editBtn.click(function (e) {
        // NOTE(jordan): this piece of crap is outside of $scope so... fuck
        var ael = angular.element(e.target);
        ael.closest('jig-rig').addClass('anim').addClass('anim-open');
        ael.off('click');
        ael.addClass('hide');
      });
      $element.after(editBtn);
    }
  };
}]);
