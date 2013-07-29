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
  
  var addGAToAllAnchorTags = function() {
    var anchors = $('a');
    anchors.each(function() {
      $(this).attr('ga', '');
    });
  };

  app.run(function($window, $rootScope) {
    setupOnlineListener($window, $rootScope);
    setTimeout(addGAToAllAnchorTags, 1000); //Yeah, I know, it's really lame...
    //I did it because I didn't want to rewrite the ng-include directive...
  });
})();
