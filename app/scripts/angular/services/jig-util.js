angular.module('jig')
.service('jig-util', function () {
  var _self = this;

  this.modelKeyIndex = function (ael, doc) {
    console.log(ael);
    var tag = ael.prop('tagName').toLowerCase();
    var type = tag == 'input' ? '[' + ael.attr('type') + ']' : '';
    var jigAttr = (ael.attr('jig-text') || ael.attr('jig-placeholder'));
    var index = jigAttr.split('.').slice(1)[0];
    return [tag + type, index].join('.');
  }

  this.modelKey = function (ael, prop) {
    return _self.modelKeyIndex(ael) + '.' + prop;
  }
});
