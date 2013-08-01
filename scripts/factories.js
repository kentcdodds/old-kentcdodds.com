'use strict';
(function() {
  var app = angular.module('kent');
  
  app.factory('Gists', function($http, $rootScope) {
    var listUrl = 'https://api.github.com/users/kentcdodds/gists';
    return {
      list: function() {
        return $http.get(listUrl);
      }
    }
  });
})();