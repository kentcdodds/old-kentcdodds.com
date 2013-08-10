'use strict';
(function() {
  var app = angular.module('resume');

  app.controller('MainCtrl', function($scope, resumeValues) {
    $scope.ie = (navigator.appName === 'Microsoft Internet Explorer');
    angular.extend($scope, resumeValues);
  });
})();