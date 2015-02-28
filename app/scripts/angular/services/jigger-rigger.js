angular.module('jig')
.service('jigger-rigger', ['jigger-rig', function(jiggerRig) {
  var jiggerEditHTML = '<i class="fa fa-pencil jigger-edit">';

  var _self = this;

  this.expandRig = function(el) {
    jiggerRig.open(el);
  };

  this.rig = function(riggables) {
    riggables.addClass('jigger-rigged').after(jiggerEditHTML);
    riggables.next().click(function(e) {
      _self.expandRig(angular.element(e.target));
      angular.element(this).addClass('hide');
    });
  }
}]);
