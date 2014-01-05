/**
 * uxGenie.js @license
 * (c) 2013 Kent C. Dodds
 * uxGenie.js may be freely distributed under the MIT license.
 * http://www.github.com/kentcdodds/ux-genie
 * See README.md
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['./genie'], factory);
  } else {
    root.genieUx = factory(genie);
  }
}(this, function(genie) {

  var uxGenie = angular.module('uxGenie', []);

  uxGenie.constant('genie', genie);

  uxGenie.directive('uxLamp', ['genie', '$timeout', '$document', function(genie, $timeout, $document) {
    var states = {
      userEntry: 'userentry',
      subContext: 'subcontext'
    }
    return {
      replace: true,
      template: function(el, attr) {
        var ngShow = ' ng-show="lampVisible"';
        if (attr.rubClass) {
          ngShow = '';
        }
        return ['<div class="genie-container"' + ngShow + '>',
          '<input type="text" ng-model="genieInput" class="lamp-input input form-control" />',
          '<div ng-show="matchingWishes.length > 0" class="genie-wishes">',
          '<div class="genie-wish wish-{{wish.id}}" ' +
            'ng-repeat="wish in matchingWishes" ' +
            'ng-class="{focused: focusedWish == wish}" ' +
            'ng-click="makeWish(wish)" ' +
            'ng-mouseenter="focusOnWish(wish, false)">',
          '<img ng-if="wish.data.uxGenie.imgIcon" ng-src="{{wish.data.uxGenie.imgIcon}}">',
          '<i ng-if="wish.data.uxGenie.iIcon" class="{{wish.data.uxGenie.iIcon}}"></i>',
          '{{wish.data.uxGenie.displayText || wish.magicWords[0]}}',
          '</div></div></div>'].join('');
      },
      scope: {
        lampVisible: '=?',
        rubClass: '@',
        rubShortcut: '@',
        rubModifier: '@',
        rubEventType: '@',
        wishCallback: '&?',
        localStorage: '=?'
      },
      link: function(scope, el, attr) {
        scope.genieInput = '';
        scope.state = states.userEntry;

        var mathResultId = 'ux-genie-math-result';
        var startTextForSubContext = null;
        var inputEl = angular.element(el.children()[0]);
        var genieOptionContainer = angular.element(el.children()[1]);
        var rubShortcut = scope.rubShortcut || '32';
        var rubModifier = scope.rubModifier || 'ctrlKey';
        var saveToLocalStorage = function() {};

        rubShortcut = parseInt(rubShortcut, 10);
        if (isNaN(rubShortcut)) {
          rubShortcut = rubShortcut[0].charCodeAt(0);
        }

        scope.lampVisible = false;

        function toggleVisibility() {
          scope.$apply(function() {
            scope.lampVisible = !scope.lampVisible;
          });
        }

        // Wish focus
        scope.focusOnWish = function(wishElement, autoScroll) {
          scope.focusedWish = wishElement;
          if (scope.focusedWish && autoScroll) {
            scrollToWish(scope.matchingWishes.indexOf(wishElement));
          }
        };

        function scrollToWish(index) {
          var containerHeight = genieOptionContainer[0].offsetHeight || genieOptionContainer[0].clientHeight;
          var focusedWishElement = genieOptionContainer.children()[index];
          var containerTop = genieOptionContainer[0].scrollTop;
          var containerBottom = containerTop + containerHeight;
          var focusedWishTop = 0;
          angular.forEach(genieOptionContainer.children(), function(child, childIndex) {
            if (childIndex < index) {
              focusedWishTop += child.offsetHeight || child.clientHeight;
            }
          });
          var focusedWishBottom = focusedWishTop + focusedWishElement.offsetHeight || focusedWishElement.clientHeight;
          if (containerBottom < focusedWishBottom) {
            genieOptionContainer[0].scrollTop = focusedWishBottom - containerHeight;
          } else if (containerTop > focusedWishTop) {
            genieOptionContainer[0].scrollTop = focusedWishTop;
          }
        }

        // Document events
        $document.bind('click', function(event) {
          // If it's not part of the lamp, then make the lamp inlampVisible.
          var clickedElement = event.srcElement || event.target;
          if (clickedElement === el[0]) {
            return;
          }
          var children = el.children();
          for (var i = 0; i < children.length; i++) {
            if (clickedElement === children[i]) {
              return;
            }
          }

          scope.$apply(function() {
            scope.lampVisible = false;
          });
        });

        $document.bind(scope.rubEventType || 'keydown', function(event) {
          if (event.keyCode === rubShortcut) {
            if (rubModifier) {
              if (event[rubModifier]) {
                event.preventDefault();
                toggleVisibility();
              }
            } else {
              event.preventDefault();
              toggleVisibility();
            }
          }
        });

        $document.bind('keydown', function(event) {
          if (event.keyCode === 27 && scope.lampVisible) {
            event.preventDefault();
            scope.$apply(function() {
              scope.lampVisible = false;
            });
          }
        });

        // Input events
        inputEl.bind('keydown', (function() {
          var changeSelection = function(change, event) {
            if (scope.matchingWishes && change) {
              if (event) {
                event.preventDefault();
              }
              var index = scope.matchingWishes.indexOf(scope.focusedWish);
              var newIndex = index + change;
              if (newIndex < 0) {
                newIndex = newIndex + scope.matchingWishes.length;
              } else if (newIndex >= scope.matchingWishes.length) {
                newIndex = newIndex - scope.matchingWishes.length;
              }
              scope.$apply(function() {
                scope.focusOnWish(scope.matchingWishes[newIndex], true);
              });
            }
          }
          return function keydownHandler(event) {
            var change = 0;
            switch(event.keyCode) {
              case 9:
                event.preventDefault();
                if (_isSubContextWish(scope.focusedWish)) {
                  _setSubContextState(scope.focusedWish);
                }
                break;
              case 38:
                change = -1;
                break;
              case 40:
                change = 1;
                break;
            }
            if (event.shiftKey) {
              change *= 5;
            }
            changeSelection(change, event);
          }
        })());

        function _setSubContextState(wish) {
          if (scope.state !== states.subContext) {
            scope.state = states.subContext;
            startTextForSubContext = wish.magicWords[0] + ' ';
            if (wish.data && wish.data.uxGenie && wish.data.uxGenie.displayText) {
              startTextForSubContext = wish.data.uxGenie.displayText;
            }
            genie.context(wish.data.uxGenie.subContext);
            scope.$apply(function() {
              scope.genieInput = startTextForSubContext;
            });
          }
        }

        function _exitSubContext() {
          genie.revertContext();
          scope.state = states.userEntry;
          startTextForSubContext = null;
        }

        // Making a wish
        scope.makeWish = function(wish) {
          var makeWish = true;
          var makeInvisible = true;
          if (wish.id === mathResultId) {
            makeWish = false;
          }

          if (_isSubContextWish(wish)) {
            _setSubContextState(wish);
            makeInvisible = false;
            if (!wish.action) {
              makeWish = false;
            }
          }

          if (makeWish) {
            wish = genie.makeWish(wish, scope.genieInput);
            saveToLocalStorage(wish);
          }

          scope.wishCallback({
            wish: wish,
            magicWord: scope.genieInput
          });
          if (makeInvisible) {
            scope.$apply(function() {
              scope.lampVisible = false;
            });
          }
        };

        el.bind('keyup', function(event) {
          if (event.keyCode === 13 && scope.focusedWish) {
            scope.makeWish(scope.focusedWish);
          }
        });

        // Updating list of wishes
        function updateMatchingWishes(magicWord) {
          if (magicWord) {
            if (magicWord.indexOf('\'') === 0) {
              magicWord = magicWord.substring(1);
            }
            scope.matchingWishes = genie.getMatchingWishes(magicWord);
            if (scope.matchingWishes.length > 0) {
              scope.focusedWish = scope.matchingWishes[0];
            } else {
              scope.focusedWish = null;
            }
          } else {
            scope.matchingWishes = null;
            scope.focusedWish = null;
          }
        }

        function handleInputChange(newVal) {
          if (scope.state === states.subContext) {
            if (newVal.indexOf(startTextForSubContext.trim()) === 0) {
              newVal = newVal.substring(startTextForSubContext.length);
            } else {
              _exitSubContext();
            }
          }
          updateMatchingWishes(newVal);
          var firstWish = null;
          var firstWishDisplay = null;
          if (scope.matchingWishes && scope.matchingWishes.length > 0) {
            firstWish = scope.matchingWishes[0];
            firstWishDisplay = firstWish.magicWords[0];
            if (firstWish.data && firstWish.data.uxGenie && firstWish.data.uxGenie.displayText) {
              firstWishDisplay = firstWish.data.uxGenie.displayText;
            }
          }

          if (firstWish && scope.matchingWishes.length === 1 &&
            _isSubContextWish(firstWish) && firstWishDisplay === newVal) {
            _setSubContextState(firstWish);
          }

          var result = _evaluateMath(newVal);
          if (angular.isNumber(result)) {
            scope.matchingWishes = scope.matchingWishes || [];
            scope.matchingWishes.unshift({
              id: mathResultId,
              data: {
                uxGenie: {
                  displayText: newVal + ' = ' + result
                }
              }
            });
            scope.focusedWish = scope.matchingWishes[0];
          }
        }

        scope.$watch('lampVisible', function(lampIsVisible) {
          if (scope.state === states.subContext) {
            _exitSubContext();
          }
          if (lampIsVisible) {
            handleInputChange(scope.genieInput);
            if (scope.rubClass) {
              el.addClass(scope.rubClass);
              // Needs to be lampVisible before it can be selected
              $timeout(function() {
                inputEl[0].select();
              }, 25);
            } else {
              inputEl[0].select();
            }
          } else {
            if (scope.rubClass) {
              el.removeClass(scope.rubClass);
            }
            inputEl[0].blur();
          }
        });

        if (scope.localStorage && localStorage) {
          // Load machine's preferences
          var options = {
            enteredMagicWords: JSON.parse(localStorage.getItem('genie'))
          };
          genie.options(options);

          // Setup update machine's preferences
          saveToLocalStorage = function(wish) {
            // This way 'genie' is never set in local storage until a wish is made.
            localStorage.setItem('genie', JSON.stringify(genie.options().enteredMagicWords, null, 2));
          }
        }

        function _isSubContextWish(wish) {
          return !!wish && !!wish.data && !!wish.data.uxGenie && !!wish.data.uxGenie.subContext;
        }

        function _evaluateMath(expression) {
          var mathRegex = /(?:[a-z$_][a-z0-9$_]*)|(?:[;={}\[\]"'!&<>^\\?:])/ig;
          var valid = true;

          expression = expression.replace(mathRegex, function (match) {
            if (Math.hasOwnProperty(match)) {
              return 'Math.' + match;
            } else {
              valid = false;
            }
          });

          if (!valid) {
            return false;
          } else {
            try {
              return eval(expression);
            } catch (e) {
              return false;
            }
          }
        }

        scope.$watch('genieInput', handleInputChange);
      }
    }
  }]);

  uxGenie.directive('genieWish', ['genie', function(genie) {
    return {
      scope: true,
      link: function(scope, el, attrs) {
        var id = attrs.wishId;
        var context = attrs.wishContext ? attrs.wishContext.split(',') : null;
        var data = attrs.wishData || {};
        var uxGenieData = data.uxGenie = data.uxGenie || {};

        uxGenieData.element = el[0];
        uxGenieData.event = attrs.wishEvent || uxGenieData.event || 'click';
        uxGenieData.iIcon = attrs.wishIIcon;
        uxGenieData.imgIcon = attrs.wishImgIcon;

        var action = function(wish) {
          var modifiers = [];
          if (attrs.eventModifiers) {
            modifiers = attrs.eventModifiers.split(',');
          }
          var event = new MouseEvent(wish.data.uxGenie.event, {
            view: window,
            bubbles: true,
            cancelable: true,
            ctrlKey: modifiers.indexOf('ctrlKey') > -1,
            altKey: modifiers.indexOf('altKey') > -1,
            shiftKey: modifiers.indexOf('shiftKey') > -1,
            metaKey: modifiers.indexOf('metaKey') > -1
          });
          wish.data.uxGenie.element.dispatchEvent(event);
        };

        // get magic words
        var magicWords = null;
        ['genieWish', 'name', 'id'].every(function(attrName) {
          magicWords = attrs[attrName];
          return !magicWords;
        });
        magicWords = magicWords || el.text();
        magicWords = magicWords.replace(/\\,/g, '{{COMMA}}');
        if (magicWords) {
          magicWords = magicWords.split(',');
        } else {
          throw new Error('Thrown by the genie-wish directive: All genie-wish elements must have a magic-words, id, or name attribute.');
        }
        for (var i = 0; i < magicWords.length; i++) {
          magicWords[i] = magicWords[i].replace(/\{\{COMMA\}\}/g, ',');
        }

        var wishRegistered = false;
        attrs.$observe('ignoreWish', function(newVal) {
          if (newVal !== 'true' && !wishRegistered) {
            genie({
              id: id,
              magicWords: magicWords,
              context: context,
              action: action,
              data: data
            });
            wishRegistered = true;
          }
        });
      }
    }
  }]);
}));