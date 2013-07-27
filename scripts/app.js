'use strict';
(function() {
  var app = angular.module('kent', []);
  app.config(function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/about', {
      templateUrl: './views/about.html'
    }).
    when('/projects', {
      templateUrl: './views/projects.html',
      controller: 'ProjectsCtrl'
    }).
    when('/blog', {
      templateUrl: './views/blog.html'
    }).
    when('/contact', {
      templateUrl: './views/contact.html',
      controller: 'ContactCtrl'
    }).
    otherwise({redirectTo: '/'});
  });
})();
