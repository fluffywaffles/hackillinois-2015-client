angular.module('jig')
.service('jigger-rig', ['$rootScope', function($rootScope) {
  var _self = this;

  this.baseRig = function () { return angular.element('<div jig-rig></div>'); }
  this.baseEditBlock = function() { return angular.element('<input type="text">'); }
  this.baseEditBlock.model = function(el, prop) {
    var tag = el.prop('tagName').toLowerCase();
    var type = tag == 'input' && el.attr('type') ? '[' + el.attr('type') + ']' : '';
    var modelKey = [tag + type, angular.element(tag).index(el), prop].join('.');
    var editBlock = _self.baseEditBlock()
                      .attr('value', prop == 'text' ? el.text() : el.attr(prop));
    console.log($rootScope);
    editBlock.on('input',
                 $rootScope.bodyModelUpdater(modelKey));
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
    // wait for DOM to attach before animating
    setTimeout(function() {
      rig.addClass('anim').addClass('anim-open')
    }, 100);
  }
}]);
