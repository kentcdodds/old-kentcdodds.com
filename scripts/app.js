(function() {
  var app = angular.module('kent', []);
  app.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    console.log('hello');
    console.log($routeProvider);
    $routeProvider.
    when('/about', {
      templateUrl: './views/about.html'
    }).
    when('/projects', {
      templateUrl: './views/projects.html'
    }).
    when('/blog', {
      templateUrl: './views/blog.html'
    }).
    when('/contact', {
      templateUrl: './views/contact.html'
    }).
    otherwise({redirectTo: '/'});
    console.log('hello2');
  });
})();
