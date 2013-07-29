'use strict';

angular.module('ga', [])
    .factory('ga', ['$window', '$rootScope', '$location', function ($window, $rootScope, $location) {

        var ga = function() {
            if (angular.isArray(arguments[0])) {
                for(var i = 0; i < arguments.length; ++i) {
                    ga.apply(this, arguments[i]);
                }
                return;
            }
            if ($window.ga) {
                $window.ga.apply(this, arguments);
            }
        }

        $rootScope.$on('$routeChangeStart', function() {
            ga('set', 'page', $location.url());
        });


        return ga;
    }])

    /**
      ga="'send', 'event', 'test'" ga-on="click|hover|init"
      */
    .directive('ga', ['ga', function(ga) {
        return {
          restrict: 'A',
          scope: false,
          link: function($scope, $element, $attrs) {
            var bindToEvent = $attrs.gaOn || 'click',
                command = $attrs.ga;

            var onEvent = function() {
                if (command) {
                    if (command[0] === '\'') command = '[' + command + ']';

                    command = $scope.$eval(command);
                } else {
                    // auto command
                    var href = $element.attr('href');
                    if (href && href === '#') href = '';
                    var category = href && href[0] !== '#' ? (href.match(/\/\//) ? 'link-out' : 'link-in') : 'button',
                        action = href ? href : 'click',
                        label = ($element[0].tagName.match(/input/i) ? $element.attr('value') : $element.text()).substr(0, 64);
                    command = ['send', 'event', category, action, label];
                }
                ga.apply(null, command);
            }

            if (bindToEvent === 'init') {
                onEvent();
            } else {
                $element.bind(bindToEvent, onEvent);
            }
          }
        };
      }]);

