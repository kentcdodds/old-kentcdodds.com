/**
 * genie.js @license
 * (c) 2013 Kent C. Dodds
 * genie.js may be freely distributed under the MIT license.
 * http://www.github.com/kentcdodds/genie
 * See README.md
 */

(function (root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    root.genie = factory();
  }
}(this, function() {
  'use strict';

  var genie = null; // Library object
  var _wishes = [],
    _previousId = 0,
    _enteredMagicWords = {},
    _defaultContext = ['universe'],
    _originalMatchingAlgorithm = function() {},
    _context = _defaultContext,
    _pathContexts = [],
    _previousContext = _defaultContext,
    _enabled = true,
    _returnOnDisabled = true,

    _contextRegex = /\{\{(\d+)\}\}/,
    _matchRankMap = {
      equals: 5,
      startsWith: 4,
      wordStartsWith: 3,
      contains: 2,
      acronym: 1,
      matches: 0,
      noMatch: -1
    };

  /**
   * A wish object has the following parameters:
   *  id: Unique identifier for the wish. This should be a string
   *  context: The context of the wish. Can be a string, array,
   *    or an object optional properties (strings/arrays) of 'all',
   *    'none', and 'any'. If a string or array is given, the context
   *    is assigned an 'any' property an array of it's value.
   *  data: Any data you wish to associate with the wish.
   *    Genie adds a 'timesMade' property with total and magicWords
   *    properties to keep track of how often a wish is made with a
   *    given magicWord.
   *  magicWords: Used to match this wish on genie.getMatchingWishes
   *  action: The action to be performed when genie.makeWish is
   *    called with this wish.
   *
   * @param wish
   * @returns {*} The registered wish or array of wishes.
   */
  function registerWish(wish) {
    if (_isArray(wish)) {
      var wishesRegistered = [];
      _each(wish, function(w) {
        wishesRegistered.push(registerWish(w));
      });
      return wishesRegistered;
    } else {
      var newWish = _createWish(wish);
      var existingWishIndex = _getWishIndexById(newWish.id);
      if (existingWishIndex < 0) {
        _wishes.push(newWish);
      } else {
        _wishes[existingWishIndex] = newWish;
      }

      return newWish;
    }
  }

  /**
   * Creates a new wish object.
   * @param wish
   * @returns {*} - New wish object
   * @private
   */
  function _createWish(wish) {
    var id = wish.id || 'g-' + _previousId++;
    var newWish = {
      id: id,
      context: _createContext(wish.context),
      data: wish.data || {},
      magicWords: _arrayify(wish.magicWords),
      action: _createAction(wish.action)
    };
    newWish.data.timesMade = {
      total: 0,
      magicWords: {}
    };
    return newWish;
  }

  function _createContext(context) {
    var newContext = context || _defaultContext;
    if (_isString(newContext) || _isArray(newContext)) {
      newContext = {
        any: _arrayify(newContext)
      };
    } else {
      newContext = _arrayizeContext(context);
    }
    return newContext;
  }

  function _arrayizeContext(context) {
    function checkAndAdd(type) {
      if (context[type]) {
        context[type] = _arrayify(context[type]);
      }
    }
    checkAndAdd('all');
    checkAndAdd('any');
    checkAndAdd('none');
    return context;
  }

  function _createAction(action) {
    if (_isString(action)) {
      action = {
        destination: action
      };
    }
    if (_isObject(action)) {
      return function() {
        if (action.openNewTab) {
          window.open(action.destination, '_blank');
        } else {
          window.location.href = action.destination;
        }
      };
    }

    return action;
  }

  /**
   * Deregisters the given wish. Removes it from the registry
   *   and from the _enteredMagicWords map.
   * This will delete an _enteredMagicWords listing if this
   *   is the only wish in the list.
   * @param wish
   * @returns {*}
   */
  function deregisterWish(wish) {
    var indexOfWish = _wishes.indexOf(wish);
    if (!indexOfWish) {
      _each(_wishes, function(aWish, index) {
        // the given parameter could be an id.
        if (wish === aWish.id || wish.id === aWish.id) {
          indexOfWish = index;
          wish = aWish;
          return false;
        }
      });
    }

    _wishes.splice(indexOfWish, 1);
    _removeWishIdFromEnteredMagicWords(wish.id);
    return wish;
  }

  function _removeWishIdFromEnteredMagicWords(id) {
    function removeIdFromWishes(charObj, parent, charObjName) {
      _each(charObj, function(childProp, propName) {
        if (propName === 'wishes') {
          var index = childProp.indexOf(id);
          if (index !== -1) {
            childProp.splice(index, 1);
          }
          if (!childProp.length) {
            delete charObj[propName];
          }
        } else {
          removeIdFromWishes(childProp, charObj, propName);
        }
      });
      var keepCharObj = _getPropFromPosterity(charObj, 'wishes').length > 0;
      if (!keepCharObj && parent && charObjName) {
        delete parent[charObjName];
      }
    }
    removeIdFromWishes(_enteredMagicWords);
  }

  /**
   * Convenience method which calls getWishesWithContext and passes the arguments
   *   which are passed to this function. Then deregisters each of these.
   * @param context
   * @param type
   * @param wishContextType
   * @returns {Array} the deregistered wishes.
   */
  function deregisterWishesWithContext(context, type, wishContextType) {
    var deregisteredWishes = getWishesWithContext(context, type, wishContextType);
    _each(deregisteredWishes, function(wish, i) {
      deregisteredWishes[i] = deregisterWish(wish);
    });
    return deregisteredWishes;
  }

  /**
   * Get wishes in a specific context. If no context
   *   is provided, all wishes are returned.
   *   Think of this as, if genie were in the given
   *   context, what would be returned if I called
   *   genie.getMatchingWishes()?
   * @param context
   * @returns {Array}
   */
  function getWishesInContext(context) {
    context = context || _defaultContext;
    var wishesInContext = [];
    _each(_wishes, function(wish) {
      if (_contextIsDefault(context) ||
        _contextIsDefault(wish.context) ||
        _wishInThisContext(wish, context)) {
        wishesInContext.push(wish);
      }
    });
    return wishesInContext;
  }

  /**
   * Get wishes which have {type} of {context} in their context.{wishContextType}
   * @param context
   * @param type
   * @param wishContextTypes
   * @returns {Array}
   */
  function getWishesWithContext(context, type, wishContextTypes) {
    var wishesWithContext = [];
    type = type || 'any';
    _each(_wishes, function(wish) {
      var wishContext = _getWishContext(wish, wishContextTypes);

      if (!_isEmpty(wishContext) &&
        ((type === 'all' && _arrayContainsAll(wishContext, context)) ||
          (type === 'none' && _arrayContainsNone(wishContext, context)) ||
          (type === 'any' && _arrayContainsAny(wishContext, context)))) {
        wishesWithContext.push(wish);
      }
    });
    return wishesWithContext;
  }

  /**
   * Gets the wish context based on the wishContextTypes.
   * @param wish
   * @param wishContextTypes
   * @returns {Array}
   * @private
   */
  function _getWishContext(wish, wishContextTypes) {
    var wishContext = [];
    wishContextTypes = wishContextTypes || ['all', 'any', 'none'];

    wishContextTypes = _arrayify(wishContextTypes);
    _each(wishContextTypes, function(wishContextType) {
      if (wish.context[wishContextType]) {
        wishContext = wishContext.concat(wish.context[wishContextType]);
      }
    });

    return wishContext;
  }

  /**
   * Get a specific wish by an id.
   * If the id is an array, returns an array
   *   of wishes with the same order as the
   *   given array.
   * Note: If the id does not correspond to
   *   a registered wish, it will be undefined
   * @param id
   * @returns {*}
   */
  function getWish(id) {
    if (_isArray(id)) {
      var wishes = [];
      _each(_getWishIndexById(id), function(index) {
        wishes.push(_wishes[index]);
      });
      return wishes;
    } else {
      var index = _getWishIndexById(id);
      if (index > -1) {
        return _wishes[index];
      } else {
        return null;
      }
    }
  }

  function _getWishIndexById(id) {
    var wishIndex = -1;
    if (_isArray(id)) {
      var wishIndexes = [];
      _each(id, function(wishId) {
        wishIndexes.push(_getWishIndexById(wishId));
      });
      return wishIndexes;
    } else {
      _each(_wishes, function(aWish, index) {
        if (aWish.id === id) {
          wishIndex = index;
          return false;
        }
      });
      return wishIndex;
    }
  }

  /**
   * Sets genie's options to the default options
   * @returns {{
   *   wishes: {wish},
   *   previousId: number,
   *   enteredMagicWords: {Map, of, words, and, wishes},
   *   context: Array,
   *   previousContext: Array,
   *   enabled: boolean
   * }}
   */
  function reset() {
    var oldOptions = options();
    options({
      wishes: [],
      noWishMerge: true,
      previousId: 0,
      enteredMagicWords: {},
      context: _defaultContext,
      previousContext: _defaultContext,
      enabled: true
    });
    return oldOptions;
  }

  function getMatchingWishes(magicWord) {
    magicWord = (_isNullOrUndefined(magicWord) ? '' : '' + magicWord).toLowerCase();
    var allWishIds = _getWishIdsInEnteredMagicWords(magicWord);
    var allWishes = getWish(allWishIds);
    var matchingWishes = _filterInContextWishes(allWishes);

    var otherMatchingWishIds = _sortWishesByMatchingPriority(_wishes, allWishIds, magicWord);
    var otherWishes = getWish(otherMatchingWishIds);
    return matchingWishes.concat(otherWishes);
  }

  function _getWishIdsInEnteredMagicWords(word) {
    var startingCharWishesObj = _climbDownChain(_enteredMagicWords, word.split(''));
    if (startingCharWishesObj) {
      return _getPropFromPosterity(startingCharWishesObj, 'wishes', true);
    } else {
      return [];
    }
  }

  function _filterInContextWishes(wishes) {
    var inContextWishes = [];
    _each(wishes, function(wish) {
      if (wish && _wishInContext(wish)) {
        inContextWishes.push(wish);
      }
    });
    return inContextWishes;
  }

  function _climbDownChain(obj, props) {
    var finalObj = obj;
    props = _arrayify(props);
    var madeItAllTheWay = _each(props, function(prop) {
      if (finalObj.hasOwnProperty(prop)) {
        finalObj = finalObj[prop];
        return true;
      } else {
        return false;
      }
    });
    if (madeItAllTheWay) {
      return finalObj;
    } else {
      return null;
    }
  }

  function _getPropFromPosterity(objToStartWith, prop, unique) {
    var values = [];
    function loadValues(obj) {
      if (obj[prop]) {
        var propsToAdd = _arrayify(obj[prop]);
        _each(propsToAdd, function(propToAdd) {
          if (!unique || !_contains(values, propToAdd)) {
            values.push(propToAdd);
          }
        });
      }
      _each(obj, function(oProp, oPropName) {
        if (oPropName !== prop && !_isPrimitive(oProp)) {
          values = values.concat(loadValues(oProp));
        }
      });
    }
    loadValues(objToStartWith);
    return values;
  }

  function _sortWishesByMatchingPriority(wishes, currentMatchingWishIds, givenMagicWord) {
    var matchPriorityArrays = [];
    var returnedIds = [];

    _each(wishes, function(wish) {
      if (_wishInContext(wish)) {
        var matchPriority = _bestMagicWordsMatch(wish.magicWords, givenMagicWord);
        _maybeAddWishToMatchPriorityArray(wish, matchPriority, matchPriorityArrays, currentMatchingWishIds);
      }
    }, true);

    _each(matchPriorityArrays, function(matchTypeArray) {
      if (matchTypeArray) {
        _each(matchTypeArray, function(magicWordIndexArray) {
          if (magicWordIndexArray) {
            returnedIds = returnedIds.concat(magicWordIndexArray);
          }
        });
      }
    }, true);
    return returnedIds;
  }

  function _bestMagicWordsMatch(wishesMagicWords, givenMagicWord) {
    var bestMatch = {
      matchType: _matchRankMap.noMatch,
      magicWordIndex: -1
    };
    _each(wishesMagicWords, function(wishesMagicWord, index) {
      var matchRank = _stringsMatch(wishesMagicWord, givenMagicWord);
      if (matchRank > bestMatch.matchType) {
        bestMatch.matchType = matchRank;
        bestMatch.magicWordIndex = index;
      }
      return bestMatch.matchType !== _matchRankMap.equals;
    });
    return bestMatch;
  }

  function _stringsMatch(magicWord, givenMagicWord) {
    /* jshint maxcomplexity:8 */
    magicWord = ('' + magicWord).toLowerCase();

    // too long
    if (givenMagicWord.length > magicWord.length) {
      return _matchRankMap.noMatch;
    }

    // equals
    if (magicWord === givenMagicWord) {
      return _matchRankMap.equals;
    }

    // starts with
    if (magicWord.indexOf(givenMagicWord) === 0) {
      return _matchRankMap.startsWith;
    }

    // word starts with
    if (magicWord.indexOf(' ' + givenMagicWord) !== -1) {
      return _matchRankMap.wordStartsWith;
    }

    // contains
    if (magicWord.indexOf(givenMagicWord) !== -1) {
      return _matchRankMap.contains;
    } else if (givenMagicWord.length === 1) {
      // If the only character in the given magic word
      //   isn't even contained in the magic word, then
      //   it's definitely not a match.
      return _matchRankMap.noMatch;
    }

    // acronym
    if (_getAcronym(magicWord).indexOf(givenMagicWord) !== -1) {
      return _matchRankMap.acronym;
    }

    return _stringsByCharOrder(magicWord, givenMagicWord);
  }

  function _getAcronym(string) {
    var acronym = '';
    var wordsInString = string.split(' ');
    _each(wordsInString, function(wordInString) {
      var splitByHyphenWords = wordInString.split('-');
      _each(splitByHyphenWords, function(splitByHyphenWord) {
        acronym += splitByHyphenWord.substr(0, 1);
      });
    });
    return acronym;
  }

  function _stringsByCharOrder(magicWord, givenMagicWord) {
    var charNumber = 0;

    function _findMatchingCharacter(matchChar, string) {
      var found = false;
      for (var j = charNumber; j < string.length; j++) {
        var stringChar = string[j];
        if (stringChar === matchChar) {
          found = true;
          charNumber = j + 1;
          break;
        }
      }
      return found;
    }

    for (var i = 0; i < givenMagicWord.length; i++) {
      var matchChar = givenMagicWord[i];
      var found = _findMatchingCharacter(matchChar, magicWord);
      if (!found) {
        return _matchRankMap.noMatch;
      }
    }
    return _matchRankMap.matches;
  }

  function _maybeAddWishToMatchPriorityArray(wish, matchPriority, matchPriorityArrays, currentMatchingWishIds) {
    var indexOfWishInCurrent = currentMatchingWishIds.indexOf(wish.id);
    if (matchPriority.matchType !== _matchRankMap.noMatch) {
      if (indexOfWishInCurrent === -1) {
        _getMatchPriorityArray(matchPriorityArrays, matchPriority).push(wish.id);
      }
    } else if (indexOfWishInCurrent !== -1) {
      // remove current matching wishIds if it doesn't match
      currentMatchingWishIds.splice(indexOfWishInCurrent, 1);
    }
  }

  function _getMatchPriorityArray(arry, matchPriority) {
    arry[matchPriority.matchType] = arry[matchPriority.matchType] || [];
    var matchTypeArray = arry[matchPriority.matchType];
    var matchPriorityArray = matchTypeArray[matchPriority.magicWordIndex] = matchTypeArray[matchPriority.magicWordIndex] || [];
    return matchPriorityArray;
  }

  /**
   * Take the given wish/wish id and call it's action
   *   method if it is in context.
   * @param wish
   * @param magicWord
   * @returns {*}
   */
  function makeWish(wish, magicWord) {
    wish = _convertToWishObjectFromNullOrId(wish, magicWord);

    if (!_wishCanBeMade(wish)) {
      return null;
    }

    _executeWish(wish, magicWord);

    if (!_isNullOrUndefined(magicWord)) {
      _updateEnteredMagicWords(wish, magicWord);
    }
    return wish;
  }

  /**
   * Convert the given wish argument to a valid wish object.
   *   It could be an ID, or null. If it's null, use the
   *   magic word and assign it to be the first result from
   *   the magic word.
   * @param wish
   * @param magicWord
   * @returns {*}
   * @private
   */
  function _convertToWishObjectFromNullOrId(wish, magicWord) {
    var wishObject = wish;
    // Check if it may be a wish object
    if (!_isObject(wishObject)) {
      wishObject = getWish(wish);
    }
    if (_isNullOrUndefined(wishObject)) {
      var matchingWishes = getMatchingWishes(magicWord);
      if (matchingWishes.length > 0) {
        wishObject = matchingWishes[0];
      }
    }
    return wishObject;
  }

  /** A wish is non-executable if it
   *   - doesn't exist
   *   - doesn't have an action
   *   - wish is not in context
   */
  function _wishCanBeMade(wish) {
    return wish && !_isNullOrUndefined(wish.action) && _wishInContext(wish);
  }

  /**
   * Calls the wish's action with the wish and
   *   magic word as the parameters and iterates
   *   the timesMade properties.
   *
   * @param wish
   * @param magicWord
   * @private
   */
  function _executeWish(wish, magicWord) {
    wish.action(wish, magicWord);
    var timesMade = wish.data.timesMade;
    timesMade.total++;
    timesMade.magicWords[magicWord] = timesMade.magicWords[magicWord] || 0;
    timesMade.magicWords[magicWord]++;
  }

  /**
   * Returns true if the given context is the default context.
   * @param context
   * @returns {boolean}
   * @private
   */
  function _contextIsDefault(context) {
    if (!_isObject(context)) {
      context = _arrayify(context);
    }
    if (_isArray(context) && context.length === 1) {
      return context[0] === _defaultContext[0];
    } else if (context.any && context.any.length === 1) {
      return context.any[0] === _defaultContext[0];
    } else {
      return false;
    }
  }

  /**
   * There are a few ways for a wish to be in context:
   *  1. Genie's context is equal to the default context
   *  2. The wish's context is equal to the default context
   *  3. The wish's context is equal to genie's context
   *  4. The wish is _wishInThisContext(_context)
   * @param wish
   * @returns {*}
   * @private
   */
  function _wishInContext(wish) {
    return _contextIsDefault(_context) ||
      _contextIsDefault(wish.context) ||
      wish.context === _context ||
      _wishInThisContext(wish, _context);
  }

  /**
   * This will get the any, all, and none constraints for the
   *   wish's context. If a constraint is not present, it is
   *   considered passing. The exception being if the wish has
   *   no context (each context property is not present). In
   *   this case, it is not in context.
   * These things must be true for the wish to be in the given context:
   *  1. any: genie's context contains any of these.
   *  2. all: genie's context contains all of these.
   *  3. none: genie's context contains none of these.
   *
   * @param wish
   * @param theContexts
   * @returns {boolean}
   * @private
   */
  function _wishInThisContext(wish, theContexts) {
    /* jshint maxcomplexity:5 */
    var wishContextConstraintsMet;

    var any = wish.context.any || [];
    var all = wish.context.all || [];
    var none = wish.context.none || [];

    var containsAny = _isEmpty(any) || _arrayContainsAny(theContexts, any);
    var containsAll = theContexts.length >= all.length && _arrayContainsAll(theContexts, all);
    var wishNoneContextNotContainedInContext = _arrayContainsNone(theContexts, none);

    wishContextConstraintsMet = containsAny && containsAll && wishNoneContextNotContainedInContext;

    return wishContextConstraintsMet;
  }

  /**
   * Updates the _enteredMagicWords map. Steps:
   *  1. Get or create a spot for the magic word in the map.
   *  2. If the wish is the first element in the map already,
   *    do nothing. (return)
   *  3. If the wish already exists in the map, remove it.
   *  4. If the wish was not already the second element,
   *    set is as the second element. If it was, set it
   *    as the first element.
   * @param wish
   * @param magicWord
   * @private
   */
  function _updateEnteredMagicWords(wish, magicWord) {
    // Reset entered magicWords order.
    var spotForWishes = _createSpotInEnteredMagicWords(_enteredMagicWords, magicWord);
    spotForWishes.wishes = spotForWishes.wishes || [];
    var existingIndex = spotForWishes.wishes.indexOf(wish.id);
    if (existingIndex !== 0) {
      _repositionWishIdInEnteredMagicWordsArray(wish.id, spotForWishes.wishes, existingIndex);
    }
  }

  function _createSpotInEnteredMagicWords(spot, chars) {
    var firstChar = chars.substring(0, 1);
    var remainingChars = chars.substring(1);
    var nextSpot = spot[firstChar] = spot[firstChar] || {};
    if (remainingChars) {
      return _createSpotInEnteredMagicWords(nextSpot, remainingChars);
    } else {
      return nextSpot;
    }
  }

  function _repositionWishIdInEnteredMagicWordsArray(id, arry, existingIndex) {
    if (existingIndex !== -1) {
      // If it already exists, remove it before re-adding it in the correct spot
      arry.splice(existingIndex, 1);
    }
    if (existingIndex !== 1 && arry.length > 0) {
      // If it's not "on deck" then put it in the first slot and set the King of the Hill to be the id to go first.
      var first = arry[0];
      arry[0] = id;
      id = first;
    }
    arry.unshift(id);
  }

  /**
   * Gets the context paths that should be added based on the
   *   given path and the context paths that should be removed
   *   based ont he given path
   * @param path
   * @returns {{add: Array, remove: Array}}
   * @private
   */
  function _getContextsFromPath(path) {
    var allContexts = {
      add: [],
      remove: []
    };
    _each(_pathContexts, function(pathContext) {
      var contextAdded = false;
      var contexts = pathContext.contexts;
      var regexes = pathContext.regexes;
      var paths = pathContext.paths;

      _each(regexes, function(regex) {
        regex.lastIndex = 0;
        var matches = regex.exec(path);
        if (matches && matches.length > 0) {
          var contextsToAdd = [];
          _each(contexts, function(context) {
            var replacedContext = context.replace(_contextRegex, function(match, group) {
              return matches[group];
            });
            contextsToAdd.push(replacedContext);
          });
          allContexts.add = allContexts.add.concat(contextsToAdd);
          contextAdded = true;
        }
        return !contextAdded;
      });

      if (!contextAdded) {
        _each(paths, function(pathToTry) {
          if (path === pathToTry) {
            allContexts.add = allContexts.add.concat(contexts);
            contextAdded = true;
          }
          return !contextAdded;
        });
        if (!contextAdded) {
          allContexts.remove = allContexts.remove.concat(contexts);
        }
      }
    });
    return allContexts;
  }

  /**
   * Gets all the pathContext.contexts that are regex contexts and matches
   *   those to genie's contexts. Returns all the matching contexts.
   * @returns {Array}
   * @private
   */
  function _getContextsMatchingRegexPathContexts() {
    var regexContexts = [];
    _each(_pathContexts, function(pathContext) {
      var contexts = pathContext.contexts;

      _each(contexts, function(context) {

        if (_contextRegex.test(context)) { // context string is a regex context
          var replaceContextRegex = context.replace(_contextRegex, '.+?');

          _each(_context, function(currentContext) {
            if (new RegExp(replaceContextRegex).test(currentContext)) {
              regexContexts.push(currentContext);
            }

          });
        }
      });
    });
    return regexContexts;
  }

  // Helpers //
  /**
   * returns the obj in array form if it is not one already
   * @param obj
   * @returns {Array}
   * @private
   */
  function _arrayify(obj) {
    if (!obj) {
      return [];
    } else if (_isArray(obj)) {
      return obj;
    } else {
      return [obj];
    }
  }

  /**
   * Adds items to the arry from the obj only if it
   *   is not in the arry already
   * @param arry
   * @param obj
   * @private
   */
  function _addUniqueItems(arry, obj) {
    obj = _arrayify(obj);
    _each(obj, function(o) {
      if (arry.indexOf(o) < 0) {
        arry.push(o);
      }
    });
  }

  /**
   * Removes all instances of items in the given obj
   *   from the given arry.
   * @param arry
   * @param obj
   * @private
   */
  function _removeItems(arry, obj) {
    obj = _arrayify(obj);
    var i = 0;

    while(i < arry.length) {
      if (_contains(obj, arry[i])) {
        arry.splice(i, 1);
      } else {
        i++;
      }
    }
  }

  /**
   * Returns true if arry1 contains any of arry2's elements
   * @param arry1
   * @param arry2
   * @returns {boolean}
   * @private
   */
  function _arrayContainsAny(arry1, arry2) {
    arry1 = _arrayify(arry1);
    arry2 = _arrayify(arry2);
    for (var i = 0; i < arry2.length; i++) {
      if (_contains(arry1, arry2[i])) {
        return true;
      }
    }
    return false;
  }

  /**
   * Returns true if arry1 does not contain any of arry2's elements
   * @param arry1
   * @param arry2
   * @returns {boolean}
   * @private
   */
  function _arrayContainsNone(arry1, arry2) {
    arry1 = _arrayify(arry1);
    arry2 = _arrayify(arry2);
    for (var i = 0; i < arry2.length; i++) {
      if (_contains(arry1, arry2[i])) {
        return false;
      }
    }
    return true;
  }

  /**
   * Returns true if arry1 contains all of arry2's elements
   * @param arry1
   * @param arry2
   * @returns {boolean}
   * @private
   */
  function _arrayContainsAll(arry1, arry2) {
    arry1 = _arrayify(arry1);
    arry2 = _arrayify(arry2);
    for (var i = 0; i < arry2.length; i++) {
      if (!_contains(arry1, arry2[i])) {
        return false;
      }
    }
    return true;
  }

  function _contains(arry, obj) {
    return arry.indexOf(obj) > -1;
  }

  function _isEmpty(obj) {
    if (_isNullOrUndefined(obj)) {
      return true;
    } else if (_isArray(obj)) {
      return obj.length === 0;
    } else if (_isPrimitive(obj)) {
      return false;
    } else {
      return false;
    }
  }

  /**
   * Iterates through each own property of obj and calls the fn on it.
   *   If obj is an array: fn(val, index, obj)
   *   If obj is an obj: fn(val, propName, obj)
   * @param obj
   * @param fn
   * @private
   */
  function _each(obj, fn, reverse) {
    if (_isPrimitive(obj)) {
      obj = _arrayify(obj);
    }
    if (_isArray(obj)) {
      return _eachArray(obj, fn, reverse);
    } else {
      return _eachProperty(obj, fn);
    }
  }

  /**
   * If reverse is true, calls _eachArrayReverse(arry, fn)
   *   otherwise calls _eachArrayForward(arry, fn)
   * @param arry
   * @param fn
   * @param reverse
   * @returns {bool}
   * @private
   */
  function _eachArray(arry, fn, reverse) {
    if (_isTrue(reverse)) {
      return _eachArrayReverse(arry, fn);
    } else {
      return _eachArrayForward(arry, fn);
    }
  }

  /**
   * Iterates through the array and calls the given function
   *   in reverse order.
   * @param arry
   * @param fn
   * @returns {boolean} whether the loop broke early
   * @private
   */
  function _eachArrayReverse(arry, fn) {
    var ret = true;
    for (var i = arry.length - 1; i >= 0; i--) {
      ret = fn(arry[i], i, arry);
      if (_isFalse(ret)) {
        break;
      }
    }
    return ret;
  }

  /**
   * Iterates through the array and calls the given function
   * @param arry
   * @param fn
   * @returns {boolean} whether the loop broke early
   * @private
   */
  function _eachArrayForward(arry, fn) {
    var ret = true;
    for (var i = 0; i < arry.length; i++) {
      ret = fn(arry[i], i, arry);
      if (_isFalse(ret)) {
        break;
      }
    }
    return ret;
  }

  function _eachProperty(obj, fn) {
    var ret = true;
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        ret = fn(obj[prop], prop, obj);
        if (_isFalse(ret)) {
          break;
        }
      }
    }
    return ret;
  }

  function _isTrue(bool) {
    /* jshint -W116 */
    return bool == true;
  }

  function _isFalse(bool) {
    /* jshint -W116 */
    return bool == false;
  }

  function _isArray(obj) {
    return obj instanceof Array;
  }

  function _isString(obj) {
    return typeof obj === 'string';
  }

  function _isObject(obj) {
    return typeof obj === 'object';
  }

  function _isPrimitive(obj) {
    /* jshint maxcomplexity:5 */
    switch (typeof obj) {
      case 'string':
      case 'number':
      case 'boolean':
      case 'undefined':
        return true;
      default:
        return false;
    }
  }

  function _isUndefined(obj) {
    if (_isArray(obj)) {
      return !_each(obj, function(o) {
        return !_isUndefined(o);
      });
    } else {
      return typeof obj === 'undefined';
    }
  }

  function _isNull(obj) {
    if (_isArray(obj)) {
      return !_each(obj, function(o) {
        return !_isNull(o);
      });
    } else {
      return obj === null;
    }
  }

  function _isNullOrUndefined(obj) {
    return _isNull(obj) || _isUndefined(obj);
  }

  // Begin API functions. //
  /**
   * An api into genie's options
   * The opts argument can have the following properties:
   *  - wishes: object - Must be an object mapped by wish ids
   *  - noWishMerge: boolean - Using this will simply assign the
   *    given wishes to genie's _wishes variable. If falsy, then
   *    genie.mergeWishes is called with the wishes.
   *  - previousId: number - This is used to assign wish ids when
   *    the id is not provided when registering a wish. This number
   *    is bumped up with every new wish. Changing this without
   *    resetting wishes could lead to wish overrides.
   *  - enteredMagicWords: object - A mapping of words (key) to
   *    an array of wish ids.
   *  - context: string or array of strings - genie's context
   *  - previousContext: string or array of strings - genie's
   *    previousContext. Used for genie.revertContext().
   *  - enabled: boolean - Whether genie is enabled. If set to
   *    false, this will cause only genie's enabled function
   *    to work (so you can turn it back on).
   *  - returnOnDisabled: boolean - If enabled is false, genie
   *    will simulate proper functionality by returning empty
   *    objects/arrays/strings/etc. This way you don't have to
   *    do a bunch of checking around all of your genie code.
   *    However, if you want to turn this off, set this to
   *    false and you will get null back for everything when
   *    genie is disabled.
   *
   * @param opts
   * @returns {
   *  {
   *    wishes: [wish],
   *    previousId: number,
   *    enteredMagicWords: {Map of words and wishes},
   *    context: Array,
   *    previousContext: Array,
   *    enabled: boolean
   *  }
   * }
   */
  function options(opts) {
    /* jshint maxcomplexity:8 */
    if (opts) {
      _updateWishesWithOptions(opts);
      _previousId = opts.previousId || _previousId;
      _enteredMagicWords = opts.enteredMagicWords || _enteredMagicWords;
      _context = opts.context || _context;
      _previousContext = opts.previousContext || _previousContext;
      _enabled = opts.enabled || _enabled;
      _returnOnDisabled = opts.returnOnDisabled || _returnOnDisabled;
    }
    return {
      wishes: _wishes,
      previousId: _previousId,
      enteredMagicWords: _enteredMagicWords,
      context: _context,
      previousContext: _previousContext,
      enabled: _enabled
    };
  }

  /**
   * This will override the matching algorithm (getMatchingWishes)
   * @param fn the new function. Should accept wishes array,
   *   magicWord string, and enteredMagicWords object.
   *   You wont need to change how you interface with
   *   getMatching wishes at all by using this.
   */
  function overrideMatchingAlgorithm(fn) {
    genie.getMatchingWishes = _passThrough(function(magicWord) {
      return fn(_wishes, magicWord, _context, _enteredMagicWords);
    }, []);
  }

  /**
   * This will set the matching algorithm back to the original
   */
  function restoreMatchingAlgorithm() {
    genie.getMatchingWishes = _originalMatchingAlgorithm;
  }

  /**
   * If wishes are present, will update them based on options given.
   * @param opts
   * @private
   */
  function _updateWishesWithOptions(opts) {
    if (opts.wishes) {
      if (opts.noWishMerge) {
        _wishes = opts.wishes;
      } else {
        mergeWishes(opts.wishes);
      }
    }
  }

  /**
   * Merges the given wishes with genie's current wishes.
   * Iterates through the wishes: If the wish does not have
   *   an action, and the wish's id is registered with genie,
   *   genie will assign the registered wish's action to
   *   the new wish's action property.
   *   Next, if the new wish has an action, it is registered
   *   with genie based on its wishId
   * @param wishes - Array of wish objects
   * @returns {[wish]}
   */
  function mergeWishes(wishes) {
    _each(wishes, function(newWish) {
      var wishIndex = -1;
      var existingWish = null;
      _each(_wishes, function(aWish, aWishIndex) {
        if (aWish.id === newWish.id) {
          existingWish = aWish;
          wishIndex = aWishIndex;
          return false;
        }
      });
      if (!newWish.action && existingWish) {
        newWish.action = existingWish.action;
      }
      if (newWish.action) {
        _wishes[wishIndex] = newWish;
      }
    });
    return _wishes;
  }

  /**
   * Set's then returns genie's current context.
   * If no context is provided, simply acts as getter.
   * If a context is provided, genie's previous context
   *   is set to the context before it is assigned
   *   to the given context.
   * @param newContext
   * @returns {Array}
   */
  function context(newContext) {
    if (newContext !== undefined) {
      _previousContext = _context;
      if (typeof newContext === 'string') {
        newContext = [newContext];
      }
      _context = newContext;
    }
    return _context;
  }

  /**
   * Adds the new context to genie's current context.
   * Genie's context will maintain uniqueness, so don't
   *   worry about overloading genie's context with
   *   duplicates.
   * @param newContext (string or array of strings)
   * @returns {Array}
   */
  function addContext(newContext) {
    _previousContext = _context;
    _addUniqueItems(_context, newContext);
    return _context;
  }

  /**
   * Removes the given context
   * @param contextToRemove
   * @returns {Array}
   */
  function removeContext(contextToRemove) {
    _previousContext = _context;
    _removeItems(_context, contextToRemove);
    if (_isEmpty(context)) {
      _context = _defaultContext;
    }
    return _context;
  }

  /**
   * Changes genie's context to _previousContext
   * @returns {Array}
   */
  function revertContext() {
    return context(_previousContext);
  }

  /**
   * Changes context to _defaultContext
   * @returns {Array}
   */
  function restoreContext() {
    return context(_defaultContext);
  }

  /**
   * Updates genie's context based on the given path
   * @param path - the path to match
   * @param noDeregister - Do not deregister wishes
   *   which are no longer in context
   * @returns {Array} - The new context
   */
  function updatePathContext(path, noDeregister) {
    if (path) {
      var allContexts = _getContextsFromPath(path);
      var contextsToAdd = allContexts.add;
      var contextsToRemove = _getContextsMatchingRegexPathContexts();
      contextsToRemove = contextsToRemove.concat(allContexts.remove);

      removeContext(contextsToRemove);

      if (!noDeregister) {
        // There's no way to prevent users of genie from adding wishes that already exist in genie
        //   so we're completely removing them here
        deregisterWishesWithContext(contextsToRemove);
      }

      addContext(contextsToAdd);
    }
    return _context;
  }

  /**
   * A pathContext is an array of objects with
   *   the following properties:
   *     - paths: string or array of strings
   *     - regexes: regex objects or array of
   *       regex objects
   *     - contexts: string or array of strings
   * @param pathContexts
   * @returns {Array} - The new path contexts
   */
  function addPathContext(pathContexts) {
    _each(pathContexts, function(pathContext) {
      if (pathContext.paths) {
        pathContext.paths = _arrayify(pathContext.paths);
      }

      if (pathContext.regexes) {
        pathContext.regexes = _arrayify(pathContext.regexes);
      }

      if (pathContext.contexts) {
        pathContext.contexts = _arrayify(pathContext.contexts);
      }
    });
    _addUniqueItems(_pathContexts, pathContexts);
    return _pathContexts;
  }

  /**
   * Removes the given path contexts
   * @param pathContext
   * @returns {Array}
   */
  function removePathContext(pathContext) {
    _removeItems(_pathContexts, pathContext);
    return _pathContexts;
  }

  function enabled(newState) {
    if (newState !== undefined) {
      _enabled = newState;
    }
    return _enabled;
  }

  function returnOnDisabled(newState) {
    if (newState !== undefined) {
      _returnOnDisabled = newState;
    }
    return _returnOnDisabled;
  }

  /**
   * Used to hijack public api functions for the
   *   enabled feature
   * @param fn
   * @param emptyRetObject
   * @returns {Function}
   * @private
   */
  function _passThrough(fn, emptyRetObject) {
    return function hijackedFunction() {
      if (_enabled || fn === enabled) {
        return fn.apply(this, arguments);
      } else if (_returnOnDisabled) {
        return emptyRetObject;
      } else {
        return null;
      }
    };
  }


  genie = _passThrough(registerWish, {});
  genie.getWishesInContext = _passThrough(getWishesInContext, []);
  genie.getWishesWithContext = _passThrough(getWishesWithContext, []);
  genie.getWish = _passThrough(getWish, {});
  genie.getMatchingWishes = _passThrough(getMatchingWishes, []);
  genie.overrideMatchingAlgorithm = _passThrough(overrideMatchingAlgorithm, {});
  genie.restoreMatchingAlgorithm = _passThrough(restoreMatchingAlgorithm, {});
  genie.makeWish = _passThrough(makeWish, {});
  genie.options = _passThrough(options, {});
  genie.mergeWishes = _passThrough(mergeWishes, {});
  genie.deregisterWish = _passThrough(deregisterWish, {});
  genie.deregisterWishesWithContext = _passThrough(deregisterWishesWithContext, []);
  genie.reset = _passThrough(reset, {});
  genie.context = _passThrough(context, []);
  genie.addContext = _passThrough(addContext, []);
  genie.removeContext = _passThrough(removeContext, []);
  genie.revertContext = _passThrough(revertContext, []);
  genie.restoreContext = _passThrough(restoreContext, []);
  genie.updatePathContext = _passThrough(updatePathContext, []);
  genie.addPathContext = _passThrough(addPathContext, []);
  genie.removePathContext = _passThrough(removePathContext, []);
  genie.enabled = _passThrough(enabled, false);
  genie.returnOnDisabled = _passThrough(returnOnDisabled, true);

  _originalMatchingAlgorithm = genie.getMatchingWishes;

  return genie;

}));