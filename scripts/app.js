'use strict';
(function() {
  var app = angular.module('kent', ['ga']);
  app.config(function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
  });
  
  var setupOnlineListener = function($window, $rootScope) {
    $rootScope.online = navigator.onLine;
    $window.addEventListener("offline", function () {
      $rootScope.$apply(function() {
        $rootScope.online = false;
      });
    }, false);
    $window.addEventListener("online", function () {
      $rootScope.$apply(function() {
        $rootScope.online = true;
      });
    }, false);
  };

  app.run(function($window, $rootScope) {
    setupOnlineListener($window, $rootScope);
  });
})();
