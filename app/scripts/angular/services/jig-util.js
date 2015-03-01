angular.module('jig')
.service('jig-util', function () {
  var _self = this;

  this.modelKeyIndex = function (ael) {
    var tag = ael.prop('tagName').toLowerCase();
    var type = tag == 'input' ? '[' + ael.attr('type') + ']' : '';
    var index = angular.element(tag).index(ael);
    return [tag + type, index].join('.');
  }

  this.modelKey = function (ael, prop) {
    return _self.modelKeyIndex(ael) + '.' + prop;
  }
});
