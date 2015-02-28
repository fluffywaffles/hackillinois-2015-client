angular.module('jig')
.service('jigger-rig', ['$rootScope', function($rootScope) {
  var _self = this;

  this.baseRig = function () { return angular.element('<div jig-rig></div>'); }
  this.baseEditBlock = function() { return angular.element('<input type="text">'); }
  this.baseEditBlock.model = function(el, prop) {
    var tag = el.prop('tagName').toLowerCase();
    var modelKey = [tag, angular.element(tag).index(el), prop].join('.');
    var editBlock = _self.baseEditBlock()
                      .attr('value', prop == 'text' ? el.text() : el.attr(prop));
/*    $rootScope.$watch(editBlock.value,
                      $rootScope.bodyModelUpdater($rootScope.bodyModel[modelKey]));*/
    return editBlock;
  }

  this.constructRig = function(ael) {
    var rig = _self.baseRig();
    if(ael.attr('jig-text') === '')
      //text
      rig.append(_self.baseEditBlock.model(ael, 'text'));

    if(ael.attr('jig-placeholder') === '')
      //placeholder
      rig.append(_self.baseEditBlock.model(ael, 'placeholder'));

    return rig;
  }

  this.open = function(ael) {
    var rig = _self.constructRig(ael.prev());
    ael.after(rig);
    setTimeout(function() {
      rig.addClass('anim').addClass('anim-open')
    }, 200);
  }
}]);
