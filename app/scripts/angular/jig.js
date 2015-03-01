angular.module('jig', ['LocalStorageModule'])
.config(function (localStorageServiceProvider) {
  localStorageServiceProvider.setPrefix('jig');
});
