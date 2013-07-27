'use strict';
(function() {
  var app = angular.module('kent', []);
  app.config(function($routeProvider, $locationProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
  });
})();
