'use strict';
(function() {
  var app = angular.module('kent');

  app.directive('shortcut', function() {
    return {
      restrict: 'A',
      scope: true,
      link: function postLink(scope, iElement, iAttrs) {
        if (scope.keyUp) {
          $(document).on('keyup', function(e) {
              scope.$apply(scope.keyUp(e));
          });
        }
      }
    };
  });
})();