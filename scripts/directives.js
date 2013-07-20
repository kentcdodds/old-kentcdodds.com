(function() {
  var app = angular.module('kent');

  app.directive('shortcut', function() {
    return {
      restrict: 'A',
      replace: true,
      scope: true,
      link: function postLink(scope, iElement, iAttrs) {
        if (scope.keyUp) {
          jQuery(document).on('keyup', function(e) {
              scope.$apply(scope.keyUp(e));
          });
        }
      }
    };
  });

  
  // app.directive('kTile', function() {
  //   return {
  //     templateUrl: './views/directives/kTile.html',
  //     replace: false,
  //     transclude: false,
  //     restrict: 'EA',
  //     controller: ["$scope", "$element", "$attrs", "$transclude", "otherInjectables",
  //       function($scope, $element, $attrs, $transclude) {
          
  //       }
  //     ],
  //     compile: function compile(tElement, tAttrs, transclude) {
  //       return {
  //         pre: function preLink(scope, iElement, iAttrs, controller) {
            
  //         },
  //         post: function postLink(scope, iElement, iAttrs, controller) {
            
  //         }
  //       }
  //     },
  //     link: function postLink(scope, iElement, iAttrs) { 
  //     }
  //   };
  // });
  
})();