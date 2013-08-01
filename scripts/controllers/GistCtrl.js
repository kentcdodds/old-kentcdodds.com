'use strict';
(function() {
  var app = angular.module('kent');
  app.controller('GistCtrl', function($scope, Gists) {
    Gists.list().success(function(data) {
      $scope.gists = data;
    });
  });
})();