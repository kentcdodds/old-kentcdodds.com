/** 
 * genie.js @license
 * (c) 2013 Kent C. Dodds
 * genie.js may be freely distributed under the MIT license.
 * http://www.github.com/kentcdodds/genie
 * See README.md
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    root.genie = factory();
  }
}(this, function() {

  var genie = null; // Library object
  var _wishes = {},
    _previousId = 0,
    _enteredMagicWords = {},
    _defaultContext = 'universe',
    _context = _defaultContext,
    _previousContext = _defaultContext,
    _enabled = true,
    _returnOnDisabled = true,
    _matchRankMap = {
      equals: 6,
      startsWith: 5,
      wordStartsWith: 4,
      contains: 3,
      acronym: 2,
      matches: 1,
      noMatch: 0
    };

  function _getNextId() {
    return 'g-' + _previousId++;
  }

  function registerWish(magicWords, action, context, data, id) {
    if (!Array.isArray(magicWords)) {
      // If they passed an object instead.
      if (typeof magicWords === 'object') {
        return registerWish(magicWords.magicWords, magicWords.action, magicWords.context, magicWords.data, magicWords.id);
      } else {
        magicWords = [magicWords];
      }
    } else if (typeof magicWords[0] === 'object') {
      var wishesRegistered = [];
      // They gave an array of objects to register.
      for (var i = 0; i < magicWords.length; i++) {
        wishesRegistered.push(registerWish(magicWords[i]));
      }
      return wishesRegistered;
    }
    if (id === undefined) {
      id = _getNextId();
    }

    // Verify none of the magic words are objects
    for (var i = 0; i < magicWords.length; i++) {
      if (typeof magicWords[i] === 'object') {
        throw 'Cannot make an object a magic word!\n' + JSON.stringify(magicWords, null, 2);
      }
    }
    
    action = _createAction(action);

    var wish = {
      id: id,
      context: context || _defaultContext,
      data: data,
      magicWords: magicWords,
      action: action
    };
    _wishes[id] = wish;
    return _wishes[id];
  }

  function _createAction(action) {
    if (typeof action === 'function') { // Custom action
      return action;
    }

    if (typeof action === 'string') { // Default nav action
      action = {
        destination: action
      }
    }

    return function() {
      if (action.openNewTab) {
        window.open(action.destination, '_blank');
      } else {
        window.location.href = action.destination;
      }
    };
  }

  function deregisterWish(id) {
    // Check if it may be a wish object
    if (typeof id === 'object' && id.id) {
      id = id.id;
    }
    var wish = _wishes[id];
    delete _wishes[id];
    for (var word in _enteredMagicWords) {
      if (_enteredMagicWords[word].indexOf(id) != -1) {
        _enteredMagicWords[word].splice(_enteredMagicWords[word].indexOf(id), 1);
      }
    }
    return wish;
  }

  function reset() {
    var oldOptions = options();
    options({
      wishes: {},
      noWishMerge: true,
      previousId: 0,
      enteredMagicWords: [],
      contexts: _defaultContext,
      previousContext: _defaultContext,
      enabled: true
    });
    return oldOptions;
  }

  function getMatchingWishes(magicWord) {
    var otherMatchingWishId, allWishIds, matchingWishes, i, wish; //Hoist-it!
    if (magicWord === undefined) {
      magicWord = '';
    } else if (magicWord === null) {
      return [];
    } else if (typeof magicWord === 'object') {
      throw 'Cannot match wishes to an object!\n' + JSON.stringify(magicWord, null, 2);
    }

    allWishIds = _enteredMagicWords[magicWord] || [];

    otherMatchingWishId = _getOtherMatchingMagicWords(allWishIds, magicWord);
    allWishIds = allWishIds.concat(otherMatchingWishId);

    matchingWishes = [];
    for (i = 0; i < allWishIds.length; i++) {
      wish = _wishes[allWishIds[i]];
      if (wish && _wishInContext(wish)) {
        matchingWishes.push(wish);
      }
    }
    return matchingWishes;
  }

  function _getOtherMatchingMagicWords(currentMatchingWishIds, givenMagicWord) {
    var matchIdArrays = [];
    var returnedIds = [];

    for (var wishId in _wishes) {
      if (currentMatchingWishIds.indexOf(wishId) == -1) {
        var wish =_wishes[wishId];
        var matchType = _bestMagicWordsMatch(wish.magicWords, givenMagicWord);
        if (matchType !== _matchRankMap.noMatch) {
          matchIdArrays[matchType] = matchIdArrays[matchType]  || [];
          matchIdArrays[matchType].push(wishId);
        }
      }
    }
    for (var i = matchIdArrays.length; i > 0; i--) {
      var arry = matchIdArrays[i - 1];
      if (arry) {
        returnedIds = returnedIds.concat(arry);
      }
    }
    return returnedIds;
  }

  function _bestMagicWordsMatch(wishesMagicWords, givenMagicWord) {
    var bestMatch = _matchRankMap.noMatch;
    for (var i = 0; i < wishesMagicWords.length; i++) {
      var matchRank = _stringsMatch(wishesMagicWords[i], givenMagicWord);
      if (matchRank > bestMatch) {
        bestMatch = matchRank;
      }
      if (bestMatch === _matchRankMap.equals) {
        break;
      }
    }
    return bestMatch;
  }

  function _stringsMatch(magicWord, givenMagicWord) {
    var magicWordWords, splitByHyphen, acronym = '', i, j;

    magicWord = ('' + magicWord).toLowerCase();
    givenMagicWord = ('' + givenMagicWord).toLowerCase();

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
      return _matchRankMap.noMatch;
    }

    // acronym
    magicWordWords = magicWord.split(' ');
    for (i = 0; i < magicWordWords.length; i++) {
      splitByHyphen = magicWordWords[i].split('-');
      for (j = 0; j < splitByHyphen.length; j++) {
        acronym += splitByHyphen[j].substr(0, 1);
      }
    }
    if (acronym.indexOf(givenMagicWord) != -1) {
      return _matchRankMap.acronym;
    }

    return _stringsByCharOrder(magicWord, givenMagicWord);
  }

  function _stringsByCharOrder(magicWord, givenMagicWord) {
    var charNumber = 0;
    for (var i = 0; i < givenMagicWord.length; i++) {
      var matchChar = givenMagicWord[i];
      var found = false;
      for (var j = charNumber; j < magicWord.length; j++) {
        var stringChar = magicWord[j];
        if (stringChar == matchChar) {
          found = true;
          charNumber = j + 1;
          break;
        }
      }
      if (!found) {
        return _matchRankMap.noMatch;
      }
    }
    return _matchRankMap.matches;
  }

  function makeWish(wish, magicWord) {
    var id, arry, existingIndex, first, matchingWishes;
    // Check if it may be a wish object
    if (typeof wish !== 'object') {
      wish = _wishes[wish];
    }
    if (wish === null || wish === undefined) {
      matchingWishes = getMatchingWishes(magicWord);
      if (matchingWishes.length > 0) {
        wish = matchingWishes[0];
      }
    }

    /* Don't execute the wish and return null if it:
     *   - doesn't exist
     *   - isn't in the registry
     *   - doesn't have an action
     *   - wish is not in context
     */
    if (!wish || !_wishes[wish.id] || !wish.action || !(_wishInContext(wish))) {
      return null;
    }

    wish.action(wish);

    if (magicWord !== undefined) {
      // Reset entered magicWords order.
      _enteredMagicWords[magicWord] = _enteredMagicWords[magicWord] || [];
      id = wish.id;
      arry = _enteredMagicWords[magicWord];
      existingIndex = arry.indexOf(id);
      if (existingIndex === 0) {
        return wish;
      }
      if (existingIndex != -1) {
        // If it already exists, remove it before re-adding it in the correct spot
        arry.splice(existingIndex, 1);
      }
      if (existingIndex != 1 && arry.length > 0) {
        // If it's not "on deck" then put it in the first slot and set the King of the Hill to be the id to go first.
        first = arry[0];
        arry[0] = id;
        id = first;
      }
      arry.unshift(id);
    }
    return wish;
  }

  function _wishInContext(wish) {
    var currentContextIsDefault = _context === _defaultContext;
    var wishContextIsDefault = wish.context === _defaultContext;
    var wishContextIsCurrentContext = wish.context === _context;
    var wishContextIsDecendentContext = false;

    var wishContext = Array.isArray(wish.context) ? wish.context : [wish.context];
    var currentContext = Array.isArray(_context) ? _context : [_context];

    if (currentContext.length >= wishContext.length) {
      for (var i = 0; i < wishContext.length; i++) {
        wishContextIsDecendentContext = wishContext[i] === currentContext[i];
        if (!wishContextIsDecendentContext) {
          break;
        }
      }
    }
    
    return currentContextIsDefault || wishContextIsDefault || wishContextIsCurrentContext || wishContextIsDecendentContext;
  }

  // Begin API functions. //

  function options(options) {
    if (options) {
      if (options.wishes) {
        if (options.noWishMerge) {
          _wishes = options.wishes;
        } else {
          mergeWishes(options.wishes);
        }
      }
      _previousId = options.previousId || _previousId;
      _enteredMagicWords = options.enteredMagicWords || _enteredMagicWords;
      _context = options.context || _context;
      _previousContext = options.previousContext || _previousContext;
      _enabled = options.enabled || _enabled;
      _returnOnDisabled = options.returnOnDisabled || _returnOnDisabled;
    }
    return {
      wishes: _wishes,
      previousId: _previousId,
      enteredMagicWords: _enteredMagicWords,
      contexts: _context,
      previousContext: _previousContext,
      enabled: _enabled
    };
  }

  function mergeWishes(wishes) {
    var newWish;
    for (var wishId in wishes) {
      newWish = wishes[wishId];
      if (!newWish.action) {
        if (_wishes[wishId]) {
          newWish.action = _wishes[wishId].action;
        }
      }
      if (newWish.action) {
        _wishes[wishId] = newWish;
      }
    }
    return _wishes;
  }

  function context(newContext) {
    if (newContext !== undefined) {
      _previousContext = _context;
      _context = newContext;
    }
    return _context;
  }

  function revertContext() {
    return context(_previousContext);
  }

  function restoreContext() {
    return context(_defaultContext);
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

  function _passThrough(fn, emptyRetObject) {
    return function() {
      if (_enabled || fn === enabled) {
        return fn.apply(this, arguments);
      } else if (_returnOnDisabled) {
        return emptyRetObject;
      } else {
        return null;
      }
    }
  }

  genie = _passThrough(registerWish, {});
  genie.getMatchingWishes = _passThrough(getMatchingWishes, []);
  genie.makeWish = _passThrough(makeWish, {});
  genie.options = _passThrough(options, {});
  genie.mergeWishes = _passThrough(mergeWishes, {});
  genie.deregisterWish = _passThrough(deregisterWish, {});
  genie.reset = _passThrough(reset, {});
  genie.context = _passThrough(context, '');
  genie.revertContext = _passThrough(revertContext, '');
  genie.restoreContext = _passThrough(restoreContext, '');
  genie.enabled = _passThrough(enabled, false);
  genie.returnOnDisabled = _passThrough(returnOnDisabled, true);
  return genie;

}));