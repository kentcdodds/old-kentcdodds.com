'use strict';
(function() {
  var app = angular.module('resume', ['ga']);
  app.config(function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
  });
})();
